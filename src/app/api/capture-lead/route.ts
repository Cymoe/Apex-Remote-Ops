import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  console.log('Lead capture API called');
  
  try {
    const body = await request.json();
    console.log('Request body:', body);
    const { email, source = 'two-step-form', metadata = {} } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Use service role key for server-side operations
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase credentials');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if lead already exists
    const { data: existingLead } = await supabase
      .from('leads')
      .select('id, email, interaction_count, metadata')
      .eq('email', email)
      .single();

    if (existingLead) {
      // Update existing lead
      const { error: updateError } = await supabase
        .from('leads')
        .update({
          last_interaction: new Date().toISOString(),
          interaction_count: (existingLead.interaction_count || 0) + 1,
          metadata: {
            ...existingLead.metadata,
            ...metadata,
            last_source: source
          }
        })
        .eq('id', existingLead.id);
        
      if (updateError) {
        console.error('Error updating lead:', updateError);
      }

      return NextResponse.json({
        success: true,
        message: 'Lead updated',
        isNew: false
      });
    }

    // Create new lead
    const { data: newLead, error } = await supabase
      .from('leads')
      .insert({
        email,
        source,
        status: 'captured',
        metadata: {
          ...metadata,
          captured_at: new Date().toISOString(),
          interested_in: 'video_blueprint'
        }
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating lead:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to save lead' },
        { status: 500 }
      );
    }

    // Add to Beehiiv for nurture sequences
    console.log('Adding lead to Beehiiv for nurture sequences...');
    try {
      const { beehiiv } = await import('@/lib/beehiiv/client');
      const beehiivResult = await beehiiv.addSubscriber({
        email,
        utm_source: source || 'website',
        utm_medium: 'lead_capture',
        utm_campaign: 'blueprint_video',
        custom_fields: {
          first_name: metadata?.firstName || '',
          source: source,
        }
      });
      console.log('Beehiiv result:', beehiivResult);
      
      // Tag them as a lead (not yet customer)
      if (beehiivResult.success) {
        const tagResult = await beehiiv.tagSubscriber(email, ['lead']);
        console.log('Tagged as lead:', tagResult);
      }
    } catch (beehiivError) {
      console.error('Failed to add to Beehiiv:', beehiivError);
      // Don't fail the request if Beehiiv fails
    }

    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
      isNew: true,
      leadId: newLead.id
    });

  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}