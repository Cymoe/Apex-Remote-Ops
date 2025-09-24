import { NextResponse } from 'next/server';
import { beehiiv } from '@/lib/beehiiv/client';

export async function GET() {
  console.log('=== TESTING TIER-BASED APPROACH ===');
  
  try {
    // Test 1: Add a lead (free tier)
    const leadEmail = `lead-tier-${Date.now()}@example.com`;
    console.log('\n1. Adding lead with free tier:', leadEmail);
    
    const leadResult = await beehiiv.addSubscriber({
      email: leadEmail,
      utm_source: 'test',
      utm_medium: 'api_test',
      utm_campaign: 'tier_test',
      isCustomer: false, // This sets tier to 'free'
      custom_fields: [
        { name: 'first_name', value: 'Test' },
        { name: 'role', value: 'lead' }
      ]
    });
    
    console.log('Lead result:', leadResult);
    
    // Test 2: Add a customer (premium tier)
    const customerEmail = `customer-tier-${Date.now()}@example.com`;
    console.log('\n2. Adding customer with premium tier:', customerEmail);
    
    const customerResult = await beehiiv.addSubscriber({
      email: customerEmail,
      utm_source: 'test',
      utm_medium: 'api_test',
      utm_campaign: 'tier_test',
      isCustomer: true, // This sets tier to 'premium'
      custom_fields: [
        { name: 'first_name', value: 'Customer' },
        { name: 'role', value: 'customer' }
      ]
    });
    
    console.log('Customer result:', customerResult);
    
    // Test 3: Verify tiers by fetching both subscribers
    const apiKey = process.env.BEEHIIV_API_KEY;
    const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
    
    if (leadResult.success && leadResult.id) {
      const leadFetch = await fetch(
        `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions/${leadResult.id}`,
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
          },
        }
      );
      
      const leadData = await leadFetch.json();
      console.log('\nFetched lead subscriber:', {
        email: leadData.data?.email,
        tier: leadData.data?.subscription_tier,
        premium_tiers: leadData.data?.subscription_premium_tier_names
      });
    }
    
    if (customerResult.success && customerResult.id) {
      const customerFetch = await fetch(
        `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions/${customerResult.id}`,
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
          },
        }
      );
      
      const customerData = await customerFetch.json();
      console.log('\nFetched customer subscriber:', {
        email: customerData.data?.email,
        tier: customerData.data?.subscription_tier,
        premium_tiers: customerData.data?.subscription_premium_tier_names
      });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Tier-based approach test complete',
      lead: {
        email: leadEmail,
        result: leadResult,
        expectedTier: 'free'
      },
      customer: {
        email: customerEmail,
        result: customerResult,
        expectedTier: 'premium'
      },
      note: 'Check console logs for full details'
    });
    
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({
      success: false,
      error: error?.message || String(error),
    });
  }
}