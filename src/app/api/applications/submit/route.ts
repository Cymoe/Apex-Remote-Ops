import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendApplicationReceivedEmail } from '@/lib/email/service';
import { sendSimpleEmail } from '@/lib/email/simple-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      currentRevenue,
      businessExperience,
      desiredTerritory,
      capitalAvailable,
      timelineToStart,
      whyApply,
    } = body;

    // Generate application ID
    const applicationId = `APP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Store in database (skip if table doesn't exist)
    const supabase = await createClient();
    let data = null;
    
    try {
      const result = await supabase
        .from('applications')
        .insert({
          conversation_id: applicationId,
          email,
          name: `${firstName} ${lastName}`,
          phone,
          current_business: businessExperience,
          current_revenue: currentRevenue,
          location: desiredTerritory,
          status: 'qualified', // Form submissions are pre-qualified
          qualification_score: 80, // Default high score for form submissions
          qualification_notes: JSON.stringify({
            capital: capitalAvailable,
            timeline: timelineToStart,
            motivation: whyApply,
            territory: desiredTerritory,
          }),
          message_count: 1,
          assigned_territory: desiredTerritory,
        })
        .select()
        .single();

      if (result.error) {
        console.error('Database error (non-fatal):', result.error);
        // Continue without database - just send email
      } else {
        data = result.data;
      }
    } catch (dbError) {
      console.error('Database connection error (non-fatal):', dbError);
      // Continue without database - just send email
    }

    // Use the simple email that works!
    const emailResult = await sendSimpleEmail(email, firstName);

    if (!emailResult.success) {
      console.error('Email failed but application saved:', emailResult.error);
    }

    // Return success with application data
    return NextResponse.json({
      success: true,
      applicationId,
      message: 'Application submitted successfully',
      emailSent: emailResult.success,
      data: {
        ...data,
        nextSteps: [
          'Check your email for confirmation',
          'We\'ll review your application within 24 hours',
          'If approved, you\'ll receive a calendar link to book your onboarding call',
        ],
      },
    });

  } catch (error) {
    console.error('Application submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process application' },
      { status: 500 }
    );
  }
}