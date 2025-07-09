import { jsPDF } from 'jspdf';

interface PitchDeckData {
  companyName: string;
  tagline: string;
  [key: string]: any;
}

export function generatePitchDeckPDF(data: PitchDeckData): jsPDF {
  const pdf = new jsPDF('p', 'mm', 'a4');
  
  // Simple test - just add some text
  pdf.setFontSize(24);
  pdf.text(data.companyName || 'Test Company', 105, 50, { align: 'center' });
  
  pdf.setFontSize(16);
  pdf.text(data.tagline || 'Test Tagline', 105, 70, { align: 'center' });
  
  pdf.addPage();
  pdf.setFontSize(12);
  pdf.text('This is page 2', 20, 20);
  
  return pdf;
}