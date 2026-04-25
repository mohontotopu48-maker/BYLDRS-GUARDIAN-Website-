'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Shield,
  X,
  Send,
  Bot,
  User,
  Lock,
  ChevronRight,
  RotateCcw,
  Minimize2,
  MessageSquare,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

/* ─── Types ──────────────────────────────────────────────────── */
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

/* ─── Quick Actions ────────────────────────────────────────── */
const QUICK_ACTIONS = [
  { icon: '💰', label: 'Check my deposit limit', message: 'What is the legal deposit limit a contractor can ask for in California? What should I do if they ask for more?' },
  { icon: '🛡️', label: 'What is the 20-Point Shield?', message: 'Explain the 20-Point Shield and how it protects homeowners.' },
  { icon: '🔒', label: 'How do I use my Vault?', message: 'How does the Homeowner Vault work? What can I store in it?' },
  { icon: '🔍', label: 'How do I check a Pro?', message: 'How do I use the Check My Pro tool to get a Guardian Risk Report?' },
  { icon: '⭐', label: 'What are Guardian tiers?', message: 'What are the different Pro tiers — Certified, Vetted, and Verified?' },
];

/* ─── Session ID ────────────────────────────────────────────── */
function getSessionId(): string {
  if (typeof window !== 'undefined') {
    let id = sessionStorage.getItem('guardian-ai-session');
    if (!id) {
      id = `session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      sessionStorage.setItem('guardian-ai-session', id);
    }
    return id;
  }
  return 'default';
}

/* ─── Welcome Message ───────────────────────────────────────── */
const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: "Hey there! I'm **Guardian AI**, your personal project protection assistant.\n\nI'm trained on California contracting law, the 20-Point Shield standard, and every feature on BYLDRS GUARDIAN. I'm here to help you:\n\n• 🛡️ **Understand** your protection rights\n• 💰 **Spot red flags** before signing anything\n• 🔒 **Secure** your documents in the Vault\n• 🔍 **Verify** any contractor before hiring\n\nWhat can I help you with today?",
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

/* ─── Component ─────────────────────────────────────────────── */
export function GuardianAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const sessionIdRef = useRef(getSessionId());

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Lock body scroll on mobile when open
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobile, isOpen]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // Focus input when opening
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [isOpen]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: content.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/guardian-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content.trim(),
          sessionId: sessionIdRef.current,
        }),
      });

      const data = await res.json();

      if (data.success) {
        const aiMsg: ChatMessage = {
          id: `ai_${Date.now()}`,
          role: 'assistant',
          content: data.response,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiMsg]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          role: 'assistant',
          content: "I'm having trouble connecting right now. Please try again in a moment.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleClear = async () => {
    try {
      await fetch(`/api/guardian-ai?sessionId=${sessionIdRef.current}`, { method: 'DELETE' });
    } catch {}
    setMessages([WELCOME_MESSAGE]);
    sessionIdRef.current = getSessionId(); // Force new session
  };

  const handleQuickAction = (message: string) => {
    sendMessage(message);
  };

  // Auto-resize textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <>
      {/* ─── Floating Launcher Button ────────────────────────────── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={toggleOpen}
            className="fixed bottom-6 right-6 z-[200] group"
            aria-label="Open Guardian AI Assistant"
          >
            {/* Glowing ring */}
            <div className="absolute -inset-1 rounded-full bg-[#3ED1B8]/20 animate-pulse" />
            <div className="absolute -inset-0.5 rounded-full bg-[#3ED1B8]/10 animate-pulse" />
            {/* Button */}
            <div className="relative h-14 w-14 rounded-full bg-[#3ED1B8] shadow-xl shadow-[#3ED1B8]/30 hover:shadow-[#3ED1B8]/50 flex items-center justify-center transition-shadow duration-300">
              <Shield className="h-6 w-6 text-white" />
            </div>
            {/* Tooltip on hover */}
            <div className="absolute bottom-full right-0 mb-3 px-3 py-1.5 rounded-lg bg-[#1A1D2E] shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              <p className="text-xs font-semibold text-white">Guardian AI</p>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ─── Sidebar Overlay (mobile backdrop) ────────────────── */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[250] bg-black/50 backdrop-blur-sm"
            onClick={toggleOpen}
          />
        )}
      </AnimatePresence>

      {/* ─── Sidebar ───────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed z-[260] flex flex-col ${
              isMobile
                ? 'inset-0 w-full'
                : 'top-0 right-0 bottom-0 w-[400px]'
            }`}
          >
            <div
              className="flex flex-col h-full border-l border-white/[0.06]"
              style={{
                background: 'rgba(15, 18, 25, 0.92)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
              }}
            >
              {/* ── Header ────────────────────────────────────── */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-[#3ED1B8] to-[#3257C2] flex items-center justify-center shadow-lg shadow-[#3ED1B8]/20">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white tracking-tight">
                      Guardian AI
                    </h2>
                    <p className="text-[10px] text-[#3ED1B8] font-semibold uppercase tracking-wider">
                      Your Project Protection Assistant
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleClear}
                    className="h-8 w-8 rounded-lg hover:bg-white/[0.06] flex items-center justify-center transition-colors"
                    title="Clear chat"
                  >
                    <RotateCcw className="h-4 w-4 text-white/40 hover:text-white/70" />
                  </button>
                  {isMobile ? (
                    <button
                      onClick={toggleOpen}
                      className="h-8 w-8 rounded-lg hover:bg-white/[0.06] flex items-center justify-center transition-colors"
                      title="Close"
                    >
                      <X className="h-4 w-4 text-white/40" />
                    </button>
                  ) : (
                    <button
                      onClick={toggleOpen}
                      className="h-8 w-8 rounded-lg hover:bg-white/[0.06] flex items-center justify-center transition-colors"
                      title="Minimize"
                    >
                      <Minimize2 className="h-4 w-4 text-white/40" />
                    </button>
                  )}
                </div>
              </div>

              {/* ── Messages Area ─────────────────────────────── */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 custom-scrollbar">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    {/* Avatar */}
                    <div
                      className={`flex-shrink-0 h-8 w-8 rounded-lg flex items-center justify-center ${
                        msg.role === 'user'
                          ? 'bg-[#3257C2]/20'
                          : 'bg-[#3ED1B8]/20'
                      }`}
                    >
                      {msg.role === 'user' ? (
                        <User className="h-4 w-4 text-[#3257C2]" />
                      ) : (
                        <Shield className="h-4 w-4 text-[#3ED1B8]" />
                      )}
                    </div>

                    {/* Bubble */}
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                        msg.role === 'user'
                          ? 'bg-[#3257C2] text-white rounded-tr-sm'
                          : 'bg-white/[0.06] text-white/90 rounded-tl-sm border border-white/[0.06]'
                      }`}
                    >
                      {/* Timestamp */}
                      <p className="text-[9px] font-medium text-white/30 mb-1">
                        {msg.role === 'user' ? 'You' : 'Guardian AI'} · {msg.timestamp}
                      </p>
                      {/* Content with markdown-like formatting */}
                      <div className="text-[13px] leading-relaxed whitespace-pre-wrap">
                        {msg.content.split('\n').map((line, i) => {
                          // Bold
                          const parts = line.split(/\*\*(.*?)\*\*/g);
                          return (
                            <span key={i}>
                              {parts.map((part, j) =>
                                j % 2 === 1 ? (
                                  <strong key={`${i}-${j}`}>{part}</strong>
                                ) : (
                                  <span key={`${i}-${j}`}>{part}</span>
                                ),
                              )}
                              {i < msg.content.split('\n').length - 1 && <br />}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-[#3ED1B8]/20 flex items-center justify-center">
                      <Shield className="h-4 w-4 text-[#3ED1B8]" />
                    </div>
                    <div className="bg-white/[0.06] border border-white/[0.06] rounded-2xl rounded-tl-sm px-4 py-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <div className="flex gap-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-[#3ED1B8] animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="h-1.5 w-1.5 rounded-full bg-[#3ED1B8] animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="h-1.5 w-1.5 rounded-full bg-[#3ED1B8] animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                        <span className="text-[9px] text-white/30 font-medium">Analyzing...</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Scroll anchor */}
                <div ref={messagesEndRef} />
              </div>

              {/* ── Quick Actions ──────────────────────────────── */}
              {messages.length <= 2 && !isLoading && (
                <div className="px-4 py-3 border-t border-white/[0.06] shrink-0">
                  <p className="text-[10px] font-semibold text-white/25 uppercase tracking-wider mb-2.5">
                    Suggested Questions
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_ACTIONS.map((qa) => (
                      <button
                        key={qa.label}
                        onClick={() => handleQuickAction(qa.message)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] px-3 py-1.5 text-[11px] font-medium text-white/60 hover:text-[#3ED1B8] transition-all duration-200 group"
                      >
                        <span>{qa.icon}</span>
                        <span className="hidden sm:inline">{qa.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Input Area ──────────────────────────────────── */}
              <div className="px-4 py-3 border-t border-white/[0.06] shrink-0">
                <form onSubmit={handleSubmit} className="space-y-2">
                  <div className="flex items-end gap-2 rounded-xl bg-white/[0.06] border border-white/[0.08] px-3 py-2 focus-within:border-[#3ED1B8]/30 transition-colors">
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={handleTextareaChange}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask Guardian AI anything..."
                      rows={1}
                      className="flex-1 bg-transparent resize-none text-sm text-white placeholder:text-white/25 focus:outline-none min-h-[24px] max-h-[120px] py-1"
                      disabled={isLoading}
                    />
                    <Button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="h-8 w-8 rounded-lg bg-[#3ED1B8] hover:bg-[#34b9a2] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 shrink-0"
                    >
                      <Send className="h-4 w-4 text-[#0A0D14]" />
                    </Button>
                  </div>
                  <p className="text-[9px] text-white/15 text-center leading-relaxed flex items-center justify-center gap-1">
                    <Lock className="h-2.5 w-2.5" />
                    Your conversations are encrypted and private.
                  </p>
                </form>
              </div>

              {/* ── Agency Credits ────────────────────────────── */}
              <div className="px-4 py-2.5 border-t border-white/[0.06] shrink-0">
                <p className="text-center text-[9px] text-white/25 leading-relaxed">
                  Powered by{' '}
                  <span className="font-bold text-white/40">NXLBYLDR AI</span>
                  {' '}| managed by{' '}
                  <span className="font-bold text-white/40">VSUAL</span>
                  <span className="text-white/25">digitalmedia.com</span>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
