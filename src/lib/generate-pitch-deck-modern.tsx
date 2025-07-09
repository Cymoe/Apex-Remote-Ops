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

// Helper function to create charts
const createChart = async (type: string, data: any, options: any, width = 1200, height = 600): Promise<string> => {
  // Dynamically import Chart.js only when needed
  const Chart = (await import('chart.js/auto')).default;
  
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);

  try {
    const chart = new Chart(canvas, {
      type: type as any,
      data: data,
      options: {
        ...options,
        responsive: false,
        animation: false,
        maintainAspectRatio: false,
      }
    });

    await new Promise(resolve => setTimeout(resolve, 100));
    const imageData = canvas.toDataURL('image/png');
    chart.destroy();
    document.body.removeChild(canvas);
    return imageData;
  } catch (error) {
    if (document.body.contains(canvas)) {
      document.body.removeChild(canvas);
    }
    throw error;
  }
};

export const generateModernPitchDeck = async (data: PitchDeckData) => {
  const pdf = new jsPDF('l', 'mm', 'a4'); // Landscape orientation
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  
  // Modern color palette
  const colors = {
    primary: { r: 37, g: 99, b: 235 },      // Bright blue
    dark: { r: 15, g: 23, b: 42 },         // Navy
    accent: { r: 34, g: 197, b: 94 },      // Green
    warning: { r: 251, g: 146, b: 60 },    // Orange
    light: { r: 248, g: 250, b: 252 },     // Light gray
    white: { r: 255, g: 255, b: 255 },
    gray: { r: 148, g: 163, b: 184 }
  };

  // Helper functions
  const setColor = (color: any) => pdf.setTextColor(color.r, color.g, color.b);
  const drawRect = (x: number, y: number, w: number, h: number, color: any) => {
    pdf.setFillColor(color.r, color.g, color.b);
    pdf.rect(x, y, w, h, 'F');
  };

  const parseCurrency = (value: string) => parseFloat(value?.replace(/[^0-9.-]+/g, '') || '0');

  // Slide 1: Title Slide with Visual Impact
  drawRect(0, 0, pageWidth, pageHeight, colors.dark);
  
  // Gradient overlay effect
  for (let i = 0; i < 30; i++) {
    pdf.setFillColor(37, 99, 235, 8);
    pdf.rect(0, i * 10, pageWidth, 10, 'F');
  }

  // Large company name
  setColor(colors.white);
  pdf.setFontSize(72);
  pdf.setFont('helvetica', 'bold');
  pdf.text(data.companyName || 'COMPANY NAME', pageWidth / 2, 80, { align: 'center' });

  // Tagline
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'normal');
  pdf.text(data.tagline || 'Transforming the Home Service Industry', pageWidth / 2, 100, { align: 'center' });

  // Visual accent line
  pdf.setDrawColor(colors.accent.r, colors.accent.g, colors.accent.b);
  pdf.setLineWidth(2);
  pdf.line(pageWidth/2 - 60, 115, pageWidth/2 + 60, 115);

  // Key metric bubbles
  const metrics = [
    { value: data.currentRevenue || '$2.5M', label: 'REVENUE' },
    { value: data.totalCustomers || '450', label: 'CUSTOMERS' },
    { value: data.customerRetentionRate || '85%', label: 'RETENTION' }
  ];

  const bubbleY = 140;
  metrics.forEach((metric, index) => {
    const x = pageWidth/2 - 90 + (index * 90);
    
    // Circle background
    pdf.setFillColor(colors.primary.r, colors.primary.g, colors.primary.b);
    pdf.circle(x, bubbleY, 25, 'F');
    
    // Metric value
    setColor(colors.white);
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text(metric.value, x, bubbleY - 5, { align: 'center' });
    
    // Label
    pdf.setFontSize(10);
    pdf.text(metric.label, x, bubbleY + 5, { align: 'center' });
  });

  // Slide 2: The Opportunity (Visual Stats)
  pdf.addPage();
  drawRect(0, 0, pageWidth, pageHeight, colors.white);

  // Header
  setColor(colors.dark);
  pdf.setFontSize(48);
  pdf.setFont('helvetica', 'bold');
  pdf.text('THE OPPORTUNITY', 30, 40);

  // Large asking price
  drawRect(30, 50, pageWidth - 60, 60, colors.primary);
  setColor(colors.white);
  pdf.setFontSize(56);
  pdf.text(data.askingPrice || '$3.75M', pageWidth / 2, 85, { align: 'center' });
  pdf.setFontSize(16);
  pdf.text('ASKING PRICE', pageWidth / 2, 100, { align: 'center' });

  // Visual stats row
  const statY = 130;
  const stats = [
    { icon: '📈', value: `${data.profitMargin || '25%'}`, label: 'Profit Margin', color: colors.accent },
    { icon: '🔄', value: `${data.recurringRevenuePercent || '35%'}`, label: 'Recurring Revenue', color: colors.warning },
    { icon: '💰', value: data.averageJobSize || '$5.5K', label: 'Avg Transaction', color: colors.primary },
    { icon: '📊', value: '40%', label: 'YoY Growth', color: colors.dark }
  ];

  stats.forEach((stat, index) => {
    const x = 40 + (index * 65);
    
    // Stat box
    drawRect(x, statY, 60, 40, colors.light);
    drawRect(x, statY, 60, 4, stat.color);
    
    // Value
    setColor(colors.dark);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text(stat.value, x + 30, statY + 20, { align: 'center' });
    
    // Label
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    setColor(colors.gray);
    pdf.text(stat.label, x + 30, statY + 30, { align: 'center' });
  });

  // Slide 3: Financial Performance (Chart-focused)
  pdf.addPage();
  drawRect(0, 0, pageWidth, pageHeight, colors.light);

  // Header
  setColor(colors.dark);
  pdf.setFontSize(48);
  pdf.setFont('helvetica', 'bold');
  pdf.text('EXPLOSIVE GROWTH', 30, 40);

  // Revenue chart
  try {
    const revenues = [
      parseCurrency(data.twoYearsAgoRevenue) / 1000000,
      parseCurrency(data.lastYearRevenue) / 1000000,
      parseCurrency(data.currentRevenue) / 1000000
    ];

    const chartData = {
      labels: ['2023', '2024', '2025'],
      datasets: [{
        label: 'Revenue ($M)',
        data: revenues,
        backgroundColor: [
          'rgba(148, 163, 184, 0.8)',
          'rgba(37, 99, 235, 0.8)',
          'rgba(34, 197, 94, 0.8)'
        ],
        borderWidth: 0,
        borderRadius: 10,
        barThickness: 80
      }]
    };

    const chartOptions = {
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          titleFont: { size: 16 },
          bodyFont: { size: 14 },
          padding: 12,
          callbacks: {
            label: (context: any) => `$${context.parsed.y.toFixed(2)}M`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { display: false },
          ticks: {
            font: { size: 14 },
            callback: (value: any) => `$${value}M`
          }
        },
        x: {
          grid: { display: false },
          ticks: { font: { size: 16, weight: 'bold' } }
        }
      }
    };

    const chartImage = await createChart('bar', chartData, chartOptions, 1400, 800);
    pdf.addImage(chartImage, 'PNG', 30, 55, 170, 100);

    // Growth indicator
    const growth = Math.round(((revenues[2] - revenues[1]) / revenues[1]) * 100);
    drawRect(210, 80, 70, 50, colors.accent);
    setColor(colors.white);
    pdf.setFontSize(36);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`+${growth}%`, 245, 105, { align: 'center' });
    pdf.setFontSize(14);
    pdf.text('YoY GROWTH', 245, 120, { align: 'center' });

  } catch (error) {
    console.error('Chart error:', error);
  }

  // Slide 4: Market Position (Visual)
  pdf.addPage();
  drawRect(0, 0, pageWidth, pageHeight, colors.white);

  // Split screen design
  drawRect(0, 0, pageWidth / 2, pageHeight, colors.dark);

  // Left side - Market stats
  setColor(colors.white);
  pdf.setFontSize(42);
  pdf.setFont('helvetica', 'bold');
  pdf.text('MARKET', 30, 40);
  pdf.text('LEADER', 30, 55);

  // Market icons and stats
  const marketStats = [
    { value: data.totalCustomers || '450', label: 'Active Customers' },
    { value: data.marketsServed.length.toString() || '3', label: 'Geographic Markets' },
    { value: `${data.teamSize || '12'}+${data.subcontractors || '25'}`, label: 'Team Members' }
  ];

  marketStats.forEach((stat, index) => {
    const y = 80 + (index * 35);
    
    // Stat line
    pdf.setFontSize(28);
    pdf.setFont('helvetica', 'bold');
    pdf.text(stat.value, 30, y);
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    setColor(colors.gray);
    pdf.text(stat.label, 30, y + 8);
    setColor(colors.white);
  });

  // Right side - Competitive advantages
  setColor(colors.dark);
  pdf.setFontSize(32);
  pdf.setFont('helvetica', 'bold');
  pdf.text('COMPETITIVE EDGE', pageWidth / 2 + 20, 40);

  const advantages = data.competitiveAdvantages.filter(a => a).slice(0, 3);
  advantages.forEach((advantage, index) => {
    const y = 60 + (index * 40);
    
    // Icon circle
    drawRect(pageWidth / 2 + 20, y, 30, 30, colors.primary);
    setColor(colors.white);
    pdf.setFontSize(18);
    pdf.text('✓', pageWidth / 2 + 35, y + 20, { align: 'center' });
    
    // Advantage text
    setColor(colors.dark);
    pdf.setFontSize(14);
    const lines = pdf.splitTextToSize(advantage, 100);
    pdf.text(lines[0], pageWidth / 2 + 60, y + 15);
  });

  // Slide 5: Growth Potential (Visual)
  pdf.addPage();
  
  // Gradient background
  for (let i = 0; i < pageHeight; i += 5) {
    const opacity = i / pageHeight;
    pdf.setFillColor(37, 99, 235, 255 * (1 - opacity));
    pdf.rect(0, i, pageWidth, 5, 'F');
  }

  setColor(colors.white);
  pdf.setFontSize(48);
  pdf.setFont('helvetica', 'bold');
  pdf.text('UNLIMITED POTENTIAL', pageWidth / 2, 40, { align: 'center' });

  // Growth opportunity cards
  const opportunities = data.growthOpportunities.filter(o => o).slice(0, 3);
  opportunities.forEach((opp, index) => {
    const x = 30 + (index * 90);
    const y = 60;
    
    // Card
    drawRect(x, y, 85, 100, colors.white);
    
    // Number
    drawRect(x, y, 85, 30, colors.primary);
    setColor(colors.white);
    pdf.setFontSize(36);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`0${index + 1}`, x + 42.5, y + 20, { align: 'center' });
    
    // Opportunity text
    setColor(colors.dark);
    pdf.setFontSize(12);
    const lines = pdf.splitTextToSize(opp, 75);
    pdf.text(lines.slice(0, 4), x + 5, y + 45);
  });

  // Slide 6: Call to Action
  pdf.addPage();
  drawRect(0, 0, pageWidth, pageHeight, colors.dark);

  // Center content
  setColor(colors.white);
  pdf.setFontSize(56);
  pdf.setFont('helvetica', 'bold');
  pdf.text('READY TO', pageWidth / 2, 60, { align: 'center' });
  pdf.text('TAKE OVER?', pageWidth / 2, 80, { align: 'center' });

  // Contact box
  drawRect(pageWidth/2 - 100, 100, 200, 60, colors.primary);
  pdf.setFontSize(24);
  pdf.text('CONTACT US TODAY', pageWidth / 2, 120, { align: 'center' });
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Through RemoteOps Platform', pageWidth / 2, 140, { align: 'center' });

  // Urgency message
  pdf.setFontSize(14);
  setColor(colors.gray);
  pdf.text('This opportunity won\'t last long', pageWidth / 2, 180, { align: 'center' });

  return pdf;
};