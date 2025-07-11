import { NextRequest } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@/lib/supabase/server';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// Sales agent system prompt
const SALES_AGENT_PROMPT = `You are an elite qualification specialist for APEX Operations, an ultra-exclusive program that transforms entrepreneurs into location-independent empire builders.

Your role is to have a sophisticated conversation to determine if the applicant is ready for our $10K/month home service empire system.

Key principles:
1. Be conversational, not interrogative. This is a dialogue between professionals.
2. After your welcome message, ask ONLY: "Before we begin, may I have your name?" - DO NOT ask for email in the same message.
3. After they respond with their name, then ask: "Thank you, [their name]. And what's the best email to reach you at?"
4. You MUST have both name and email before discussing business. Do not proceed without both.
5. Listen deeply. Ask follow-up questions based on their specific answers.
6. Look for indicators of readiness: business experience, financial capacity, commitment level, growth mindset.
7. Be subtly evaluative without being obvious about scoring.
8. Maintain luxury positioning - we are selective, only accepting 7 operators annually.
9. Never mention prices directly unless they ask. Focus on transformation and results.
10. If they seem unqualified, gracefully guide the conversation to a close.
11. NEVER ask for name or email again once collected. Use their name naturally throughout the conversation.

Qualification indicators to assess:
- Current business experience or strong entrepreneurial drive
- Understanding of systems vs. trading time for money  
- Financial readiness for a five-figure investment
- Commitment to a 12-week intensive program
- Vision for location independence
- Coachability and implementation speed

Information to collect during conversation:
- Name (REQUIRED - must ask before concluding)
- Email address (REQUIRED - must ask before concluding)
- Current business/career situation
- Location (if relevant)
- Financial readiness indicators

Remember: You're not selling. You're determining mutual fit. Be warm but discerning.

IMPORTANT: When ending the conversation, always use this exact phrase: "Thank you, [their name]. This concludes our evaluation." This signals the end of the assessment. Make it personal by using their name.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    
    // Log to help debug
    console.log('Received messages:', messages.length);
    console.log('API Key present:', !!process.env.OPENAI_API_KEY);

    // Get or create application record
    const conversationId = req.headers.get('x-conversation-id') || crypto.randomUUID();
    const supabase = await createClient();
    
    // Track if email was sent
    let emailSent = false;

    // Check if this is a new conversation (excluding the initial AI message)
    const userMessages = messages.filter((m: any) => m.role === 'user');
    if (userMessages.length === 1) {
      // Create new application record
      const { error: appError } = await supabase
        .from('applications')
        .insert({
          conversation_id: conversationId,
          message_count: messages.length,
          created_at: new Date().toISOString(),
          status: 'in_progress',
        });

      if (appError) {
        console.error('Error creating application:', appError);
      }
    }

    // Create the OpenAI chat completion with streaming
    const stream = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: [
        { role: 'system', content: SALES_AGENT_PROMPT },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    // Collect the full response for analysis
    let fullResponse = '';
    
    // Create a ReadableStream
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content || '';
            if (text) {
              fullResponse += text;
              // Format for Vercel AI SDK - properly escape newlines and quotes
              const escapedText = text
                .replace(/\\/g, '\\\\')
                .replace(/"/g, '\\"')
                .replace(/\n/g, '\\n')
                .replace(/\r/g, '\\r')
                .replace(/\t/g, '\\t');
              controller.enqueue(encoder.encode(`0:"${escapedText}"\n`));
            }
            
            // Check if this is the final chunk
            if (chunk.choices[0]?.finish_reason === 'stop') {
              // Send the final done signal
              controller.enqueue(encoder.encode(`0:""\n`));
            }
          }
          
          // Before closing, don't send any email signal here
          // We'll handle it after the conversation analysis below
          
          controller.close();

          // After stream completes, analyze and store the conversation
          const lastUserMessage = messages[messages.length - 1];
          
          // Store conversation turn
          const { error: convError } = await supabase
            .from('application_conversations')
            .insert({
              conversation_id: conversationId,
              user_message: lastUserMessage.content,
              agent_response: fullResponse,
              message_count: messages.length,
            });

          if (convError) {
            console.error('Error storing conversation:', convError);
          }

          // Update application with extracted info
          const extractedInfo = await extractApplicationInfo(messages, fullResponse);
          if (Object.keys(extractedInfo).length > 0) {
            // First try to update, if no rows affected, insert
            const { data: updateData, error: updateError } = await supabase
              .from('applications')
              .update({
                ...extractedInfo,
                message_count: messages.length,
                last_message_at: new Date().toISOString(),
              })
              .eq('conversation_id', conversationId)
              .select();

            if (updateError || !updateData || updateData.length === 0) {
              // If update failed or no rows updated, create new record
              const { error: insertError } = await supabase
                .from('applications')
                .insert({
                  conversation_id: conversationId,
                  ...extractedInfo,
                  message_count: messages.length,
                  created_at: new Date().toISOString(),
                  last_message_at: new Date().toISOString(),
                  status: 'in_progress',
                });
              
              if (insertError) {
                console.error('Error creating application:', insertError);
              }
            }
          }

          // Check if conversation is concluding and score it
          // Only trigger if the AI is talking about sending/checking email (not asking for it)
          const isAskingForEmail = fullResponse.toLowerCase().includes('may i have your email') || 
                                   fullResponse.toLowerCase().includes('what\'s your email') ||
                                   fullResponse.toLowerCase().includes('email address?');
          
          const isConcluding = (fullResponse.toLowerCase().includes('i\'ll send') || 
                               fullResponse.toLowerCase().includes('check your email') ||
                               fullResponse.toLowerCase().includes('keep an eye on your inbox') ||
                               fullResponse.toLowerCase().includes('you\'ll receive an email') ||
                               fullResponse.toLowerCase().includes('i\'ll be in touch') ||
                               fullResponse.toLowerCase().includes('next steps')) && !isAskingForEmail;
          
          if (isConcluding) {
            const qualificationScore = await analyzeQualification(messages, fullResponse);
            
            // Store qualification score
            const { error: scoreError } = await supabase
              .from('qualification_scores')
              .insert({
                conversation_id: conversationId,
                score: qualificationScore.score,
                business_experience_score: qualificationScore.signals?.business_experience || 0,
                financial_readiness_score: qualificationScore.signals?.financial_readiness || 0,
                commitment_level_score: qualificationScore.signals?.commitment_level || 0,
                program_fit_score: qualificationScore.signals?.program_fit || 0,
                notes: qualificationScore.notes,
                should_advance: qualificationScore.shouldAdvance,
              });

            if (scoreError) {
              console.error('Error storing qualification score:', scoreError);
            }

            // Update application status
            const status = qualificationScore.shouldAdvance ? 'qualified' : 'rejected';
            const { error: statusError } = await supabase
              .from('applications')
              .update({
                status,
                qualification_score: qualificationScore.score,
                qualification_notes: qualificationScore.notes,
              })
              .eq('conversation_id', conversationId);

            if (statusError) {
              console.error('Error updating application status:', statusError);
            }

            // Send automated email if we have email
            if (extractedInfo.email) {
              try {
                // Import Resend at the top of the function
                const { Resend } = await import('resend');
                const resend = new Resend(process.env.RESEND_API_KEY);
                
                // Import email templates
                const { QualifiedLeadEmail } = await import('@/emails/qualified-lead');
                const { NotQualifiedEmail } = await import('@/emails/not-qualified');
                
                const emailName = extractedInfo.name || 'there';
                const isQualified = qualificationScore.shouldAdvance;
                
                let emailResult;
                if (isQualified) {
                  const calendarLink = process.env.NEXT_PUBLIC_CALENDAR_LINK || 'https://calendly.com/apex-operations/discovery';
                  emailResult = await resend.emails.send({
                    from: 'APEX Operations <apex@remoteops.ai>',
                    to: extractedInfo.email,
                    subject: 'Congratulations - You\'ve Been Selected for APEX Operations',
                    react: QualifiedLeadEmail({ 
                      name: emailName, 
                      score: qualificationScore.score, 
                      calendarLink 
                    }),
                  });
                } else {
                  emailResult = await resend.emails.send({
                    from: 'APEX Operations <apex@remoteops.ai>',
                    to: extractedInfo.email,
                    subject: 'Thank You for Your Interest in APEX Operations',
                    react: NotQualifiedEmail({ 
                      name: emailName, 
                      score: qualificationScore.score 
                    }),
                  });
                }
                
                console.log('Email sent successfully:', emailResult);
                emailSent = true;
              } catch (emailError) {
                console.error('Error sending email:', emailError);
              }
            }
          }

        } catch (error) {
          console.error('Stream error:', error);
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'x-conversation-id': conversationId,
        'x-email-sent': emailSent ? 'true' : 'false',
      },
    });
  } catch (error) {
    console.error('Sales agent error:', error);
    return new Response('An error occurred during the conversation', { 
      status: 500,
    });
  }
}

// Extract application information from conversation
async function extractApplicationInfo(messages: any[], latestResponse: string) {
  const conversationText = messages.map(m => `${m.role}: ${m.content}`).join('\n') + `\nassistant: ${latestResponse}`;
  
  try {
    const extraction = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `Extract application information from this conversation. Return a JSON object with only the fields that were clearly provided:
          - email: string (if provided)
          - name: string (if provided)
          - phone: string (if provided)
          - location: string (if provided)
          - current_business: string (if mentioned)
          - current_revenue: string (if mentioned)
          - business_experience: string (summary of experience mentioned)
          
          Only include fields where information was explicitly provided. Return empty object {} if no clear information.`,
        },
        {
          role: 'user',
          content: conversationText,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.1,
      max_tokens: 200,
    });

    const result = JSON.parse(extraction.choices[0].message.content || '{}');
    return result;
  } catch (error) {
    console.error('Information extraction error:', error);
    return {};
  }
}

// Analyze conversation for qualification signals
async function analyzeQualification(messages: any[], latestResponse: string) {
  const conversationText = messages.map(m => `${m.role}: ${m.content}`).join('\n') + `\nassistant: ${latestResponse}`;
  
  try {
    const analysis = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `Analyze this sales conversation and score the lead's qualification from 0-100.
          
          Consider:
          - Business experience (0-25 points): Current business owner? Past ventures? Understanding of systems?
          - Financial readiness (0-25 points): Mentioned investments? Current revenue? Financial language used?
          - Commitment level (0-25 points): Time availability? Urgency? Implementation mindset?
          - Program fit (0-25 points): Location independence desire? Growth mindset? Coachability?
          
          Return a JSON object with:
          - score: number (0-100)
          - shouldAdvance: boolean (true if score > 70)
          - notes: string (brief qualification summary)
          - signals: object with the 4 categories and their scores`,
        },
        {
          role: 'user',
          content: conversationText,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
      max_tokens: 300,
    });

    const result = JSON.parse(analysis.choices[0].message.content || '{}');
    return result;
  } catch (error) {
    console.error('Qualification analysis error:', error);
    return {
      score: 0,
      shouldAdvance: false,
      notes: 'Analysis failed',
      signals: {},
    };
  }
}