'use client';

import { Shield, Cookie, Lock, Settings, BarChart3, Brain, HelpCircle, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';

/* ─── Cookie Types ─────────────────────────────────────────── */
const cookieTypes = [
  {
    icon: Lock,
    label: 'Essential Cookies',
    color: 'text-[#3257C2]',
    bg: 'bg-[#3257C2]/8',
    border: 'border-[#3257C2]/15',
    description: 'These are strictly necessary to provide you with services available through our Website, specifically to maintain the security of the Homeowner Vault and your account session.',
  },
  {
    icon: Settings,
    label: 'Performance & Functionality',
    color: 'text-[#3ED1B8]',
    bg: 'bg-[#3ED1B8]/8',
    border: 'border-[#3ED1B8]/15',
    description: 'These cookies are used to enhance the performance and functionality of our Website, such as remembering your preferences in the Homeowner Academy.',
  },
  {
    icon: BarChart3,
    label: 'Analytics & Customization',
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    description: 'These cookies collect information that is used either in aggregate form to help us understand how our Website is being used or to help us customize our Website for you (e.g., localizing Pro results based on your zip code).',
  },
];

/* ─── Component ─────────────────────────────────────────────── */
export function CookiePolicyView() {
  const { setCurrentPage } = useAppStore();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-b from-[#0A0D14] to-[#0F1219] pt-32 pb-20 overflow-hidden">
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        {/* Top gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Cookie Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-6"
          >
            <Cookie className="h-7 w-7 text-amber-400" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Cookie Policy
            </h1>
            <p className="mt-3 text-sm text-white/40">
              Last Updated: February 5, 2026
            </p>
          </motion.div>
        </div>
      </div>

      {/* Policy Body */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-24">
        {/* Preamble */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="mt-[-32px] relative z-10 rounded-2xl bg-white shadow-xl shadow-black/[0.06] border border-gray-100 p-6 sm:p-8 mb-10"
        >
          <p className="text-sm text-gray-600 leading-relaxed">
            This Cookie Policy explains how BYLDRS GUARDIAN (<strong>&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; and &quot;our&quot;</strong>) uses cookies and similar technologies to recognize you when you visit our Website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-8">
          {/* §1 — What Are Cookies */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex items-start gap-3 mb-4">
              <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-xs font-bold bg-gray-100 text-gray-500 border border-gray-200">1</span>
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-gray-900 pt-0.5">
                WHAT ARE COOKIES?
              </h2>
            </div>
            <div className="pl-11 text-sm text-gray-600 leading-relaxed">
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </div>
          </motion.div>

          {/* §2 — Why We Use Cookies — Visual Cookie Type Cards */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <div className="flex items-start gap-3 mb-5">
              <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-xs font-bold bg-[#3257C2]/8 text-[#3257C2] border border-[#3257C2]/15">2</span>
              <div>
                <h2 className="text-base sm:text-lg font-bold tracking-tight text-gray-900 pt-0.5">
                  WHY WE USE COOKIES
                </h2>
                <p className="text-sm text-gray-500 mt-1">We use first-party and third-party cookies for several reasons:</p>
              </div>
            </div>

            <div className="pl-11 grid sm:grid-cols-3 gap-3">
              {cookieTypes.map((ct) => {
                const Icon = ct.icon;
                return (
                  <div
                    key={ct.label}
                    className={`rounded-xl border ${ct.border} ${ct.bg} p-4 flex flex-col items-center text-center gap-3`}
                  >
                    <div className={`flex items-center justify-center h-10 w-10 rounded-lg bg-white shadow-sm shrink-0`}>
                      <Icon className={`h-5 w-5 ${ct.color}`} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">{ct.label}</h3>
                      <p className="text-[13px] text-gray-600 leading-relaxed mt-1.5">{ct.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* §3 — Guardian AI Interactions */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="flex items-start gap-3 mb-4">
              <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-xs font-bold bg-[#3ED1B8]/8 text-[#3ED1B8] border border-[#3ED1B8]/15">3</span>
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-gray-900 pt-0.5">
                GUARDIAN AI INTERACTIONS
              </h2>
            </div>
            <div className="pl-11">
              <div className="rounded-xl bg-[#3ED1B8]/5 border border-[#3ED1B8]/15 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-3.5 w-3.5 text-[#3ED1B8]" />
                  <span className="text-xs font-semibold text-[#3ED1B8] uppercase tracking-wider">AI Context Storage</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Our Guardian AI may use local storage or cookies to remember the context of your current conversation so that it can provide more accurate auditing advice as you navigate different pages.
                </p>
              </div>
            </div>
          </motion.div>

          {/* §4 — How Can I Control Cookies */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.25 }}
          >
            <div className="flex items-start gap-3 mb-4">
              <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-xs font-bold bg-gray-100 text-gray-500 border border-gray-200">4</span>
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-gray-900 pt-0.5">
                HOW CAN I CONTROL COOKIES?
              </h2>
            </div>
            <div className="pl-11 text-sm text-gray-600 leading-relaxed">
              <p className="mb-3">
                You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies.
              </p>
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <HelpCircle className="h-3.5 w-3.5 text-amber-500" />
                  <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Please Note</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  <strong>Disabling cookies may restrict access to the Homeowner Vault</strong> and other secure features. You may still use our Website, but some functionality may be limited.
                </p>
              </div>
            </div>
          </motion.div>

          {/* §5 — Updates to This Policy */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <div className="flex items-start gap-3 mb-4">
              <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-xs font-bold bg-gray-100 text-gray-500 border border-gray-200">5</span>
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-gray-900 pt-0.5">
                UPDATES TO THIS POLICY
              </h2>
            </div>
            <div className="pl-11 text-sm text-gray-600 leading-relaxed">
              <p>
                We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
              </p>
            </div>
          </motion.div>
        </div>

        {/* §6 — Contact */}
        <div className="mt-16 pt-8 border-t border-gray-100">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.35 }}
          >
            <div className="flex items-start gap-3 mb-4">
              <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-xs font-bold bg-gray-100 text-gray-500 border border-gray-200">6</span>
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-gray-900 pt-0.5">
                CONTACT US
              </h2>
            </div>

            <div className="pl-11 space-y-3">
              <p className="text-sm text-gray-600 leading-relaxed">
                If you have any questions about our use of cookies or other technologies, please email us:
              </p>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-amber-50 shrink-0">
                  <Cookie className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">BYLDRS GUARDIAN Data Support</p>
                  <p className="text-sm text-gray-500">Questions about our use of cookies</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <Mail className="h-4 w-4 text-[#3257C2] shrink-0" />
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Email</p>
                  <a
                    href="mailto:info.vsualdm@gmail.com"
                    className="text-sm text-[#3257C2] hover:text-[#2a49a8] font-medium transition-colors"
                  >
                    info.vsualdm@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Policies Cross-link */}
        <div className="mt-10 grid sm:grid-cols-2 gap-3">
          <button
            onClick={() => setCurrentPage('privacy-policy')}
            className="p-4 rounded-xl bg-[#3257C2]/5 border border-[#3257C2]/15 flex items-start gap-3 text-left hover:bg-[#3257C2]/10 transition-colors group"
          >
            <Shield className="h-5 w-5 text-[#3257C2] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-900 group-hover:text-[#3257C2] transition-colors">Privacy Policy</p>
              <p className="text-xs text-gray-500 mt-0.5">How we collect, use, and protect your data.</p>
            </div>
          </button>
          <button
            onClick={() => setCurrentPage('terms-of-service')}
            className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-start gap-3 text-left hover:bg-gray-100 transition-colors group"
          >
            <Shield className="h-5 w-5 text-gray-400 shrink-0 mt-0.5 group-hover:text-[#3257C2]" />
            <div>
              <p className="text-sm font-semibold text-gray-900 group-hover:text-[#3257C2] transition-colors">Terms of Service</p>
              <p className="text-xs text-gray-500 mt-0.5">Your rights and obligations on our platform.</p>
            </div>
          </button>
        </div>

        {/* Back Button */}
        <div className="mt-10 text-center">
          <button
            onClick={() => setCurrentPage('home')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#3257C2] hover:bg-[#2a49a8] text-white font-semibold text-sm shadow-lg shadow-[#3257C2]/20 hover:shadow-[#3257C2]/35 transition-all duration-200"
          >
            <Shield className="h-4 w-4" />
            Back to BYLDRS GUARDIAN
          </button>
        </div>
      </div>
    </div>
  );
}
