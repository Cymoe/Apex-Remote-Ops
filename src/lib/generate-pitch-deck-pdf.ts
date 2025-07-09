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

export function generatePitchDeckPDF(data: PitchDeckData): jsPDF {
  const pdf = new jsPDF('p', 'mm', 'a4');
  let yPosition = 20;
  const lineHeight = 7;
  const pageHeight = 280;
  const leftMargin = 20;
  const rightMargin = 190;
  const contentWidth = rightMargin - leftMargin;

  // Helper functions
  const addNewPage = () => {
    pdf.addPage();
    yPosition = 20;
  };

  const checkPageBreak = (requiredSpace: number = 30) => {
    if (yPosition + requiredSpace > pageHeight) {
      addNewPage();
    }
  };

  const addTitle = (text: string, fontSize: number = 20) => {
    checkPageBreak();
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', 'bold');
    pdf.text(text, leftMargin, yPosition);
    yPosition += fontSize * 0.5;
  };

  const addSubtitle = (text: string, fontSize: number = 14) => {
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', 'bold');
    pdf.text(text, leftMargin, yPosition);
    yPosition += fontSize * 0.5;
  };

  const addText = (text: string, fontSize: number = 11) => {
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', 'normal');
    const lines = pdf.splitTextToSize(text, contentWidth);
    lines.forEach((line: string) => {
      checkPageBreak(lineHeight);
      pdf.text(line, leftMargin, yPosition);
      yPosition += lineHeight;
    });
  };

  const addBulletPoint = (text: string) => {
    checkPageBreak(lineHeight);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.text('•', leftMargin + 5, yPosition);
    const lines = pdf.splitTextToSize(text, contentWidth - 10);
    lines.forEach((line: string, index: number) => {
      if (index > 0) checkPageBreak(lineHeight);
      pdf.text(line, leftMargin + 10, yPosition);
      yPosition += lineHeight;
    });
  };

  const addSection = (title: string, content: () => void) => {
    checkPageBreak(40);
    yPosition += 10;
    addSubtitle(title);
    yPosition += 5;
    content();
    yPosition += 5;
  };

  // Cover Page
  pdf.setFillColor(59, 130, 246); // Professional blue
  pdf.rect(0, 0, 210, 297, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(32);
  pdf.setFont('helvetica', 'bold');
  pdf.text(data.companyName || 'Company Name', 105, 100, { align: 'center' });
  
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'normal');
  pdf.text(data.tagline || 'Company Tagline', 105, 115, { align: 'center' });
  
  pdf.setFontSize(14);
  pdf.text('Business Exit Opportunity', 105, 140, { align: 'center' });
  pdf.text('Confidential Information Memorandum', 105, 150, { align: 'center' });
  
  pdf.setFontSize(12);
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  pdf.text(currentDate, 105, 260, { align: 'center' });

  // Reset text color for content pages
  pdf.setTextColor(0, 0, 0);

  // Executive Summary
  addNewPage();
  addTitle('Executive Summary');
  yPosition += 10;

  addSection('Business Overview', () => {
    addText(data.businessDescription || 'Business description not provided.');
  });

  addSection('Investment Highlights', () => {
    const achievements = data.keyAchievements.filter(a => a && a.trim());
    if (achievements.length > 0) {
      achievements.forEach(achievement => {
        addBulletPoint(achievement);
      });
    } else {
      addText('• Established track record in the home service industry');
      addText('• Strong customer base with proven retention');
      addText('• Scalable remote operations model');
    }
  });

  addSection('Financial Snapshot', () => {
    addText(`Current Year Revenue: ${data.currentRevenue || 'TBD'}`);
    addText(`Current Year Profit: ${data.currentProfit || 'TBD'}`);
    addText(`Profit Margin: ${data.profitMargin || 'TBD'}`);
    addText(`Recurring Revenue: ${data.recurringRevenuePercent || 'TBD'}`);
  });

  // Company Overview
  addNewPage();
  addTitle('Company Overview');
  yPosition += 10;

  addSection('About the Business', () => {
    addText(`Founded: ${data.yearFounded || 'TBD'}`);
    addText(`Headquarters: ${data.headquarters || 'TBD'}`);
    addText(`Website: ${data.website || 'TBD'}`);
    yPosition += 5;
    addText(data.businessDescription || 'Business description not provided.');
  });

  addSection('Unique Value Proposition', () => {
    addText(data.uniqueValue || 'Unique value proposition to be provided.');
  });

  // Financial Performance
  addNewPage();
  addTitle('Financial Performance');
  yPosition += 10;

  addSection('Revenue Growth', () => {
    const years = ['Two Years Ago', 'Last Year', 'Current Year'];
    const revenues = [data.twoYearsAgoRevenue, data.lastYearRevenue, data.currentRevenue];
    
    years.forEach((year, index) => {
      addText(`${year}: ${revenues[index] || 'TBD'}`);
    });
  });

  addSection('Profitability', () => {
    const profits = [data.twoYearsAgoProfit, data.lastYearProfit, data.currentProfit];
    const years = ['Two Years Ago', 'Last Year', 'Current Year'];
    
    years.forEach((year, index) => {
      addText(`${year}: ${profits[index] || 'TBD'}`);
    });
    yPosition += 5;
    addText(`Average Profit Margin: ${data.profitMargin || 'TBD'}`);
  });

  addSection('Revenue Quality', () => {
    addText(`Recurring Revenue: ${data.recurringRevenuePercent || 'TBD'} of total revenue`);
    addText(`Customer Retention Rate: ${data.customerRetentionRate || 'TBD'}`);
  });

  // Customer Analysis
  addNewPage();
  addTitle('Customer Analysis');
  yPosition += 10;

  addSection('Customer Base', () => {
    addText(`Total Active Customers: ${data.totalCustomers || 'TBD'}`);
    addText(`Average Job Size: ${data.averageJobSize || 'TBD'}`);
    addText(`Customer Retention Rate: ${data.customerRetentionRate || 'TBD'}`);
    addText(`Largest Customer Concentration: ${data.topCustomerPercent || 'TBD'} of revenue`);
  });

  addSection('Markets Served', () => {
    const markets = data.marketsServed.filter(m => m && m.trim());
    if (markets.length > 0) {
      markets.forEach(market => {
        addBulletPoint(market);
      });
    } else {
      addText('Geographic coverage details available upon request.');
    }
  });

  // Operations
  addNewPage();
  addTitle('Operations Overview');
  yPosition += 10;

  addSection('Team Structure', () => {
    addText(`Full-Time Employees: ${data.teamSize || 'TBD'}`);
    addText(`Active Subcontractors: ${data.subcontractors || 'TBD'}`);
  });

  addSection('Geographic Coverage', () => {
    if (data.licensedStates.filter(s => s).length > 0) {
      addText('Licensed States:');
      data.licensedStates.filter(s => s).forEach(state => {
        addBulletPoint(state);
      });
    } else {
      addText('Licensed states to be provided.');
    }
  });

  addSection('Technology Stack', () => {
    const techItems = data.techStack.filter(t => t && t.trim());
    if (techItems.length > 0) {
      techItems.forEach(tech => {
        addBulletPoint(tech);
      });
    } else {
      addText('• Industry-leading service management platform');
      addText('• Cloud-based communication and collaboration tools');
      addText('• Automated dispatch and routing systems');
    }
  });

  // Growth Opportunities
  addNewPage();
  addTitle('Growth Opportunities');
  yPosition += 10;

  if (data.growthOpportunities.filter(o => o).length > 0) {
    data.growthOpportunities.filter(o => o).forEach((opportunity, index) => {
      addSection(`Opportunity ${index + 1}`, () => {
        addText(opportunity);
      });
    });
  } else {
    addText('Growth opportunities to be detailed in discussions.');
  }

  // Competitive Advantages
  addNewPage();
  addTitle('Competitive Advantages');
  yPosition += 10;

  if (data.competitiveAdvantages.filter(a => a).length > 0) {
    data.competitiveAdvantages.filter(a => a).forEach((advantage, index) => {
      addSection(`Advantage ${index + 1}`, () => {
        addText(advantage);
      });
    });
  } else {
    addText('Competitive advantages to be detailed in discussions.');
  }

  // Sale Details
  addNewPage();
  addTitle('Transaction Overview');
  yPosition += 10;

  addSection('Asking Price', () => {
    addText(data.askingPrice || 'Price to be discussed');
  });

  addSection('Reason for Sale', () => {
    addText(data.reasonForSale || 'Reason for sale to be provided.');
  });

  addSection('Transition Support', () => {
    addText(data.transitionPeriod || 'Transition period to be discussed.');
  });

  addSection('Financing', () => {
    const financingText = {
      'none': 'No seller financing available',
      'partial': 'Seller financing available up to 20%',
      'flexible': 'Flexible on financing terms'
    };
    addText(financingText[data.financing as keyof typeof financingText] || 'Financing terms to be discussed.');
  });

  // Contact Page
  addNewPage();
  pdf.setFillColor(59, 130, 246);
  pdf.rect(0, 0, 210, 297, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Next Steps', 105, 100, { align: 'center' });
  
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'normal');
  pdf.text('For more information or to schedule a meeting,', 105, 130, { align: 'center' });
  pdf.text('please contact us through RemoteOps platform.', 105, 140, { align: 'center' });
  
  pdf.setFontSize(12);
  pdf.text('This document contains confidential and proprietary information.', 105, 200, { align: 'center' });
  pdf.text('Please handle with appropriate care.', 105, 210, { align: 'center' });

  return pdf;
}