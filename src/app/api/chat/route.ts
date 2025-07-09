import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: NextRequest) {
  try {
    // Initialize OpenAI inside the function to avoid build-time errors
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || '',
    });
    const supabase = createClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { messages, conversationId } = await req.json();

    // Get or create conversation
    let conversation;
    if (conversationId) {
      const { data } = await supabase
        .from('conversations')
        .select('*')
        .eq('id', conversationId)
        .eq('user_id', user.id)
        .single();
      conversation = data;
    } else {
      const { data, error } = await supabase
        .from('conversations')
        .insert({
          user_id: user.id,
          title: messages[0]?.content?.substring(0, 50) || 'New Chat',
        })
        .select()
        .single();
      
      if (error) throw error;
      conversation = data;
    }

    // Get last user message
    const lastUserMessage = messages[messages.length - 1].content;

    // Skip RAG for now - vector extension not enabled
    const context = null;

    // Create system message with context
    const systemMessage = {
      role: 'system',
      content: `You are Apex, an AI assistant specializing in remote operations and strategic planning. You help users with operational excellence, team management, and strategic decision-making.
      
${context ? `Here is relevant context from the knowledge base:\n${context}` : ''}

Provide helpful, accurate, and actionable advice. Be concise but thorough.`,
    };

    // Save user message
    await supabase.from('messages').insert({
      conversation_id: conversation.id,
      role: 'user',
      content: lastUserMessage,
    });

    // Call OpenAI without streaming for now
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      stream: false,
    });

    const assistantMessage = response.choices[0]?.message?.content || '';

    // Save assistant message
    await supabase.from('messages').insert({
      conversation_id: conversation.id,
      role: 'assistant',
      content: assistantMessage,
    });

    return NextResponse.json({
      message: assistantMessage,
      conversationId: conversation.id,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}