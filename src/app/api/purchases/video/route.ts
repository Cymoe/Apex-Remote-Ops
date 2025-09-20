import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, amount, product } = body;

    const supabase = await createClient();

    // Create purchase record
    const { data: purchase, error } = await supabase
      .from('purchases')
      .insert({
        user_email: email,
        first_name: firstName,
        last_name: lastName,
        product_type: 'video',
        amount: amount || 497,
        territory: null,  // Video purchase doesn't require territory
        status: 'completed', // In production, this would be 'pending' until Stripe confirms
        metadata: {
          product_name: product || '20-minute-blueprint',
          source: 'landing-page',
          whatsapp_group_link: process.env.NEXT_PUBLIC_WHATSAPP_GROUP_LINK || 'https://chat.whatsapp.com/',
          includes_whatsapp_access: true
        }
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating purchase:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to record purchase' },
        { status: 500 }
      );
    }

    // Also update applications table if user has an existing application
    await supabase
      .from('applications')
      .update({
        is_video_buyer: true,
        video_purchased_at: new Date().toISOString(),
        upgrade_eligible: true,
        purchase_type: 'video',
        metadata: {
          whatsapp_group_invited: true
        }
      })
      .eq('email', email);

    return NextResponse.json({
      success: true,
      purchaseId: purchase.id,
      message: 'Purchase recorded successfully'
    });

  } catch (error) {
    console.error('Purchase API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}