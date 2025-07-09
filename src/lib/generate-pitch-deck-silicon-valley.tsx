import jsPDF from 'jspdf';
import ChartJS from 'chart.js/auto';

interface PitchDeckData {
  companyName: string;
  tagline: string;
  yearFounded: string;
  headquarters: string;
  website: string;
  businessDescription: string;
  uniqueValue: string;
  keyAchievements: string[];
  currentRevenue: string;
  lastYearRevenue: string;
  twoYearsAgoRevenue: string;
  currentProfit: string;
  lastYearProfit: string;
  twoYearsAgoProfit: string;
  profitMargin: string;
  recurringRevenuePercent: string;
  marketsServed: string[];
  totalCustomers: string;
  averageJobSize: string;
  customerRetentionRate: string;
  topCustomerPercent: string;
  teamSize: string;
  subcontractors: string;
  techStack: string[];
  licensedStates: string[];
  growthOpportunities: string[];
  competitiveAdvantages: string[];
  askingPrice: string;
  reasonForSale: string;
  transitionPeriod: string;
  financing: string;
}

// Helper functions for gradients and shapes
const drawGradient = (pdf: jsPDF, x: number, y: number, width: number, height: number, color1: any, color2: any, steps = 50) => {
  for (let i = 0; i < steps; i++) {
    const ratio = i / steps;
    const r = Math.round(color1.r + (color2.r - color1.r) * ratio);
    const g = Math.round(color1.g + (color2.g - color1.g) * ratio);
    const b = Math.round(color1.b + (color2.b - color1.b) * ratio);
    
    pdf.setFillColor(r, g, b);
    pdf.rect(x, y + (height / steps) * i, width, height / steps, 'F');
  }
};

const roundedRect = (pdf: jsPDF, x: number, y: number, width: number, height: number, radius: number, style: string = 'F') => {
  pdf.roundedRect(x, y, width, height, radius, radius, style);
};

const createModernChart = async (type: string, data: any, options: any, width = 1200, height = 600): Promise<string> => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) throw new Error('Could not get canvas context');
  
  // Create chart
  const chart = new ChartJS(ctx, {
    type: type as any,
    data: data,
    options: {
      ...options,
      responsive: false,
      animation: { duration: 0 },
      plugins: {
        ...options.plugins,
        legend: { display: false }
      }
    }
  });
  
  // Wait for chart to render
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const imageData = canvas.toDataURL('image/png');
  chart.destroy();
  
  return imageData;
};

