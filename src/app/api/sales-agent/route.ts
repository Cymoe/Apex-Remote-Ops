import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendApplicationReceivedEmail } from '@/lib/email/service';

// Agent types for fallback logic only
enum AgentType {
  LEAD_INTAKE = 'lead_intake',
  QUALIFICATION = 'qualification'
}

// Python Agent Service Configuration
const AGENT_SERVICE_URL = process.env.AGENT_SERVICE_URL || 'http://127.0.0.1:8000';

// Conversation stages - synced with CrewAI Knowledge Graph backend
enum Stage {
  GREETING = 'greeting',
  COLLECTING_NAME = 'collecting_name',
  COLLECTING_EMAIL = 'collecting_email',
  EXPERIENCE_CHECK = 'experience_check',
  MOTIVATION_CHECK = 'motivation_check',
  TIMELINE_CHECK = 'timeline_check',
  COMPLETE = 'complete'
}

// Fallback agent logic when Python service is unavailable
async function generateFallbackResponse(currentStage: Stage): Promise<string> {
  const responses: Record<Stage, string> = {
    [Stage.GREETING]: "I work with 7-figure operators scaling location-independent empires. What's driving you to explore this right now?",
    [Stage.COLLECTING_NAME]: "What's your name?",
    [Stage.COLLECTING_EMAIL]: "Email for assessment details?",
    [Stage.EXPERIENCE_CHECK]: "What specific business challenge are you facing?",
    [Stage.MOTIVATION_CHECK]: "Are you ready to make a significant investment in your business?",
    [Stage.TIMELINE_CHECK]: "How quickly are you looking to implement these changes?",
    [Stage.COMPLETE]: "Assessment complete."
  };
  
  return responses[currentStage] || responses[Stage.GREETING];
}

