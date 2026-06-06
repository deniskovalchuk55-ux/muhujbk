"use client";
import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = "Ти AI-асистент магазину техніки та електроніки. Відповідай українською мовою, дружньо і по суті. Загальна інформація: безкоштовна доставка від 1000 грн, гарантія до 12 місяців, є розстрочка, trade-in, кешбек 1-20%.";

const SUGGESTIONS = ["Які iPhone є в наявності?", "Скільки коштує MacBook Air M3?", "Є безкоштовна доставка?", "Як працює trade-in?"];

export default function Home() {
  const [messages, setMessages] = useState([{ role: "assistant", content: "Привіт! Я AI-асистент 👋\nЩо вас цікавить?" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  async function send(text?: string) {
    const t = text || input.trim();
    if (!t || loading) return;
    setInput("");
    const msgs = [...messages, { role: "user", content: t }];
    setMessages(msgs);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: SYSTEM_PROMPT, messages: msgs }),
      });
      const data = await res.json();
      const reply = data.content?.filter((b: any) => b.type === "text").map((b: any) => b.text).join("\n") || "Помилка 🙏";
      setMessages([...msgs, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...msgs, { role: "assistant", content: "Помилка 🙏" }]);
    }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", fontFamily: "system-ui" }}>
      <div style={{ width: "100%", maxWidth: "480px", height: "90vh", maxHeight: "700px", background: "#111", borderRadius: "24px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "20px 24px", background: "#1a1a1a", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "44px", height: "44px", borderRadius: "14px", background: "linear-gradient(135deg,#ff8c00,#ff6b00)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>🤖</div>
          <div>
            <div style={{ fontWeight: 700, color: "#fff", fontSize: "15px" }}>AI Assistant</div>
            <div style={{ fontSize: "12px", color: "#4ade80" }}>● Онлайн</div>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", gap: "8px", alignItems: "flex-end" }}>
              {m.role === "assistant" && <div style={{ width: "28px", height: "28px", borderRadius: "10px", background: "linear-gradient(135deg,#ff8c00,#ff6b00)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px" }}>🤖</div>}
              <div style={{ maxWidth: "80%", padding: "12px 16px", borderRadius: m.role === "user" ? "18px 18px 4px 18
