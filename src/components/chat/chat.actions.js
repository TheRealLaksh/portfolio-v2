import { API_KEY, API_URL } from "./chat.config";
import { triggerHaptic } from "../../utils/triggerHaptic";

export function createChatActions(state) {
  const {
    input, setInput,
    userId,
    setChatMessages,
    setIsLoading
  } = state;

  const sendMessage = async () => {
    const msg = input.trim();
    if (!msg) return;

    setInput("");
    setChatMessages(p => [...p, { sender: "You", content: msg, type: "text" }]);
    setIsLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
        body: JSON.stringify({ message: msg, userId })
      });

      const data = await res.json();
      let reply = data.reply || "";

      let showCard = reply.includes("[SHOW_CONTACT_CARD]");
      reply = reply.replace("[SHOW_CONTACT_CARD]", "");

      setChatMessages(p => [...p, { sender: "Aurora", content: reply, type: "mdx" }]);

      if (showCard) {
        setTimeout(() => {
          triggerHaptic();
          setChatMessages(p => [...p, { sender: "Aurora", type: "contact" }]);
        }, 600);
      }

    } catch {
      setChatMessages(p => [...p, { sender: "Aurora", content: "Error.", type: "text" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = async () => {
    setChatMessages([]);
    localStorage.removeItem("auroraChatMessages");
  };

  return { sendMessage, clearChat };
}
