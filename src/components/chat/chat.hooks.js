import { useEffect, useRef, useState } from "react";
import { triggerHaptic } from "../../utils/triggerHaptic";

export function useChatState() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [hasBooted, setHasBooted] = useState(false);
  const [isBooting, setIsBooting] = useState(false);
  const [bootLines, setBootLines] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [chatMessages, setChatMessages] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("auroraChatMessages")) || [];
    } catch {
      return [];
    }
  });

  const [userId, setUserId] = useState(() => {
    try {
      return localStorage.getItem("auroraUserId") || "";
    } catch {
      return "";
    }
  });

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => !isOpen && setShowNotification(true), 3000);
    return () => clearTimeout(t);
  }, [isOpen]);

  useEffect(() => {
    if (!userId) {
      const id = "user-" + Date.now();
      setUserId(id);
      localStorage.setItem("auroraUserId", id);
    }
  }, [userId]);

  useEffect(() => {
    localStorage.setItem("auroraChatMessages", JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isLoading, isOpen, isExpanded]);

  useEffect(() => {
    const fn = () => {
      triggerHaptic();
      setIsOpen(prev => !prev);
    };
    window.addEventListener("toggle-chat", fn);
    return () => window.removeEventListener("toggle-chat", fn);
  }, []);

  useEffect(() => {
    if (isOpen && !hasBooted) {
      setIsBooting(true);
      setBootLines([]);

      const logs = [
        "> INITIALIZING NEURAL UPLINK...",
        "> CONNECTING TO LAKSH_CORE...",
        "> SECURITY HANDSHAKE::VERIFIED",
        "> ESTABLISHING SECURE CHANNEL..."
      ];

      let i = 0;
      const interval = setInterval(() => {
        if (i < logs.length) {
          setBootLines(p => [...p, logs[i++]]);
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setIsBooting(false);
            setHasBooted(true);
          }, 800);
        }
      }, 350);
    }
  }, [isOpen, hasBooted]);

  return {
    state: {
      isOpen, setIsOpen,
      isExpanded, setIsExpanded,
      showNotification, setShowNotification,
      hasBooted, isBooting, bootLines,
      chatMessages, setChatMessages,
      input, setInput,
      isLoading, setIsLoading,
      userId,
      messagesEndRef
    }
  };
}
