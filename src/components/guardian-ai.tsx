'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Shield,
  X,
  Send,
  Bot,
  User,
  Lock,
  RotateCcw,
  Minimize2,
  AlertTriangle,
  Briefcase,
  DollarSign,
  ChevronDown,
  UserCheck,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

/* ─── Types ──────────────────────────────────────────────────── */
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isAlert?: boolean;
}

type WorkflowType = 'ghosting_rescue' | 'matchmaking' | null;

interface FormData {
  name: string;
  email: string;
  phone: string;
  zipCode: string;
  trade: string;
  amountPaid: string;
  workPercentDone: string;
  projectTimeline: string;
  contractorName: string;
}

const INITIAL_FORM: FormData = {
  name: '',
  email: '',
  phone: '',
  zipCode: '',
  trade: '',
  amountPaid: '',
  workPercentDone: '',
  projectTimeline: '',
  contractorName: '',
};

const TRADE_OPTIONS = [
  'Roofing',
  'Plumbing',
  'Electrical',
  'HVAC',
  'Solar',
  'Kitchen Remodel',
  'Bathroom Remodel',
  'Flooring',
  'Painting',
  'Landscaping',
  'General Construction',
  'Windows & Doors',
  'Concrete & Masonry',
  'Fencing',
  'Other',
];

const TIMELINE_OPTIONS = [
  'ASAP — Emergency',
  'Within 1 week',
  'Within 2 weeks',
  'Within 1 month',
  'Flexible',
  'Just researching',
];

