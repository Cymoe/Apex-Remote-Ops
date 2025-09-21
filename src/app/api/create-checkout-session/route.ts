import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(request: NextRequest) {
  try {
    const { email, fullName } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: '20-Minute Blueprint Video',
              description: 'Complete blueprint for building a $30K+/month remote operations business',
              images: ['https://www.remoteops.ai/logo.png'], // Update with your actual logo
            },
            unit_amount: 49700, // $497.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.headers.get('origin') || 'https://www.remoteops.ai'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin') || 'https://www.remoteops.ai'}/checkout`,
      customer_email: email,
      metadata: {
        fullName: fullName || '',
        productType: 'video_blueprint',
      },
      payment_intent_data: {
        metadata: {
          email,
          fullName: fullName || '',
          productType: 'video_blueprint',
        },
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Stripe session creation error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}