export async function POST(req: NextRequest) {
  try {
    const { messages, leadContext } = await req.json();
    const conversationId = req.headers.get('x-conversation-id') || crypto.randomUUID();
    const supabase = createClient();
    
    // Get last user message
    const lastUserMessage = messages[messages.length - 1];
    
    // Load existing conversation state from database
    const { data: existingApp } = await supabase
      .from('applications')
      .select('*')
      .eq('conversation_id', conversationId)
      .single();
    

    // Call Python Agent Service
    console.log('🚀 Calling Python Agent Service at:', AGENT_SERVICE_URL);
    console.log('📋 Sending to Python service:', {
      conversation_id: conversationId,
      message: lastUserMessage.content,
      current_stage: existingApp?.stage || Stage.GREETING,
      has_existing_app: !!existingApp
    });
    
    let agentResult;
    try {
      const agentResponse = await fetch(`${AGENT_SERVICE_URL}/conversation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversation_id: conversationId,
          message: lastUserMessage.content,
          current_stage: existingApp?.stage || Stage.GREETING,
          current_state: null,
          lead_context: leadContext,
          messages: messages.map((m: any) => ({ role: m.role, content: m.content }))
        })
      });

      console.log('🔍 Python service response status:', agentResponse.status);

      if (!agentResponse.ok) {
        const errorText = await agentResponse.text();
        console.error('❌ Agent service error:', agentResponse.status, errorText);
        throw new Error(`Agent service error: ${agentResponse.status} - ${errorText}`);
      }

      agentResult = await agentResponse.json();
      console.log('✅ Agent response received:', agentResult);
      
    } catch (fetchError) {
      console.error('❌ Python service connection failed:', fetchError);
      console.error('❌ Error details:', fetchError instanceof Error ? fetchError.message : 'Unknown error');
      console.error('❌ Service URL:', AGENT_SERVICE_URL);
      // Use fallback agent logic
      agentResult = {
        response: await generateFallbackResponse(existingApp?.stage || Stage.GREETING),
        current_stage: existingApp?.stage || Stage.GREETING,
        agent_used: AgentType.LEAD_INTAKE,
        state_updates: {},
        evasion_count: 0,
        low_effort_count: 0
      };
    }

    // Extract response data
    const {
      response: responseMessage,
      current_stage,
      state_updates,
      is_qualified,
      qualification_score,
      evasion_count,
      low_effort_count
    } = agentResult;

    // Determine if conversation is complete
    const isComplete = current_stage === 'complete' || is_qualified !== null;

    // Update database with new state
    const dbUpdate: any = {
      conversation_id: conversationId,
      stage: current_stage,
      status: isComplete ? (is_qualified ? 'qualified' : 'rejected') : 'in_progress',
      last_message_at: new Date().toISOString(),
      message_count: messages.length,
    };

    // Apply state updates from agent
    if (state_updates) {
      if (state_updates.name) dbUpdate.name = state_updates.name;
      if (state_updates.email) dbUpdate.email = state_updates.email;
      if (state_updates.experience) dbUpdate.experience = state_updates.experience;
      if (state_updates.why_location_independence) dbUpdate.why_location_independence = state_updates.why_location_independence;
      if (state_updates.current_situation) dbUpdate.current_situation = state_updates.current_situation;
      if (state_updates.biggest_challenge) dbUpdate.biggest_challenge = state_updates.biggest_challenge;
      if (state_updates.budget) dbUpdate.budget = state_updates.budget;
      if (state_updates.budget_flexibility) dbUpdate.budget_flexibility = state_updates.budget_flexibility;
      if (state_updates.timeline) dbUpdate.timeline = state_updates.timeline;
      if (state_updates.urgency) dbUpdate.urgency_level = state_updates.urgency;
      if (state_updates.why_apex) dbUpdate.why_apex = state_updates.why_apex;
      if (state_updates.commitment) dbUpdate.commitment = state_updates.commitment;
    }

    // Update behavioral tracking
    if (typeof evasion_count === 'number') dbUpdate.evasion_count = evasion_count;
    if (typeof low_effort_count === 'number') dbUpdate.low_effort_count = low_effort_count;

    // Update qualification data if complete
    if (isComplete && typeof qualification_score === 'number') {
      dbUpdate.qualification_score = qualification_score;
      dbUpdate.qualification_notes = `Processed by Python agent service. Score: ${qualification_score}`;
    }

    // Save to database
    await supabase
      .from('applications')
      .upsert(dbUpdate);

    // Store conversation turn
    await supabase
      .from('application_conversations')
      .insert({
        conversation_id: conversationId,
        user_message: lastUserMessage.content,
        agent_response: responseMessage,
        message_count: messages.length,
      });

    // Send email when email is first collected
    if (dbUpdate.email && !existingApp?.email) {
      await sendApplicationReceivedEmail({
        to: dbUpdate.email,
        firstName: dbUpdate.name?.split(' ')[0],
        applicationId: conversationId,
      });
    }
    
    // Send qualification email if qualified (this would trigger approval/rejection emails)
    if (is_qualified && dbUpdate.email) {
      // This will be handled by admin dashboard or webhook
      console.log('Application qualified:', conversationId, 'Score:', qualification_score);
    }


    // Stream the response
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      start(controller) {
        // Send the message in streaming format
        const escapedText = responseMessage
          .replace(/\\/g, '\\\\')
          .replace(/"/g, '\\"')
          .replace(/\n/g, '\\n')
          .replace(/\r/g, '\\r')
          .replace(/\t/g, '\\t');
        
        controller.enqueue(encoder.encode(`0:"${escapedText}"\n`));
        controller.enqueue(encoder.encode(`0:""\n`));
        controller.close();
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'x-conversation-id': conversationId,
      },
    });
  } catch (error) {
    console.error('Sales agent error:', error);
    
    // Fallback response if Python service is down
    const fallbackMessage = "I'm experiencing some technical difficulties. Let me get back to you in a moment.";
    
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      start(controller) {
        const escapedText = fallbackMessage
          .replace(/\\/g, '\\\\')
          .replace(/"/g, '\\"')
          .replace(/\n/g, '\\n');
        
        controller.enqueue(encoder.encode(`0:"${escapedText}"\n`));
        controller.enqueue(encoder.encode(`0:""\n`));
        controller.close();
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  }
}