/* ─── Quick Actions ────────────────────────────────────────── */
const QUICK_ACTIONS = [
  {
    icon: <AlertTriangle className="h-3.5 w-3.5" />,
    label: 'My contractor disappeared — Help!',
    message: 'My contractor disappeared — Help! They took my money and I have an unfinished project.',
    workflow: 'ghosting_rescue' as WorkflowType,
    priority: true,
    subtitle: 'Get matched with a verified rescue Pro',
  },
  {
    icon: <UserCheck className="h-3.5 w-3.5" />,
    label: 'Find me a Vetted Pro now.',
    message: 'Find me a Vetted Pro now. I need a verified contractor for my project.',
    workflow: 'matchmaking' as WorkflowType,
    priority: true,
    subtitle: "We'll source & audit a Pro for you",
  },
  {
    icon: <DollarSign className="h-3.5 w-3.5" />,
    label: 'Did I overpay my deposit?',
    message: 'Did I overpay my deposit? My contractor asked me for money upfront and I want to know if it was legal.',
    workflow: null,
    priority: false,
  },
  {
    icon: <Lock className="h-3.5 w-3.5" />,
    label: 'Open my Project Vault.',
    message: 'How do I open my Project Vault? I want to store my contracts and permits securely.',
    workflow: null,
    priority: false,
  },
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

/* ─── Welcome Message (timestamp computed at render time) ────── */
function getWelcomeMessage(): ChatMessage {
  return {
    id: 'welcome',
    role: 'assistant',
    content: "Hey there! I'm **Guardian AI**, your project protection concierge.\n\nI'm here to help you with whatever you need:\n\n• 🚨 **Rescue** your project if your contractor ghosted you\n• 🔍 **Find** a vetted Pro in your area — fast\n• 💰 **Check** if you overpaid your deposit\n• 🔒 **Secure** your documents in the Vault\n\nWhat's going on with your project?",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
}

/* ─── Component ─────────────────────────────────────────────── */
export function GuardianAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [getWelcomeMessage()]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Workflow state
  const [activeWorkflow, setActiveWorkflow] = useState<WorkflowType>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

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
  }, [messages, isLoading, showForm]);

  // Focus input when opening
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [isOpen]);

  // Use ref to prevent race conditions with stale closure
  const isLoadingRef = useRef(false);
  const messageCountRef = useRef(messages.length);
  messageCountRef.current = messages.length;

  const sendMessage = useCallback(async (content: string, workflowTrigger?: WorkflowType) => {
    // Use ref for guard — closure's isLoading is stale under rapid clicks
    if (!content.trim() || isLoadingRef.current) return;

    isLoadingRef.current = true;
    setIsLoading(true);

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: content.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Activate workflow if triggered
    if (workflowTrigger) {
      setActiveWorkflow(workflowTrigger);
    }

    try {
      const res = await fetch('/api/guardian-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content.trim(),
          sessionId: sessionIdRef.current,
        }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();

      if (data.success) {
        const aiMsg: ChatMessage = {
          id: `ai_${Date.now()}`,
          role: 'assistant',
          content: data.response,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        // Track workflow from server response
        if (data.workflow) {
          setActiveWorkflow(data.workflow as WorkflowType);
        }

        // Use functional updater to avoid stale messages array
        setMessages((prev) => {
          const updated = [...prev, aiMsg];

          // Show deposit alert as a separate message
          if (data.depositAlert) {
            updated.push({
              id: `alert_${Date.now()}`,
              role: 'assistant',
              content: data.depositAlert,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              isAlert: true,
            });
            // Auto-show form for ghosting rescue after deposit violation
            if (!workflowTrigger && !data.workflow) {
              setActiveWorkflow('ghosting_rescue');
            }
          }

          return updated;
        });

        // Auto-show form after workflow messages
        if (data.workflow && messageCountRef.current > 2) {
          setTimeout(() => setShowForm(true), 1500);
        }
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
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  }, []); // Stable — no closure over changing state

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
      await fetch('/api/guardian-ai', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: sessionIdRef.current }),
      });
    } catch {}
    setMessages([getWelcomeMessage()]);
    setActiveWorkflow(null);
    setShowForm(false);
    setFormSubmitted(false);
    setFormData(INITIAL_FORM);
    sessionIdRef.current = getSessionId();
  };

  const handleQuickAction = (qa: typeof QUICK_ACTIONS[0]) => {
    sendMessage(qa.message, qa.workflow);
  };

  // Auto-resize textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  // Form submission
  const handleFormSubmit = async () => {
    if (!activeWorkflow || formSubmitting) return;

    // Basic validation
    if (!formData.zipCode.trim() || formData.zipCode.trim().length < 5) {
      setMessages((prev) => [
        ...prev,
        {
          id: `val_${Date.now()}`,
          role: 'assistant',
          content: '⚠️ Please provide a valid 5-digit ZIP code so I can match you with Pros in your area.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      return;
    }

    if (!formData.trade.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          id: `val_${Date.now()}`,
          role: 'assistant',
          content: '⚠️ Please select the trade/service type so we can find the right Pro for your project.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      return;
    }

    setFormSubmitting(true);

    try {
      const res = await fetch('/api/ghl/rescue-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workflow: activeWorkflow,
          ...formData,
        }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();

      if (data.success) {
        setFormSubmitted(true);
        setShowForm(false);

        setMessages((prev) => [
          ...prev,
          {
            id: `success_${Date.now()}`,
            role: 'assistant',
            content: data.message + (data.depositWarning ? '\n\n' + data.depositWarning : ''),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isAlert: !!data.depositWarning,
          },
        ]);
      } else {
        // Server returned success: false — show the error message
        setMessages((prev) => [
          ...prev,
          {
            id: `form_fail_${Date.now()}`,
            role: 'assistant',
            content: data.error || data.message || 'Something went wrong. Please try again.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isAlert: true,
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `form_err_${Date.now()}`,
          role: 'assistant',
          content: "I wasn't able to submit your request right now. Please try again in a moment, or call our Guardian support line directly.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setFormSubmitting(false);
    }
  };

  const toggleOpen = () => setIsOpen(!isOpen);

  const updateFormField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      {/* ─── Side-Anchored Vertical Tab ──────────────────────────── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            whileHover={{ x: -14 }}
            whileTap={{ x: -14, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={toggleOpen}
            className="fixed right-0 top-[40%] z-[200] group outline-none"
            aria-label="Ask Guardian AI Assistant"
          >
            {/* Turquoise Glow — left edge */}
            <div className="absolute -left-6 -top-2 -bottom-2 w-12 rounded-l-2xl bg-[#3ED1B8]/8 blur-2xl transition-all duration-500 group-hover:bg-[#3ED1B8]/20 group-hover:-left-8 group-hover:w-16" />
            <div className="absolute -left-3 -top-1 -bottom-1 w-6 rounded-l-xl bg-[#3ED1B8]/12 blur-lg transition-all duration-500 group-hover:bg-[#3ED1B8]/25 group-hover:-left-4 group-hover:w-8" />

            {/* Tab body */}
            <div
              className="relative flex flex-col items-center gap-2.5 py-5 pl-3 pr-2.5 rounded-l-xl bg-[#3257C2] transition-shadow duration-500 group-hover:shadow-[#3ED1B8]/30"
              style={{
                boxShadow: '-2px 0 15px rgba(62, 209, 184, 0.12), 0 0 30px rgba(62, 209, 184, 0.06)',
              }}
            >
              <Shield
                className="h-5 w-5 text-white shrink-0 md:h-[18px] md:w-[18px]"
                strokeWidth={2}
              />
              <div className="w-5 h-px bg-white/15 rounded-full" />
              <span
                className="hidden md:block font-bold text-white text-[13px] tracking-[0.18em] leading-none select-none"
                style={{ writingMode: 'vertical-rl' }}
              >
                Ask Guardian AI
              </span>
              <span
                className="block md:hidden font-bold text-white text-[13px] tracking-[0.2em] leading-none select-none"
                style={{ writingMode: 'vertical-rl' }}
              >
                Ask AI
              </span>
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
                          : msg.isAlert
                          ? 'bg-red-500/20'
                          : 'bg-[#3ED1B8]/20'
                      }`}
                    >
                      {msg.role === 'user' ? (
                        <User className="h-4 w-4 text-[#3257C2]" />
                      ) : msg.isAlert ? (
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                      ) : (
                        <Shield className="h-4 w-4 text-[#3ED1B8]" />
                      )}
                    </div>

                    {/* Bubble */}
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                        msg.role === 'user'
                          ? 'bg-[#3257C2] text-white rounded-tr-sm'
                          : msg.isAlert
                          ? 'bg-red-500/10 text-red-100 rounded-tl-sm border border-red-500/20'
                          : 'bg-white/[0.06] text-white/90 rounded-tl-sm border border-white/[0.06]'
                      }`}
                    >
                      {/* Timestamp */}
                      <p className={`text-[9px] font-medium mb-1 ${
                        msg.isAlert ? 'text-red-400/60' : 'text-white/30'
                      }`}>
                        {msg.role === 'user' ? 'You' : msg.isAlert ? '⚠️ Legal Alert' : 'Guardian AI'} · {msg.timestamp}
                      </p>
                      {/* Content with markdown-like formatting */}
                      <div className="text-[13px] leading-relaxed whitespace-pre-wrap">
                        {msg.content.split('\n').map((line, i) => {
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

                {/* ── Intake Form (Workflow) ─────────────────── */}
                <AnimatePresence>
                  {showForm && activeWorkflow && !formSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-3"
                    >
                      <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-[#3ED1B8]/20 flex items-center justify-center">
                        {activeWorkflow === 'ghosting_rescue' ? (
                          <UserCheck className="h-4 w-4 text-[#3ED1B8]" />
                        ) : (
                          <Briefcase className="h-4 w-4 text-[#3ED1B8]" />
                        )}
                      </div>
                      <div className="max-w-[85%] w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl rounded-tl-sm overflow-hidden">
                        {/* Form Header */}
                        <div className="px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
                          <p className="text-[10px] font-bold text-[#3ED1B8] uppercase tracking-wider">
                            {activeWorkflow === 'ghosting_rescue'
                              ? '🚨 Priority Rescue Lead Intake'
                              : '🔍 Concierge Match Request'}
                          </p>
                          <p className="text-[10px] text-white/40 mt-0.5">
                            {activeWorkflow === 'ghosting_rescue'
                              ? 'Secure a verified Guardian to rescue your project'
                              : 'We\'ll source & audit a Pro for your area'}
                          </p>
                        </div>

                        {/* Form Fields */}
                        <div className="px-4 py-3 space-y-2.5">
                          {/* Name */}
                          <div>
                            <label className="text-[10px] font-medium text-white/40 uppercase tracking-wider block mb-1">
                              Full Name <span className="text-white/20">(optional)</span>
                            </label>
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) => updateFormField('name', e.target.value)}
                              placeholder="John Doe"
                              className="w-full bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-1.5 text-[12px] text-white placeholder:text-white/20 focus:outline-none focus:border-[#3ED1B8]/40 transition-colors"
                            />
                          </div>

                          {/* ZIP Code + Trade (row) */}
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] font-medium text-white/40 uppercase tracking-wider block mb-1">
                                ZIP Code *
                              </label>
                              <input
                                type="text"
                                value={formData.zipCode}
                                onChange={(e) => updateFormField('zipCode', e.target.value.replace(/[^0-9]/g, '').slice(0, 5))}
                                placeholder="90210"
                                maxLength={5}
                                className="w-full bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-1.5 text-[12px] text-white placeholder:text-white/20 focus:outline-none focus:border-[#3ED1B8]/40 transition-colors"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-medium text-white/40 uppercase tracking-wider block mb-1">
                                Trade *
                              </label>
                              <div className="relative">
                                <select
                                  value={formData.trade}
                                  onChange={(e) => updateFormField('trade', e.target.value)}
                                  className="w-full bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-1.5 text-[12px] text-white appearance-none focus:outline-none focus:border-[#3ED1B8]/40 transition-colors"
                                >
                                  <option value="" className="bg-[#0F1219]">Select trade...</option>
                                  {TRADE_OPTIONS.map((t) => (
                                    <option key={t} value={t} className="bg-[#0F1219]">{t}</option>
                                  ))}
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-white/30 pointer-events-none" />
                              </div>
                            </div>
                          </div>

                          {/* Ghosting-specific fields */}
                          {activeWorkflow === 'ghosting_rescue' && (
                            <>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="text-[10px] font-medium text-white/40 uppercase tracking-wider block mb-1">
                                    Amount Paid $
                                  </label>
                                  <input
                                    type="text"
                                    value={formData.amountPaid}
                                    onChange={(e) => updateFormField('amountPaid', e.target.value.replace(/[^0-9.]/g, ''))}
                                    placeholder="2,500"
                                    className="w-full bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-1.5 text-[12px] text-white placeholder:text-white/20 focus:outline-none focus:border-[#3ED1B8]/40 transition-colors"
                                  />
                                  {formData.amountPaid && parseFloat(formData.amountPaid.replace(/,/g, '')) > 1000 && (
                                    <p className="text-[9px] text-red-400 mt-1 flex items-center gap-1">
                                      <AlertTriangle className="h-2.5 w-2.5" />
                                      ⚠️ Exceeds $1,000 legal limit — violation flagged
                                    </p>
                                  )}
                                </div>
                                <div>
                                  <label className="text-[10px] font-medium text-white/40 uppercase tracking-wider block mb-1">
                                    % Work Done
                                  </label>
                                  <input
                                    type="text"
                                    value={formData.workPercentDone}
                                    onChange={(e) => updateFormField('workPercentDone', e.target.value.replace(/[^0-9]/g, '').slice(0, 3))}
                                    placeholder="15"
                                    maxLength={3}
                                    className="w-full bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-1.5 text-[12px] text-white placeholder:text-white/20 focus:outline-none focus:border-[#3ED1B8]/40 transition-colors"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="text-[10px] font-medium text-white/40 uppercase tracking-wider block mb-1">
                                  Contractor Name <span className="text-white/20">(optional)</span>
                                </label>
                                <input
                                  type="text"
                                  value={formData.contractorName}
                                  onChange={(e) => updateFormField('contractorName', e.target.value)}
                                  placeholder="ABC Roofing Co."
                                  className="w-full bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-1.5 text-[12px] text-white placeholder:text-white/20 focus:outline-none focus:border-[#3ED1B8]/40 transition-colors"
                                />
                              </div>
                            </>
                          )}

                          {/* Matchmaking-specific fields */}
                          {activeWorkflow === 'matchmaking' && (
                            <div>
                              <label className="text-[10px] font-medium text-white/40 uppercase tracking-wider block mb-1">
                                Project Timeline
                              </label>
                              <div className="relative">
                                <select
                                  value={formData.projectTimeline}
                                  onChange={(e) => updateFormField('projectTimeline', e.target.value)}
                                  className="w-full bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-1.5 text-[12px] text-white appearance-none focus:outline-none focus:border-[#3ED1B8]/40 transition-colors"
                                >
                                  <option value="" className="bg-[#0F1219]">Select timeline...</option>
                                  {TIMELINE_OPTIONS.map((t) => (
                                    <option key={t} value={t} className="bg-[#0F1219]">{t}</option>
                                  ))}
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-white/30 pointer-events-none" />
                              </div>
                            </div>
                          )}

                          {/* Email + Phone */}
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] font-medium text-white/40 uppercase tracking-wider block mb-1">
                                Email
                              </label>
                              <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => updateFormField('email', e.target.value)}
                                placeholder="you@email.com"
                                className="w-full bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-1.5 text-[12px] text-white placeholder:text-white/20 focus:outline-none focus:border-[#3ED1B8]/40 transition-colors"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-medium text-white/40 uppercase tracking-wider block mb-1">
                                Phone
                              </label>
                              <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => updateFormField('phone', e.target.value)}
                                placeholder="(555) 123-4567"
                                className="w-full bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-1.5 text-[12px] text-white placeholder:text-white/20 focus:outline-none focus:border-[#3ED1B8]/40 transition-colors"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Form Actions */}
                        <div className="px-4 py-2.5 border-t border-white/[0.06] flex items-center gap-2">
                          <Button
                            onClick={handleFormSubmit}
                            disabled={formSubmitting}
                            className="flex-1 h-8 rounded-lg bg-[#3ED1B8] hover:bg-[#34b9a2] text-[#0A0D14] text-[11px] font-bold disabled:opacity-50 flex items-center justify-center gap-1.5 transition-all"
                          >
                            {formSubmitting ? (
                              <>
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                Submitting...
                              </>
                            ) : (
                              <>
                                <Shield className="h-3.5 w-3.5" />
                                {activeWorkflow === 'ghosting_rescue'
                                  ? 'Submit Rescue Lead'
                                  : 'Submit Match Request'}
                              </>
                            )}
                          </Button>
                          <button
                            onClick={() => { setShowForm(false); setActiveWorkflow(null); }}
                            className="h-8 px-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-[11px] text-white/40 hover:text-white/60 transition-all"
                          >
                            Cancel
                          </button>
                        </div>

                        {/* Security note */}
                        <div className="px-4 pb-2.5">
                          <p className="text-[9px] text-white/20 flex items-center gap-1">
                            <Lock className="h-2.5 w-2.5" />
                            Your data is encrypted and stored securely. Never shared without consent.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form submitted confirmation */}
                <AnimatePresence>
                  {formSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3"
                    >
                      <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-[#3ED1B8]/20 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-[#3ED1B8]" />
                      </div>
                      <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-[#3ED1B8]/10 border border-[#3ED1B8]/20 px-4 py-3">
                        <p className="text-[12px] text-[#3ED1B8] font-medium">
                          ✅ Your {activeWorkflow === 'ghosting_rescue' ? 'Rescue Lead' : 'Match Request'} has been submitted and is being processed.
                        </p>
                        <p className="text-[10px] text-white/40 mt-1">
                          You can continue chatting with Guardian AI or start a new session.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Scroll anchor */}
                <div ref={messagesEndRef} />
              </div>

              {/* ── Quick Actions ──────────────────────────────── */}
              {messages.length <= 2 && !isLoading && !showForm && (
                <div className="px-4 py-3 border-t border-white/[0.06] shrink-0">
                  <p className="text-[10px] font-semibold text-white/25 uppercase tracking-wider mb-2.5">
                    How can we help?
                  </p>
                  <div className="space-y-2">
                    {/* Priority actions (prominent) */}
                    <div className="space-y-1.5">
                      {QUICK_ACTIONS.filter((qa) => qa.priority).map((qa) => (
                        <button
                          key={qa.label}
                          onClick={() => handleQuickAction(qa)}
                          className="w-full flex items-center gap-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] px-3.5 py-2.5 text-left transition-all duration-200 group"
                        >
                          <div className={`flex-shrink-0 h-7 w-7 rounded-lg flex items-center justify-center ${
                            qa.workflow === 'ghosting_rescue'
                              ? 'bg-red-500/10 text-red-400'
                              : 'bg-[#3ED1B8]/10 text-[#3ED1B8]'
                          }`}>
                            {qa.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[11px] font-semibold text-white/70 group-hover:text-white transition-colors block">
                              {qa.label}
                            </span>
                            {qa.subtitle && (
                              <span className="text-[9px] text-white/30 group-hover:text-white/40 transition-colors">
                                {qa.subtitle}
                              </span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Standard actions (compact pills) */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {QUICK_ACTIONS.filter((qa) => !qa.priority).map((qa) => (
                        <button
                          key={qa.label}
                          onClick={() => handleQuickAction(qa)}
                          className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] px-2.5 py-1 text-[10px] font-medium text-white/50 hover:text-[#3ED1B8] transition-all duration-200"
                        >
                          {qa.icon}
                          <span className="hidden sm:inline">{qa.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── Workflow CTA (show when in workflow but form not yet visible) ── */}
              {activeWorkflow && !showForm && messages.length > 2 && !formSubmitted && (
                <div className="px-4 py-2.5 border-t border-white/[0.06] shrink-0">
                  <button
                    onClick={() => setShowForm(true)}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#3ED1B8]/10 hover:bg-[#3ED1B8]/15 border border-[#3ED1B8]/20 px-4 py-2.5 transition-all duration-200"
                  >
                    <Shield className="h-4 w-4 text-[#3ED1B8]" />
                    <span className="text-[11px] font-bold text-[#3ED1B8]">
                      {activeWorkflow === 'ghosting_rescue'
                        ? 'Submit Priority Rescue Lead'
                        : 'Start Concierge Match Request'}
                    </span>
                  </button>
                  <button
                    onClick={() => setActiveWorkflow(null)}
                    className="w-full text-center text-[10px] text-white/25 hover:text-white/40 mt-1.5 transition-colors"
                  >
                    Continue chatting instead
                  </button>
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
                      placeholder="What's going on with your project?"
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
