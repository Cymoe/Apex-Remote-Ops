import { NextRequest, NextResponse } from 'next/server';
import React from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import { PitchDeckPDF } from '@/lib/generate-pitch-deck-pdf-professional';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    console.log('API route called');
    const data = await request.json();
    console.log('Received data:', data.companyName);
    
    // Generate the PDF buffer
    console.log('Creating PDF element...');
    const element = React.createElement(PitchDeckPDF, { data });
    
    console.log('Rendering to buffer...');
    const pdfBuffer = await renderToBuffer(element);
    console.log('PDF buffer created, size:', pdfBuffer.length);
    
    // Create response with proper headers
    const response = new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${data.companyName || 'Business'}_Pitch_Deck_${new Date().toISOString().split('T')[0]}.pdf"`,
      },
    });
    
    return response;
  } catch (error) {
    console.error('Detailed error in API route:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');
    return NextResponse.json(
      { 
        error: 'Failed to generate PDF', 
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}