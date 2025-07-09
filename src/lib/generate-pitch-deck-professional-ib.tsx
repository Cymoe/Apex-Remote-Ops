import jsPDF from 'jspdf';

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

export const generateProfessionalIBPitchDeck = async (data: PitchDeckData) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 25;
  const contentWidth = pageWidth - (2 * margin);
  
  // Professional color palette - Investment Banking standard
  const colors = {
    primary: { r: 30, g: 64, b: 175 },     // Professional blue
    dark: { r: 15, g: 23, b: 42 },        // Almost black
    accent: { r: 5, g: 150, b: 105 },      // Subtle green
    gray: { r: 100, g: 116, b: 139 },     // Text gray
    lightGray: { r: 248, g: 250, b: 252 }, // Background gray
    white: { r: 255, g: 255, b: 255 },
    border: { r: 229, g: 231, b: 235 }     // Border gray
  };

  // Helper functions
  const setTextColor = (color: any) => pdf.setTextColor(color.r, color.g, color.b);
  const setFillColor = (color: any) => pdf.setFillColor(color.r, color.g, color.b);
  const setDrawColor = (color: any) => pdf.setDrawColor(color.r, color.g, color.b);

  // Typography settings
  const setHeaderFont = (size: number) => {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(size);
    setTextColor(colors.dark);
  };

  const setBodyFont = (size: number = 10) => {
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(size);
    setTextColor(colors.dark);
  };

  const setSubtitleFont = (size: number = 9) => {
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(size);
    setTextColor(colors.gray);
  };

  // Layout helpers
  const drawLine = (y: number, color = colors.border) => {
    setDrawColor(color);
    pdf.setLineWidth(0.5);
    pdf.line(margin, y, pageWidth - margin, y);
  };

  const drawBox = (x: number, y: number, w: number, h: number, fillColor?: any, borderColor = colors.border) => {
    if (fillColor) {
      setFillColor(fillColor);
      pdf.rect(x, y, w, h, 'F');
    }
    setDrawColor(borderColor);
    pdf.setLineWidth(0.5);
    pdf.rect(x, y, w, h, 'S');
  };

  // Parse currency values
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

  const formatPercent = (value: string): string => {
    const num = parseFloat(value?.replace(/[^0-9.-]+/g, '') || '0');
    return `${num.toFixed(1)}%`;
  };

  // PAGE 1: COVER PAGE - Clean and minimal
  setFillColor(colors.white);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  // Top border line
  setFillColor(colors.primary);
  pdf.rect(0, 0, pageWidth, 3, 'F');

  // Company name
  setHeaderFont(36);
  pdf.text(data.companyName || 'Company Name', pageWidth / 2, 80, { align: 'center' });

  // Subtitle
  setBodyFont(16);
  setTextColor(colors.gray);
  pdf.text(data.tagline || 'Company Tagline', pageWidth / 2, 95, { align: 'center' });

  // Document type
  drawLine(120);
  setBodyFont(14);
  setTextColor(colors.dark);
  pdf.text('CONFIDENTIAL INFORMATION MEMORANDUM', pageWidth / 2, 140, { align: 'center' });

  // Date
  setSubtitleFont(12);
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  pdf.text(currentDate, pageWidth / 2, 155, { align: 'center' });

  // Footer
  setSubtitleFont(10);
  pdf.text('Prepared for: Prospective Acquirers', margin, pageHeight - 30);
  pdf.text('Strictly Private & Confidential', pageWidth - margin, pageHeight - 30, { align: 'right' });

  // PAGE 2: EXECUTIVE SUMMARY
  pdf.addPage();
  let yPos = margin;

  // Header
  setHeaderFont(22);
  pdf.text('Executive Summary', margin, yPos);
  yPos += 7;
  drawLine(yPos);
  yPos += 10;

  // Key Investment Highlights Box
  drawBox(margin, yPos, contentWidth, 55, colors.lightGray);
  yPos += 8;
  
  setHeaderFont(14);
  pdf.text('Investment Opportunity', margin + 10, yPos);
  yPos += 8;
  
  setBodyFont(11);
  const investmentHighlight = pdf.splitTextToSize(
    data.businessDescription || 
    'Established home service company with proven operational systems and strong market presence seeking strategic acquisition partner.',
    contentWidth - 20
  );
  pdf.text(investmentHighlight, margin + 10, yPos);
  yPos += investmentHighlight.length * 5 + 10;

  // Key Metrics Table
  setHeaderFont(16);
  pdf.text('Key Performance Metrics', margin, yPos);
  yPos += 8;

  // Metrics table header
  const colWidth = contentWidth / 4;
  drawBox(margin, yPos, contentWidth, 10, colors.primary);
  setBodyFont(11);
  setTextColor(colors.white);
  pdf.text('Metric', margin + 5, yPos + 7);
  pdf.text('Current', margin + colWidth + colWidth/2, yPos + 7, { align: 'center' });
  pdf.text('Prior Year', margin + colWidth * 2 + colWidth/2, yPos + 7, { align: 'center' });
  pdf.text('Growth', margin + colWidth * 3 + colWidth/2, yPos + 7, { align: 'center' });
  yPos += 10;

  // Revenue row
  drawBox(margin, yPos, contentWidth, 10);
  setTextColor(colors.dark);
  pdf.text('Revenue', margin + 5, yPos + 7);
  pdf.text(data.currentRevenue || 'N/A', margin + colWidth + colWidth/2, yPos + 7, { align: 'center' });
  pdf.text(data.lastYearRevenue || 'N/A', margin + colWidth * 2 + colWidth/2, yPos + 7, { align: 'center' });
  const revenueGrowth = data.currentRevenue && data.lastYearRevenue
    ? ((parseCurrency(data.currentRevenue) - parseCurrency(data.lastYearRevenue)) / parseCurrency(data.lastYearRevenue) * 100).toFixed(1)
    : '0';
  setTextColor(colors.accent);
  pdf.text(`+${revenueGrowth}%`, margin + colWidth * 3 + colWidth/2, yPos + 7, { align: 'center' });
  yPos += 10;

  // EBITDA row
  drawBox(margin, yPos, contentWidth, 10);
  setTextColor(colors.dark);
  pdf.text('EBITDA', margin + 5, yPos + 7);
  pdf.text(data.currentProfit || 'N/A', margin + colWidth + colWidth/2, yPos + 7, { align: 'center' });
  pdf.text(data.lastYearProfit || 'N/A', margin + colWidth * 2 + colWidth/2, yPos + 7, { align: 'center' });
  const profitGrowth = data.currentProfit && data.lastYearProfit
    ? ((parseCurrency(data.currentProfit) - parseCurrency(data.lastYearProfit)) / parseCurrency(data.lastYearProfit) * 100).toFixed(1)
    : '0';
  setTextColor(colors.accent);
  pdf.text(`+${profitGrowth}%`, margin + colWidth * 3 + colWidth/2, yPos + 7, { align: 'center' });
  yPos += 10;

  // Margin row
  drawBox(margin, yPos, contentWidth, 10);
  setTextColor(colors.dark);
  pdf.text('EBITDA Margin', margin + 5, yPos + 7);
  pdf.text(formatPercent(data.profitMargin), margin + colWidth + colWidth/2, yPos + 7, { align: 'center' });
  const lastYearMargin = data.lastYearProfit && data.lastYearRevenue
    ? (parseCurrency(data.lastYearProfit) / parseCurrency(data.lastYearRevenue) * 100).toFixed(1) + '%'
    : 'N/A';
  pdf.text(lastYearMargin, margin + colWidth * 2 + colWidth/2, yPos + 7, { align: 'center' });
  pdf.text('-', margin + colWidth * 3 + colWidth/2, yPos + 7, { align: 'center' });
  yPos += 15;

  // Key highlights section
  setHeaderFont(16);
  pdf.text('Investment Highlights', margin, yPos);
  yPos += 8;

  const highlights = data.keyAchievements.filter(a => a).slice(0, 4);
  highlights.forEach((highlight, index) => {
    // Bullet point
    setFillColor(colors.primary);
    pdf.circle(margin + 3, yPos - 1, 1.5, 'F');
    
    setBodyFont(10);
    setTextColor(colors.dark);
    const lines = pdf.splitTextToSize(highlight, contentWidth - 15);
    pdf.text(lines, margin + 10, yPos);
    yPos += lines.length * 4.5 + 2;
  });

  // PAGE 3: FINANCIAL ANALYSIS
  pdf.addPage();
  yPos = margin;

  setHeaderFont(24);
  pdf.text('Financial Analysis', margin, yPos);
  yPos += 8;
  drawLine(yPos);
  yPos += 15;

  // Historical Financial Performance
  setHeaderFont(16);
  pdf.text('Historical Financial Performance', margin, yPos);
  yPos += 10;

  // Financial table
  const finColWidth = contentWidth / 5;
  
  // Header row
  drawBox(margin, yPos, contentWidth, 10, colors.primary);
  setBodyFont(10);
  setTextColor(colors.white);
  pdf.text('($000s)', margin + 5, yPos + 7);
  
  const currentYear = new Date().getFullYear();
  pdf.text(`${currentYear}`, margin + finColWidth * 1.5, yPos + 7, { align: 'center' });
  pdf.text(`${currentYear - 1}`, margin + finColWidth * 2.5, yPos + 7, { align: 'center' });
  pdf.text(`${currentYear - 2}`, margin + finColWidth * 3.5, yPos + 7, { align: 'center' });
  pdf.text('CAGR', margin + finColWidth * 4.5, yPos + 7, { align: 'center' });
  yPos += 10;

  // Revenue row
  drawBox(margin, yPos, contentWidth, 10, colors.lightGray);
  setTextColor(colors.dark);
  setHeaderFont(11);
  pdf.text('Revenue', margin + 5, yPos + 7);
  setBodyFont(11);
  
  const revenues = [
    parseCurrency(data.currentRevenue) / 1000,
    parseCurrency(data.lastYearRevenue) / 1000,
    parseCurrency(data.twoYearsAgoRevenue) / 1000
  ];
  
  revenues.forEach((rev, index) => {
    pdf.text(rev.toFixed(0), margin + finColWidth * (index + 1.5), yPos + 7, { align: 'center' });
  });
  
  // Calculate CAGR
  const cagr = revenues[2] > 0 
    ? (Math.pow(revenues[0] / revenues[2], 1/2) - 1) * 100 
    : 0;
  setTextColor(colors.accent);
  pdf.text(`${cagr.toFixed(1)}%`, margin + finColWidth * 4.5, yPos + 7, { align: 'center' });
  yPos += 10;

  // EBITDA row
  drawBox(margin, yPos, contentWidth, 10);
  setTextColor(colors.dark);
  setHeaderFont(11);
  pdf.text('EBITDA', margin + 5, yPos + 7);
  setBodyFont(11);
  
  const profits = [
    parseCurrency(data.currentProfit) / 1000,
    parseCurrency(data.lastYearProfit) / 1000,
    parseCurrency(data.twoYearsAgoProfit) / 1000
  ];
  
  profits.forEach((profit, index) => {
    pdf.text(profit.toFixed(0), margin + finColWidth * (index + 1.5), yPos + 7, { align: 'center' });
  });
  
  const profitCagr = profits[2] > 0 
    ? (Math.pow(profits[0] / profits[2], 1/2) - 1) * 100 
    : 0;
  setTextColor(colors.accent);
  pdf.text(`${profitCagr.toFixed(1)}%`, margin + finColWidth * 4.5, yPos + 7, { align: 'center' });
  yPos += 10;

  // Margin row
  drawBox(margin, yPos, contentWidth, 10);
  setTextColor(colors.dark);
  setHeaderFont(11);
  pdf.text('EBITDA Margin %', margin + 5, yPos + 7);
  setBodyFont(11);
  
  const margins = revenues.map((rev, index) => 
    rev > 0 ? (profits[index] / rev * 100).toFixed(1) : '0.0'
  );
  
  margins.forEach((marginVal, index) => {
    pdf.text(`${marginVal}%`, margin + finColWidth * (index + 1.5), yPos + 7, { align: 'center' });
  });
  pdf.text('-', margin + finColWidth * 4.5, yPos + 7, { align: 'center' });
  yPos += 12;

  // Valuation Analysis
  setHeaderFont(14);
  pdf.text('Implied Valuation Analysis', margin, yPos);
  yPos += 7;

  // Valuation multiples
  const askingPriceNum = parseCurrency(data.askingPrice);
  const currentRevenueNum = parseCurrency(data.currentRevenue);
  const currentEBITDANum = parseCurrency(data.currentProfit);

  drawBox(margin, yPos, contentWidth, 40, colors.lightGray);
  yPos += 10;

  // Valuation metrics layout
  setBodyFont(12);
  const multColWidth = contentWidth / 3;
  
  // Headers
  setHeaderFont(11);
  pdf.text('Asking Price:', margin + 10, yPos);
  pdf.text('Revenue Multiple:', margin + 10 + multColWidth, yPos);
  pdf.text('EBITDA Multiple:', margin + 10 + multColWidth * 2, yPos);
  yPos += 8;

  // Values
  setHeaderFont(16);
  setTextColor(colors.primary);
  pdf.text(data.askingPrice || 'TBD', margin + 10, yPos);
  
  if (askingPriceNum > 0 && currentRevenueNum > 0) {
    pdf.text(`${(askingPriceNum / currentRevenueNum).toFixed(1)}x`, margin + 8 + multColWidth, yPos);
  } else {
    pdf.text('-', margin + 8 + multColWidth, yPos);
  }
  
  if (askingPriceNum > 0 && currentEBITDANum > 0) {
    pdf.text(`${(askingPriceNum / currentEBITDANum).toFixed(1)}x`, margin + 8 + multColWidth * 2, yPos);
  } else {
    pdf.text('-', margin + 8 + multColWidth * 2, yPos);
  }
  yPos += 15;

  // Revenue chart placeholder
  setHeaderFont(14);
  setTextColor(colors.dark);
  pdf.text('Revenue Trend', margin, yPos);
  yPos += 8;

  // Simple bar chart
  const chartHeight = 60;
  const barWidth = 30;
  const maxRevenue = Math.max(...revenues);
  
  drawBox(margin, yPos, contentWidth, chartHeight);
  
  revenues.forEach((rev, index) => {
    const barHeight = (rev / maxRevenue) * (chartHeight - 20);
    const xPos = margin + 20 + (index * 50);
    const yBarPos = yPos + chartHeight - 10 - barHeight;
    
    // Bar
    setFillColor(index === 0 ? colors.accent : colors.primary);
    pdf.rect(xPos, yBarPos, barWidth, barHeight, 'F');
    
    // Label
    setSubtitleFont(9);
    pdf.text(`${currentYear - (2 - index)}`, xPos + barWidth/2, yPos + chartHeight - 3, { align: 'center' });
    
    // Value
    setTextColor(colors.dark);
    pdf.text(`$${rev.toFixed(0)}K`, xPos + barWidth/2, yBarPos - 3, { align: 'center' });
  });

  // PAGE 4: BUSINESS OVERVIEW
  pdf.addPage();
  yPos = margin;

  setHeaderFont(22);
  pdf.text('Business Overview', margin, yPos);
  yPos += 7;
  drawLine(yPos);
  yPos += 12;

  // Company profile section
  setHeaderFont(14);
  pdf.text('Company Profile', margin, yPos);
  yPos += 8;

  // Profile details in a clean table format
  const profileData = [
    ['Founded:', data.yearFounded || 'N/A'],
    ['Headquarters:', data.headquarters || 'N/A'],
    ['Employees:', `${data.teamSize || '0'} FTE + ${data.subcontractors || '0'} contractors`],
    ['Markets Served:', data.marketsServed.filter(m => m).join(', ') || 'N/A'],
    ['Website:', data.website || 'N/A']
  ];

  const labelWidth = 40;
  profileData.forEach(([label, value]) => {
    drawBox(margin, yPos, contentWidth, 10);
    setHeaderFont(11);
    pdf.text(label, margin + 5, yPos + 7);
    setBodyFont(11);
    pdf.text(value, margin + labelWidth + 5, yPos + 7);
    yPos += 10;
  });
  yPos += 10;

  // Value Proposition
  setHeaderFont(14);
  pdf.text('Value Proposition', margin, yPos);
  yPos += 8;

  drawBox(margin, yPos, contentWidth, 50, colors.lightGray);
  setBodyFont(11);
  const valueLines = pdf.splitTextToSize(
    data.uniqueValue || 'Established market leader with scalable systems and proven profitability.',
    contentWidth - 20
  );
  pdf.text(valueLines, margin + 10, yPos + 10);
  yPos += 60;

  // Customer Metrics
  setHeaderFont(14);
  pdf.text('Customer Metrics', margin, yPos);
  yPos += 8;

  const metricsData = [
    { label: 'Total Customers', value: data.totalCustomers || 'N/A' },
    { label: 'Average Transaction Size', value: data.averageJobSize || 'N/A' },
    { label: 'Customer Retention Rate', value: formatPercent(data.customerRetentionRate) },
    { label: 'Customer Concentration', value: `Top customer: ${formatPercent(data.topCustomerPercent)} of revenue` }
  ];

  const metricBoxWidth = (contentWidth - 10) / 2;
  metricsData.forEach((metric, index) => {
    const xPos = margin + (index % 2) * (metricBoxWidth + 10);
    const yBoxPos = yPos + Math.floor(index / 2) * 25;
    
    drawBox(xPos, yBoxPos, metricBoxWidth, 20);
    setSubtitleFont(10);
    pdf.text(metric.label, xPos + 5, yBoxPos + 7);
    setHeaderFont(14);
    setTextColor(colors.primary);
    pdf.text(metric.value, xPos + 5, yBoxPos + 15);
  });

  // PAGE 5: TRANSACTION STRUCTURE
  pdf.addPage();
  yPos = margin;

  setHeaderFont(22);
  pdf.text('Transaction Structure', margin, yPos);
  yPos += 7;
  drawLine(yPos);
  yPos += 12;

  // Deal Terms
  setHeaderFont(14);
  pdf.text('Proposed Transaction Terms', margin, yPos);
  yPos += 8;

  // Terms table
  const termsData = [
    ['Purchase Price:', data.askingPrice || 'To be negotiated'],
    ['Transaction Type:', 'Asset Purchase'],
    ['Financing:', data.financing === 'partial' ? 'Seller financing available (up to 20%)' : 
                   data.financing === 'flexible' ? 'Flexible terms available' : 
                   'All cash at closing'],
    ['Due Diligence Period:', '45-60 days'],
    ['Closing Timeline:', '90-120 days from LOI']
  ];

  const termsLabelWidth = 50;
  termsData.forEach(([label, value]) => {
    drawBox(margin, yPos, contentWidth, 12);
    setHeaderFont(11);
    pdf.text(label, margin + 5, yPos + 8);
    setBodyFont(11);
    pdf.text(value, margin + termsLabelWidth + 5, yPos + 8);
    yPos += 12;
  });
  yPos += 10;

  // Reason for Sale
  setHeaderFont(14);
  pdf.text('Reason for Sale', margin, yPos);
  yPos += 8;

  drawBox(margin, yPos, contentWidth, 40, colors.lightGray);
  setBodyFont(11);
  const reasonLines = pdf.splitTextToSize(
    data.reasonForSale || 'Owner seeking to pursue other business opportunities.',
    contentWidth - 20
  );
  pdf.text(reasonLines, margin + 10, yPos + 10);
  yPos += 50;

  // Transition Support
  setHeaderFont(14);
  pdf.text('Post-Transaction Support', margin, yPos);
  yPos += 8;

  drawBox(margin, yPos, contentWidth, 40, colors.lightGray);
  setBodyFont(11);
  const transitionLines = pdf.splitTextToSize(
    data.transitionPeriod || 'Comprehensive transition support will be provided to ensure business continuity.',
    contentWidth - 20
  );
  pdf.text(transitionLines, margin + 10, yPos + 10);
  yPos += 50;

  // Growth Opportunities
  setHeaderFont(14);
  pdf.text('Growth Opportunities', margin, yPos);
  yPos += 8;

  const opportunities = data.growthOpportunities.filter(o => o).slice(0, 3);
  opportunities.forEach((opp, index) => {
    setFillColor(colors.primary);
    pdf.circle(margin + 3, yPos - 1, 1.5, 'F');
    
    setBodyFont(11);
    setTextColor(colors.dark);
    const lines = pdf.splitTextToSize(opp, contentWidth - 15);
    pdf.text(lines, margin + 10, yPos);
    yPos += lines.length * 5 + 3;
  });

  // PAGE 6: APPENDIX / CONTACT
  pdf.addPage();
  yPos = margin;

  setHeaderFont(22);
  pdf.text('Process & Next Steps', margin, yPos);
  yPos += 7;
  drawLine(yPos);
  yPos += 12;

  // Process timeline
  setHeaderFont(14);
  pdf.text('Transaction Process', margin, yPos);
  yPos += 12;

  const processSteps = [
    { step: '1', title: 'Initial Review', desc: 'Review CIM and submit indication of interest' },
    { step: '2', title: 'Management Meeting', desc: 'Meet with ownership and key management' },
    { step: '3', title: 'Due Diligence', desc: 'Comprehensive business and financial review' },
    { step: '4', title: 'Final Negotiations', desc: 'Finalize purchase agreement and terms' },
    { step: '5', title: 'Closing', desc: 'Complete transaction and begin transition' }
  ];

  processSteps.forEach((step, index) => {
    const stepY = yPos + (index * 25);
    
    // Step number
    setFillColor(colors.primary);
    pdf.circle(margin + 8, stepY + 8, 8, 'F');
    setTextColor(colors.white);
    setHeaderFont(12);
    pdf.text(step.step, margin + 8, stepY + 10, { align: 'center' });
    
    // Step details
    setTextColor(colors.dark);
    setHeaderFont(12);
    pdf.text(step.title, margin + 25, stepY + 7);
    setBodyFont(10);
    setTextColor(colors.gray);
    pdf.text(step.desc, margin + 25, stepY + 13);
  });
  yPos += 140;

  // Contact section
  drawBox(margin, yPos, contentWidth, 50, colors.lightGray);
  yPos += 15;
  
  setHeaderFont(16);
  setTextColor(colors.dark);
  pdf.text('Contact Information', pageWidth / 2, yPos, { align: 'center' });
  yPos += 15;
  
  setBodyFont(12);
  pdf.text('For additional information, please contact us through', pageWidth / 2, yPos, { align: 'center' });
  yPos += 8;
  
  setHeaderFont(14);
  setTextColor(colors.primary);
  pdf.text('RemoteOps Platform', pageWidth / 2, yPos, { align: 'center' });

  // Footer disclaimer
  yPos = pageHeight - 40;
  drawLine(yPos);
  yPos += 5;
  setSubtitleFont(9);
  setTextColor(colors.gray);
  const disclaimer = 'This document contains confidential and proprietary information. Distribution is limited to parties that have entered into a confidentiality agreement.';
  const disclaimerLines = pdf.splitTextToSize(disclaimer, contentWidth);
  pdf.text(disclaimerLines, margin, yPos);

  return pdf;
};