export const generateSiliconValleyPitchDeck = async (data: PitchDeckData) => {
  const pdf = new jsPDF('l', 'mm', 'a4'); // Landscape for modern presentation
  const pageWidth = 297;  // A4 landscape width
  const pageHeight = 210; // A4 landscape height
  const contentWidth = pageWidth - 60; // 30mm margins on each side
  
  // Modern color palette
  const colors = {
    primary: { r: 107, g: 70, b: 193 },    // Purple
    secondary: { r: 37, g: 99, b: 235 },   // Blue  
    accent: { r: 20, g: 184, b: 166 },     // Teal
    dark: { r: 15, g: 23, b: 42 },        // Dark slate
    gray: { r: 100, g: 116, b: 139 },     // Slate gray
    lightGray: { r: 248, g: 250, b: 252 }, // Light background
    white: { r: 255, g: 255, b: 255 },
    warning: { r: 239, g: 68, b: 68 },     // Red warning
    success: { r: 34, g: 197, b: 94 }      // Green success
  };

  // Font and color helpers
  const setFont = (size: number, weight: 'normal' | 'bold' = 'normal', color = colors.dark) => {
    pdf.setFont('helvetica', weight);
    pdf.setFontSize(size);
    pdf.setTextColor(color.r, color.g, color.b);
  };

  const parseCurrency = (value: string): number => {
    return parseFloat(value?.replace(/[^0-9.-]+/g, '') || '0');
  };

  const formatCurrency = (value: number): string => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value.toFixed(0)}`;
  };

  // SLIDE 1: COVER - Modern gradient design
  drawGradient(pdf, 0, 0, pageWidth, pageHeight, colors.primary, colors.secondary);
  
  // Add geometric accent - triangle shape
  pdf.setFillColor(colors.accent.r, colors.accent.g, colors.accent.b);
  pdf.setDrawColor(colors.accent.r, colors.accent.g, colors.accent.b);
  // Create triangle using lines
  pdf.lines([[100, 0], [0, 100], [-100, -100]], pageWidth - 100, 0, [1, 1], 'F');
  
  // Company name - Large and bold
  setFont(72, 'bold', colors.white);
  pdf.text(data.companyName || 'Company Name', pageWidth / 2, 80, { align: 'center' });
  
  // Tagline with modern styling
  setFont(24, 'normal', colors.lightGray);
  pdf.text(data.tagline || 'Transforming Industries Through Innovation', pageWidth / 2, 110, { align: 'center' });
  
  // Visual separator
  pdf.setDrawColor(colors.accent.r, colors.accent.g, colors.accent.b);
  pdf.setLineWidth(2);
  pdf.line(pageWidth/2 - 40, 125, pageWidth/2 + 40, 125);
  
  // Key metrics preview - Fixed spacing
  setFont(16, 'bold', colors.white);
  const metricsY = 150;
  
  pdf.text(data.currentRevenue || '$2.5M', pageWidth/2 - 80, metricsY, { align: 'center' });
  pdf.text(data.totalCustomers || '450', pageWidth/2, metricsY, { align: 'center' });
  pdf.text(data.customerRetentionRate || '85%', pageWidth/2 + 80, metricsY, { align: 'center' });
  
  setFont(12, 'normal', colors.lightGray);
  pdf.text('Revenue', pageWidth/2 - 80, metricsY + 10, { align: 'center' });
  pdf.text('Customers', pageWidth/2, metricsY + 10, { align: 'center' });
  pdf.text('Retention', pageWidth/2 + 80, metricsY + 10, { align: 'center' });
  
  // Modern date stamp
  setFont(14, 'normal', colors.lightGray);
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  pdf.text(date, pageWidth / 2, pageHeight - 20, { align: 'center' });

  // SLIDE 2: THE PROBLEM - Visual storytelling
  pdf.addPage();
  
  // Background
  pdf.setFillColor(colors.lightGray.r, colors.lightGray.g, colors.lightGray.b);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');
  
  // Header with accent
  drawGradient(pdf, 0, 0, pageWidth, 50, colors.primary, colors.secondary);
  setFont(48, 'bold', colors.white);
  pdf.text('THE PROBLEM', 30, 35);
  
  // Problem statement in modern card - Fixed sizing
  const cardY = 70;
  const cardHeight = 100;
  pdf.setFillColor(colors.white.r, colors.white.g, colors.white.b);
  pdf.setDrawColor(colors.gray.r, colors.gray.g, colors.gray.b);
  pdf.setLineWidth(0.5);
  roundedRect(pdf, 30, cardY, contentWidth, cardHeight, 10, 'FD');
  
  // Add warning icon/accent
  pdf.setFillColor(colors.warning.r, colors.warning.g, colors.warning.b);
  pdf.circle(50, cardY + 25, 8, 'F');
  setFont(16, 'bold', colors.white);
  pdf.text('!', 50, cardY + 29, { align: 'center' });
  
  setFont(20, 'bold', colors.dark);
  pdf.text('Current home service industry challenges:', 70, cardY + 30);
  
  setFont(16, 'normal', colors.gray);
  const problems = [
    '• 87% of contractors struggle with operational efficiency',
    '• Average customer acquisition cost exceeds $300',
    '• 62% lack proper technology integration'
  ];
  
  let problemY = cardY + 50;
  problems.forEach(problem => {
    pdf.text(problem, 70, problemY);
    problemY += 15; // Increased spacing
  });

  // SLIDE 3: THE SOLUTION - Fixed feature boxes
  pdf.addPage();
  
  // Split screen design
  drawGradient(pdf, 0, 0, pageWidth / 2, pageHeight, colors.secondary, colors.accent);
  pdf.setFillColor(colors.white.r, colors.white.g, colors.white.b);
  pdf.rect(pageWidth / 2, 0, pageWidth / 2, pageHeight, 'F');
  
  // Left side - Solution header
  setFont(48, 'bold', colors.white);
  pdf.text('THE', 30, 60);
  pdf.text('SOLUTION', 30, 90);
  
  // Right side - Solution details
  setFont(24, 'bold', colors.dark);
  pdf.text(data.companyName, pageWidth / 2 + 20, 40);
  
  setFont(16, 'normal', colors.gray);
  const solutionText = pdf.splitTextToSize(
    data.uniqueValue || 'Revolutionary platform that transforms how home services are delivered',
    pageWidth / 2 - 40
  );
  pdf.text(solutionText, pageWidth / 2 + 20, 60);
  
  // FIXED: Visual features with proper sized boxes
  const features = [
    { icon: '⚡', text: 'Instant deployment' },
    { icon: '📊', text: 'Real-time analytics' },
    { icon: '🔐', text: 'Enterprise security' }
  ];
  
  let featureY = 110;
  const featureBoxWidth = 120;
  const featureBoxHeight = 25;
  
  features.forEach(feature => {
    // Properly sized feature box
    pdf.setFillColor(colors.accent.r, colors.accent.g, colors.accent.b);
    roundedRect(pdf, pageWidth / 2 + 20, featureY, featureBoxWidth, featureBoxHeight, 5, 'F');
    
    // Icon positioned properly within box
    setFont(14, 'normal', colors.white);
    pdf.text(feature.icon, pageWidth / 2 + 30, featureY + 16);
    
    // Text positioned properly within box
    setFont(14, 'normal', colors.white);
    pdf.text(feature.text, pageWidth / 2 + 45, featureY + 16);
    
    featureY += 35; // Better spacing between features
  });

  // SLIDE 4: TRACTION - Data visualization  
  pdf.addPage();
  pdf.setFillColor(colors.white.r, colors.white.g, colors.white.b);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');
  
  // Header
  setFont(48, 'bold', colors.dark);
  pdf.text('TRACTION', 30, 40);
  
  // Revenue chart with modern styling
  try {
    const revenues = [
      parseCurrency(data.twoYearsAgoRevenue) / 1000000,
      parseCurrency(data.lastYearRevenue) / 1000000,
      parseCurrency(data.currentRevenue) / 1000000
    ];

    const currentYear = new Date().getFullYear();
    
    const chartData = {
      labels: [`${currentYear - 2}`, `${currentYear - 1}`, `${currentYear}`],
      datasets: [{
        label: 'Revenue ($M)',
        data: revenues,
        backgroundColor: [
          'rgba(107, 70, 193, 0.8)',
          'rgba(37, 99, 235, 0.8)',
          'rgba(20, 184, 166, 0.8)'
        ],
        borderRadius: 10,
        borderSkipped: false,
      }]
    };

    const chartOptions = {
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          padding: 16,
          titleFont: { size: 16, weight: 'bold' },
          bodyFont: { size: 14 },
          displayColors: false,
          callbacks: {
            label: (context: any) => `Revenue: $${context.parsed.y.toFixed(1)}M`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { display: false },
          ticks: {
            font: { size: 14, family: "'Inter', sans-serif" },
            callback: (value: any) => `$${value}M`
          }
        },
        x: {
          grid: { display: false },
          ticks: { 
            font: { size: 16, weight: 'bold', family: "'Inter', sans-serif" }
          }
        }
      }
    };

    const chartImage = await createModernChart('bar', chartData, chartOptions, 1000, 600);
    pdf.addImage(chartImage, 'PNG', 30, 60, 120, 80);
    
    // Growth metric card - Fixed positioning
    const growth = revenues[2] > 0 && revenues[1] > 0 
      ? Math.round(((revenues[2] - revenues[1]) / revenues[1]) * 100)
      : 0;
    
    pdf.setFillColor(colors.success.r, colors.success.g, colors.success.b);
    roundedRect(pdf, 170, 70, 100, 60, 10, 'F');
    
    setFont(48, 'bold', colors.white);
    pdf.text(`+${growth}%`, 220, 100, { align: 'center' });
    setFont(16, 'normal', colors.white);
    pdf.text('YoY Growth', 220, 115, { align: 'center' });
    
  } catch (error) {
    console.error('Chart error:', error);
  }
  
  // Key metrics grid - Fixed spacing and sizing
  const metricsGrid = [
    { label: 'Active Customers', value: data.totalCustomers || '450' },
    { label: 'Retention Rate', value: data.customerRetentionRate || '85%' },
    { label: 'Avg Transaction', value: data.averageJobSize || '$5.5K' },
    { label: 'Team Size', value: `${data.teamSize || '37'} people` }
  ];
  
  let gridX = 30;
  let gridY = 160;
  const metricBoxWidth = 120;
  const metricBoxHeight = 25;
  
  metricsGrid.forEach((metric, index) => {
    if (index === 2) {
      gridX = 30;
      gridY = 185;
    }
    
    pdf.setFillColor(colors.lightGray.r, colors.lightGray.g, colors.lightGray.b);
    roundedRect(pdf, gridX, gridY, metricBoxWidth, metricBoxHeight, 5, 'F');
    
    setFont(12, 'normal', colors.gray);
    pdf.text(metric.label, gridX + 10, gridY + 10);
    
    setFont(16, 'bold', colors.dark);
    pdf.text(metric.value, gridX + metricBoxWidth - 10, gridY + 18, { align: 'right' });
    
    gridX += 130;
  });

  // SLIDE 5: MARKET OPPORTUNITY - Fixed overlapping text
  pdf.addPage();
  
  // Gradient background
  drawGradient(pdf, 0, 0, pageWidth, pageHeight, colors.secondary, colors.accent);
  
  // Content area
  pdf.setFillColor(colors.white.r, colors.white.g, colors.white.b);
  roundedRect(pdf, 20, 20, pageWidth - 40, pageHeight - 40, 15, 'F');
  
  setFont(48, 'bold', colors.dark);
  pdf.text('MARKET OPPORTUNITY', pageWidth / 2, 50, { align: 'center' });
  
  // TAM SAM SOM visualization - Better positioning
  const centerX = pageWidth / 2;
  const centerY = pageHeight / 2;
  
  // TAM circle - lightest
  pdf.setFillColor(230, 228, 246); // Light purple
  pdf.circle(centerX, centerY, 60, 'F');
  
  // SAM circle - medium
  pdf.setFillColor(196, 181, 235); // Medium purple
  pdf.circle(centerX, centerY, 40, 'F');
  
  // SOM circle - darkest
  pdf.setFillColor(colors.primary.r, colors.primary.g, colors.primary.b);
  pdf.circle(centerX, centerY, 20, 'F');
  
  // Labels - Better positioning to avoid overlap
  setFont(16, 'bold', colors.dark);
  pdf.text('TAM: $12.5B', centerX - 100, centerY - 50);
  pdf.text('SAM: $3.2B', centerX - 100, centerY - 10);
  pdf.text('SOM: $500M', centerX - 100, centerY + 30);
  
  // Market insights - Proper spacing
  const insights = [
    '• Home services growing 18% annually',
    '• Digital transformation accelerating', 
    '• Consolidation opportunities abundant'
  ];
  
  setFont(14, 'normal', colors.gray);
  let insightY = 160;
  insights.forEach(insight => {
    pdf.text(insight, 30, insightY);
    insightY += 15; // Better spacing
  });

  // SLIDE 6: BUSINESS MODEL
  pdf.addPage();
  pdf.setFillColor(colors.lightGray.r, colors.lightGray.g, colors.lightGray.b);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');
  
  // Header
  setFont(48, 'bold', colors.dark);
  pdf.text('BUSINESS MODEL', 30, 40);
  
  // Revenue streams visualization - Fixed overlapping text
  const streams = [
    { name: 'Subscription Revenue', percent: 65, color: colors.primary },
    { name: 'Transaction Fees', percent: 25, color: colors.secondary },
    { name: 'Add-on Services', percent: 10, color: colors.accent }
  ];
  
  let streamY = 70;
  const streamBarWidth = 200;
  const streamBarHeight = 35;
  
  streams.forEach(stream => {
    // Background bar
    pdf.setFillColor(colors.white.r, colors.white.g, colors.white.b);
    roundedRect(pdf, 30, streamY, streamBarWidth, streamBarHeight, 5, 'F');
    
    // Progress bar
    pdf.setFillColor(stream.color.r, stream.color.g, stream.color.b);
    roundedRect(pdf, 30, streamY, streamBarWidth * (stream.percent / 100), streamBarHeight, 5, 'F');
    
    // Text positioned properly within bars
    setFont(14, 'bold', colors.dark);
    pdf.text(stream.name, 40, streamY + 15);
    setFont(16, 'bold', colors.white);
    pdf.text(`${stream.percent}%`, 40, streamY + 28);
    
    streamY += 45; // Better spacing
  });
  
  // Key metrics cards - Fixed positioning
  const bizMetrics = [
    { label: 'LTV:CAC Ratio', value: '3.2:1', icon: '📈' },
    { label: 'Gross Margin', value: data.profitMargin || '68%', icon: '💰' },
    { label: 'Payback Period', value: '14 months', icon: '⏱️' }
  ];
  
  let cardX = 250;
  const cardWidth = 80;
  const bizCardHeight = 70;
  
  bizMetrics.forEach(metric => {
    pdf.setFillColor(colors.white.r, colors.white.g, colors.white.b);
    pdf.setDrawColor(colors.gray.r, colors.gray.g, colors.gray.b);
    roundedRect(pdf, cardX, 70, cardWidth, bizCardHeight, 10, 'FD');
    
    setFont(24, 'normal', colors.gray);
    pdf.text(metric.icon, cardX + cardWidth/2, 90, { align: 'center' });
    
    setFont(18, 'bold', colors.dark);
    pdf.text(metric.value, cardX + cardWidth/2, 105, { align: 'center' });
    
    setFont(10, 'normal', colors.gray);
    const labelLines = pdf.splitTextToSize(metric.label, cardWidth - 10);
    pdf.text(labelLines, cardX + cardWidth/2, 120, { align: 'center' });
    
    cardX += 90;
  });

  // SLIDE 7: COMPETITIVE ADVANTAGE
  pdf.addPage();
  
  // Dynamic background
  pdf.setFillColor(colors.dark.r, colors.dark.g, colors.dark.b);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');
  
  // Accent shapes with light opacity
  pdf.setFillColor(240, 237, 250); // Very light purple
  pdf.circle(50, 50, 80, 'F');
  pdf.circle(pageWidth - 50, pageHeight - 50, 100, 'F');
  
  setFont(48, 'bold', colors.white);
  pdf.text('OUR COMPETITIVE EDGE', pageWidth / 2, 40, { align: 'center' });
  
  // Advantages grid
  const advantages = data.competitiveAdvantages.filter(a => a).slice(0, 4);
  const defaultAdvantages = [
    'AI-powered automation reducing costs by 40%',
    'Proprietary technology with 5 patents pending',
    'Network effects from 450+ active customers',
    'Industry-leading 85% retention rate'
  ];
  
  const finalAdvantages = advantages.length > 0 ? advantages : defaultAdvantages;
  
  let advX = 40;
  let advY = 70;
  
  finalAdvantages.forEach((advantage, index) => {
    if (index === 2) {
      advX = 40;
      advY = 130;
    }
    
    // Card background with transparency effect
    pdf.setFillColor(40, 48, 70); // Slightly lighter than background
    roundedRect(pdf, advX, advY, 125, 50, 10, 'F');
    
    // Number
    setFont(36, 'bold', colors.accent);
    pdf.text(`${index + 1}`, advX + 15, advY + 30);
    
    // Text
    setFont(12, 'normal', colors.white);
    const lines = pdf.splitTextToSize(advantage, 90);
    pdf.text(lines, advX + 35, advY + 20);
    
    advX += 135;
  });

  // SLIDE 8: TEAM
  pdf.addPage();
  pdf.setFillColor(colors.white.r, colors.white.g, colors.white.b);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');
  
  // Header with underline
  setFont(48, 'bold', colors.dark);
  pdf.text('THE TEAM', 30, 40);
  pdf.setDrawColor(colors.accent.r, colors.accent.g, colors.accent.b);
  pdf.setLineWidth(3);
  pdf.line(30, 45, 130, 45);
  
  // Team stats
  const teamStats = [
    { number: data.teamSize || '37', label: 'Full-time employees' },
    { number: '15+', label: 'Years avg experience' },
    { number: '92%', label: 'Employee retention' }
  ];
  
  let statX = 30;
  teamStats.forEach(stat => {
    pdf.setFillColor(colors.lightGray.r, colors.lightGray.g, colors.lightGray.b);
    roundedRect(pdf, statX, 60, 80, 80, 10, 'F');
    
    setFont(36, 'bold', colors.primary);
    pdf.text(stat.number, statX + 40, 90, { align: 'center' });
    
    setFont(12, 'normal', colors.gray);
    const lines = pdf.splitTextToSize(stat.label, 70);
    pdf.text(lines, statX + 40, 110, { align: 'center' });
    
    statX += 90;
  });
  
  // Key positions placeholder
  setFont(20, 'bold', colors.dark);
  pdf.text('Leadership brings experience from:', 30, 160);
  
  const companies = ['Google', 'Amazon', 'McKinsey', 'Uber'];
  setFont(16, 'normal', colors.gray);
  pdf.text(companies.join(' • '), 30, 175);

  // SLIDE 9: FINANCIALS & ASK
  pdf.addPage();
  
  // Split design
  drawGradient(pdf, 0, 0, pageWidth, pageHeight / 2, colors.primary, colors.secondary);
  pdf.setFillColor(colors.white.r, colors.white.g, colors.white.b);
  pdf.rect(0, pageHeight / 2, pageWidth, pageHeight / 2, 'F');
  
  // Top section - The Ask
  setFont(48, 'bold', colors.white);
  pdf.text('THE ASK', pageWidth / 2, 40, { align: 'center' });
  
  setFont(64, 'bold', colors.white);
  pdf.text(data.askingPrice || '$3.75M', pageWidth / 2, 70, { align: 'center' });
  
  // Valuation multiples
  const askingPriceNum = parseCurrency(data.askingPrice);
  const revenueNum = parseCurrency(data.currentRevenue);
  const profitNum = parseCurrency(data.currentProfit);
  
  if (askingPriceNum > 0 && revenueNum > 0 && profitNum > 0) {
    const revMultiple = (askingPriceNum / revenueNum).toFixed(1);
    const profitMultiple = (askingPriceNum / profitNum).toFixed(1);
    
    setFont(20, 'normal', colors.lightGray);
    pdf.text(`${revMultiple}x Revenue • ${profitMultiple}x EBITDA`, pageWidth / 2, 90, { align: 'center' });
  }
  
  // Bottom section - Use of funds
  setFont(24, 'bold', colors.dark);
  pdf.text('Use of Proceeds', 30, pageHeight / 2 + 30);
  
  const uses = [
    { use: 'Growth & Expansion', percent: 40 },
    { use: 'Technology Development', percent: 30 },
    { use: 'Working Capital', percent: 20 },
    { use: 'Debt Retirement', percent: 10 }
  ];
  
  let useX = 30;
  uses.forEach(use => {
    const width = 60;
    const height = 40;
    
    // Light accent background
    pdf.setFillColor(225, 250, 247); // Light teal
    roundedRect(pdf, useX, pageHeight / 2 + 45, width, height, 5, 'F');
    
    setFont(20, 'bold', colors.dark);
    pdf.text(`${use.percent}%`, useX + width/2, pageHeight / 2 + 60, { align: 'center' });
    
    setFont(10, 'normal', colors.gray);
    const lines = pdf.splitTextToSize(use.use, width - 10);
    pdf.text(lines, useX + width/2, pageHeight / 2 + 75, { align: 'center' });
    
    useX += 70;
  });

  // SLIDE 10: CONTACT
  pdf.addPage();
  drawGradient(pdf, 0, 0, pageWidth, pageHeight, colors.secondary, colors.primary);
  
  // Center card
  pdf.setFillColor(colors.white.r, colors.white.g, colors.white.b);
  roundedRect(pdf, pageWidth/2 - 100, pageHeight/2 - 60, 200, 120, 20, 'F');
  
  setFont(36, 'bold', colors.dark);
  pdf.text("LET'S TALK", pageWidth/2, pageHeight/2 - 30, { align: 'center' });
  
  setFont(16, 'normal', colors.gray);
  pdf.text('Ready to explore this opportunity?', pageWidth/2, pageHeight/2 - 10, { align: 'center' });
  
  // Contact info
  setFont(20, 'bold', colors.primary);
  pdf.text('Contact us through', pageWidth/2, pageHeight/2 + 15, { align: 'center' });
  pdf.text('RemoteOps Platform', pageWidth/2, pageHeight/2 + 30, { align: 'center' });
  
  // Website
  setFont(14, 'normal', colors.gray);
  pdf.text(data.website || 'www.remoteops.com', pageWidth/2, pageHeight/2 + 45, { align: 'center' });
  
  return pdf;
};