import React from "react";
import ReactMarkdown from "react-markdown";
import { FiMessageSquare, FiSend, FiX } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../utils/cn";

import { useChatState } from "./chat.hooks";
import { createChatActions } from "./chat.actions";
import TypingWave from "./components/TypingWave";
import ContactCard from "./components/ContactCard";

export default function ChatWidget() {

  const { state } = useChatState();
  const actions = createChatActions(state);

  const {
    isOpen, setIsOpen,
    chatMessages,
    input, setInput,
    isLoading,
    messagesEndRef
  } = state;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div className="fixed bottom-6 right-6 bg-black w-[400px] h-[600px] rounded-xl flex flex-col">

            <div className="p-4 border-b flex justify-between">
              AI Laksh
              <FiX onClick={() => setIsOpen(false)} />
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {chatMessages.map((m,i) => (
                <div key={i}>
                  {m.type === "contact" ? <ContactCard /> : (
                    <div>{m.type === "mdx" ? <ReactMarkdown>{m.content}</ReactMarkdown> : m.content}</div>
                  )}
                </div>
              ))}
              {isLoading && <TypingWave />}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                className="flex-1"
              />
              <button onClick={actions.sendMessage}>
                <FiSend />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(p => !p)}
        className="fixed bottom-6 right-6">
        <FiMessageSquare />
      </button>
    </>
  );
}
