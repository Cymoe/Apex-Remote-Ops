'use client';

import { useState } from 'react';

export default function TestAgent() {
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      console.log('🚀 Sending to API:', input);
      
      const response = await fetch('/api/sales-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-conversation-id': 'test-' + Date.now()
        },
        body: JSON.stringify({
          messages: newMessages
        })
      });

      console.log('✅ API Response Status:', response.status);
      console.log('✅ API Response Headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let agentResponse = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value);
          console.log('📦 Chunk:', chunk);
          
          // Parse streaming format
          const lines = chunk.split('\n');
          for (const line of lines) {
            if (line.startsWith('0:"') && line.endsWith('"')) {
              const content = line.slice(3, -1);
              if (content) {
                agentResponse += content.replace(/\\n/g, '\n').replace(/\\"/g, '"');
              }
            }
          }
        }
      }

      console.log('✅ Final Agent Response:', agentResponse);

      if (agentResponse) {
        setMessages(prev => [...prev, { role: 'assistant', content: agentResponse }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'No response received' }]);
      }

    } catch (error) {
      console.error('❌ API Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${error.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">🧪 Agent Test Page</h1>
      
      <div className="border rounded-lg p-4 h-96 overflow-y-auto mb-4 bg-gray-50">
        {messages.length === 0 ? (
          <p className="text-gray-500">Start a conversation to test the hybrid architecture...</p>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`mb-3 p-3 rounded ${
              msg.role === 'user' ? 'bg-blue-100 ml-8' : 'bg-white mr-8'
            }`}>
              <div className="font-semibold text-sm mb-1">
                {msg.role === 'user' ? '👤 You' : '🤖 Agent'}
              </div>
              <div className="whitespace-pre-wrap">{msg.content}</div>
            </div>
          ))
        )}
        {loading && (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="animate-spin w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full"></div>
            <span>Agent is thinking...</span>
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !loading && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 border rounded px-3 py-2"
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Send
        </button>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p><strong>Status:</strong></p>
        <ul className="list-disc list-inside space-y-1">
          <li>🐍 Python Service: <span className="font-mono">localhost:8000</span></li>
          <li>⚛️ Next.js Frontend: <span className="font-mono">localhost:3000</span></li>
          <li>🔗 API Endpoint: <span className="font-mono">/api/sales-agent</span></li>
        </ul>
        <p className="mt-2">Check browser console for detailed logs!</p>
      </div>
    </div>
  );
}