import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { ProfileForm } from '@/components/profile/profile-form';

export default async function ProfilePage() {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/auth/sign-in');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Create a default profile object if none exists
  const profileData = profile || {
    id: user.id,
    email: user.email,
    username: '',
    full_name: '',
    bio: '',
    company: '',
    job_title: '',
    location: '',
    website: '',
    linkedin_url: '',
    twitter_url: '',
    email_notifications: true,
    marketing_emails: false,
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
      <div className="space-y-1 sm:space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-pure-white">Profile Settings</h1>
        <p className="text-sm sm:text-base text-medium-gray">Manage your profile information and preferences</p>
      </div>
      
      <ProfileForm profile={profileData} />
    </div>
  );
}