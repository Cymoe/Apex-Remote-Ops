import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Check if user has an existing application
    const { data: application, error } = await supabase
      .from('applications')
      .select('*')
      .eq('email', email)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
      console.error('Error checking applicant status:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to check application status' },
        { status: 500 }
      );
    }

    if (application) {
      // Check if they're also a video buyer
      const { data: purchase } = await supabase
        .from('purchases')
        .select('*')
        .eq('user_email', email)
        .eq('product_type', 'video')
        .eq('status', 'completed')
        .single();

      return NextResponse.json({
        success: true,
        hasApplication: true,
        applicationData: {
          firstName: application.name?.split(' ')[0] || '',
          lastName: application.name?.split(' ')[1] || '',
          email: application.email,
          phone: application.phone,
          currentBusiness: application.current_business,
          currentRevenue: application.current_revenue,
          businessExperience: application.business_experience,
          location: application.location,
          status: application.status,
          createdAt: application.created_at,
          isVideoBuyer: !!purchase,
          videoPurchaseAmount: purchase?.amount || 0
        }
      });
    }

    return NextResponse.json({
      success: true,
      hasApplication: false
    });

  } catch (error) {
    console.error('Error in check-applicant:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}