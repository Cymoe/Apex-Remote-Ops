import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail, MapPin, Building, DollarSign, TrendingUp, Calendar } from 'lucide-react';

export default async function ApplicationsPage() {
  const supabase = await createClient();
  
  // For now, we'll just show all applications
  // In production, you'd want to add auth check here
  
  const { data: applications, error } = await supabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching applications:', error);
  }

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-black/80 backdrop-blur-md border-b border-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-gray-400 hover:text-gray-300 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-mono">Back to Site</span>
          </Link>
          <h1 className="text-xl font-mono text-amber-500">APEX Applications</h1>
          <div className="w-24" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">Total Applications</p>
            <p className="text-2xl font-mono text-amber-500">{applications?.length || 0}</p>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">Qualified</p>
            <p className="text-2xl font-mono text-green-500">
              {applications?.filter(a => a.status === 'qualified').length || 0}
            </p>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">In Progress</p>
            <p className="text-2xl font-mono text-yellow-500">
              {applications?.filter(a => a.status === 'in_progress').length || 0}
            </p>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">Avg Score</p>
            <p className="text-2xl font-mono text-amber-500">
              {applications && applications.length > 0
                ? Math.round(
                    applications.reduce((acc, a) => acc + (a.qualification_score || 0), 0) / 
                    applications.filter(a => a.qualification_score).length
                  ) || 'N/A'
                : 'N/A'}
            </p>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-gray-900/30 border border-gray-800 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <h2 className="text-lg font-mono text-gray-100">Recent Applications</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900/50">
                <tr className="text-left text-sm text-gray-400">
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Score</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Business</th>
                  <th className="px-6 py-3">Revenue</th>
                  <th className="px-6 py-3">Messages</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {applications?.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-900/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-gray-400">
                      {new Date(app.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {app.name || <span className="text-gray-600">Not provided</span>}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {app.email ? (
                        <a href={`mailto:${app.email}`} className="text-amber-500 hover:text-amber-400">
                          {app.email}
                        </a>
                      ) : (
                        <span className="text-gray-600">Not collected</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-mono ${
                        app.qualification_score >= 70 ? 'text-green-500' : 
                        app.qualification_score >= 50 ? 'text-yellow-500' : 
                        'text-red-500'
                      }`}>
                        {app.qualification_score || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        app.status === 'qualified' ? 'bg-green-500/20 text-green-500' :
                        app.status === 'rejected' ? 'bg-red-500/20 text-red-500' :
                        app.status === 'in_progress' ? 'bg-yellow-500/20 text-yellow-500' :
                        'bg-gray-500/20 text-gray-500'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {app.current_business || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {app.current_revenue || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-400">
                      {app.message_count || 0}
                    </td>
                    <td className="px-6 py-4">
                      <Link 
                        href={`/admin/applications/${app.conversation_id}`}
                        className="text-sm text-amber-500 hover:text-amber-400 transition-colors"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {(!applications || applications.length === 0) && (
              <div className="px-6 py-12 text-center text-gray-500">
                No applications yet
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
            <h3 className="text-sm font-mono text-gray-400 mb-4">Qualification Breakdown</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">High Score (80+)</span>
                <span className="text-green-500 font-mono">
                  {applications?.filter(a => a.qualification_score >= 80).length || 0}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Medium (50-79)</span>
                <span className="text-yellow-500 font-mono">
                  {applications?.filter(a => a.qualification_score >= 50 && a.qualification_score < 80).length || 0}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Low (&lt;50)</span>
                <span className="text-red-500 font-mono">
                  {applications?.filter(a => a.qualification_score < 50).length || 0}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
            <h3 className="text-sm font-mono text-gray-400 mb-4">Contact Info Collected</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Email Collected</span>
                <span className="text-amber-500 font-mono">
                  {applications?.filter(a => a.email).length || 0}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Name Provided</span>
                <span className="text-amber-500 font-mono">
                  {applications?.filter(a => a.name).length || 0}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Phone Number</span>
                <span className="text-amber-500 font-mono">
                  {applications?.filter(a => a.phone).length || 0}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
            <h3 className="text-sm font-mono text-gray-400 mb-4">Today's Activity</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">New Today</span>
                <span className="text-amber-500 font-mono">
                  {applications?.filter(a => 
                    new Date(a.created_at).toDateString() === new Date().toDateString()
                  ).length || 0}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Qualified Today</span>
                <span className="text-green-500 font-mono">
                  {applications?.filter(a => 
                    a.status === 'qualified' &&
                    new Date(a.created_at).toDateString() === new Date().toDateString()
                  ).length || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}