import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Use onboarding@resend.dev for testing if domain not verified
// Change to 'Myles from APEX <myles@remoteops.ai>' once domain is verified in Resend
const FROM_EMAIL = 'Myles from APEX <onboarding@resend.dev>';
const SUPPORT_EMAIL = 'support@remoteops.ai';

interface VideoEmailData {
  email: string;
  firstName?: string;
  videoUrl?: string;
  whatsappLink?: string;
}

// Send welcome email when someone enters email (step 1)
export async function sendVideoWelcomeEmail(data: VideoEmailData) {
  const { email } = data;
  
  console.log('sendVideoWelcomeEmail called with:', email);
  console.log('FROM_EMAIL:', FROM_EMAIL);
  console.log('Resend API key exists:', !!process.env.RESEND_API_KEY);
  
  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      replyTo: SUPPORT_EMAIL,
      subject: '🎯 Your $497 Blueprint is waiting (save your spot)',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            
            <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 20px;">
              Your $497 Video Blueprint is Almost Yours!
            </h1>
            
            <p style="font-size: 16px; color: #555; margin-bottom: 20px;">
              Hey there,
            </p>
            
            <p style="font-size: 16px; color: #555; margin-bottom: 20px;">
              Good news - I've held your spot for the special $497 price (normally $997).
            </p>
            
            <div style="background: #fffbeb; border-left: 4px solid #fbbf24; padding: 15px; margin: 20px 0; border-radius: 5px;">
              <p style="margin: 0; font-weight: bold; color: #92400e;">
                ⚠️ Important: Only 13 spots left at this price
              </p>
              <p style="margin: 5px 0 0 0; color: #78350f; font-size: 14px;">
                Once they're gone, the price goes back to $997
              </p>
            </div>
            
            <p style="font-size: 16px; color: #555; margin-bottom: 20px;">
              <strong>What you're getting for $497:</strong>
            </p>
            
            <ul style="font-size: 15px; color: #555; margin-bottom: 25px; padding-left: 20px;">
              <li style="margin-bottom: 10px;">The complete 20-minute blueprint video</li>
              <li style="margin-bottom: 10px;">WhatsApp community access (real operators)</li>
              <li style="margin-bottom: 10px;">Crew hiring scripts & templates</li>
              <li style="margin-bottom: 10px;">Pricing calculator for 60% margins</li>
              <li style="margin-bottom: 10px;">30-day money-back guarantee</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://remoteops.ai/lp/operator-497" style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; text-decoration: none; padding: 15px 40px; border-radius: 8px; font-weight: bold; font-size: 16px;">
                Complete Your Purchase →
              </a>
            </div>
            
            <p style="font-size: 14px; color: #777; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
              <strong>Quick note:</strong> Most operators make their $497 back in their first deal. 
              The average deal size is $3,500, and you keep $1,400-$2,100.
            </p>
            
            <p style="font-size: 14px; color: #777; margin-top: 20px;">
              Ready when you are,<br>
              <strong>Myles Webb</strong><br>
              Founder, APEX Remote Operations
            </p>
            
            <p style="font-size: 12px; color: #999; margin-top: 30px; text-align: center;">
              Questions? Reply to this email or reach out to ${SUPPORT_EMAIL}
            </p>
          </div>
        </body>
        </html>
      `
    });
    
    console.log('Email sent successfully:', result.data);
    return { success: true, id: result.data?.id };
  } catch (error: any) {
    console.error('Failed to send welcome email:', error);
    console.error('Error details:', error?.message || error);
    return { success: false, error: error?.message || String(error) };
  }
}

// Send purchase confirmation with video access
export async function sendWelcomeEmailToVideoBuyer(email: string) {
  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      replyTo: SUPPORT_EMAIL,
      subject: '🎉 Welcome! Sign in to access your Blueprint',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            
            <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 20px;">
              Welcome to APEX! Your Blueprint is Ready 🚀
            </h1>
            
            <p style="font-size: 16px; color: #555; margin-bottom: 20px;">
              Thank you for your purchase! We've created your account and your 20-Minute Blueprint is ready to watch.
            </p>
            
            <div style="background: #f0fdf4; border: 2px solid #22c55e; padding: 20px; margin: 25px 0; border-radius: 8px;">
              <h2 style="color: #15803d; font-size: 18px; margin: 0 0 15px 0;">
                📹 Access Your Blueprint
              </h2>
              <p style="margin: 0 0 15px 0; color: #166534;">
                Sign in with your Google account to access:
              </p>
              <ul style="margin: 10px 0; padding-left: 20px; color: #166534;">
                <li>Your 20-minute blueprint video</li>
                <li>Downloadable resources and templates</li>
                <li>WhatsApp community access</li>
                <li>Special upgrade opportunities</li>
              </ul>
              <div style="text-align: center;">
                <a href="https://remoteops.ai/auth/sign-in" style="display: inline-block; background: #22c55e; color: white; text-decoration: none; padding: 12px 30px; border-radius: 6px; font-weight: bold;">
                  Sign In to Get Started →
                </a>
              </div>
            </div>
            
            <p style="font-size: 14px; color: #777; margin-top: 30px;">
              Simply click the button above and sign in with Google. Your purchase has been linked to this email address.
            </p>
            
            <p style="font-size: 14px; color: #777; margin-top: 20px;">
              Let's build something amazing,<br>
              <strong>Myles Webb</strong><br>
              Founder, APEX Remote Operations
            </p>
            
            <p style="font-size: 12px; color: #999; margin-top: 30px; text-align: center;">
              Need help? Reply to this email or reach out to ${SUPPORT_EMAIL}
            </p>
          </div>
        </body>
        </html>
      `
    });
    
    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error('Failed to send welcome email to video buyer:', error);
    return { success: false, error };
  }
}

