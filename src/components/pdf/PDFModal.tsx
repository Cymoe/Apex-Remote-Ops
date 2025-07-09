'use client';

import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from '@/components/ui/dialog';
import { PDFViewer } from './PDFViewer';
import { Button } from '@/components/ui/button';
import { 
  Share2, 
  Mail, 
  Copy, 
  Twitter,
  Linkedin,
  X
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface PDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfData: string | Uint8Array | null;
  fileName?: string;
  companyName?: string;
}

export function PDFModal({ 
  isOpen, 
  onClose, 
  pdfData, 
  fileName = 'pitch-deck.pdf',
  companyName = 'Company'
}: PDFModalProps) {
  
  const handleShare = async (method: string) => {
    if (!pdfData) return;

    switch (method) {
      case 'copy-link':
        // Create a temporary blob URL
        let blob: Blob;
        if (typeof pdfData === 'string') {
          const base64Data = pdfData.split(',')[1] || pdfData;
          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          blob = new Blob([byteArray], { type: 'application/pdf' });
        } else {
          blob = new Blob([pdfData], { type: 'application/pdf' });
        }
        
        const url = URL.createObjectURL(blob);
        navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
        
        // Revoke after 5 minutes
        setTimeout(() => URL.revokeObjectURL(url), 5 * 60 * 1000);
        break;

      case 'email':
        const subject = encodeURIComponent(`${companyName} Pitch Deck`);
        const body = encodeURIComponent(`Please find attached the pitch deck for ${companyName}.`);
        window.open(`mailto:?subject=${subject}&body=${body}`);
        toast.info('Please attach the downloaded PDF to your email');
        break;

      case 'twitter':
        const tweetText = encodeURIComponent(`Check out the pitch deck for ${companyName}!`);
        window.open(`https://twitter.com/intent/tweet?text=${tweetText}`);
        break;

      case 'linkedin':
        const linkedinText = encodeURIComponent(`${companyName} Pitch Deck`);
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`);
        break;

      case 'native':
        // Use Web Share API if available
        if (navigator.share) {
          try {
            let blob: Blob;
            if (typeof pdfData === 'string') {
              const base64Data = pdfData.split(',')[1] || pdfData;
              const byteCharacters = atob(base64Data);
              const byteNumbers = new Array(byteCharacters.length);
              for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              const byteArray = new Uint8Array(byteNumbers);
              blob = new Blob([byteArray], { type: 'application/pdf' });
            } else {
              blob = new Blob([pdfData], { type: 'application/pdf' });
            }
            
            const file = new File([blob], fileName, { type: 'application/pdf' });
            
            await navigator.share({
              title: `${companyName} Pitch Deck`,
              text: `Check out the pitch deck for ${companyName}`,
              files: [file]
            });
          } catch (error) {
            console.error('Share failed:', error);
            toast.error('Sharing failed. Please try another method.');
          }
        } else {
          toast.error('Sharing is not supported on this device');
        }
        break;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] w-full max-h-[90vh] h-full p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>PDF Preview</DialogTitle>
          <DialogDescription>
            Preview your generated pitch deck
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col h-full">
          {/* Header with title and share button */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">{fileName}</h3>
            
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {navigator.share && (
                    <DropdownMenuItem onClick={() => handleShare('native')}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share...
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => handleShare('copy-link')}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy link
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleShare('email')}>
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleShare('twitter')}>
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleShare('linkedin')}>
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* PDF Viewer */}
          <div className="flex-1 overflow-hidden">
            <PDFViewer 
              file={pdfData} 
              fileName={fileName}
              className="h-full"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}