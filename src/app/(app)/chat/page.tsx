'use client';

import { useState } from 'react';
import { ChatInterface } from '@/components/chat/chat-interface';
import { ConversationList } from '@/components/chat/conversation-list';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

export default function ChatPage() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | undefined>();
  const [isConversationListOpen, setIsConversationListOpen] = useState(false);

  const handleConversationSelect = (id: string | undefined) => {
    setSelectedConversationId(id);
    setIsConversationListOpen(false); // Close mobile sheet when conversation is selected
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-pure-white">Apex AI</h1>
            <p className="text-sm sm:text-base text-medium-gray">Your 24/7 AI mentor powered by our proprietary knowledge base.</p>
          </div>
          
          {/* Mobile conversation list trigger */}
          <div className="lg:hidden">
            <Sheet open={isConversationListOpen} onOpenChange={setIsConversationListOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="bg-carbon-black border-slate-gray text-pure-white hover:bg-deep-black">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chats
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 bg-carbon-black border-slate-gray p-0">
                <ConversationList
                  selectedId={selectedConversationId}
                  onSelect={handleConversationSelect}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
        {/* Desktop conversation list */}
        <div className="lg:col-span-1 hidden lg:block">
          <ConversationList
            selectedId={selectedConversationId}
            onSelect={setSelectedConversationId}
          />
        </div>
        <div className="lg:col-span-3">
          <ChatInterface conversationId={selectedConversationId} />
        </div>
      </div>
    </div>
  );
}