export async function sendVideoPurchaseEmail(email: string) {
  const videoUrl = 'https://remoteops.ai/dashboard';
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_GROUP_LINK || '#';
  
  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      replyTo: SUPPORT_EMAIL,
      subject: '🎉 Welcome back! Your Blueprint is ready',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            
            <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 20px;">
              Your Blueprint Purchase is Complete! 🚀
            </h1>
            
            <p style="font-size: 16px; color: #555; margin-bottom: 20px;">
              Congrats on making a smart investment. You just saved $500 and got everything you need to build a $30K/month remote service business.
            </p>
            
            <div style="background: #f0fdf4; border: 2px solid #22c55e; padding: 20px; margin: 25px 0; border-radius: 8px;">
              <h2 style="color: #15803d; font-size: 18px; margin: 0 0 15px 0;">
                📹 Step 1: Watch Your 20-Minute Blueprint
              </h2>
              <p style="margin: 0 0 15px 0; color: #166534;">
                This video contains EVERYTHING. Watch it with a notebook ready:
              </p>
              <div style="text-align: center;">
                <a href="${videoLink}" style="display: inline-block; background: #22c55e; color: white; text-decoration: none; padding: 12px 30px; border-radius: 6px; font-weight: bold;">
                  Watch The Blueprint Now →
                </a>
              </div>
            </div>
            
            <div style="background: #fef3c7; border: 2px solid #fbbf24; padding: 20px; margin: 25px 0; border-radius: 8px;">
              <h2 style="color: #92400e; font-size: 18px; margin: 0 0 15px 0;">
                💬 Step 2: Join The WhatsApp Community
              </h2>
              <p style="margin: 0 0 15px 0; color: #78350f;">
                Connect with operators who are already doing this:
              </p>
              <div style="text-align: center;">
                <a href="${whatsapp}" style="display: inline-block; background: #25D366; color: white; text-decoration: none; padding: 12px 30px; border-radius: 6px; font-weight: bold;">
                  Join WhatsApp Group →
                </a>
              </div>
              <p style="margin: 10px 0 0 0; font-size: 13px; color: #92400e; text-align: center;">
                Real operators sharing what's working NOW
              </p>
            </div>
            
            <div style="background: #f9fafb; padding: 20px; margin: 25px 0; border-radius: 8px; border: 1px solid #e5e7eb;">
              <h3 style="color: #1f2937; font-size: 16px; margin: 0 0 10px 0;">
                What Happens Next:
              </h3>
              <ol style="margin: 0; padding-left: 20px; color: #4b5563;">
                <li style="margin-bottom: 8px;">Watch the 20-minute video (take notes!)</li>
                <li style="margin-bottom: 8px;">Join the WhatsApp group</li>
                <li style="margin-bottom: 8px;">Pick ONE service to start with</li>
                <li style="margin-bottom: 8px;">Use the scripts to find your first crew</li>
                <li style="margin-bottom: 8px;">Land your first client (avg time: 30 days)</li>
              </ol>
            </div>
            
            <p style="font-size: 14px; color: #777; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
              <strong>Remember:</strong> You have a 30-day money-back guarantee. If you don't see a clear path to $10K/month after watching and implementing, just email me for a full refund.
            </p>
            
            <p style="font-size: 14px; color: #777; margin-top: 20px;">
              Let's build something amazing,<br>
              <strong>Myles Webb</strong><br>
              Founder, APEX Remote Operations
            </p>
            
            <p style="font-size: 12px; color: #999; margin-top: 30px; text-align: center;">
              Need help? Reply to this email or reach out to ${SUPPORT_EMAIL}<br>
              <a href="https://remoteops.ai/disclaimer" style="color: #999;">Earnings Disclaimer</a> | 
              <a href="https://remoteops.ai/terms" style="color: #999;">Terms</a>
            </p>
          </div>
        </body>
        </html>
      `
    });
    
    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error('Failed to send purchase email:', error);
    return { success: false, error };
  }
}