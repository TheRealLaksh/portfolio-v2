import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

// Directly using your given values to avoid env issues
const API_URL = 'https://aiapi.ishan.vip/api/chat';
const API_KEY = 'oqLZh!P`U61f,m4iV?l556.N&O`A%%h';

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  // Safe load from localStorage
  const [chatMessages, setChatMessages] = useState(() => {
    try {
      const stored = localStorage.getItem('auroraChatMessages');
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.error('Failed to parse stored chat messages, resetting.', err);
      return [];
    }
  });

  const [userId, setUserId] = useState(() => {
    try {
      const storedId = localStorage.getItem('auroraUserId');
      return storedId || '';
    } catch {
      return '';
    }
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingDots, setLoadingDots] = useState('');

  // Generate userId once
  useEffect(() => {
    if (!userId) {
      const newUserId = 'user-' + Date.now();
      setUserId(newUserId);
      try {
        localStorage.setItem('auroraUserId', newUserId);
      } catch (err) {
        console.error('Failed to save userId:', err);
      }
    }
  }, [userId]);

  // Persist chat
  useEffect(() => {
    try {
      localStorage.setItem('auroraChatMessages', JSON.stringify(chatMessages));
    } catch (err) {
      console.error('Failed to save chat messages:', err);
    }
  }, [chatMessages]);

  // Loading dots animation
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingDots((prev) => (prev.length < 3 ? prev + '.' : ''));
      }, 500);
      return () => clearInterval(interval);
    } else {
      setLoadingDots('');
    }
  }, [isLoading]);

  const sendMessage = async () => {
    const message = input.trim();
    if (!message || isLoading) return;

    setInput('');

    // Add user + loading in a single update
    setChatMessages((prev) => [
      ...prev,
      { sender: 'You', content: message, type: 'text' },
      { sender: 'AI Laksh', content: '...', type: 'loading' },
    ]);

    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify({ message, userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to get a response from the server.');
      }

      const data = await response.json();
      const aiReply =
        typeof data?.reply === 'string'
          ? data.reply
          : String(data?.reply ?? '');

      setChatMessages((prev) => {
        const updated = [...prev];
        if (
          updated.length &&
          updated[updated.length - 1]?.type === 'loading'
        ) {
          updated.pop();
        }
        return [
          ...updated,
          { sender: 'Aurora', content: aiReply, type: 'mdx' },
        ];
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setChatMessages((prev) => {
        const updated = [...prev];
        if (
          updated.length &&
          updated[updated.length - 1]?.type === 'loading'
        ) {
          updated.pop();
        }
        return [
          ...updated,
          {
            sender: 'Aurora',
            content: 'Error fetching response. Please try again.',
            type: 'text',
          },
        ];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = async () => {
    setChatMessages([]);
    try {
      localStorage.removeItem('auroraChatMessages');
    } catch (err) {
      console.error('Failed to clear stored chat messages:', err);
    }

    try {
      const response = await fetch(API_URL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete chat history on the server.');
      }
    } catch (error) {
      console.error('Error deleting chat history:', error);
    }
  };

  // 🔥 HARD LOCK: scroll only inside chat, never page
  const handleInnerWheel = (e) => {
    const el = e.currentTarget;
    e.preventDefault();        // stop page scroll
    e.stopPropagation();       // stop bubbling
    el.scrollTop += e.deltaY;  // manually scroll just this div
  };

  const handleTouchMove = (e) => {
    // On mobile, keep touches inside the chat
    e.stopPropagation();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-400/40 hover:bg-indigo-500 transition"
      >
        💬
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="w-[340px] max-w-[90vw] rounded-2xl bg-slate-900/95 text-slate-50 shadow-2xl border border-slate-700/60 backdrop-blur p-3 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-700 pb-2 mb-2">
            <div>
              <div className="text-sm font-semibold flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                AI Laksh
              </div>
              <p className="text-[11px] text-slate-400">
                Laksh's digital twin.
              </p>
            </div>
            <button
              onClick={clearChat}
              className="text-[11px] px-2 py-1 rounded-full border border-slate-600 hover:bg-slate-800"
            >
              Clear
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 min-h-[140px] max-h-[260px] overflow-y-auto space-y-2 pr-1 custom-scrollbar"
            onWheel={handleInnerWheel}
            onTouchMove={handleTouchMove}
          >
            {chatMessages.length === 0 && (
              <p className="text-[11px] text-slate-400 text-center mt-4">
                Start a conversation with AI Laksh 👋
              </p>
            )}

            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === 'You' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-[12px] leading-snug ${
                    message.sender === 'You'
                      ? 'bg-indigo-600 text-white rounded-br-sm'
                      : 'bg-slate-800 text-slate-50 rounded-bl-sm'
                  }`}
                >
                  {message.type === 'loading' ? (
                    <span className="opacity-70">{loadingDots || '...'}</span>
                  ) : message.type === 'mdx' ? (
                    <div className="prose prose-invert prose-xs max-w-full">
                      <ReactMarkdown>
                        {String(message.content ?? '')}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <div style={{ whiteSpace: 'pre-wrap' }}>
                      {String(message.content ?? '')}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="mt-2 flex flex-col gap-2">
            <textarea
              rows={2}
              className="w-full resize-none rounded-xl border border-slate-700 bg-slate-900/80 px-2.5 py-1.5 text-[12px] outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              placeholder="Type your message…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="w-full rounded-xl bg-indigo-600 text-[12px] font-medium py-1.5 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-500 transition"
            >
              {isLoading ? 'Thinking…' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatWidget;