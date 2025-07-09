import { jsPDF } from 'jspdf';

interface PitchDeckData {
  companyName: string;
  tagline: string;
  [key: string]: any;
}

export function generatePitchDeckPDF(data: PitchDeckData): jsPDF {
  try {
    console.log('Creating new jsPDF instance...');
    const pdf = new jsPDF();
    
    console.log('Adding text to PDF...');
    // Page 1 - Cover
    pdf.setFontSize(30);
    pdf.text(data.companyName || 'Company Name', 105, 50, { align: 'center' });
    
    pdf.setFontSize(16);
    pdf.text(data.tagline || 'Company Tagline', 105, 70, { align: 'center' });
    
    pdf.setFontSize(14);
    pdf.text('Investment Opportunity', 105, 100, { align: 'center' });
    
    pdf.setFontSize(12);
    pdf.text(new Date().toLocaleDateString(), 105, 280, { align: 'center' });
    
    console.log('Adding second page...');
    // Page 2 - Executive Summary
    pdf.addPage();
    pdf.setFontSize(24);
    pdf.text('Executive Summary', 20, 30);
    
    pdf.setFontSize(12);
    pdf.text('Business Description:', 20, 50);
    
    const description = data.businessDescription || 'A leading home service company...';
    const lines = pdf.splitTextToSize(description, 170);
    pdf.text(lines, 20, 60);
    
    // Page 3 - Financial Highlights
    pdf.addPage();
    pdf.setFontSize(24);
    pdf.text('Financial Highlights', 20, 30);
    
    pdf.setFontSize(14);
    pdf.text(`Current Revenue: ${data.currentRevenue || 'N/A'}`, 20, 50);
    pdf.text(`Profit Margin: ${data.profitMargin || 'N/A'}`, 20, 60);
    pdf.text(`Customer Count: ${data.totalCustomers || 'N/A'}`, 20, 70);
    
    console.log('PDF creation complete');
    return pdf;
  } catch (error) {
    console.error('Error creating PDF:', error);
    throw new Error(`PDF Generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}