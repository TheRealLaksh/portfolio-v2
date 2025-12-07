import { API_KEY, API_URL } from "./chat.config";
import resumeFile from "../../assets/resume/laksh.pradhwani.resume.pdf";
import { triggerHaptic } from "../../utils/triggerHaptic";

export function createChatActions({
  input,
  isLoading,
  userId,
  setInput,
  setChatMessages,
  setIsLoading
}) {

  const handleCopyEmail = () => {
    setChatMessages(prev => [
      ...prev,
      { sender: "You", content: "Can I get your contact info?", type: "text" }
    ]);

    setTimeout(() => {
      triggerHaptic();
      setChatMessages(prev => [...prev, { sender: "Aurora", type: "contact" }]);
    }, 600);
  };

  const handleViewProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDownloadResume = () => {
    window.open(resumeFile, "_blank");
  };

  const sendMessage = async () => {
    const message = input.trim();
    if (!message || isLoading) return;

    setInput("");
    setChatMessages(prev => [...prev, { sender: "You", content: message, type: "text" }]);
    setIsLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
        body: JSON.stringify({ message, userId })
      });

      const data = await res.json();
      let aiReply = data?.reply || "";
      let showCard = false;

      if (aiReply.includes("[SHOW_CONTACT_CARD]")) {
        showCard = true;
        aiReply = aiReply.replace("[SHOW_CONTACT_CARD]", "");
      }

      setChatMessages(prev => [...prev, { sender: "Aurora", content: aiReply, type: "mdx" }]);

      if (showCard) {
        setTimeout(() => {
          triggerHaptic();
          setChatMessages(prev => [...prev, { sender: "Aurora", type: "contact" }]);
        }, 600);
      }

    } catch {
      setChatMessages(prev => [...prev, { sender: "Aurora", content: "Error. Please try again.", type: "text" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = async () => {
    setChatMessages([]);
    localStorage.removeItem("auroraChatMessages");

    try {
      await fetch(API_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
        body: JSON.stringify({ userId })
      });
    } catch {}
  };

  return {
    sendMessage,
    clearChat,
    handleCopyEmail,
    handleViewProjects,
    handleDownloadResume
  };
}
