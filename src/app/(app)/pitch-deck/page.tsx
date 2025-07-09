'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { StylePreview } from '@/components/pitch-deck-style-preview';

// Dynamic import to prevent SSR issues with PDF libraries
const PDFViewer = dynamic(
  () => import('@/components/pdf').then(mod => mod.PDFViewer),
  { 
    ssr: false,
    loading: () => <div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
  }
);
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText,
  Download,
  Save,
  Eye,
  Target,
  Award,
  BarChart3,
  Globe,
  Shield,
  Users,
  Zap,
  Sparkles
} from 'lucide-react';


interface PitchDeckData {
  // Company Overview
  companyName: string;
  tagline: string;
  yearFounded: string;
  headquarters: string;
  website: string;
  
  // Executive Summary
  businessDescription: string;
  uniqueValue: string;
  keyAchievements: string[];
  
  // Financial Performance
  currentRevenue: string;
  lastYearRevenue: string;
  twoYearsAgoRevenue: string;
  currentProfit: string;
  lastYearProfit: string;
  twoYearsAgoProfit: string;
  profitMargin: string;
  recurringRevenuePercent: string;
  
  // Market & Customers
  marketsServed: string[];
  totalCustomers: string;
  averageJobSize: string;
  customerRetentionRate: string;
  topCustomerPercent: string;
  
  // Operations
  teamSize: string;
  subcontractors: string;
  techStack: string[];
  licensedStates: string[];
  
  // Growth & Future
  growthOpportunities: string[];
  competitiveAdvantages: string[];
  
  // Sale Details
  askingPrice: string;
  reasonForSale: string;
  transitionPeriod: string;
  financing: string;
}

const initialData: PitchDeckData = {
  companyName: '',
  tagline: '',
  yearFounded: '',
  headquarters: '',
  website: '',
  businessDescription: '',
  uniqueValue: '',
  keyAchievements: ['', '', ''],
  currentRevenue: '',
  lastYearRevenue: '',
  twoYearsAgoRevenue: '',
  currentProfit: '',
  lastYearProfit: '',
  twoYearsAgoProfit: '',
  profitMargin: '',
  recurringRevenuePercent: '',
  marketsServed: [''],
  totalCustomers: '',
  averageJobSize: '',
  customerRetentionRate: '',
  topCustomerPercent: '',
  teamSize: '',
  subcontractors: '',
  techStack: [''],
  licensedStates: [''],
  growthOpportunities: ['', ''],
  competitiveAdvantages: ['', ''],
  askingPrice: '',
  reasonForSale: '',
  transitionPeriod: '',
  financing: ''
};

const exampleData: PitchDeckData = {
  companyName: 'ABC Home Services',
  tagline: 'Premier HVAC & Plumbing Solutions, Delivered Remotely',
  yearFounded: '2018',
  headquarters: 'Austin, TX (Remote Operations)',
  website: 'www.abchomeservices.com',
  businessDescription: 'ABC Home Services is a technology-enabled home service company specializing in HVAC and plumbing services across Texas. We operate a fully remote business model, managing a network of 25+ certified technicians through our proprietary dispatch and quality control systems. Our focus on customer experience and operational efficiency has driven 40% year-over-year growth.',
  uniqueValue: 'We\'ve built a scalable, location-independent operation that delivers 4.9-star service through our tech-enabled quality control systems. Our remote model reduces overhead by 35% compared to traditional competitors while maintaining premium service standards. Proprietary lead generation system generates 200+ qualified leads monthly with a 28% conversion rate.',
  keyAchievements: [
    'Grew from $800K to $2.5M revenue in 5 years with 40% average annual growth',
    'Built recurring revenue stream representing 35% of total revenue through service agreements',
    'Achieved 85% customer retention rate, 3x the industry average'
  ],
  currentRevenue: '$2,500,000',
  lastYearRevenue: '$1,800,000',
  twoYearsAgoRevenue: '$1,300,000',
  currentProfit: '$625,000',
  lastYearProfit: '$432,000',
  twoYearsAgoProfit: '$286,000',
  profitMargin: '25%',
  recurringRevenuePercent: '35%',
  marketsServed: ['Austin Metro', 'San Antonio Metro', 'Houston Suburbs'],
  totalCustomers: '450',
  averageJobSize: '$5,500',
  customerRetentionRate: '85%',
  topCustomerPercent: '8%',
  teamSize: '12',
  subcontractors: '25',
  techStack: ['ServiceTitan', 'QuickBooks Online', 'Slack', 'Monday.com', 'CallRail'],
  licensedStates: ['Texas', 'Oklahoma', 'Louisiana'],
  growthOpportunities: [
    'Expand into Dallas-Fort Worth market (estimated $800K annual revenue potential based on current market penetration rates)',
    'Launch commercial services division targeting property management companies (projected $500K revenue in year one)'
  ],
  competitiveAdvantages: [
    'Proprietary 50-point quality control system with photo documentation reduces callbacks by 70%',
    'Tech-enabled dispatch optimization increases technician productivity by 30% vs industry average'
  ],
  askingPrice: '$3,750,000',
  reasonForSale: 'After 7 years of building and scaling ABC Home Services, I\'m ready to pursue other entrepreneurial ventures in the technology sector. The business is fully systematized and runs independently with our management team.',
  transitionPeriod: '90-day transition period included in sale price, with additional consulting available at $2,000/day if needed',
  financing: 'partial'
};

