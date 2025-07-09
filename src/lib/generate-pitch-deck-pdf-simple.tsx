import { jsPDF } from 'jspdf';

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

export function generatePitchDeckPDF(data: PitchDeckData): jsPDF {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  let yPos = 20;

  // Colors
  const primaryColor = { r: 37, g: 99, b: 235 };
  const darkColor = { r: 17, g: 24, b: 39 }; // Dark blue for backgrounds
  const blackColor = { r: 0, g: 0, b: 0 }; // Pure black for text
  const whiteColor = { r: 255, g: 255, b: 255 }; // White for text on dark backgrounds
  const lightGray = { r: 229, g: 231, b: 235 }; // Light gray for borders
  const successColor = { r: 16, g: 185, b: 129 };
  const accentColor = { r: 245, g: 158, b: 11 };

  // Helper functions
  const resetPosition = () => {
    yPos = 20;
  };

  const addNewPage = () => {
    pdf.addPage();
    resetPosition();
  };

  const setColor = (color: { r: number; g: number; b: number }) => {
    pdf.setTextColor(color.r, color.g, color.b);
  };

  const setFillColor = (color: { r: number; g: number; b: number }) => {
    pdf.setFillColor(color.r, color.g, color.b);
  };

  const drawRect = (x: number, y: number, w: number, h: number, style: 'F' | 'S' | 'FD' = 'F') => {
    pdf.rect(x, y, w, h, style);
  };

  const addText = (text: string, x: number, y: number, options?: any) => {
    pdf.text(text, x, y, options);
  };

  // Cover Page
  setFillColor(darkColor);
  drawRect(0, 0, pageWidth, pageHeight);

  // Simple cover pattern - diagonal lines
  pdf.setDrawColor(30, 58, 138); // Darker blue for pattern
  pdf.setLineWidth(0.3);
  for (let i = 0; i < 15; i++) {
    pdf.line(0, i * 30, i * 30, 0);
    pdf.line(pageWidth - i * 30, pageHeight, pageWidth, pageHeight - i * 30);
  }

  // Cover content
  setColor(whiteColor);
  pdf.setFontSize(48);
  pdf.setFont('helvetica', 'bold');
  addText(data.companyName || 'Company Name', pageWidth / 2, 100, { align: 'center' });

  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'normal');
  addText(data.tagline || 'Company Tagline', pageWidth / 2, 120, { align: 'center' });

  // Divider
  setFillColor(primaryColor);
  drawRect(pageWidth / 2 - 40, 140, 80, 4);

  pdf.setFontSize(16);
  addText('INVESTMENT OPPORTUNITY', pageWidth / 2, 170, { align: 'center' });
  
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'normal');
  addText('Confidential Information Memorandum', pageWidth / 2, 185, { align: 'center' });

  pdf.setFontSize(12);
  setColor({ r: 200, g: 200, b: 200 });
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  addText(currentDate, pageWidth / 2, 260, { align: 'center' });

  // Executive Summary Page
  addNewPage();
  setColor(blackColor);

  // Header with accent line
  setFillColor(primaryColor);
  drawRect(margin, yPos - 5, 60, 4);
  
  pdf.setFontSize(36);
  pdf.setFont('helvetica', 'bold');
  addText('Executive Summary', margin, yPos + 20);
  
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'normal');
  setColor(blackColor);
  addText('Investment Highlights', margin, yPos + 32);
  yPos += 50;

  // Business description card
  setFillColor({ r: 255, g: 255, b: 255 });
  drawRect(margin, yPos, contentWidth, 40, 'F');
  pdf.setDrawColor(lightGray.r, lightGray.g, lightGray.b);
  drawRect(margin, yPos, contentWidth, 40, 'S');
  
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  setColor(blackColor);
  addText(`About ${data.companyName}`, margin + 10, yPos + 12);
  
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  const descLines = pdf.splitTextToSize(data.businessDescription || 'A leading home service company...', contentWidth - 20);
  let lineY = yPos + 22;
  descLines.forEach((line: string) => {
    addText(line, margin + 10, lineY);
    lineY += 6;
  });
  yPos += 50;

  // Stats cards
  const statWidth = (contentWidth - 10) / 2;
  const statHeight = 35;
  const stats = [
    { label: 'ANNUAL REVENUE', value: data.currentRevenue || '$X.XM', color: primaryColor },
    { label: 'PROFIT MARGIN', value: data.profitMargin || 'XX%', color: successColor },
    { label: 'ACTIVE CUSTOMERS', value: data.totalCustomers || 'XXX', color: accentColor },
    { label: 'RETENTION RATE', value: data.customerRetentionRate || 'XX%', color: primaryColor }
  ];

  for (let i = 0; i < stats.length; i++) {
    const x = margin + (i % 2) * (statWidth + 10);
    const y = yPos + Math.floor(i / 2) * (statHeight + 10);
    
    // Card background
    setFillColor({ r: 255, g: 255, b: 255 });
    drawRect(x, y, statWidth, statHeight, 'F');
    pdf.setDrawColor(lightGray.r, lightGray.g, lightGray.b);
    drawRect(x, y, statWidth, statHeight, 'S');
    
    // Accent bar
    setFillColor(stats[i].color);
    drawRect(x, y, statWidth, 4);
    
    // Content
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    setColor(blackColor);
    addText(stats[i].value, x + 10, y + 20);
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    setColor(blackColor);
    addText(stats[i].label, x + 10, y + 28);
  }
  yPos += (statHeight + 10) * 2 + 20;

  // Key achievements
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  setColor(blackColor);
  addText('Key Investment Highlights', margin, yPos);
  yPos += 10;

  const achievements = data.keyAchievements.filter(a => a);
  achievements.forEach((achievement, index) => {
    // Check icon
    setFillColor(successColor);
    pdf.circle(margin + 5, yPos, 4, 'F');
    setColor(whiteColor);
    pdf.setFontSize(8);
    addText('✓', margin + 3, yPos + 2);
    
    // Achievement text
    pdf.setFontSize(11);
    setColor(blackColor);
    const achLines = pdf.splitTextToSize(achievement, contentWidth - 20);
    achLines.forEach((line: string, lineIndex: number) => {
      addText(line, margin + 15, yPos + lineIndex * 6);
    });
    yPos += achLines.length * 6 + 5;
  });

  // Footer
  pdf.setFontSize(10);
  setColor({ r: 100, g: 100, b: 100 }); // Gray for footer
  addText(`Confidential - ${data.companyName}`, margin, pageHeight - 10);
  addText('1', pageWidth - margin, pageHeight - 10, { align: 'right' });

  // Financial Performance Page
  addNewPage();
  
  // Header
  setFillColor(primaryColor);
  drawRect(margin, yPos - 5, 60, 4);
  
  pdf.setFontSize(36);
  pdf.setFont('helvetica', 'bold');
  setColor(blackColor);
  addText('Financial Performance', margin, yPos + 20);
  
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'normal');
  setColor(blackColor);
  addText('Historical Growth & Profitability', margin, yPos + 32);
  yPos += 50;

  // Revenue chart
  setFillColor({ r: 255, g: 255, b: 255 });
  drawRect(margin, yPos, contentWidth, 100, 'F');
  pdf.setDrawColor(lightGray.r, lightGray.g, lightGray.b);
  drawRect(margin, yPos, contentWidth, 100, 'S');

  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  setColor(blackColor);
  addText('Revenue Trend', margin + 10, yPos + 15);

  // Simple bar chart
  const chartY = yPos + 25;
  const chartHeight = 60;
  const barWidth = 40;
  const revenues = [
    parseFloat(data.twoYearsAgoRevenue?.replace(/[^0-9.-]+/g, '') || '0'),
    parseFloat(data.lastYearRevenue?.replace(/[^0-9.-]+/g, '') || '0'),
    parseFloat(data.currentRevenue?.replace(/[^0-9.-]+/g, '') || '0')
  ];
  const maxRevenue = Math.max(...revenues) || 1;

  revenues.forEach((revenue, index) => {
    const barHeight = (revenue / maxRevenue) * chartHeight;
    const x = margin + 20 + index * (barWidth + 20);
    
    setFillColor(primaryColor);
    drawRect(x, chartY + chartHeight - barHeight, barWidth, barHeight);
    
    pdf.setFontSize(10);
    setColor(blackColor);
    const label = index === 0 ? '2 Years Ago' : index === 1 ? 'Last Year' : 'Current';
    addText(label, x + barWidth / 2, chartY + chartHeight + 10, { align: 'center' });
  });
  
  yPos += 120;

  // Financial metrics table
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  setColor(blackColor);
  addText('Financial Metrics', margin, yPos);
  yPos += 15;

  // Table header
  setFillColor(lightGray);
  drawRect(margin, yPos, contentWidth, 10);
  
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  setColor(blackColor);
  const colWidth = contentWidth / 4;
  addText('METRIC', margin + 5, yPos + 7);
  addText('CURRENT YEAR', margin + colWidth + 5, yPos + 7);
  addText('LAST YEAR', margin + colWidth * 2 + 5, yPos + 7);
  addText('GROWTH', margin + colWidth * 3 + 5, yPos + 7);
  yPos += 10;

  // Table rows
  const metrics = [
    {
      name: 'Revenue',
      current: data.currentRevenue || 'TBD',
      last: data.lastYearRevenue || 'TBD',
      growth: revenues[2] && revenues[1] ? `+${Math.round(((revenues[2] - revenues[1]) / revenues[1]) * 100)}%` : 'N/A'
    },
    {
      name: 'Net Profit',
      current: data.currentProfit || 'TBD',
      last: data.lastYearProfit || 'TBD',
      growth: 'TBD'
    },
    {
      name: 'Recurring Revenue',
      current: data.recurringRevenuePercent || 'TBD',
      last: '-',
      growth: 'of total'
    }
  ];

  metrics.forEach((metric, index) => {
    if (index % 2 === 0) {
      setFillColor({ r: 250, g: 250, b: 250 });
      drawRect(margin, yPos, contentWidth, 10);
    }
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    setColor(blackColor);
    addText(metric.name, margin + 5, yPos + 7);
    addText(metric.current, margin + colWidth + 5, yPos + 7);
    addText(metric.last, margin + colWidth * 2 + 5, yPos + 7);
    
    if (metric.growth.includes('+')) {
      setColor(successColor);
    }
    addText(metric.growth, margin + colWidth * 3 + 5, yPos + 7);
    setColor(blackColor);
    
    yPos += 10;
  });

  // Footer
  pdf.setFontSize(10);
  setColor({ r: 100, g: 100, b: 100 });
  addText(`Confidential - ${data.companyName}`, margin, pageHeight - 10);
  addText('2', pageWidth - margin, pageHeight - 10, { align: 'right' });

  // Additional pages would follow similar pattern...
  // Customer & Market Analysis, Operations Overview, Growth Strategy, Transaction Overview

  // Transaction Overview (Last content page)
  addNewPage();
  
  // Header
  setFillColor(primaryColor);
  drawRect(margin, yPos - 5, 60, 4);
  
  pdf.setFontSize(36);
  pdf.setFont('helvetica', 'bold');
  setColor(blackColor);
  addText('Transaction Overview', margin, yPos + 20);
  
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'normal');
  setColor(blackColor);
  addText('Investment Terms', margin, yPos + 32);
  yPos += 60;

  // Asking price card
  setFillColor(primaryColor);
  drawRect(margin, yPos, contentWidth, 60);
  
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  setColor(whiteColor);
  addText('ASKING PRICE', pageWidth / 2, yPos + 20, { align: 'center' });
  
  pdf.setFontSize(48);
  addText(data.askingPrice || 'Upon Request', pageWidth / 2, yPos + 45, { align: 'center' });
  yPos += 80;

  // Sale details
  const saleDetails = [
    { title: 'Reason for Sale', content: data.reasonForSale || 'Owner pursuing other opportunities.' },
    { title: 'Transition Support', content: data.transitionPeriod || 'Comprehensive transition support provided.' },
    {
      title: 'Financing Options',
      content: data.financing === 'partial' ? 'Seller financing available (up to 20%)' :
               data.financing === 'flexible' ? 'Flexible financing terms available' :
               'All-cash transaction preferred'
    }
  ];

  saleDetails.forEach(detail => {
    setFillColor({ r: 255, g: 255, b: 255 });
    drawRect(margin, yPos, contentWidth, 40, 'F');
    pdf.setDrawColor(lightGray.r, lightGray.g, lightGray.b);
    drawRect(margin, yPos, contentWidth, 40, 'S');
    
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    setColor(blackColor);
    addText(detail.title, margin + 10, yPos + 12);
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    const detailLines = pdf.splitTextToSize(detail.content, contentWidth - 20);
    let detailY = yPos + 22;
    detailLines.forEach((line: string) => {
      addText(line, margin + 10, detailY);
      detailY += 6;
    });
    yPos += 50;
  });

  // Footer
  pdf.setFontSize(10);
  setColor({ r: 100, g: 100, b: 100 });
  addText(`Confidential - ${data.companyName}`, margin, pageHeight - 10);
  addText('6', pageWidth - margin, pageHeight - 10, { align: 'right' });

  // Contact page
  addNewPage();
  setFillColor(primaryColor);
  drawRect(0, 0, pageWidth, pageHeight);

  // Content
  setColor({ r: 255, g: 255, b: 255 });
  
  // Icon placeholder
  pdf.setFontSize(60);
  addText('✓', pageWidth / 2 - 15, 100);
  
  pdf.setFontSize(36);
  pdf.setFont('helvetica', 'bold');
  addText('Ready to Learn More?', pageWidth / 2, 140, { align: 'center' });
  
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'normal');
  addText('Schedule a confidential discussion', pageWidth / 2, 160, { align: 'center' });
  addText('about this opportunity', pageWidth / 2, 175, { align: 'center' });

  // Contact box
  setFillColor({ r: 255, g: 255, b: 255 });
  drawRect(margin + 20, 200, contentWidth - 40, 50);
  
  pdf.setFontSize(12);
  setColor(grayColor);
  addText('Contact us through the', pageWidth / 2, 220, { align: 'center' });
  
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  setColor(primaryColor);
  addText('RemoteOps Platform', pageWidth / 2, 235, { align: 'center' });

  // Footer
  pdf.setFontSize(10);
  setColor({ r: 200, g: 200, b: 200 });
  addText('This document contains confidential information.', pageWidth / 2, 270, { align: 'center' });
  addText('Please handle with appropriate care.', pageWidth / 2, 280, { align: 'center' });

  return pdf;
  } catch (error) {
    console.error('Error in generatePitchDeckPDF:', error);
    throw error;
  }
}