import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  MessageCircle, 
  Users, 
  Zap, 
  Shield, 
  Globe,
  CheckCircle2,
  Crown,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { communityConfig } from '@/config/community';

export default async function CommunityPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/auth/sign-in');
  }

  const benefits = [
    {
      icon: Users,
      title: "Elite Network",
      description: "Connect with successful remote operations leaders running 6-7 figure businesses"
    },
    {
      icon: MessageCircle,
      title: "Real-Time Support",
      description: "Get instant feedback on deals, contracts, and operational challenges"
    },
    {
      icon: Zap,
      title: "Weekly Insights",
      description: "Exclusive strategies and market opportunities shared nowhere else"
    },
    {
      icon: Globe,
      title: "Global Perspectives",
      description: "Learn from operators across different markets and industries"
    }
  ];

  const communityTiers = [
    {
      name: "Academy Channel",
      icon: MessageCircle,
      access: "All Members",
      features: [
        "Weekly strategic insights",
        "New course announcements", 
        "Success case studies",
        "Market opportunity alerts"
      ],
      cta: "Join Channel",
      telegramLink: communityConfig.telegram.channelLink
    },
    {
      name: "Discussion Group",
      icon: Users,
      access: "All Members",
      features: [
        "Peer-to-peer support",
        "Implementation Q&A",
        "Resource sharing",
        "Accountability partners"
      ],
      cta: "Join Group",
      telegramLink: communityConfig.telegram.groupLink
    },
    {
      name: "VIP Inner Circle",
      icon: Crown,
      access: "By Invitation",
      features: [
        "Direct access to instructors",
        "Weekly voice check-ins",
        "Hot seat strategy sessions",
        "First access to opportunities"
      ],
      cta: "Learn More",
      isVip: true
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-3 sm:space-y-4">
        <Badge variant="secondary" className="mb-2">
          <Shield className="w-3 h-3 mr-1" />
          Private Community
        </Badge>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">RemoteOps Operator Network</h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
          Join an exclusive community of location-independent contractors and consultants 
          building scalable operations from anywhere in the world.
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {benefits.map((benefit) => (
          <Card key={benefit.title} className="bg-carbon-black border-slate-gray">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-professional-blue/10 rounded-lg shrink-0">
                  <benefit.icon className="w-4 h-4 sm:w-5 sm:h-5 text-professional-blue" />
                </div>
                <div className="min-w-0 flex-1">
                  <CardTitle className="text-base sm:text-lg">{benefit.title}</CardTitle>
                  <CardDescription className="mt-1 text-sm sm:text-base">
                    {benefit.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Separator className="my-8" />

      {/* Community Tiers */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Community Access Tiers</h2>
        <div className="grid gap-4 sm:gap-6">
          {communityTiers.map((tier) => (
            <Card key={tier.name} className={`bg-carbon-black border-slate-gray ${tier.isVip ? 'border-professional-blue' : ''}`}>
              <CardHeader className="pb-3 sm:pb-6">
                <div className="flex items-start sm:items-center justify-between gap-3">
                  <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
                    <div className={`p-2 rounded-lg shrink-0 ${tier.isVip ? 'bg-professional-blue/20' : 'bg-slate-gray/20'}`}>
                      <tier.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${tier.isVip ? 'text-professional-blue' : 'text-light-gray'}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-lg sm:text-xl">{tier.name}</CardTitle>
                      <Badge variant={tier.isVip ? "default" : "secondary"} className="mt-1 text-xs sm:text-sm">
                        {tier.access}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 pt-0">
                <ul className="space-y-2">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm sm:text-base">
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-light-gray">{feature}</span>
                    </li>
                  ))}
                </ul>
                {tier.telegramLink ? (
                  <Button asChild className="w-full text-sm sm:text-base">
                    <a href={tier.telegramLink} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {tier.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full text-sm sm:text-base" disabled={tier.isVip}>
                    {tier.isVip ? 'Invitation Only' : tier.cta}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Guidelines */}
      <Card className="bg-slate-gray/10 border-slate-gray">
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-base sm:text-lg">Community Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm sm:text-base text-light-gray pt-0">
          <p>Our community thrives on mutual respect and value creation. Please:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Share wins and learnings generously</li>
            <li>Keep discussions professional and constructive</li>
            <li>Respect confidentiality of shared strategies</li>
            <li>No spam, self-promotion without value, or recruitment</li>
            <li>Help others as you've been helped</li>
          </ul>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <div className="text-center pt-6 sm:pt-8">
        <p className="text-sm sm:text-base text-muted-foreground mb-4 px-4">
          Ready to accelerate your growth with peer support?
        </p>
        <Button size="lg" asChild className="w-full sm:w-auto">
          <a href={communityConfig.telegram.channelLink} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            <span className="text-sm sm:text-base">Join the RemoteOps Community</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
          </a>
        </Button>
      </div>
    </div>
  );
}