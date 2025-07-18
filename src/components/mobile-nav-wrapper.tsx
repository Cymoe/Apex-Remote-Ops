import { createClient } from '@/lib/supabase/server';
import { MobileNav } from './mobile-nav';

export async function MobileNavWrapper() {
  let user = null;
  
  try {
    const supabase = await createClient();
    
    if (!supabase || !supabase.auth) {
      console.error('Supabase client not properly initialized');
    } else {
      const { data, error } = await supabase.auth.getUser();
      
      if (error) {
        console.error('Error fetching user:', error);
      } else {
        user = data?.user;
      }
    }
  } catch (error) {
    console.error('MobileNavWrapper component error:', error);
  }

  return <MobileNav user={user} />;
} 