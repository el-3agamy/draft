"use client";

import { useLocale, useTranslations } from "next-intl";
import React, { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  showWhatsAppButton?: boolean;
}

export default function DentalChatWidget() {
  const locale = useLocale() ;
  const t = useTranslations("ChatWidget") ;
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:t("welcomeMsg"),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const whatsappNumber = process.env.NEXT_PUBLIC_CLINIC_WHATSAPP_NUMBER || "01092901881";

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput("");

    const updatedHistory: Message[] = [
      ...messages,
      { role: "user", content: userMsg },
    ];
    setMessages(updatedHistory);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();
      let replyText = data.reply || "Something went wrong.";
      let hasWhatsAppTrigger = false;

      // Check if AI requested transfer to WhatsApp
      if (replyText.includes("[ACTION:WHATSAPP_TRANSFER]")) {
        replyText = replyText.replace("[ACTION:WHATSAPP_TRANSFER]", "").trim();
        hasWhatsAppTrigger = true;
      }

      setMessages([
        ...updatedHistory,
        {
          role: "assistant",
          content: replyText,
          showWhatsAppButton: hasWhatsAppTrigger,
        },
      ]);
    } catch (err) {
      setMessages([
        ...updatedHistory,
        {
          role: "assistant",
          content:
            "I'm experiencing connectivity issues. Please contact our clinic directly on WhatsApp.",
          showWhatsAppButton: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppLink = (customText?: string) => {
    const text = customText
      ? encodeURIComponent(customText)
      : encodeURIComponent("Hello! I was chatting on your website and would like to speak to the clinic reception.");
    return `https://wa.me/${whatsappNumber}?text=${text}`;
  };

  return (
    // <div className="fixed bottom-5 right-5 z-[9999999999999999999999] font-sans">
    // <div className="fixed bottom-5 right-5 z-[9999999999999999999999] font-sans">
    <div
  className={`fixed bottom-22.5 md:bottom-5 z-[9999999999999999999999] font-sans ${
    locale === "ar" ? "left-5" : "right-5"
  }`}
>
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-500 hover:cursor-pointer text-white font-medium px-4 py-3 rounded-full shadow-lg transition-transform hover:scale-105"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>{t("chatBotTitle")}</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold">
                🦷
              </div>
              <div>
                <h3 className="font-semibold text-sm">{t("chatBotName")}</h3>
                <span className="text-xs text-blue-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span> {t("online")}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white  p-1 rounded-lg hover:cursor-pointer "
            >
              ✕
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50 text-sm">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm"
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">{msg.content}</p>
                </div>

                {/* WhatsApp Action Button */}
                {msg.showWhatsAppButton && (
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow transition-all hover:scale-102"
                  >
                    <span>{t("whatsappConvert")}</span>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                    </svg>
                  </a>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-gray-400 text-xs py-2">
                <span className="animate-pulse">{t("typing")}</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-white border-t border-gray-200 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={t("askPlaceholder")}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-gray-100 text-gray-800 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-2 rounded-xl transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}