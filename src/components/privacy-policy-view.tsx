'use client';

import { Shield, FileText, Lock, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';

/* ─── Policy Sections ──────────────────────────────────────── */
const sections = [
  {
    number: '1.0',
    title: 'PURPOSE OF THE PRIVACY POLICY',
    content: `This Policy describes the information collection, use, and dissemination practices of BYLDRS GUARDIAN. It governs our right to collect, use, store, and disclose information provided by You. By providing us with Personal Information, you consent to the use of your data for the purpose of facilitating the 20-Point Shield audit and homeowner-contractor connections.`,
  },
  {
    number: '2.0',
    title: 'INFORMATION COLLECTION',
    items: [
      {
        sub: '2.1 User Direct Information',
        text: 'Company may collect personal information including your name, email, mailing address, and telephone number. For the Homeowner Vault, uploaded contracts and project documents are encrypted using AES-256 standards.',
      },
      {
        sub: '2.2 Cookies and Web Beacons',
        text: 'We use cookie technology to customize content and track visits to the Homeowner Academy. You can disable cookies in your browser, though some features like the Vault may be affected.',
      },
      {
        sub: '2.3 No Information from Children',
        text: 'Company does not knowingly collect information from children under 13.',
      },
    ],
  },
  {
    number: '3.0',
    title: 'USE OF PERSONAL INFORMATION',
    items: [
      {
        sub: '3.1 General Use',
        text: 'We use your info to provide promotional offers, Guardian Alerts, and professional opinions on bids.',
      },
      {
        sub: '3.2 Disclosure to Service Providers',
        text: 'We disclose your info to participating verified Pros as authorized by you. BYLDRS GUARDIAN does not sell your personal contact information to non-affiliated entities for their use without an opportunity to opt-out.',
      },
      {
        sub: '3.3 Telemarketing & SMS',
        text: 'By registering, you authorize us to contact you via telemarketing/SMS regarding your specific project requests. You can text "STOP" at any time to opt-out.',
      },
    ],
  },
  {
    number: '4.0',
    title: 'SECURITY',
    content: 'We use Secure Socket Layer (SSL) Software and AES-256 Encryption to protect your data and Vault documents. While no transmission is 100% secure, we take every technological precaution to keep your information from unauthorized access.',
    highlight: true,
  },
  {
    number: '5.0',
    title: 'FOREIGN USE',
    content: 'To the extent that you are accessing the Website from outside the United States, you acknowledge that information is stored in the U.S. and consent to that transfer.',
  },
  {
    number: '6.0',
    title: 'PUBLIC FORUMS',
    content: 'Information submitted to public areas (blogs, community boards) is not considered Personal Information and is accessible to the general public.',
  },
  {
    number: '7.0',
    title: 'OPT-OUT CHOICE',
    content: 'Company provides you the opportunity to \'opt-out\' of having your personally identifiable information used for certain purposes. If you no longer wish to receive promotions, follow the instructions in our communications or contact us at info.vsualdm@gmail.com.',
  },
  {
    number: '8.0',
    title: 'CALIFORNIA USER CONSUMER RIGHTS (CCPA)',
    content: 'California residents have the right to request disclosure of data categories collected, request deletion of data, and opt-out of the "sale" of information. To verify your identity for a CCPA request, please email info.vsualdm@gmail.com with the subject "CCPA Opt-Out."',
    highlight: true,
  },
  {
    number: '9.0',
    title: 'CCPA DETAILED DISCLOSURES',
    content: 'We collect and disclose for business purposes: Identifiers, Commercial Information, Internet Activity, and Geolocation. This information is shared with verified Pros only as necessary to fulfill your specific service requests.',
  },
  {
    number: '10.0',
    title: 'LIMITATION OF LIABILITY & HIRING DISCLAIMER',
    items: [
      {
        sub: 'Final Decision',
        text: 'The homeowner acknowledges that the final decision to hire, contract with, or pay any professional rests solely with the homeowner.',
      },
      {
        sub: 'No Agency',
        text: 'BYLDRS GUARDIAN is an independent auditor and is not a party to any contract between a homeowner and a contractor.',
      },
      {
        sub: 'Indemnification',
        text: 'The Company, its owners, and VSUAL digitalmedia are not responsible for any damages, financial loss, legal disputes, or project failures resulting from the hiring of a Pro found through or verified by this platform.',
      },
    ],
    disclaimer: true,
  },
];

/* ─── Component ─────────────────────────────────────────────── */
export function PrivacyPolicyView() {
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
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3ED1B8]/40 to-transparent" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Shield Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-[#3257C2]/15 border border-[#3257C2]/30 mb-6"
          >
            <FileText className="h-7 w-7 text-[#3ED1B8]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Privacy Policy
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
            This Privacy Policy governs your use of this Website and any content, products, or services made available from or through this website including any sub domains thereof (<strong>&quot;Website&quot;</strong>). The Website is made available by <strong>BYLDRS GUARDIAN</strong> (hereinafter referred to as <strong>&quot;Company&quot;</strong>). By visiting this Website and requesting information, products, or services, you agree to the terms of this Privacy Policy.
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
                      ? 'bg-[#3ED1B8]/8 text-[#3ED1B8] border border-[#3ED1B8]/20'
                      : 'bg-[#3257C2]/8 text-[#3257C2] border border-[#3257C2]/15'
                }`}>
                  {section.number.split('.')[0]}
                </span>
                <h2 className={`text-base sm:text-lg font-bold tracking-tight pt-0.5 ${
                  section.disclaimer ? 'text-amber-900' : 'text-gray-900'
                }`}>
                  {section.title}
                </h2>
              </div>

              {/* Section body */}
              {section.content && (
                <div className={`pl-11 text-sm text-gray-600 leading-relaxed ${
                  section.highlight ? 'rounded-xl bg-gray-50 border border-gray-100 p-4 -ml-1' : ''
                }`}>
                  {section.highlight && (
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className="h-3.5 w-3.5 text-[#3257C2]" />
                      <span className="text-xs font-semibold text-[#3257C2] uppercase tracking-wider">Security Notice</span>
                    </div>
                  )}
                  {section.content}
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
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-16 pt-8 border-t border-gray-100">
          <div className="flex items-start gap-3 mb-4">
            <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-xs font-bold bg-gray-100 text-gray-500 border border-gray-200">
              11
            </span>
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-gray-900 pt-0.5">
              CONTACT
            </h2>
          </div>

          <div className="pl-11 space-y-3">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-[#3257C2]/10 shrink-0">
                <Shield className="h-5 w-5 text-[#3257C2]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">BYLDRS GUARDIAN Support</p>
                <p className="text-sm text-gray-500">Your protection is our priority</p>
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

        {/* Back Button */}
        <div className="mt-12 text-center">
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
