import { useState, useEffect } from 'react';
import { triggerHaptic } from '../utils/triggerHaptic';

const API_URL = 'https://ai-backend-2.vercel.app/api/chat';
const API_KEY = 'AI-Laksh123';

export const useChat = () => {
  const [chatMessages, setChatMessages] = useState(() => {
    try {
      const stored = localStorage.getItem('auroraChatMessages');
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  const [userId, setUserId] = useState(() => {
    try { return localStorage.getItem('auroraUserId') || ''; } catch { return ''; }
  });

  const [isLoading, setIsLoading] = useState(false);

  // Initialize Unique User ID
  useEffect(() => {
    if (!userId) {
      const newId = 'user-' + Date.now();
      setUserId(newId);
      localStorage.setItem('auroraUserId', newId);
    }
  }, [userId]);

  // Persist Messages
  useEffect(() => {
    localStorage.setItem('auroraChatMessages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  const addMessage = (msg) => {
    setChatMessages((prev) => [...prev, msg]);
  };

  const sendMessage = async (messageText) => {
    if (!messageText.trim() || isLoading) return;

    // Add User Message
    addMessage({ sender: 'You', content: messageText, type: 'text' });
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
        body: JSON.stringify({ message: messageText, userId }),
      });

      if (!response.ok) throw new Error('Failed');
      const data = await response.json();

      let aiReply = data?.reply || '';
      let showCard = false;

      // Check for Contact Card Tag
      if (aiReply.includes('[SHOW_CONTACT_CARD]')) {
        showCard = true;
        aiReply = aiReply.replace('[SHOW_CONTACT_CARD]', '');
      }

      // Add AI Response
      addMessage({ sender: 'Aurora', content: aiReply, type: 'mdx' });

      // Trigger Card if needed
      if (showCard) {
        setTimeout(() => {
          triggerHaptic();
          addMessage({ sender: 'Aurora', type: 'contact' });
        }, 600);
      }

    } catch (error) {
      addMessage({ sender: 'Aurora', content: 'Could you please repeat your request.', type: 'text' });
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = async () => {
    setChatMessages([]);
    localStorage.removeItem('auroraChatMessages');
    try {
      // Optional: Clear history on backend
      await fetch(API_URL, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
        body: JSON.stringify({ userId }),
      });
    } catch (e) { console.error(e); }
  };

  return {
    chatMessages,
    isLoading,
    addMessage,
    sendMessage,
    clearChat
  };
};