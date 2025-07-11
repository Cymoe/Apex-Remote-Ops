'use client';

import { useChat } from 'ai/react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ApexLogo } from '@/components/apex-logo';

export default function ApplyPage() {
  const router = useRouter();
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/sales-agent',
    initialMessages: [
      {
        id: '1',
        role: 'assistant',
        content: `Welcome to APEX.

I'm here to understand your vision and determine if we're the right fit for your transformation.

This isn't a typical application. It's a conversation between two professionals exploring a potential partnership.

Let's start with something simple: What brings you here today?`,
      },
    ],
  });

  const [isTyping, setIsTyping] = useState(false);
  const [hasCompletedConversation, setHasCompletedConversation] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    
    // Check if conversation has ended with the specific phrase
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      const conversationText = messages.map(m => m.content).join(' ').toLowerCase();
      
      // Check if we have collected email
      const hasEmail = conversationText.includes('@');
      
      // Check for the specific conclusion phrase
      if (lastMessage.role === 'assistant' && 
          lastMessage.content.toLowerCase().includes('this concludes our evaluation') &&
          hasEmail) {
        
        setHasCompletedConversation(true);
        
        // Start transition after user reads the message
        setTimeout(() => {
          setShowTransition(true);
          
          // Redirect after transition
          setTimeout(() => {
            router.push('/apply/thank-you');
          }, 3000);
        }, 5000);
      }
    }
  }, [messages, router]);

  useEffect(() => {
    if (isLoading) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  }, [isLoading]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col relative">
      {/* Transition Overlay */}
      <AnimatePresence>
        {showTransition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 bg-black flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-mono text-amber-500 mb-4"
              >
                Reviewing your application...
              </motion.div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 200 }}
                transition={{ duration: 3, ease: "easeInOut" }}
                className="h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto rounded-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        animate={{ opacity: showTransition ? 0.3 : 1 }}
        transition={{ duration: 1 }}
        className="flex-1 flex flex-col"
      >
        {/* Header */}
        <header className="sticky top-0 z-20 bg-black/80 backdrop-blur-md border-b border-gray-900">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 text-gray-400 hover:text-gray-300 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-mono">Exit</span>
            </Link>
            <ApexLogo size="sm" className="[&_div[class*='from-professional-blue']]:from-amber-500 [&_div[class*='to-professional-blue']]:to-amber-600 [&_div[class*='border-professional-blue']]:border-amber-500 [&_div[class*='text-professional-blue']]:text-amber-500" />
            <div className="w-16" /> {/* Spacer for centering */}
          </div>
        </header>

      {/* Chat Container */}
      <div className="flex-1 max-w-3xl w-full mx-auto px-4 py-8">
        <div className="space-y-6">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 text-gray-100'
                    : 'bg-gradient-to-br from-gray-900/50 to-gray-900/30 border border-gray-800 text-gray-300'
                } rounded-2xl px-6 py-4 shadow-lg`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
              </div>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex justify-start"
              >
                <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border border-gray-800 rounded-2xl px-6 py-4">
                  <div className="flex gap-1">
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                      className="w-2 h-2 bg-gray-500 rounded-full"
                    />
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                      className="w-2 h-2 bg-gray-500 rounded-full"
                    />
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                      className="w-2 h-2 bg-gray-500 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 bg-gradient-to-t from-black via-black/95 to-transparent pt-8 pb-6">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-4">
          <div className="relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Share your thoughts..."
              disabled={isLoading}
              rows={1}
              className="w-full bg-gray-900/50 border border-gray-800 rounded-2xl pl-6 pr-14 py-4 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-all duration-300 resize-none min-h-[56px] backdrop-blur-sm"
              style={{
                height: 'auto',
                overflowY: 'hidden',
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = `${target.scrollHeight}px`;
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim() || hasCompletedConversation}
              className="absolute right-3 bottom-3 p-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl text-black transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="text-center text-xs text-gray-600 mt-4 font-mono">
            Your responses are being evaluated in real-time
          </p>
        </form>
      </div>
      </motion.div>
    </div>
  );
}