export default function PitchDeckGenerator() {
  const [formData, setFormData] = useState<PitchDeckData>(initialData);
  const [isGenerating, setIsGenerating] = useState(false);
  const [deckStyle, setDeckStyle] = useState('silicon-valley');
  const [generatedPDF, setGeneratedPDF] = useState<string | null>(null);
  const [pdfFileName, setPdfFileName] = useState('pitch-deck.pdf');

  const fillExampleData = () => {
    setFormData(exampleData);
  };

  // Automatically regenerate PDF when style changes if PDF already exists
  useEffect(() => {
    if (generatedPDF && !isGenerating) {
      // Small delay to show the style change first
      const timer = setTimeout(() => {
        generatePitchDeck();
      }, 300);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckStyle]); // Only regenerate when style changes

  const generatePitchDeck = async () => {
    setIsGenerating(true);
    
    try {
      console.log('Starting PDF generation...');
      
      // Dynamically import the selected style PDF generator
      let pdf;
      
      switch (deckStyle) {
        case 'investment-banking':
          const { generateProfessionalIBPitchDeck } = await import('@/lib/generate-pitch-deck-professional-ib');
          pdf = await generateProfessionalIBPitchDeck(formData);
          break;
        case 'visual':
          const { generateVisualPitchDeck } = await import('@/lib/generate-pitch-deck-visual');
          pdf = await generateVisualPitchDeck(formData);
          break;
        case 'modern':
          const { generateModernPitchDeck } = await import('@/lib/generate-pitch-deck-modern');
          pdf = await generateModernPitchDeck(formData);
          break;
        case 'silicon-valley':
        default:
          const { generateSiliconValleyPitchDeck } = await import('@/lib/generate-pitch-deck-silicon-valley');
          pdf = await generateSiliconValleyPitchDeck(formData);
          break;
      }
      
      // Convert PDF to base64 for preview
      const pdfOutput = pdf.output('datauristring');
      setGeneratedPDF(pdfOutput);
      
      // Set the filename
      const fileName = `${formData.companyName || 'Company'}_Pitch_Deck_${new Date().toISOString().split('T')[0]}.pdf`;
      setPdfFileName(fileName);
      
      setIsGenerating(false);
      console.log('PDF generation complete!');
      
      // Scroll to PDF viewer
      setTimeout(() => {
        document.getElementById('pdf-viewer')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error('Detailed error generating PDF:', error);
      setIsGenerating(false);
      alert(`Error generating PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleInputChange = (field: keyof PitchDeckData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: keyof PitchDeckData, index: number, value: string) => {
    setFormData(prev => {
      const array = [...(prev[field] as string[])];
      array[index] = value;
      return { ...prev, [field]: array };
    });
  };

  const addArrayItem = (field: keyof PitchDeckData) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[]), '']
    }));
  };

  const removeArrayItem = (field: keyof PitchDeckData, index: number) => {
    setFormData(prev => {
      const array = [...(prev[field] as string[])];
      array.splice(index, 1);
      return { ...prev, [field]: array };
    });
  };


  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold">Business Exit Pitch Deck Generator</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Generate a comprehensive M&A presentation with financial performance, operational metrics, 
          and growth opportunities formatted for serious buyers and brokers.
        </p>
      </div>

      {/* Help Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-action-yellow/10">
              <Sparkles className="w-5 h-5 text-action-yellow" />
            </div>
            <CardTitle>What Makes a Great Exit Strategy Pitch?</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-success-green" />
                <h4 className="font-medium text-white">Strong Financial Growth</h4>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                Show consistent revenue and profit growth over 3-5 years. Buyers want 
                to see momentum and predictable performance.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-link-blue" />
                <h4 className="font-medium text-white">Owner Independence</h4>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                Demonstrate that the business runs without you. Show your management 
                team, systems, and processes that ensure continuity.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-500" />
                <h4 className="font-medium text-white">Competitive Moat</h4>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                Highlight what makes your business defensible - systems, relationships, 
                brand, or market position that competitors can't easily replicate.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-500" />
                <h4 className="font-medium text-white">Growth Potential</h4>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                Show untapped opportunities and expansion possibilities. Buyers pay 
                more for businesses they can grow and scale further.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>
            Fill in your business details to generate your professional pitch deck
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
              <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
              <TabsTrigger value="financials" className="text-xs sm:text-sm">Financials</TabsTrigger>
              <TabsTrigger value="operations" className="text-xs sm:text-sm">Operations</TabsTrigger>
              <TabsTrigger value="growth" className="text-xs sm:text-sm">Growth</TabsTrigger>
              <TabsTrigger value="sale" className="text-xs sm:text-sm">Sale Details</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="ABC Contracting Services"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tagline">Company Tagline</Label>
                  <Input
                    id="tagline"
                    value={formData.tagline}
                    onChange={(e) => handleInputChange('tagline', e.target.value)}
                    placeholder="Quality construction, delivered remotely"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="yearFounded">Year Founded</Label>
                  <Input
                    id="yearFounded"
                    value={formData.yearFounded}
                    onChange={(e) => handleInputChange('yearFounded', e.target.value)}
                    placeholder="2015"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="headquarters">Headquarters Location</Label>
                  <Input
                    id="headquarters"
                    value={formData.headquarters}
                    onChange={(e) => handleInputChange('headquarters', e.target.value)}
                    placeholder="Austin, TX (Remote Operations)"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="businessDescription">Business Description</Label>
                <Textarea
                  id="businessDescription"
                  value={formData.businessDescription}
                  onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                  placeholder="Describe your business model, services offered, and target market..."
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="uniqueValue">Unique Value Proposition</Label>
                <Textarea
                  id="uniqueValue"
                  value={formData.uniqueValue}
                  onChange={(e) => handleInputChange('uniqueValue', e.target.value)}
                  placeholder="What makes your business unique and valuable to buyers..."
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Key Achievements</Label>
                {formData.keyAchievements.map((achievement, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={achievement}
                      onChange={(e) => handleArrayChange('keyAchievements', index, e.target.value)}
                      placeholder={`Achievement ${index + 1} (e.g., "Grew to $2M revenue in 3 years")`}
                    />
                    {formData.keyAchievements.length > 1 && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeArrayItem('keyAchievements', index)}
                      >
                        ×
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayItem('keyAchievements')}
                >
                  Add Achievement
                </Button>
              </div>
            </TabsContent>

            {/* Financials Tab */}
            <TabsContent value="financials" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Revenue History</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="currentRevenue">Current Year Revenue</Label>
                    <Input
                      id="currentRevenue"
                      value={formData.currentRevenue}
                      onChange={(e) => handleInputChange('currentRevenue', e.target.value)}
                      placeholder="$2,500,000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastYearRevenue">Last Year Revenue</Label>
                    <Input
                      id="lastYearRevenue"
                      value={formData.lastYearRevenue}
                      onChange={(e) => handleInputChange('lastYearRevenue', e.target.value)}
                      placeholder="$2,000,000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twoYearsAgoRevenue">Two Years Ago Revenue</Label>
                    <Input
                      id="twoYearsAgoRevenue"
                      value={formData.twoYearsAgoRevenue}
                      onChange={(e) => handleInputChange('twoYearsAgoRevenue', e.target.value)}
                      placeholder="$1,500,000"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Profit History</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="currentProfit">Current Year Profit</Label>
                    <Input
                      id="currentProfit"
                      value={formData.currentProfit}
                      onChange={(e) => handleInputChange('currentProfit', e.target.value)}
                      placeholder="$500,000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastYearProfit">Last Year Profit</Label>
                    <Input
                      id="lastYearProfit"
                      value={formData.lastYearProfit}
                      onChange={(e) => handleInputChange('lastYearProfit', e.target.value)}
                      placeholder="$400,000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twoYearsAgoProfit">Two Years Ago Profit</Label>
                    <Input
                      id="twoYearsAgoProfit"
                      value={formData.twoYearsAgoProfit}
                      onChange={(e) => handleInputChange('twoYearsAgoProfit', e.target.value)}
                      placeholder="$300,000"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="profitMargin">Average Profit Margin (%)</Label>
                  <Input
                    id="profitMargin"
                    value={formData.profitMargin}
                    onChange={(e) => handleInputChange('profitMargin', e.target.value)}
                    placeholder="20%"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recurringRevenuePercent">Recurring Revenue (%)</Label>
                  <Input
                    id="recurringRevenuePercent"
                    value={formData.recurringRevenuePercent}
                    onChange={(e) => handleInputChange('recurringRevenuePercent', e.target.value)}
                    placeholder="35%"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Customer Metrics</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="totalCustomers">Total Active Customers</Label>
                    <Input
                      id="totalCustomers"
                      value={formData.totalCustomers}
                      onChange={(e) => handleInputChange('totalCustomers', e.target.value)}
                      placeholder="450"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="averageJobSize">Average Job Size</Label>
                    <Input
                      id="averageJobSize"
                      value={formData.averageJobSize}
                      onChange={(e) => handleInputChange('averageJobSize', e.target.value)}
                      placeholder="$5,500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerRetentionRate">Customer Retention Rate (%)</Label>
                    <Input
                      id="customerRetentionRate"
                      value={formData.customerRetentionRate}
                      onChange={(e) => handleInputChange('customerRetentionRate', e.target.value)}
                      placeholder="85%"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="topCustomerPercent">Top Customer Revenue (%)</Label>
                    <Input
                      id="topCustomerPercent"
                      value={formData.topCustomerPercent}
                      onChange={(e) => handleInputChange('topCustomerPercent', e.target.value)}
                      placeholder="8%"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Operations Tab */}
            <TabsContent value="operations" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="teamSize">Full-Time Employees</Label>
                  <Input
                    id="teamSize"
                    value={formData.teamSize}
                    onChange={(e) => handleInputChange('teamSize', e.target.value)}
                    placeholder="12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subcontractors">Active Subcontractors</Label>
                  <Input
                    id="subcontractors"
                    value={formData.subcontractors}
                    onChange={(e) => handleInputChange('subcontractors', e.target.value)}
                    placeholder="25"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Markets Served</Label>
                {formData.marketsServed.map((market, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={market}
                      onChange={(e) => handleArrayChange('marketsServed', index, e.target.value)}
                      placeholder="e.g., Austin, TX Metro"
                    />
                    {formData.marketsServed.length > 1 && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeArrayItem('marketsServed', index)}
                      >
                        ×
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayItem('marketsServed')}
                >
                  Add Market
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label>Licensed States</Label>
                {formData.licensedStates.map((state, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={state}
                      onChange={(e) => handleArrayChange('licensedStates', index, e.target.value)}
                      placeholder="e.g., Texas"
                    />
                    {formData.licensedStates.length > 1 && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeArrayItem('licensedStates', index)}
                      >
                        ×
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayItem('licensedStates')}
                >
                  Add State
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label>Technology Stack</Label>
                {formData.techStack.map((tech, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={tech}
                      onChange={(e) => handleArrayChange('techStack', index, e.target.value)}
                      placeholder="e.g., ServiceTitan, QuickBooks, Slack"
                    />
                    {formData.techStack.length > 1 && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeArrayItem('techStack', index)}
                      >
                        ×
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayItem('techStack')}
                >
                  Add Technology
                </Button>
              </div>
            </TabsContent>

            {/* Growth Tab */}
            <TabsContent value="growth" className="space-y-6">
              <div className="space-y-2">
                <Label>Growth Opportunities</Label>
                <p className="text-sm text-muted-foreground">
                  List untapped opportunities the buyer could pursue
                </p>
                {formData.growthOpportunities.map((opportunity, index) => (
                  <div key={index} className="flex gap-2">
                    <Textarea
                      value={opportunity}
                      onChange={(e) => handleArrayChange('growthOpportunities', index, e.target.value)}
                      placeholder="e.g., Expand into Dallas market (est. $500K revenue potential)"
                      rows={2}
                    />
                    {formData.growthOpportunities.length > 1 && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeArrayItem('growthOpportunities', index)}
                      >
                        ×
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayItem('growthOpportunities')}
                >
                  Add Opportunity
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label>Competitive Advantages</Label>
                <p className="text-sm text-muted-foreground">
                  What makes your business defensible and valuable
                </p>
                {formData.competitiveAdvantages.map((advantage, index) => (
                  <div key={index} className="flex gap-2">
                    <Textarea
                      value={advantage}
                      onChange={(e) => handleArrayChange('competitiveAdvantages', index, e.target.value)}
                      placeholder="e.g., Proprietary lead generation system generating 50+ leads/month"
                      rows={2}
                    />
                    {formData.competitiveAdvantages.length > 1 && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeArrayItem('competitiveAdvantages', index)}
                      >
                        ×
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayItem('competitiveAdvantages')}
                >
                  Add Advantage
                </Button>
              </div>
            </TabsContent>

            {/* Sale Details Tab */}
            <TabsContent value="sale" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="askingPrice">Asking Price</Label>
                  <Input
                    id="askingPrice"
                    value={formData.askingPrice}
                    onChange={(e) => handleInputChange('askingPrice', e.target.value)}
                    placeholder="$2,500,000"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="financing">Seller Financing Available?</Label>
                  <Select
                    value={formData.financing}
                    onValueChange={(value) => handleInputChange('financing', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select financing option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No seller financing</SelectItem>
                      <SelectItem value="partial">Up to 20% seller financing</SelectItem>
                      <SelectItem value="flexible">Flexible on terms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reasonForSale">Reason for Sale</Label>
                <Textarea
                  id="reasonForSale"
                  value={formData.reasonForSale}
                  onChange={(e) => handleInputChange('reasonForSale', e.target.value)}
                  placeholder="e.g., Looking to pursue other business opportunities..."
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="transitionPeriod">Transition Support Offered</Label>
                <Textarea
                  id="transitionPeriod"
                  value={formData.transitionPeriod}
                  onChange={(e) => handleInputChange('transitionPeriod', e.target.value)}
                  placeholder="e.g., 90-day transition period included, additional consulting available"
                  rows={2}
                />
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Style Selector */}
          <div className="mt-8 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Pitch Deck Style</Label>
                {generatedPDF && (
                  <span className="text-xs text-muted-foreground">
                    Changes will auto-regenerate the PDF
                  </span>
                )}
              </div>
              <Select
                value={deckStyle}
                onValueChange={setDeckStyle}
              >
                <SelectTrigger className="w-full md:w-[300px]">
                  <SelectValue placeholder="Select a style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="silicon-valley">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🚀</span>
                      <div>
                        <div className="font-medium">Silicon Valley</div>
                        <div className="text-xs text-muted-foreground">Modern, bold, gradient-heavy</div>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="investment-banking">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🏛️</span>
                      <div>
                        <div className="font-medium">Investment Banking</div>
                        <div className="text-xs text-muted-foreground">Conservative, data-focused</div>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="visual">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🎨</span>
                      <div>
                        <div className="font-medium">Visual Impact</div>
                        <div className="text-xs text-muted-foreground">Graphics-heavy, colorful</div>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="modern">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">📊</span>
                      <div>
                        <div className="font-medium">Modern Charts</div>
                        <div className="text-xs text-muted-foreground">Data viz with Chart.js</div>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Style Preview */}
            <StylePreview 
              selectedStyle={deckStyle}
              onStyleChange={setDeckStyle}
            />
            
            {/* Generated PDF Status */}
            {generatedPDF && (
              <div className="mt-4 p-4 bg-success-green/10 border border-success-green/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-success-green" />
                    <div>
                      <p className="text-sm font-medium text-success-green">PDF Generated Successfully</p>
                      <p className="text-xs text-white/60">Style: {deckStyle.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      document.getElementById('pdf-viewer')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-success-green hover:text-success-green/80"
                  >
                    Scroll to PDF
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-8">
            <Button 
              variant="secondary" 
              onClick={fillExampleData}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Fill with Example Data
            </Button>
            
            <div className="flex gap-4">
              <Button variant="outline" disabled>
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button 
                onClick={generatePitchDeck}
                disabled={isGenerating || !formData.companyName}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {generatedPDF ? 'Regenerating...' : 'Generating...'}
                  </>
                ) : (
                  <>
                    {generatedPDF ? (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Regenerate PDF
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Generate PDF
                      </>
                    )}
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      
      {/* PDF Viewer Section */}
      {generatedPDF && (
        <Card id="pdf-viewer" className="overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Generated Pitch Deck</CardTitle>
                <CardDescription>
                  Style: {deckStyle.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setGeneratedPDF(null);
                  }}
                >
                  Clear
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[800px] w-full relative">
              {isGenerating && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    <p className="text-sm font-medium">Regenerating with {deckStyle.replace('-', ' ')} style...</p>
                  </div>
                </div>
              )}
              <PDFViewer
                file={generatedPDF}
                fileName={pdfFileName}
                className="h-full"
                showThumbnails={false}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}