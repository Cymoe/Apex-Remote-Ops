import { createClient } from '@/lib/supabase/server';
import { getUserAccess } from '@/lib/user-access';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { CheckCircle2, Users, TrendingUp, Clock, Shield, Rocket, Award, ArrowRight, DollarSign } from 'lucide-react';

export default async function UpgradePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/auth/sign-in');
  }
  
  const userAccess = await getUserAccess(user.email || null);
  
  // If they already have full access, redirect to dashboard
  if (userAccess.hasFullAccess) {
    redirect('/dashboard');
  }
  
  const creditAmount = userAccess.creditAmount;
  const remainingAmount = 12000 - creditAmount;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        {userAccess.hasVideoAccess && (
          <Badge className="bg-green-500/20 text-green-500 border-green-500/50">
            Video Buyer - Special Pricing Available
          </Badge>
        )}
        <h1 className="text-4xl font-bold text-pure-white">
          Upgrade to Full Implementation
        </h1>
        <p className="text-xl text-light-gray max-w-3xl mx-auto">
          Stop figuring it out alone. Get everything done FOR you with the APEX Operator License.
        </p>
      </div>

      {/* Credit Banner for Video Buyers */}
      {userAccess.hasVideoAccess && creditAmount > 0 && (
        <Card className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-green-500">Your Video Purchase Credits Apply!</h3>
                <p className="text-medium-gray mt-1">
                  Pay only ${remainingAmount.toLocaleString()} instead of full $12,000
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-green-500">${creditAmount}</p>
                <p className="text-sm text-medium-gray">Credit Applied</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* What's Included */}
      <Card className="bg-deep-black border-slate-gray">
        <CardHeader>
          <CardTitle className="text-2xl text-pure-white">Full Implementation Includes</CardTitle>
          <CardDescription className="text-light-gray">
            Everything you need to build a $30K+/month business
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-professional-blue mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-pure-white">Protected Territory Rights</p>
                  <p className="text-sm text-medium-gray">Exclusive access to your chosen market area</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Rocket className="h-5 w-5 text-professional-blue mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-pure-white">Done-For-You Setup</p>
                  <p className="text-sm text-medium-gray">We build your entire business system</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-professional-blue mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-pure-white">Personal Success Coach</p>
                  <p className="text-sm text-medium-gray">Weekly 1-on-1 calls for 90 days</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Award className="h-5 w-5 text-professional-blue mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-pure-white">Crew Matching Service</p>
                  <p className="text-sm text-medium-gray">We connect you with vetted contractors</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-professional-blue mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-pure-white">Lead Generation System</p>
                  <p className="text-sm text-medium-gray">Pre-built funnels and ad campaigns</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-professional-blue mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-pure-white">Operations Playbook</p>
                  <p className="text-sm text-medium-gray">200+ SOPs and templates</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-professional-blue mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-pure-white">Operator Community</p>
                  <p className="text-sm text-medium-gray">Network with successful operators</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-professional-blue mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-pure-white">Lifetime Updates</p>
                  <p className="text-sm text-medium-gray">Always get the latest strategies</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Success Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-deep-black border-slate-gray text-center">
          <CardContent className="p-6">
            <Users className="h-8 w-8 text-professional-blue mx-auto mb-3" />
            <p className="text-3xl font-bold text-pure-white">87%</p>
            <p className="text-sm text-medium-gray mt-1">Hit $10K in 90 days</p>
          </CardContent>
        </Card>
        
        <Card className="bg-deep-black border-slate-gray text-center">
          <CardContent className="p-6">
            <TrendingUp className="h-8 w-8 text-professional-blue mx-auto mb-3" />
            <p className="text-3xl font-bold text-pure-white">$42K</p>
            <p className="text-sm text-medium-gray mt-1">Avg. monthly revenue</p>
          </CardContent>
        </Card>
        
        <Card className="bg-deep-black border-slate-gray text-center">
          <CardContent className="p-6">
            <Clock className="h-8 w-8 text-professional-blue mx-auto mb-3" />
            <p className="text-3xl font-bold text-pure-white">15hrs</p>
            <p className="text-sm text-medium-gray mt-1">Weekly time invested</p>
          </CardContent>
        </Card>
      </div>

      {/* Comparison Table */}
      <Card className="bg-deep-black border-slate-gray">
        <CardHeader>
          <CardTitle className="text-2xl text-pure-white">Compare Your Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-gray">
                  <th className="text-left py-3 px-4 text-light-gray">Feature</th>
                  <th className="text-center py-3 px-4 text-light-gray">Video Only</th>
                  <th className="text-center py-3 px-4 text-professional-blue">Full Program</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-gray/50">
                  <td className="py-3 px-4 text-medium-gray">20-Minute Blueprint</td>
                  <td className="text-center py-3 px-4">
                    <CheckCircle2 className="h-5 w-5 text-green-500 inline" />
                  </td>
                  <td className="text-center py-3 px-4">
                    <CheckCircle2 className="h-5 w-5 text-green-500 inline" />
                  </td>
                </tr>
                <tr className="border-b border-slate-gray/50">
                  <td className="py-3 px-4 text-medium-gray">Protected Territory</td>
                  <td className="text-center py-3 px-4 text-medium-gray">—</td>
                  <td className="text-center py-3 px-4">
                    <CheckCircle2 className="h-5 w-5 text-green-500 inline" />
                  </td>
                </tr>
                <tr className="border-b border-slate-gray/50">
                  <td className="py-3 px-4 text-medium-gray">1-on-1 Coaching</td>
                  <td className="text-center py-3 px-4 text-medium-gray">—</td>
                  <td className="text-center py-3 px-4">
                    <CheckCircle2 className="h-5 w-5 text-green-500 inline" />
                  </td>
                </tr>
                <tr className="border-b border-slate-gray/50">
                  <td className="py-3 px-4 text-medium-gray">Done-For-You Setup</td>
                  <td className="text-center py-3 px-4 text-medium-gray">—</td>
                  <td className="text-center py-3 px-4">
                    <CheckCircle2 className="h-5 w-5 text-green-500 inline" />
                  </td>
                </tr>
                <tr className="border-b border-slate-gray/50">
                  <td className="py-3 px-4 text-medium-gray">Crew Matching</td>
                  <td className="text-center py-3 px-4 text-medium-gray">—</td>
                  <td className="text-center py-3 px-4">
                    <CheckCircle2 className="h-5 w-5 text-green-500 inline" />
                  </td>
                </tr>
                <tr className="border-b border-slate-gray/50">
                  <td className="py-3 px-4 text-medium-gray">Lead Generation</td>
                  <td className="text-center py-3 px-4 text-medium-gray">—</td>
                  <td className="text-center py-3 px-4">
                    <CheckCircle2 className="h-5 w-5 text-green-500 inline" />
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-pure-white">Investment</td>
                  <td className="text-center py-3 px-4 text-medium-gray">$497</td>
                  <td className="text-center py-3 px-4">
                    {userAccess.hasVideoAccess ? (
                      <div>
                        <span className="line-through text-medium-gray">$12,000</span>
                        <span className="text-green-500 font-bold ml-2">${remainingAmount.toLocaleString()}</span>
                      </div>
                    ) : (
                      <span className="text-pure-white font-bold">$12,000</span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-professional-blue/10 to-professional-blue/20 border-professional-blue/30">
        <CardContent className="p-8 text-center">
          <h2 className="text-3xl font-bold text-pure-white mb-4">
            Ready to Build Your Empire?
          </h2>
          <p className="text-light-gray mb-6 max-w-2xl mx-auto">
            Limited territories available. The application process ensures we work with operators who are ready to succeed.
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-professional-blue to-action-yellow hover:from-professional-blue/90 hover:to-action-yellow/90 text-black font-bold px-8 py-6 text-lg">
            <Link href="/apply">
              Apply for Full Program
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          {userAccess.hasVideoAccess && (
            <p className="text-sm text-green-500 mt-4">
              <DollarSign className="h-4 w-4 inline mr-1" />
              Your ${creditAmount} video purchase will be credited automatically
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}