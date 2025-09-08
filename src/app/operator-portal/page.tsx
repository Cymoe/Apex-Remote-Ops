'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ApexLogo } from '@/components/apex-logo';
import { 
  Download, 
  Users, 
  Calendar, 
  MapPin, 
  TrendingUp,
  FileText,
  Video,
  MessageSquare,
  DollarSign,
  ChevronRight,
  ExternalLink,
  Rocket,
  Award,
  Target,
  BookOpen,
  Zap
} from 'lucide-react';

interface OperatorData {
  firstName: string;
  lastName: string;
  email: string;
  territory: string;
  operatorNumber: string;
  joinDate: string;
  revenue: number;
  activeJobs: number;
  completedJobs: number;
}

export default function OperatorPortalPage() {
  const [operatorData] = useState<OperatorData>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    territory: 'Austin, TX',
    operatorNumber: '048',
    joinDate: '2025-01-20',
    revenue: 0,
    activeJobs: 0,
    completedJobs: 0
  });

  const [currentWeek, setCurrentWeek] = useState(1);
  const [tasksCompleted, setTasksCompleted] = useState({
    week1: ['business-registration'],
    week2: [],
    week3: [],
    week4: []
  });

  // Calculate days since joining
  const daysSinceJoining = Math.floor((new Date().getTime() - new Date(operatorData.joinDate).getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="px-4 py-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <ApexLogo size="md" className="[&_div]:from-amber-500 [&_div]:to-amber-600" />
          <div className="flex items-center gap-6">
            <div className="text-sm text-gray-400">
              Operator #{operatorData.operatorNumber} • {operatorData.territory}
            </div>
            <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
              <MessageSquare className="w-4 h-4 mr-2" />
              Support
            </Button>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <section className="bg-gray-800 px-4 py-6 border-b border-gray-700">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-400">Days Active</p>
            <p className="text-2xl font-bold text-amber-500">{daysSinceJoining}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400">Revenue (MTD)</p>
            <p className="text-2xl font-bold">${operatorData.revenue.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400">Active Jobs</p>
            <p className="text-2xl font-bold">{operatorData.activeJobs}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400">Completed</p>
            <p className="text-2xl font-bold">{operatorData.completedJobs}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400">Avg Ticket</p>
            <p className="text-2xl font-bold">
              ${operatorData.completedJobs > 0 ? Math.round(operatorData.revenue / operatorData.completedJobs) : 0}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* 30-Day Progress Tracker */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Target className="w-5 h-5 text-amber-500" />
                  30-Day Launch Progress
                </h2>
                <span className="text-sm bg-amber-500/20 text-amber-500 px-3 py-1 rounded-full">
                  Week {Math.min(Math.ceil(daysSinceJoining / 7), 4)} of 4
                </span>
              </div>

              {/* Week Tabs */}
              <div className="flex gap-2 mb-6 overflow-x-auto">
                {[1, 2, 3, 4].map((week) => (
                  <button
                    key={week}
                    onClick={() => setCurrentWeek(week)}
                    className={`flex-1 min-w-[100px] py-2 px-4 rounded-lg font-medium transition-colors ${
                      currentWeek === week 
                        ? 'bg-amber-500 text-black' 
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    Week {week}
                  </button>
                ))}
              </div>

              {/* Week Content */}
              {currentWeek === 1 && (
                <div className="space-y-4">
                  <h3 className="font-bold text-lg mb-3">Foundation Setup</h3>
                  <TaskItem 
                    id="business-registration"
                    task="Register your business entity"
                    completed={tasksCompleted.week1.includes('business-registration')}
                    resource="/resources/business-registration-guide.pdf"
                  />
                  <TaskItem 
                    id="insurance-setup"
                    task="Get general liability insurance ($1M minimum)"
                    completed={tasksCompleted.week1.includes('insurance-setup')}
                    resource="/resources/insurance-providers.pdf"
                  />
                  <TaskItem 
                    id="bank-accounts"
                    task="Open business checking account"
                    completed={tasksCompleted.week1.includes('bank-accounts')}
                  />
                  <TaskItem 
                    id="service-selection"
                    task="Choose your initial service offerings"
                    completed={tasksCompleted.week1.includes('service-selection')}
                    resource="/resources/service-menu-templates.zip"
                  />
                </div>
              )}

              {/* Add other weeks similarly */}
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                Quick Actions
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <Button className="bg-gray-700 hover:bg-gray-600 justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Contract
                </Button>
                <Button className="bg-gray-700 hover:bg-gray-600 justify-start">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Create Invoice
                </Button>
                <Button className="bg-gray-700 hover:bg-gray-600 justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Job
                </Button>
                <Button className="bg-gray-700 hover:bg-gray-600 justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Post Job Opening
                </Button>
              </div>
            </div>

            {/* Training Modules */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-500" />
                Training Modules
              </h2>
              
              <div className="space-y-3">
                <ModuleItem 
                  title="APEX System Fundamentals"
                  duration="3h 47m"
                  progress={100}
                  locked={false}
                />
                <ModuleItem 
                  title="Google Ads Domination"
                  duration="2h 15m"
                  progress={45}
                  locked={false}
                />
                <ModuleItem 
                  title="Crew Hiring & Management"
                  duration="1h 52m"
                  progress={0}
                  locked={false}
                />
                <ModuleItem 
                  title="Advanced Pricing Strategies"
                  duration="1h 23m"
                  progress={0}
                  locked={true}
                  unlockDay={14}
                />
                <ModuleItem 
                  title="Scaling to $100K/Month"
                  duration="2h 38m"
                  progress={0}
                  locked={true}
                  unlockDay={30}
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Territory Certificate */}
            <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-lg p-6 text-black">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Your Territory Certificate
              </h3>
              <div className="bg-black/10 rounded-lg p-4 mb-4">
                <p className="font-semibold">Exclusive Rights To:</p>
                <p className="text-2xl font-bold mt-1">{operatorData.territory}</p>
              </div>
              <Button className="w-full bg-black hover:bg-gray-900 text-white">
                <Download className="w-4 h-4 mr-2" />
                Download Certificate
              </Button>
            </div>

            {/* Resources */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="font-bold text-lg mb-4">Essential Resources</h3>
              <div className="space-y-3">
                <ResourceLink 
                  icon={<Download />}
                  title="Operator Vault (247MB)"
                  description="All SOPs & templates"
                />
                <ResourceLink 
                  icon={<Video />}
                  title="Video Library"
                  description="50+ training videos"
                />
                <ResourceLink 
                  icon={<FileText />}
                  title="Contract Templates"
                  description="Ready-to-use agreements"
                />
                <ResourceLink 
                  icon={<TrendingUp />}
                  title="Marketing Assets"
                  description="Ads, scripts, campaigns"
                />
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-2 text-green-400">
                Active Operator Chat
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                27 operators sharing wins, asking questions, and closing deals right now.
              </p>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => window.open('https://chat.whatsapp.com/XXXXXXX', '_blank')}
              >
                <Users className="w-4 h-4 mr-2" />
                Join WhatsApp Group
              </Button>
            </div>

            {/* Support */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="font-bold text-lg mb-4">Need Help?</h3>
              <div className="space-y-3 text-sm">
                <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-white">
                  <MessageSquare className="w-4 h-4" />
                  support@remoteops.ai
                </a>
                <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-white">
                  <Calendar className="w-4 h-4" />
                  Book success call
                </a>
                <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-white">
                  <FileText className="w-4 h-4" />
                  Knowledge base
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component for task items
function TaskItem({ 
  id, 
  task, 
  completed, 
  resource 
}: { 
  id: string;
  task: string; 
  completed: boolean; 
  resource?: string;
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
      <div className="flex items-center gap-3">
        <input 
          type="checkbox" 
          checked={completed}
          onChange={() => {/* Handle task completion */}}
          className="w-5 h-5 rounded border-gray-600"
        />
        <span className={completed ? 'line-through text-gray-500' : ''}>{task}</span>
      </div>
      {resource && (
        <Button size="sm" variant="ghost" className="text-amber-500 hover:text-amber-400">
          <Download className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}

// Component for training modules
function ModuleItem({ 
  title, 
  duration, 
  progress, 
  locked, 
  unlockDay 
}: { 
  title: string;
  duration: string;
  progress: number;
  locked: boolean;
  unlockDay?: number;
}) {
  return (
    <div className={`p-4 bg-gray-700/50 rounded-lg ${locked ? 'opacity-50' : ''}`}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium">{title}</h4>
        <span className="text-sm text-gray-400">{duration}</span>
      </div>
      {!locked ? (
        <>
          <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
            <div 
              className="bg-amber-500 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <Button size="sm" className="text-xs">
            {progress > 0 ? 'Continue' : 'Start'} →
          </Button>
        </>
      ) : (
        <p className="text-sm text-gray-500">Unlocks on day {unlockDay}</p>
      )}
    </div>
  );
}

// Component for resource links
function ResourceLink({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <a href="#" className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition-colors">
      <div className="text-amber-500 mt-0.5">{icon}</div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-600 ml-auto mt-2" />
    </a>
  );
}