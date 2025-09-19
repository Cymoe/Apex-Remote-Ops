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

    // Check if user has purchased the video
    const { data: purchase, error } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_email', email)
      .eq('product_type', 'video')
      .eq('status', 'completed')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
      console.error('Error checking video buyer status:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to check purchase status' },
        { status: 500 }
      );
    }

    if (purchase) {
      return NextResponse.json({
        success: true,
        isVideoBuyer: true,
        purchaseData: {
          firstName: purchase.first_name,
          lastName: purchase.last_name,
          email: purchase.user_email,
          territory: purchase.territory,
          amount: purchase.amount,
          purchasedAt: purchase.created_at,
          creditAvailable: purchase.amount // They get $497 credit toward full program
        }
      });
    }

    return NextResponse.json({
      success: true,
      isVideoBuyer: false
    });

  } catch (error) {
    console.error('Error in check-video-buyer:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}