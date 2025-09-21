import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendVideoPurchaseEmail, sendWelcomeEmailToVideoBuyer } from '@/lib/email/video-emails';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export async function GET(request: NextRequest) {
  console.log('=== CHECKOUT SUCCESS ROUTE CALLED ===');
  console.log('URL:', request.url);
  
  const searchParams = request.nextUrl.searchParams;
  const sessionId = searchParams.get('session_id');
  
  // Try to get email from URL params first (if passed)
  let email = searchParams.get('email');
  console.log('Email from URL:', email);
  console.log('Session ID:', sessionId);
  
  // If we have a session_id, retrieve the customer data from Stripe
  if (sessionId && !email) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      console.log('Stripe session retrieved:', session.customer_email, session.payment_status);
      
      if (session.payment_status === 'paid' && session.customer_email) {
        email = session.customer_email;
      }
    } catch (error) {
      console.error('Failed to retrieve Stripe session:', error);
    }
  }
  
  // If we still don't have an email, try the client-side approach
  if (!email) {
    // Return a client-side page that reads localStorage and redirects with email
    return new NextResponse(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Completing Your Purchase...</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              margin: 0;
              background: #000;
              color: white;
            }
            .container {
              text-align: center;
            }
            .spinner {
              width: 50px;
              height: 50px;
              margin: 0 auto 20px;
              border: 3px solid rgba(255,255,255,0.1);
              border-top-color: #3b82f6;
              border-radius: 50%;
              animation: spin 1s linear infinite;
            }
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
            h1 {
              font-size: 1.5rem;
              margin-bottom: 0.5rem;
            }
            p {
              color: #9ca3af;
            }
          </style>
          <script>
            // Get the stored email from localStorage
            const videoBuyerData = localStorage.getItem('videoBuyerData');
            const urlParams = new URLSearchParams(window.location.search);
            const sessionId = urlParams.get('session_id');
            
            if (videoBuyerData) {
              const data = JSON.parse(videoBuyerData);
              const email = data.email;
              if (email) {
                // Redirect with both email and session_id in the URL
                let redirectUrl = '/checkout/success?email=' + encodeURIComponent(email);
                if (sessionId) {
                  redirectUrl += '&session_id=' + encodeURIComponent(sessionId);
                }
                window.location.href = redirectUrl;
              } else {
                // No email stored, redirect to sign-in
                window.location.href = '/auth/sign-in?success=payment_complete';
              }
            } else {
              // No data stored, redirect to sign-in
              window.location.href = '/auth/sign-in?success=payment_complete';
            }
          </script>
        </head>
        <body>
          <div class="container">
            <div class="spinner"></div>
            <h1>Setting up your account...</h1>
            <p>Please wait while we prepare your Blueprint access</p>
          </div>
        </body>
      </html>
    `, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    });
  }

  try {
    console.log('Processing checkout success for email:', email);
    
    // Create admin client for database operations
    const adminSupabase = await createAdminClient();
    
    // Check if user already exists
    const { data: existingUsers } = await adminSupabase.auth.admin.listUsers();
    const existingUser = existingUsers?.users?.find(u => u.email === email);
    
    let userId: string;
    let isNewUser = false;
    
    if (!existingUser) {
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
      userId = existingUser.id;
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
    console.log('About to send email to:', email, 'isNewUser:', isNewUser);
    
    if (isNewUser) {
      // Send email with sign-in instructions
      console.log('Sending welcome email to new video buyer:', email);
      const emailResult = await sendWelcomeEmailToVideoBuyer(email);
      console.log('Welcome email result:', emailResult);
    } else {
      // Send purchase confirmation only
      console.log('Sending purchase email to existing user:', email);
      const emailResult = await sendVideoPurchaseEmail(email);
      console.log('Purchase email result:', emailResult);
    }
    
    // Instead of magic link, let's just create a session directly
    // Since we're using admin client, we can generate a session for the user
    console.log('Creating session for user:', userId);
    
    // Create a new session for the user
    const { data: session, error: sessionError } = await adminSupabase.auth.admin.generateLink({
      type: 'magiclink',
      email,
      options: {
        redirectTo: '/dashboard',
      }
    });
    
    if (sessionError) {
      console.error('Session creation error:', sessionError);
    }
    
    // For now, let's use a simpler approach - redirect to sign-in with success message
    // The user will use Google OAuth which is smoother
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