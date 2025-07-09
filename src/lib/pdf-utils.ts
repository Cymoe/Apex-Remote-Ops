import jsPDF from 'jspdf';

/**
 * Convert jsPDF instance to base64 string
 */
export async function pdfToBase64(pdf: jsPDF): Promise<string> {
  const pdfOutput = pdf.output('datauristring');
  return pdfOutput;
}

/**
 * Convert jsPDF instance to Uint8Array
 */
export function pdfToUint8Array(pdf: jsPDF): Uint8Array {
  const pdfOutput = pdf.output('arraybuffer');
  return new Uint8Array(pdfOutput);
}

/**
 * Convert base64 string to Blob
 */
export function base64ToBlob(base64: string, type: string = 'application/pdf'): Blob {
  const base64Data = base64.split(',')[1] || base64;
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type });
}

/**
 * Create a temporary URL for a PDF
 */
export function createPDFUrl(pdf: jsPDF): string {
  const blob = new Blob([pdf.output('arraybuffer')], { type: 'application/pdf' });
  return URL.createObjectURL(blob);
}

/**
 * Download a PDF directly
 */
export function downloadPDF(pdf: jsPDF, fileName: string): void {
  pdf.save(fileName);
}

/**
 * Generate a thumbnail of the first page of a PDF
 * Returns a data URL that can be used as an image src
 */
export async function generatePDFThumbnail(
  pdfGenerator: () => Promise<jsPDF>,
  width: number = 200,
  height: number = 260
): Promise<string> {
  try {
    // Generate the PDF
    const pdf = await pdfGenerator();
    
    // Create a canvas element
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) throw new Error('Could not get canvas context');
    
    // Get the first page as a data URL
    const pageData = pdf.output('datauristring');
    
    // For now, return a placeholder as generating actual thumbnails
    // from jsPDF requires additional libraries
    return createPlaceholderThumbnail(width, height);
  } catch (error) {
    console.error('Error generating thumbnail:', error);
    return createPlaceholderThumbnail(width, height);
  }
}

/**
 * Create a placeholder thumbnail
 */
function createPlaceholderThumbnail(width: number, height: number): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return '';
  
  // Background
  ctx.fillStyle = '#f3f4f6';
  ctx.fillRect(0, 0, width, height);
  
  // Border
  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 1;
  ctx.strokeRect(0, 0, width, height);
  
  // Text
  ctx.fillStyle = '#6b7280';
  ctx.font = '14px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('PDF Preview', width / 2, height / 2);
  
  return canvas.toDataURL();
}