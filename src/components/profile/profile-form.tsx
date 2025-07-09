'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Loader2, Camera } from 'lucide-react';

interface ProfileFormProps {
  profile: any;
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: profile?.username || '',
    full_name: profile?.full_name || '',
    bio: profile?.bio || '',
    company: profile?.company || '',
    job_title: profile?.job_title || '',
    location: profile?.location || '',
    website: profile?.website || '',
    linkedin_url: profile?.linkedin_url || '',
    twitter_url: profile?.twitter_url || '',
    email_notifications: profile?.email_notifications ?? true,
    marketing_emails: profile?.marketing_emails ?? false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update(formData)
        .eq('id', profile.id);

      if (updateError) throw updateError;

      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${profile.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', profile.id);

      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Avatar Section */}
      <Card className="bg-carbon-black border-slate-gray">
        <CardHeader>
          <CardTitle className="text-pure-white">Profile Picture</CardTitle>
          <CardDescription className="text-medium-gray">
            Upload a profile picture to personalize your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
              <AvatarImage src={profile?.avatar_url} />
              <AvatarFallback className="bg-deep-black text-pure-white text-lg sm:text-xl">
                {formData.full_name?.charAt(0) || profile?.email?.charAt(0) || '?'}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleAvatarUpload}
                disabled={loading}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('avatar-upload')?.click()}
                disabled={loading}
                className="w-full sm:w-auto"
              >
                <Camera className="h-4 w-4 mr-2" />
                Change Avatar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card className="bg-carbon-black border-slate-gray">
        <CardHeader>
          <CardTitle className="text-pure-white">Basic Information</CardTitle>
          <CardDescription className="text-medium-gray">
            Update your profile information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-light-gray">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="johndoe"
                className="bg-deep-black border-slate-gray text-pure-white"
                pattern="^[a-z0-9_-]{3,30}$"
                title="Username must be 3-30 characters, lowercase letters, numbers, hyphens, and underscores only"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="full_name" className="text-light-gray">Full Name</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                placeholder="John Doe"
                className="bg-deep-black border-slate-gray text-pure-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio" className="text-light-gray">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Tell us about yourself..."
              className="bg-deep-black border-slate-gray text-pure-white resize-none"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company" className="text-light-gray">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Acme Inc."
                className="bg-deep-black border-slate-gray text-pure-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="job_title" className="text-light-gray">Job Title</Label>
              <Input
                id="job_title"
                value={formData.job_title}
                onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                placeholder="Remote Operations Manager"
                className="bg-deep-black border-slate-gray text-pure-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-light-gray">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="San Francisco, CA"
              className="bg-deep-black border-slate-gray text-pure-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card className="bg-carbon-black border-slate-gray">
        <CardHeader>
          <CardTitle className="text-pure-white">Social Links</CardTitle>
          <CardDescription className="text-medium-gray">
            Add your social media profiles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="website" className="text-light-gray">Website</Label>
            <Input
              id="website"
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://example.com"
              className="bg-deep-black border-slate-gray text-pure-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedin_url" className="text-light-gray">LinkedIn</Label>
            <Input
              id="linkedin_url"
              type="url"
              value={formData.linkedin_url}
              onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
              placeholder="https://linkedin.com/in/username"
              className="bg-deep-black border-slate-gray text-pure-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="twitter_url" className="text-light-gray">Twitter</Label>
            <Input
              id="twitter_url"
              type="url"
              value={formData.twitter_url}
              onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
              placeholder="https://twitter.com/username"
              className="bg-deep-black border-slate-gray text-pure-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card className="bg-carbon-black border-slate-gray">
        <CardHeader>
          <CardTitle className="text-pure-white">Notification Preferences</CardTitle>
          <CardDescription className="text-medium-gray">
            Manage your email notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email_notifications" className="text-light-gray">Email Notifications</Label>
              <p className="text-sm text-medium-gray">Receive updates about your courses and progress</p>
            </div>
            <Switch
              id="email_notifications"
              checked={formData.email_notifications}
              onCheckedChange={(checked) => setFormData({ ...formData, email_notifications: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="marketing_emails" className="text-light-gray">Marketing Emails</Label>
              <p className="text-sm text-medium-gray">Receive news and updates about RemoteOps</p>
            </div>
            <Switch
              id="marketing_emails"
              checked={formData.marketing_emails}
              onCheckedChange={(checked) => setFormData({ ...formData, marketing_emails: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="rounded-lg border border-red-500 bg-red-500/10 p-3">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={loading}
          className="bg-professional-blue hover:bg-professional-blue/90"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
      </div>
    </form>
  );
}