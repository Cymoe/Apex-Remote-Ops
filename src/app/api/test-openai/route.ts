import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function GET() {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ error: 'No API key found' }, { status: 500 });
    }
    
    const openai = new OpenAI({
      apiKey: apiKey,
    });
    
    // Simple test
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Say hello' }],
      max_tokens: 10,
    });
    
    return NextResponse.json({ 
      success: true, 
      message: completion.choices[0].message.content,
      keyPresent: !!apiKey,
      keyLength: apiKey.length,
    });
  } catch (error) {
    console.error('OpenAI test error:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      keyPresent: !!process.env.OPENAI_API_KEY,
    }, { status: 500 });
  }
}