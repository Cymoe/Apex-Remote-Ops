'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  Mail, 
  CheckCircle, 
  XCircle, 
  DollarSign, 
  Send,
  Clock,
  AlertCircle,
  Loader2
} from 'lucide-react';

export default function TestEmailsPage() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('Test');
  const [loading, setLoading] = useState<string | null>(null);
  const [results, setResults] = useState<any[]>([]);

  const emailTypes = [
    {
      id: 'received',
      name: 'Application Received',
      icon: Mail,
      description: 'Sent immediately when application is submitted',
      color: 'bg-blue-500',
    },
    {
      id: 'approved',
      name: 'Application Approved',
      icon: CheckCircle,
      description: 'Sent when admin approves application',
      color: 'bg-green-500',
      additionalFields: ['territory', 'calendarLink'],
    },
    {
      id: 'rejected',
      name: 'Application Rejected',
      icon: XCircle,
      description: 'Sent when application is not approved',
      color: 'bg-red-500',
      additionalFields: ['rejectionReason'],
    },
    {
      id: 'payment',
      name: 'Payment Confirmation',
      icon: DollarSign,
      description: 'Sent after successful payment',
      color: 'bg-purple-500',
      additionalFields: ['territory'],
    },
  ];

  const testScenarios = [
    {
      name: 'Happy Path',
      description: 'User applies → Gets approved → Makes payment',
      steps: ['received', 'approved', 'payment'],
    },
    {
      name: 'Rejection Flow',
      description: 'User applies → Gets rejected → Enters nurture',
      steps: ['received', 'rejected'],
    },
    {
      name: 'Full Sequence',
      description: 'Test all email types in order',
      steps: ['received', 'approved', 'payment', 'rejected'],
    },
  ];

  const sendTestEmail = async (type: string, customData?: any) => {
    if (!email) {
      toast.error('Please enter an email address');
      return;
    }

    setLoading(type);
    
    try {
      const params = new URLSearchParams({
        type,
        email,
        name: firstName,
        ...customData,
      });

      const response = await fetch(`/api/test-email?${params}`);
      const data = await response.json();

      if (data.success) {
        toast.success(`${type} email sent to ${email}`);
        setResults(prev => [{
          type,
          time: new Date().toLocaleTimeString(),
          success: true,
          email,
          resendId: data.resendId,
        }, ...prev].slice(0, 10));
      } else {
        toast.error(data.error || 'Failed to send email');
        setResults(prev => [{
          type,
          time: new Date().toLocaleTimeString(),
          success: false,
          email,
          error: data.error,
        }, ...prev].slice(0, 10));
      }
    } catch (error) {
      toast.error('Network error');
      console.error(error);
    } finally {
      setLoading(null);
    }
  };

  const runScenario = async (scenario: typeof testScenarios[0]) => {
    toast.info(`Running scenario: ${scenario.name}`);
    
    for (const step of scenario.steps) {
      await sendTestEmail(step);
      // Wait 2 seconds between emails
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    toast.success('Scenario completed');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Email Testing Dashboard</h1>
          <p className="text-gray-600">Test all email flows and automation triggers</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Configuration</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Test Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="test@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="Test"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-amber-900">Testing Mode</p>
                    <p className="text-amber-700 mt-1">
                      Emails will actually be sent. Use a real email you can check.
                    </p>
                  </div>
                </div>
              </div>

              {/* Recent Results */}
              <div className="mt-6">
                <h3 className="font-semibold mb-3">Recent Results</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {results.length === 0 ? (
                    <p className="text-sm text-gray-500">No emails sent yet</p>
                  ) : (
                    results.map((result, i) => (
                      <div 
                        key={i} 
                        className={`text-xs p-2 rounded flex items-center gap-2 ${
                          result.success ? 'bg-green-50' : 'bg-red-50'
                        }`}
                      >
                        {result.success ? (
                          <CheckCircle className="w-3 h-3 text-green-600" />
                        ) : (
                          <XCircle className="w-3 h-3 text-red-600" />
                        )}
                        <span className="font-medium">{result.type}</span>
                        <span className="text-gray-500">{result.time}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Testing Interface */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="individual" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="individual">Individual Emails</TabsTrigger>
                <TabsTrigger value="scenarios">Test Scenarios</TabsTrigger>
              </TabsList>

              <TabsContent value="individual" className="space-y-4">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Send Individual Emails</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {emailTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <div
                          key={type.id}
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${type.color} text-white`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold">{type.name}</h4>
                              <p className="text-sm text-gray-600 mt-1">
                                {type.description}
                              </p>
                              <Button
                                size="sm"
                                className="mt-3"
                                onClick={() => sendTestEmail(type.id)}
                                disabled={loading === type.id}
                              >
                                {loading === type.id ? (
                                  <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Sending...
                                  </>
                                ) : (
                                  <>
                                    <Send className="w-4 h-4 mr-2" />
                                    Send Test
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>

                {/* Email Preview */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Email Content Preview</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Application Received Email
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Confirmation of application receipt</li>
                        <li>• Application ID for reference</li>
                        <li>• Next steps explanation</li>
                        <li>• Link to Marcel's case study video</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Application Approved Email
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Territory confirmation</li>
                        <li>• Calendar booking link</li>
                        <li>• 48-hour urgency for booking</li>
                        <li>• Onboarding call agenda</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="scenarios" className="space-y-4">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Automated Test Scenarios</h3>
                  <div className="space-y-4">
                    {testScenarios.map((scenario) => (
                      <div
                        key={scenario.name}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold">{scenario.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {scenario.description}
                            </p>
                            <div className="flex items-center gap-2 mt-3">
                              {scenario.steps.map((step, i) => (
                                <div key={i} className="flex items-center gap-2">
                                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                    {step}
                                  </span>
                                  {i < scenario.steps.length - 1 && (
                                    <span className="text-gray-400">→</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => runScenario(scenario)}
                            disabled={!!loading}
                          >
                            <Clock className="w-4 h-4 mr-2" />
                            Run
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* API Testing */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Direct API Testing</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-900 text-gray-100 rounded font-mono text-sm">
                      # Test application received email<br />
                      curl "http://localhost:3000/api/test-email?type=received&email={email}&name={firstName}"
                    </div>
                    <div className="p-3 bg-gray-900 text-gray-100 rounded font-mono text-sm">
                      # Test approval email<br />
                      curl "http://localhost:3000/api/test-email?type=approved&email={email}&name={firstName}"
                    </div>
                    <div className="p-3 bg-gray-900 text-gray-100 rounded font-mono text-sm">
                      # Test rejection email<br />
                      curl "http://localhost:3000/api/test-email?type=rejected&email={email}&name={firstName}"
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Resend API</p>
                <p className="font-semibold">Connected</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Beehiiv</p>
                <p className="font-semibold">Not Configured</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Emails Sent</p>
                <p className="font-semibold">{results.length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Queue Status</p>
                <p className="font-semibold">Ready</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}