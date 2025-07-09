'use client';

import { useChat } from 'ai/react';
import { Send, Loader2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface ChatInterfaceProps {
  conversationId?: string;
}

export function ChatInterface({ conversationId }: ChatInterfaceProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: {
      conversationId,
    },
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Card className="flex h-[calc(100vh-12rem)] lg:h-[600px] flex-col bg-carbon-black border-slate-gray">
      <div className="border-b border-slate-gray p-3 sm:p-4">
        <h3 className="text-lg font-semibold text-pure-white">Apex AI Assistant</h3>
        <p className="text-sm text-medium-gray">Your strategic operations advisor</p>
      </div>

      <ScrollArea ref={scrollRef} className="flex-1 p-3 sm:p-4">
        <div className="space-y-3 sm:space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-medium-gray py-8">
              <p>Ask Apex anything about remote operations, team management, or strategic planning.</p>
            </div>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  'max-w-[85%] sm:max-w-[80%] rounded-lg px-3 py-2 sm:px-4',
                  message.role === 'user'
                    ? 'bg-professional-blue text-pure-white'
                    : 'bg-deep-black text-pure-white border border-slate-gray'
                )}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-deep-black text-pure-white border border-slate-gray rounded-lg px-4 py-2">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="border-t border-slate-gray p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask Apex anything..."
            className="flex-1 bg-deep-black border-slate-gray text-pure-white placeholder:text-medium-gray"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-professional-blue hover:bg-professional-blue/90"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}