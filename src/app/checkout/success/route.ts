import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendVideoPurchaseEmail, sendWelcomeEmailToVideoBuyer } from '@/lib/email/video-emails';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sessionId = searchParams.get('session_id');
  
  // For now, get email from localStorage data (saved during checkout)
  // In production, you'd retrieve this from Stripe using the session_id
  let email = searchParams.get('email');
  
  // If no email in URL, try to get from a default test email
  // In production, you would fetch this from Stripe API using session_id
  if (!email && sessionId) {
    // For testing, use a hardcoded email or retrieve from Stripe
    // You'll need to implement Stripe webhook or API call here
    email = '2mylescameron@gmail.com'; // Temporary for testing
  }
  
  if (!email) {
    return NextResponse.redirect(new URL('/auth/sign-in?success=payment_complete', request.url));
  }

  try {
    // Create admin client for database operations
    const adminSupabase = await createAdminClient();
    
    // Check if user already exists
    const { data: existingUser } = await adminSupabase.auth.admin.getUserByEmail(email);
    
    let userId: string;
    let isNewUser = false;
    
    if (!existingUser?.user) {
      // Create new user account for video buyer
      const { data: newUser, error: createError } = await adminSupabase.auth.admin.createUser({
        email,
        email_confirm: true, // Auto-confirm email since they paid
        user_metadata: {
          purchase_type: 'video',
        }
      });
      
      if (createError || !newUser.user) {
        console.error('Error creating user:', createError);
        return NextResponse.redirect(new URL('/checkout?error=user_creation_failed', request.url));
      }
      
      userId = newUser.user.id;
      isNewUser = true;
    } else {
      userId = existingUser.user.id;
    }
    
    // Record the purchase
    const { error: purchaseError } = await adminSupabase
      .from('purchases')
      .insert({
        user_email: email,
        product_type: 'video',
        amount: 497,
        status: 'completed',
        stripe_payment_id: sessionId || 'manual',
        metadata: {
          source: 'video_landing_page',
          created_at: new Date().toISOString(),
        }
      });
    
    if (purchaseError) {
      console.error('Error recording purchase:', purchaseError);
    }
    
    // Send appropriate email
    if (isNewUser) {
      // Send email with sign-in instructions
      await sendWelcomeEmailToVideoBuyer(email);
    } else {
      // Send purchase confirmation only
      await sendVideoPurchaseEmail(email);
    }
    
    // Generate magic link to automatically sign them in
    const { data: magicLink, error: magicLinkError } = await adminSupabase.auth.admin.generateLink({
      type: 'magiclink',
      email,
      options: {
        redirectTo: `${request.nextUrl.origin}/courses/blueprint-video`,
      }
    });
    
    if (magicLink && !magicLinkError) {
      // Extract the token from the magic link and redirect through auth callback
      // This will automatically sign them in and take them to their Blueprint
      const url = new URL(magicLink.properties.action_link);
      const token = url.searchParams.get('token');
      const type = url.searchParams.get('type');
      
      if (token && type) {
        // Redirect through auth callback to sign them in automatically
        return NextResponse.redirect(
          new URL(`/auth/callback?token=${token}&type=${type}&next=/courses/blueprint-video`, request.url)
        );
      }
    }
    
    // Fallback: If magic link generation fails, redirect to sign-in
    return NextResponse.redirect(
      new URL(`/auth/sign-in?success=video_purchased&email=${encodeURIComponent(email)}`, request.url)
    );
    
  } catch (error: any) {
    console.error('Checkout success error:', error);
    console.error('Error details:', error?.message || error);
    // For now, still redirect to sign-in even if there's an error
    // This way you can at least test the flow
    return NextResponse.redirect(
      new URL(`/auth/sign-in?success=video_purchased&email=${encodeURIComponent(email)}`, request.url)
    );
  }
}