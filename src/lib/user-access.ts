import { createClient } from '@/lib/supabase/server';
import { createClient as createClientBrowser } from '@/lib/supabase/client';

export type UserPurchaseType = 'full_program' | 'video_only' | 'none';

export interface UserAccess {
  purchaseType: UserPurchaseType;
  hasFullAccess: boolean;
  hasVideoAccess: boolean;
  creditAmount: number;
  isUpgradeEligible: boolean;
}

// Server-side version (for server components)
export async function getUserAccess(email?: string | null): Promise<UserAccess> {
  if (!email) {
    return {
      purchaseType: 'none',
      hasFullAccess: false,
      hasVideoAccess: false,
      creditAmount: 0,
      isUpgradeEligible: false,
    };
  }

  const supabase = await createClient();
  
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

  const supabase = createClientBrowser();
  
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

export async function canAccessCourse(email: string | null, courseSlug: string): Promise<boolean> {
  if (!email) return false;
  
  const access = await getUserAccess(email);
  
  // Full program users can access everything
  if (access.hasFullAccess) return true;
  
  // Video buyers can only access the blueprint course
  if (access.hasVideoAccess && courseSlug === 'blueprint-video') return true;
  
  return false;
}

export async function getAccessibleCourses(email: string | null): Promise<string[]> {
  if (!email) return [];
  
  const access = await getUserAccess(email);
  
  if (access.hasFullAccess) {
    // Return all course slugs except blueprint (or include it)
    const supabase = await createClient();
    const { data: courses } = await supabase
      .from('courses')
      .select('slug')
      .eq('is_published', true);
    
    return courses?.map(c => c.slug) || [];
  }
  
  if (access.hasVideoAccess) {
    return ['blueprint-video'];
  }
  
  return [];
}

export async function getUpgradeCredit(email: string | null): Promise<number> {
  if (!email) return 0;
  
  const access = await getUserAccess(email);
  return access.creditAmount;
}