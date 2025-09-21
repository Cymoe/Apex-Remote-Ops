import { createClient } from '@/lib/supabase/client';

export type UserPurchaseType = 'full_program' | 'video_only' | 'none';

export interface UserAccess {
  purchaseType: UserPurchaseType;
  hasFullAccess: boolean;
  hasVideoAccess: boolean;
  creditAmount: number;
  isUpgradeEligible: boolean;
}

// Client-side version (for client components)
export async function getUserAccessClient(email?: string | null): Promise<UserAccess> {
  if (!email) {
    return {
      purchaseType: 'none',
      hasFullAccess: false,
      hasVideoAccess: false,
      creditAmount: 0,
      isUpgradeEligible: false,
    };
  }

  const supabase = createClient();
  
  // Check purchases table for user's purchase type
  const { data: purchases } = await supabase
    .from('purchases')
    .select('*')
    .eq('user_email', email)
    .eq('status', 'completed')
    .order('created_at', { ascending: false });

  if (!purchases || purchases.length === 0) {
    return {
      purchaseType: 'none',
      hasFullAccess: false,
      hasVideoAccess: false,
      creditAmount: 0,
      isUpgradeEligible: false,
    };
  }

  // Check for full program purchase
  const fullProgramPurchase = purchases.find(p => p.product_type === 'program');
  if (fullProgramPurchase) {
    return {
      purchaseType: 'full_program',
      hasFullAccess: true,
      hasVideoAccess: true,
      creditAmount: 0,
      isUpgradeEligible: false,
    };
  }

  // Check for video purchase
  const videoPurchase = purchases.find(p => p.product_type === 'video');
  if (videoPurchase) {
    return {
      purchaseType: 'video_only',
      hasFullAccess: false,
      hasVideoAccess: true,
      creditAmount: videoPurchase.amount || 497,
      isUpgradeEligible: true,
    };
  }

  // Check for upgrade purchase (video buyer who upgraded)
  const upgradePurchase = purchases.find(p => p.product_type === 'upgrade');
  if (upgradePurchase) {
    return {
      purchaseType: 'full_program',
      hasFullAccess: true,
      hasVideoAccess: true,
      creditAmount: 0,
      isUpgradeEligible: false,
    };
  }

  return {
    purchaseType: 'none',
    hasFullAccess: false,
    hasVideoAccess: false,
    creditAmount: 0,
    isUpgradeEligible: false,
  };
}