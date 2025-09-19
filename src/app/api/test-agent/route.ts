import { NextRequest, NextResponse } from 'next/server';

const AGENT_SERVICE_URL = process.env.AGENT_SERVICE_URL || 'http://localhost:8000';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('🚀 Test: Calling Python service at:', AGENT_SERVICE_URL);
    
    const response = await fetch(`${AGENT_SERVICE_URL}/conversation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversation_id: 'test-123',
        message: body.message || 'Hello!',
        current_stage: 'greeting'
      })
    });

    console.log('✅ Python service response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`Python service error: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Python service result:', result);

    return NextResponse.json({
      success: true,
      python_response: result.response,
      stage: result.current_stage,
      agent: result.agent_used
    });

  } catch (error) {
    console.error('❌ Test API error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      fallback: 'Python service connection failed'
    }, { status: 500 });
  }
}