import { NextResponse } from 'next/server';
import { loops } from '@/lib/loops/client';

export async function POST(request: Request) {
  const { email, action, firstName } = await request.json();
  
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
  }
  
  console.log('=== TESTING LOOPS INTEGRATION ===');
  console.log('Email:', email);
  console.log('Action:', action);
  
  try {
    let result;
    
    switch (action) {
      case 'capture_lead':
        // Simulate lead capture - starts nurture sequence
        result = await loops.startLeadNurture(email, firstName);
        break;
        
      case 'mark_customer':
        // Simulate purchase - marks as customer
        result = await loops.markAsCustomer(email, 'blueprint');
        break;
        
      case 'create_contact':
        // Just create/update contact without triggering events
        result = await loops.createOrUpdateContact({
          email,
          firstName,
          userGroup: 'lead',
          source: 'test',
        });
        break;
        
      case 'send_event':
        // Send a custom event
        result = await loops.sendEvent({
          email,
          eventName: 'test_event',
          eventProperties: {
            test: true,
            timestamp: new Date().toISOString(),
          }
        });
        break;
        
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
    
    console.log('Loops result:', result);
    
    return NextResponse.json({
      success: result.success,
      action,
      email,
      result,
      message: `Check Loops dashboard to confirm ${action} worked`
    });
    
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({
      success: false,
      error: error?.message || String(error),
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'POST to this endpoint with:',
    requiredFields: {
      email: 'email address',
      action: 'capture_lead | mark_customer | create_contact | send_event',
      firstName: '(optional) first name'
    },
    example: {
      email: 'test@example.com',
      action: 'capture_lead',
      firstName: 'John'
    }
  });
}