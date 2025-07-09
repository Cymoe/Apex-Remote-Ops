'use client';

import { useEffect, useState } from 'react';
import { MessageSquare, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Conversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

interface ConversationListProps {
  selectedId?: string;
  onSelect: (id: string | undefined) => void;
}

export function ConversationList({ selectedId, onSelect }: ConversationListProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const response = await fetch('/api/conversations');
      const data = await response.json();
      setConversations(data.conversations || []);
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteConversation = async (id: string) => {
    try {
      await fetch(`/api/conversations?id=${id}`, { method: 'DELETE' });
      setConversations(conversations.filter((c) => c.id !== id));
      if (selectedId === id) {
        onSelect(undefined);
      }
    } catch (error) {
      console.error('Failed to delete conversation:', error);
    }
  };

  return (
    <Card className="h-[600px] bg-carbon-black border-slate-gray">
      <div className="border-b border-slate-gray p-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-pure-white">Conversations</h3>
        <Button
          onClick={() => onSelect(undefined)}
          size="sm"
          variant="ghost"
          className="text-pure-white hover:bg-deep-black"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        {loading ? (
          <div className="p-4 text-center text-medium-gray">Loading...</div>
        ) : conversations.length === 0 ? (
          <div className="p-4 text-center text-medium-gray">
            <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No conversations yet</p>
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={cn(
                  'group flex items-center justify-between rounded-lg px-3 py-2 cursor-pointer transition-colors',
                  selectedId === conversation.id
                    ? 'bg-professional-blue text-pure-white'
                    : 'hover:bg-deep-black text-light-gray hover:text-pure-white'
                )}
                onClick={() => onSelect(conversation.id)}
              >
                <div className="flex-1 truncate">
                  <p className="font-medium truncate">{conversation.title}</p>
                  <p className="text-xs opacity-70">
                    {new Date(conversation.updated_at).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteConversation(conversation.id);
                  }}
                  size="sm"
                  variant="ghost"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </Card>
  );
}