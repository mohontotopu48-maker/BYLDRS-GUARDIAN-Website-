'use client';

import { Shield, Scale, AlertTriangle, Mail, MapPin, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';

/* ─── Policy Sections ──────────────────────────────────────── */
const sections = [
  {
    number: '1.0',
    title: 'THE SERVICE DEFINED',
    content: 'BYLDRS GUARDIAN provides homeowner advocacy, contractor verification, and project auditing tools, including the 20-Point Shield and the Homeowner Vault. We are a third-party verification platform and are not a licensed contractor, law firm, or insurance agency.',
  },
  {
    number: '2.0',
    title: 'NO ARCHITECTURAL OR LEGAL ADVICE',
    content: 'The information provided in the Homeowner Academy, by the Guardian AI, or within a Guardian Risk Report is for educational and informational purposes only. It does not constitute legal, financial, or professional architectural advice. Users are encouraged to consult with licensed professionals for specific legal or structural concerns.',
    highlight: true,
    icon: 'advice' as const,
  },
  {
    number: '3.0',
    title: 'USER ACCOUNTS & THE VAULT',
    items: [
      {
        sub: 'Security',
        text: 'You are responsible for maintaining the confidentiality of your Vault login.',
      },
      {
        sub: 'Accuracy',
        text: 'You agree to provide accurate information when requesting a Guardian Risk Report. Providing fraudulent documents may result in account termination.',
      },
      {
        sub: 'Storage',
        text: 'While the Company uses high-level encryption (AES-256), we are not a permanent archival service. You should maintain independent copies of all critical construction documents.',
      },
    ],
    highlight: true,
    icon: 'vault' as const,
  },
  {
    number: '4.0',
    title: 'INDEPENDENT CONTRACTOR RELATIONSHIP',
    items: [
      {
        sub: 'BYLDRS GUARDIAN is an independent entity.',
        text: '',
      },
      {
        sub: 'No Employment',
        text: 'Contractors listed, sponsored, or "Guardian Verified" on this platform are independent third parties. They are not employees, agents, or partners of BYLDRS GUARDIAN or VSUAL digitalmedia.',
      },
      {
        sub: 'The Final Say',
        text: 'The decision to hire a contractor is made solely by the homeowner. We provide the data; you provide the signature.',
      },
    ],
  },
  {
    number: '5.0',
    title: 'LIMITATION OF LIABILITY',
    preamble: 'To the maximum extent permitted by California law, BYLDRS GUARDIAN, its owners, and VSUAL digitalmedia shall not be liable for:',
    items: [
      {
        sub: 'Project Issues',
        text: 'Any project delays, workmanship defects, or financial disputes between a homeowner and a contractor.',
      },
      {
        sub: 'Data & Service',
        text: 'Any loss of data or temporary service interruptions of the Guardian AI or Vault.',
      },
      {
        sub: 'Shield Rating',
        text: 'Any reliance on the "Shield" rating as a guarantee of a contractor\'s future behavior.',
      },
    ],
    disclaimer: true,
  },
  {
    number: '6.0',
    title: 'INTELLECTUAL PROPERTY',
    content: 'The BYLDRS logo, the "20-Point Shield" methodology, and all video content in the Homeowner Academy are the exclusive property of the Company and VSUAL digitalmedia. Any unauthorized reproduction or "scraping" of this data for commercial use is strictly prohibited.',
    highlight: true,
    icon: 'ip' as const,
  },
  {
    number: '7.0',
    title: 'CALIFORNIA SENIOR CITIZEN PROTECTIONS',
    content: 'In accordance with California law, homeowners aged 65 or older are entitled to a five (5) business day right to cancel any service agreement made through this platform. All other users maintain a three (3) business day right to cancel.',
    highlight: true,
    icon: 'senior' as const,
  },
  {
    number: '8.0',
    title: 'DISPUTE RESOLUTION',
    content: 'Any dispute arising from the use of this Service shall be resolved through binding arbitration in Los Angeles County, California, in accordance with the rules of the American Arbitration Association.',
  },
];

/* ─── Component ─────────────────────────────────────────────── */
export function TermsOfServiceView() {
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
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3257C2]/40 to-transparent" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Scale Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-[#3257C2]/15 border border-[#3257C2]/30 mb-6"
          >
            <Scale className="h-7 w-7 text-white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Terms of Service
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
            Please read these Terms of Service (<strong>&quot;Terms&quot;</strong>) carefully before using the BYLDRS GUARDIAN platform (the <strong>&quot;Service&quot;</strong>). By accessing or using the Service, you agree to be bound by these Terms and our{' '}
            <button
              onClick={() => setCurrentPage('privacy-policy')}
              className="text-[#3257C2] hover:text-[#2a49a8] font-medium underline underline-offset-2 transition-colors"
            >
              Privacy Policy
            </button>.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, idx) => (
            <motion.div
              key={section.number}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + idx * 0.04 }}
              className="relative"
            >
              {/* Section header */}
              <div className="flex items-start gap-3 mb-4">
                <span className={`inline-flex items-center justify-center h-8 w-8 rounded-lg text-xs font-bold shrink-0 ${
                  section.disclaimer
                    ? 'bg-amber-50 text-amber-600 border border-amber-200'
                    : section.highlight
                      ? 'bg-[#3257C2]/8 text-[#3257C2] border border-[#3257C2]/15'
                      : 'bg-gray-100 text-gray-500 border border-gray-200'
                }`}>
                  {section.number.split('.')[0]}
                </span>
                <h2 className={`text-base sm:text-lg font-bold tracking-tight pt-0.5 ${
                  section.disclaimer ? 'text-amber-900' : 'text-gray-900'
                }`}>
                  {section.title}
                </h2>
              </div>

              {/* Section body — single content */}
              {section.content && (
                <div className={`pl-11 text-sm text-gray-600 leading-relaxed ${
                  section.highlight ? 'rounded-xl bg-gray-50 border border-gray-100 p-4 -ml-1' : ''
                }`}>
                  {section.highlight && section.icon && (
                    <div className="flex items-center gap-2 mb-2">
                      {section.icon === 'advice' && <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />}
                      {section.icon === 'vault' && <Lock className="h-3.5 w-3.5 text-[#3257C2]" />}
                      {section.icon === 'ip' && <Shield className="h-3.5 w-3.5 text-[#3257C2]" />}
                      {section.icon === 'senior' && <Shield className="h-3.5 w-3.5 text-[#3ED1B8]" />}
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {section.icon === 'advice' && 'Disclaimer'}
                        {section.icon === 'vault' && 'Account Responsibility'}
                        {section.icon === 'ip' && 'Copyright Notice'}
                        {section.icon === 'senior' && 'California Law'}
                      </span>
                    </div>
                  )}
                  {section.content}
                </div>
              )}

              {/* Preamble text (for Section 5) */}
              {section.preamble && (
                <div className={`pl-11 text-sm text-gray-600 leading-relaxed mb-3 ${
                  section.disclaimer ? 'font-medium text-amber-800/80' : ''
                }`}>
                  {section.preamble}
                </div>
              )}

              {/* Sub-items */}
              {section.items && (
                <div className="pl-11 space-y-4">
                  {section.items.map((item) => (
                    <div key={item.sub}>
                      <h3 className={`text-sm font-semibold mb-1.5 ${
                        section.disclaimer ? 'text-amber-800' : 'text-gray-800'
                      }`}>
                        {item.sub}
                      </h3>
                      {item.text && (
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {item.text}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Divider + Section 9: Contact */}
        <div className="mt-16 pt-8 border-t border-gray-100">
          <div className="flex items-start gap-3 mb-4">
            <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-xs font-bold bg-gray-100 text-gray-500 border border-gray-200">
              9
            </span>
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-gray-900 pt-0.5">
              CONTACT US
            </h2>
          </div>

          <div className="pl-11 space-y-3">
            <p className="text-sm text-gray-600 leading-relaxed">
              For questions regarding these Terms, please contact:
            </p>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-[#3257C2]/10 shrink-0">
                <Scale className="h-5 w-5 text-[#3257C2]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">BYLDRS GUARDIAN Legal Support</p>
                <p className="text-sm text-gray-500">Questions about these Terms</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
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
              <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <MapPin className="h-4 w-4 text-[#3257C2] shrink-0" />
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Address</p>
                  <p className="text-sm text-gray-700">12510 Mc Cann Dr., Santa Fe Springs, CA 90670</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cross-link to Privacy Policy */}
        <div className="mt-10 p-5 rounded-xl bg-[#3257C2]/5 border border-[#3257C2]/15 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-[#3257C2]/10 shrink-0">
            <Shield className="h-5 w-5 text-[#3257C2]" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">Related: Privacy Policy</p>
            <p className="text-sm text-gray-500 mt-0.5">Review how we collect, use, and protect your personal information.</p>
          </div>
          <button
            onClick={() => setCurrentPage('privacy-policy')}
            className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#3257C2] hover:bg-[#2a49a8] text-white text-xs font-semibold transition-colors"
          >
            View Privacy Policy
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
