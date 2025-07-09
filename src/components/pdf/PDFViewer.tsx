'use client';

import React, { useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Download,
  X,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Set worker source for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  file: string | Uint8Array | null;
  className?: string;
  onClose?: () => void;
  fileName?: string;
  showThumbnails?: boolean;
}

export function PDFViewer({ 
  file, 
  className, 
  onClose, 
  fileName = 'document.pdf',
  showThumbnails = true 
}: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [thumbnailsLoaded, setThumbnailsLoaded] = useState<boolean[]>([]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
    setThumbnailsLoaded(new Array(numPages).fill(false));
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('PDF load error:', error);
    setError('Failed to load PDF');
    setLoading(false);
  };

  const changePage = (newPage: number) => {
    setPageNumber(Math.min(Math.max(1, newPage), numPages || 1));
  };

  const changeZoom = (delta: number) => {
    setScale(prevScale => {
      const newScale = prevScale + delta;
      return Math.min(Math.max(0.5, newScale), 3.0);
    });
  };

  const handleDownload = () => {
    if (!file) return;
    
    let blob: Blob;
    if (typeof file === 'string') {
      // If file is a base64 string, convert to blob
      const base64Data = file.split(',')[1] || file;
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      blob = new Blob([byteArray], { type: 'application/pdf' });
    } else {
      // If file is already a Uint8Array
      blob = new Blob([file], { type: 'application/pdf' });
    }
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!file) {
    return (
      <div className={cn("flex items-center justify-center p-8", className)}>
        <p className="text-muted-foreground">No PDF file provided</p>
      </div>
    );
  }

  return (
    <Document
      file={file as any}
      onLoadSuccess={onDocumentLoadSuccess}
      onLoadError={onDocumentLoadError}
      loading={
        <div className={cn("flex items-center justify-center h-full", className)}>
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-sm text-muted-foreground">Loading PDF...</p>
          </div>
        </div>
      }
      error={
        <div className={cn("flex items-center justify-center h-full", className)}>
          <p className="text-destructive">Failed to load PDF</p>
        </div>
      }
    >
      <div className={cn("flex h-full bg-background", className)}>
        {/* Thumbnail Sidebar */}
        {showThumbnails && numPages && numPages > 0 && (
          <div className="w-48 border-r bg-muted/10 overflow-y-auto">
            <div className="p-2 space-y-2">
              {Array.from(new Array(numPages), (el, index) => (
                <div
                  key={`page_${index + 1}`}
                  className={cn(
                    "cursor-pointer rounded-lg overflow-hidden border-2 transition-all hover:shadow-md bg-white",
                    pageNumber === index + 1 
                      ? "border-primary shadow-md" 
                      : "border-transparent hover:border-border"
                  )}
                  onClick={() => changePage(index + 1)}
                >
                  <div className="relative">
                    <div className="aspect-[8.5/11] flex items-center justify-center bg-muted/5">
                      <Page
                        pageNumber={index + 1}
                        width={160}
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                        loading={
                          <div className="flex items-center justify-center h-full">
                            <FileText className="h-8 w-8 text-muted-foreground/50" />
                          </div>
                        }
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs py-1 text-center">
                      Page {index + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main PDF Viewer */}
        <div className="flex-1 flex flex-col">
          {/* Controls */}
          <div className="flex items-center justify-between p-4 border-b bg-background">
            <div className="flex items-center gap-2">
              {/* Page Navigation */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => changePage(pageNumber - 1)}
                disabled={pageNumber <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="px-3 text-sm font-medium">
                Page {pageNumber} of {numPages || '...'}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => changePage(pageNumber + 1)}
                disabled={pageNumber >= (numPages || 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              <div className="w-px h-6 bg-border mx-2" />

              {/* Zoom Controls */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => changeZoom(-0.1)}
                disabled={scale <= 0.5}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="px-3 text-sm min-w-[60px] text-center font-medium">
                {Math.round(scale * 100)}%
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => changeZoom(0.1)}
                disabled={scale >= 3.0}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleDownload}
                title="Download PDF"
              >
                <Download className="h-4 w-4" />
              </Button>
              {onClose && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onClose}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* PDF Display */}
          <div className="flex-1 overflow-auto flex items-center justify-center p-8 bg-muted/5">
            {!loading && !error && (
              <Page
                pageNumber={pageNumber}
                scale={scale}
                className="shadow-xl"
                renderAnnotationLayer={false}
                renderTextLayer={false}
                loading={
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                }
              />
            )}
          </div>
        </div>
      </div>
    </Document>
  );
}