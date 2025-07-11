import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, User, Mail, MapPin, Building, DollarSign, MessageSquare, TrendingUp, Calendar, CheckCircle, XCircle } from 'lucide-react';

export default async function ApplicationDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  
  // Fetch application details
  const { data: application, error: appError } = await supabase
    .from('applications')
    .select('*')
    .eq('conversation_id', params.id)
    .single();

  if (appError || !application) {
    redirect('/admin/applications');
  }

  // Fetch conversation history
  const { data: conversations } = await supabase
    .from('application_conversations')
    .select('*')
    .eq('conversation_id', params.id)
    .order('created_at', { ascending: true });

  // Fetch qualification scores
  const { data: scores } = await supabase
    .from('qualification_scores')
    .select('*')
    .eq('conversation_id', params.id)
    .order('created_at', { ascending: false });

  const latestScore = scores?.[0];

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-black/80 backdrop-blur-md border-b border-gray-900">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/admin/applications" className="flex items-center gap-3 text-gray-400 hover:text-gray-300 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-mono">Back to Applications</span>
          </Link>
          <h1 className="text-xl font-mono text-amber-500">Application Details</h1>
          <div className="w-32" />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Applicant Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Basic Info */}
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
              <h2 className="text-lg font-mono text-amber-500 mb-4">Applicant Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="w-4 h-4 text-gray-500 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="text-sm">{application.name || 'Not provided'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-gray-500 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm">
                      {application.email ? (
                        <a href={`mailto:${application.email}`} className="text-amber-500 hover:text-amber-400">
                          {application.email}
                        </a>
                      ) : (
                        'Not collected'
                      )}
                    </p>
                  </div>
                </div>

                {application.phone && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm">{application.phone}</p>
                    </div>
                  </div>
                )}

                {application.location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm">{application.location}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Business Info */}
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
              <h2 className="text-lg font-mono text-amber-500 mb-4">Business Background</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Building className="w-4 h-4 text-gray-500 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500">Current Business</p>
                    <p className="text-sm">{application.current_business || 'Not mentioned'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <DollarSign className="w-4 h-4 text-gray-500 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500">Current Revenue</p>
                    <p className="text-sm">{application.current_revenue || 'Not disclosed'}</p>
                  </div>
                </div>

                {application.business_experience && (
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-4 h-4 text-gray-500 mt-1" />
                    <div>
                      <p className="text-xs text-gray-500">Experience</p>
                      <p className="text-sm text-gray-300">{application.business_experience}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Qualification Score */}
            {latestScore && (
              <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
                <h2 className="text-lg font-mono text-amber-500 mb-4">Qualification Analysis</h2>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Overall Score</span>
                    <span className={`text-2xl font-mono ${
                      latestScore.score >= 70 ? 'text-green-500' : 
                      latestScore.score >= 50 ? 'text-yellow-500' : 
                      'text-red-500'
                    }`}>
                      {latestScore.score}/100
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
                    <div 
                      className={`h-2 rounded-full ${
                        latestScore.score >= 70 ? 'bg-green-500' : 
                        latestScore.score >= 50 ? 'bg-yellow-500' : 
                        'bg-red-500'
                      }`}
                      style={{ width: `${latestScore.score}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Business Experience</span>
                    <span className="font-mono">{latestScore.business_experience_score}/25</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Financial Readiness</span>
                    <span className="font-mono">{latestScore.financial_readiness_score}/25</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Commitment Level</span>
                    <span className="font-mono">{latestScore.commitment_level_score}/25</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Program Fit</span>
                    <span className="font-mono">{latestScore.program_fit_score}/25</span>
                  </div>
                </div>

                {latestScore.notes && (
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <p className="text-xs text-gray-500 mb-2">Analysis Notes</p>
                    <p className="text-sm text-gray-300">{latestScore.notes}</p>
                  </div>
                )}

                <div className="mt-4 flex items-center gap-2">
                  {latestScore.should_advance ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-500">Recommended for advancement</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-500">Not recommended</span>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Conversation */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg">
              <div className="px-6 py-4 border-b border-gray-800">
                <h2 className="text-lg font-mono text-amber-500">Conversation History</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {conversations?.length || 0} messages • 
                  Started {new Date(application.created_at).toLocaleString()}
                </p>
              </div>

              <div className="max-h-[800px] overflow-y-auto p-6">
                <div className="space-y-6">
                  {/* Initial AI message */}
                  <div className="flex justify-start">
                    <div className="max-w-[80%] bg-gradient-to-br from-gray-900/50 to-gray-900/30 border border-gray-800 rounded-2xl px-6 py-4">
                      <p className="text-xs text-gray-500 mb-2">AI Assistant</p>
                      <p className="text-sm text-gray-300 whitespace-pre-wrap">
                        Welcome to APEX.

I'm here to understand your vision and determine if we're the right fit for your transformation.

This isn't a typical application. It's a conversation between two professionals exploring a potential partnership.

Let's start with something simple: What brings you here today?
                      </p>
                    </div>
                  </div>

                  {/* Conversation turns */}
                  {conversations?.map((conv, index) => (
                    <div key={conv.id} className="space-y-4">
                      {/* User message */}
                      <div className="flex justify-end">
                        <div className="max-w-[80%] bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 rounded-2xl px-6 py-4">
                          <p className="text-xs text-gray-500 mb-2">Applicant</p>
                          <p className="text-sm text-gray-100 whitespace-pre-wrap">{conv.user_message}</p>
                        </div>
                      </div>

                      {/* AI response */}
                      <div className="flex justify-start">
                        <div className="max-w-[80%] bg-gradient-to-br from-gray-900/50 to-gray-900/30 border border-gray-800 rounded-2xl px-6 py-4">
                          <p className="text-xs text-gray-500 mb-2">AI Assistant</p>
                          <p className="text-sm text-gray-300 whitespace-pre-wrap">{conv.agent_response}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-4">
              <button className="px-6 py-3 bg-green-500/20 border border-green-500/50 text-green-500 rounded-lg hover:bg-green-500/30 transition-colors">
                Schedule Call
              </button>
              <button className="px-6 py-3 bg-amber-500/20 border border-amber-500/50 text-amber-500 rounded-lg hover:bg-amber-500/30 transition-colors">
                Send NDA
              </button>
              <button className="px-6 py-3 bg-red-500/20 border border-red-500/50 text-red-500 rounded-lg hover:bg-red-500/30 transition-colors">
                Decline
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}