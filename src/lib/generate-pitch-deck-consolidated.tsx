import jsPDF from 'jspdf';
import Chart from 'chart.js/auto';

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

// Helper function to create charts using Chart.js
const createChart = async (type: string, data: any, options: any): Promise<string> => {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 400;
  document.body.appendChild(canvas);

  try {
    const chart = new Chart(canvas, {
      type: type as any,
      data: data,
      options: {
        ...options,
        responsive: false,
        animation: false,
      }
    });

    // Wait for chart to render
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const imageData = canvas.toDataURL('image/png');
    chart.destroy();
    document.body.removeChild(canvas);
    
    return imageData;
  } catch (error) {
    document.body.removeChild(canvas);
    throw error;
  }
};

export const generateConsolidatedPitchDeck = async (data: PitchDeckData) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (2 * margin);
  
  // Colors
  const primaryColor = { r: 37, g: 99, b: 235 }; // Blue
  const darkColor = { r: 17, g: 24, b: 39 };
  const grayColor = { r: 107, g: 114, b: 128 };
  const whiteColor = { r: 255, g: 255, b: 255 };
  const accentColor = { r: 16, g: 185, b: 129 }; // Green

  // Helper functions
  const setColor = (color: any) => {
    pdf.setTextColor(color.r, color.g, color.b);
  };

  const drawColoredRect = (x: number, y: number, w: number, h: number, color: any) => {
    pdf.setFillColor(color.r, color.g, color.b);
    pdf.rect(x, y, w, h, 'F');
  };

  // Parse currency values
  const parseCurrency = (value: string) => {
    return parseFloat(value?.replace(/[^0-9.-]+/g, '') || '0');
  };

  // Page 1: Cover Page
  drawColoredRect(0, 0, pageWidth, pageHeight, primaryColor);
  
  // Add gradient effect with overlapping rectangles
  for (let i = 0; i < 20; i++) {
    pdf.setFillColor(30, 58, 138, 255 - i * 5);
    pdf.rect(0, i * 5, pageWidth, pageHeight, 'F');
  }

  // Company Name
  setColor(whiteColor);
  pdf.setFontSize(42);
  pdf.setFont('helvetica', 'bold');
  const companyName = data.companyName || 'Company Name';
  const nameWidth = pdf.getTextWidth(companyName);
  pdf.text(companyName, (pageWidth - nameWidth) / 2, 80);

  // Tagline
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'normal');
  const tagline = data.tagline || 'Company Tagline';
  const taglineWidth = pdf.getTextWidth(tagline);
  pdf.text(tagline, (pageWidth - taglineWidth) / 2, 100);

  // Divider line
  pdf.setDrawColor(255, 255, 255);
  pdf.setLineWidth(0.5);
  pdf.line(pageWidth/2 - 30, 115, pageWidth/2 + 30, 115);

  // Document type
  pdf.setFontSize(14);
  pdf.text('INVESTMENT OPPORTUNITY', pageWidth/2, 135, { align: 'center' });
  
  pdf.setFontSize(12);
  pdf.text('Confidential Information Memorandum', pageWidth/2, 150, { align: 'center' });

  // Date
  pdf.setFontSize(11);
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  pdf.text(date, pageWidth/2, 200, { align: 'center' });

  // Add asking price prominently
  if (data.askingPrice) {
    drawColoredRect(pageWidth/2 - 50, 220, 100, 30, whiteColor);
    setColor(primaryColor);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text(data.askingPrice, pageWidth/2, 240, { align: 'center' });
  }

  // Page 2: Executive Summary (Consolidated)
  pdf.addPage();
  let yPos = margin;

  // Header
  setColor(darkColor);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Executive Summary', margin, yPos);
  yPos += 15;

  // Key Metrics Grid (2x2)
  const metricsBoxWidth = (contentWidth - 10) / 2;
  const metricsBoxHeight = 25;
  const metrics = [
    { label: 'Annual Revenue', value: data.currentRevenue || '$X.XM', color: primaryColor },
    { label: 'Profit Margin', value: data.profitMargin || 'XX%', color: accentColor },
    { label: 'Active Customers', value: data.totalCustomers || 'XXX', color: { r: 245, g: 158, b: 11 } },
    { label: 'Retention Rate', value: data.customerRetentionRate || 'XX%', color: { r: 139, g: 92, b: 246 } }
  ];

  for (let i = 0; i < metrics.length; i++) {
    const x = margin + (i % 2) * (metricsBoxWidth + 10);
    const y = yPos + Math.floor(i / 2) * (metricsBoxHeight + 10);
    
    // Box background
    pdf.setFillColor(249, 250, 251);
    pdf.setDrawColor(229, 231, 235);
    pdf.rect(x, y, metricsBoxWidth, metricsBoxHeight, 'FD');
    
    // Colored accent bar
    drawColoredRect(x, y, metricsBoxWidth, 3, metrics[i].color);
    
    // Value
    setColor(darkColor);
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text(metrics[i].value, x + 5, y + 15);
    
    // Label
    setColor(grayColor);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.text(metrics[i].label.toUpperCase(), x + 5, y + 21);
  }

  yPos += 70;

  // Business Overview
  pdf.setFillColor(240, 249, 255);
  pdf.setDrawColor(37, 99, 235);
  pdf.rect(margin, yPos, contentWidth, 40, 'FD');
  
  setColor(darkColor);
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  const businessDesc = pdf.splitTextToSize(
    data.businessDescription || 'A leading home service company with proven systems and strong market presence.',
    contentWidth - 10
  );
  pdf.text(businessDesc, margin + 5, yPos + 8);
  yPos += 45;

  // Key Achievements (Compact)
  setColor(darkColor);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Investment Highlights', margin, yPos);
  yPos += 8;

  const achievements = data.keyAchievements.filter(a => a).slice(0, 3);
  achievements.forEach((achievement) => {
    // Green checkmark
    pdf.setFillColor(16, 185, 129);
    pdf.circle(margin + 3, yPos - 2, 2, 'F');
    setColor(whiteColor);
    pdf.setFontSize(8);
    pdf.text('✓', margin + 1.5, yPos);
    
    // Achievement text
    setColor(darkColor);
    pdf.setFontSize(10);
    const lines = pdf.splitTextToSize(achievement, contentWidth - 15);
    pdf.text(lines, margin + 10, yPos);
    yPos += lines.length * 5 + 3;
  });

  // Revenue Chart
  yPos = Math.max(yPos, 180);
  if (yPos > 180) {
    pdf.addPage();
    yPos = margin;
  }

  setColor(darkColor);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Financial Performance', margin, yPos);
  yPos += 10;

  // Create revenue chart
  try {
    const revenues = [
      parseCurrency(data.twoYearsAgoRevenue),
      parseCurrency(data.lastYearRevenue),
      parseCurrency(data.currentRevenue)
    ];

    const chartData = {
      labels: ['2 Years Ago', 'Last Year', 'Current Year'],
      datasets: [{
        label: 'Revenue',
        data: revenues,
        backgroundColor: 'rgba(37, 99, 235, 0.8)',
        borderColor: 'rgba(37, 99, 235, 1)',
        borderWidth: 2
      }]
    };

    const chartOptions = {
      plugins: {
        legend: { display: false },
        title: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value: any) {
              return '$' + (value / 1000000).toFixed(1) + 'M';
            }
          }
        }
      }
    };

    const chartImage = await createChart('bar', chartData, chartOptions);
    pdf.addImage(chartImage, 'PNG', margin, yPos, contentWidth, 60);
    yPos += 65;
  } catch (error) {
    console.error('Error creating chart:', error);
    // Fallback to table if chart fails
    const revenueData = [
      ['Year', 'Revenue', 'Growth'],
      ['Current', data.currentRevenue || 'N/A', '+' + (data.currentRevenue && data.lastYearRevenue ? Math.round(((parseCurrency(data.currentRevenue) - parseCurrency(data.lastYearRevenue)) / parseCurrency(data.lastYearRevenue)) * 100) : 0) + '%'],
      ['Last Year', data.lastYearRevenue || 'N/A', '-'],
      ['2 Years Ago', data.twoYearsAgoRevenue || 'N/A', '-']
    ];

    // Simple table
    const cellWidth = contentWidth / 3;
    revenueData.forEach((row, index) => {
      row.forEach((cell, cellIndex) => {
        if (index === 0) {
          pdf.setFillColor(243, 244, 246);
          pdf.rect(margin + cellIndex * cellWidth, yPos, cellWidth, 8, 'F');
          pdf.setFont('helvetica', 'bold');
        } else {
          pdf.setFont('helvetica', 'normal');
        }
        setColor(darkColor);
        pdf.setFontSize(10);
        pdf.text(cell, margin + cellIndex * cellWidth + 2, yPos + 5);
      });
      yPos += 8;
    });
    yPos += 5;
  }

  // Page 3: Deal Structure & Opportunity
  pdf.addPage();
  yPos = margin;

  // Deal Terms Section
  setColor(darkColor);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Investment Opportunity', margin, yPos);
  yPos += 15;

  // Asking Price Box
  drawColoredRect(margin, yPos, contentWidth, 40, primaryColor);
  setColor(whiteColor);
  pdf.setFontSize(14);
  pdf.text('ASKING PRICE', margin + 5, yPos + 10);
  pdf.setFontSize(28);
  pdf.setFont('helvetica', 'bold');
  pdf.text(data.askingPrice || 'Upon Request', margin + 5, yPos + 25);
  
  // Calculate multiples if possible
  if (data.askingPrice && data.currentRevenue && data.currentProfit) {
    const askingPriceNum = parseCurrency(data.askingPrice);
    const revenueNum = parseCurrency(data.currentRevenue);
    const profitNum = parseCurrency(data.currentProfit);
    
    if (revenueNum > 0 && profitNum > 0) {
      const revenueMultiple = (askingPriceNum / revenueNum).toFixed(1);
      const profitMultiple = (askingPriceNum / profitNum).toFixed(1);
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`${revenueMultiple}x Revenue | ${profitMultiple}x Profit`, pageWidth - margin - 5, yPos + 25, { align: 'right' });
    }
  }
  yPos += 50;

  // Deal Structure Grid
  const dealBoxes = [
    {
      title: 'Reason for Sale',
      content: data.reasonForSale || 'Owner pursuing other business opportunities.'
    },
    {
      title: 'Transition Support',
      content: data.transitionPeriod || 'Comprehensive transition support included.'
    },
    {
      title: 'Financing',
      content: data.financing === 'partial' 
        ? 'Seller financing available (up to 20%)'
        : data.financing === 'flexible'
        ? 'Flexible financing terms available'
        : 'All-cash transaction preferred'
    }
  ];

  dealBoxes.forEach((box) => {
    pdf.setFillColor(249, 250, 251);
    pdf.setDrawColor(229, 231, 235);
    pdf.rect(margin, yPos, contentWidth, 30, 'FD');
    
    setColor(darkColor);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text(box.title, margin + 5, yPos + 8);
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const lines = pdf.splitTextToSize(box.content, contentWidth - 10);
    pdf.text(lines, margin + 5, yPos + 15);
    
    yPos += 35;
  });

  // Growth Opportunities
  yPos += 10;
  setColor(darkColor);
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Growth Opportunities', margin, yPos);
  yPos += 10;

  const opportunities = data.growthOpportunities.filter(o => o).slice(0, 2);
  opportunities.forEach((opp, index) => {
    // Opportunity box
    pdf.setFillColor(240, 249, 255);
    pdf.setDrawColor(37, 99, 235);
    pdf.rect(margin, yPos, contentWidth, 25, 'FD');
    
    // Number circle
    pdf.setFillColor(37, 99, 235);
    pdf.circle(margin + 8, yPos + 12, 5, 'F');
    setColor(whiteColor);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text((index + 1).toString(), margin + 6.5, yPos + 14);
    
    // Opportunity text
    setColor(darkColor);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const lines = pdf.splitTextToSize(opp, contentWidth - 25);
    pdf.text(lines, margin + 20, yPos + 8);
    
    yPos += 30;
  });

  // Contact Section
  yPos = pageHeight - 40;
  pdf.setFillColor(245, 245, 245);
  pdf.rect(margin, yPos, contentWidth, 25, 'F');
  
  setColor(grayColor);
  pdf.setFontSize(10);
  pdf.text('For more information, contact us through the', pageWidth/2, yPos + 10, { align: 'center' });
  
  setColor(primaryColor);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('RemoteOps Platform', pageWidth/2, yPos + 18, { align: 'center' });

  return pdf;
};