'use client';

import { Shield, Building2, BadgeCheck, FileCheck, ShieldCheck, Mail, MapPin, ExternalLink, Scale } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';

/* ─── Component ─────────────────────────────────────────────── */
export function LicensesView() {
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
          {/* Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-[#3ED1B8]/10 border border-[#3ED1B8]/20 mb-6"
          >
            <BadgeCheck className="h-7 w-7 text-[#3ED1B8]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Licenses & Registration
            </h1>
            <p className="mt-3 text-sm text-white/40">
              Last Updated: February 5, 2026
            </p>
          </motion.div>
        </div>
      </div>

      {/* Policy Body */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-24">
        {/* §1 — Corporate Registration */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="mt-[-32px] relative z-10"
        >
          <div className="flex items-start gap-3 mb-5">
            <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-xs font-bold bg-gray-100 text-gray-500 border border-gray-200 shrink-0">1</span>
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-gray-900 pt-0.5">
              CORPORATE REGISTRATION
            </h2>
          </div>

          <div className="pl-11 rounded-2xl bg-white shadow-xl shadow-black/[0.06] border border-gray-100 p-6 sm:p-8 mb-10">
            <p className="text-sm text-gray-600 leading-relaxed mb-5">
              BYLDRS GUARDIAN is a professional advocacy brand managed by <strong>VSUAL digitalmedia</strong>.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <MapPin className="h-4 w-4 text-[#3257C2] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Principal Office</p>
                  <p className="text-sm text-gray-700">12510 Mc Cann Dr., Santa Fe Springs, CA 90670</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <MapPin className="h-4 w-4 text-[#3ED1B8] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">OC Office</p>
                  <p className="text-sm text-gray-700">Irvine Spectrum Center, Irvine, CA 92618</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* §2 — State Regulatory Compliance */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mb-10"
        >
          <div className="flex items-start gap-3 mb-5">
            <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-xs font-bold bg-[#3ED1B8]/8 text-[#3ED1B8] border border-[#3ED1B8]/15 shrink-0">2</span>
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-gray-900 pt-0.5">
                STATE REGULATORY COMPLIANCE
              </h2>
              <p className="text-sm text-gray-500 mt-1">Unlike generic lead-generation sites, BYLDRS GUARDIAN is led by a State-Registered professional. We believe in &quot;Leading by Example&quot; when it comes to CSLB compliance and homeowner protection.</p>
            </div>
          </div>

          <div className="pl-11">
            {/* CSLB Registration Card */}
            <div className="rounded-2xl border-2 border-[#3ED1B8]/20 bg-gradient-to-br from-[#3ED1B8]/5 to-transparent p-6 sm:p-8">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-[#3ED1B8]/10 border border-[#3ED1B8]/20">
                  <ShieldCheck className="h-6 w-6 text-[#3ED1B8]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#3ED1B8] uppercase tracking-wider">California Contractors State License Board</p>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">CSLB Registration</p>
                </div>
              </div>

              {/* Registration Details Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl bg-white border border-gray-100 p-4 shadow-sm">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Registration Type</p>
                  <p className="text-sm font-semibold text-gray-900">Home Improvement Salesperson (HIS)</p>
                </div>
                <div className="rounded-xl bg-white border border-gray-100 p-4 shadow-sm">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Registration Number</p>
                  <p className="text-sm font-bold text-[#3257C2] tracking-wide font-mono">#165686 SP</p>
                </div>
                <div className="rounded-xl bg-white border border-gray-100 p-4 shadow-sm">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Status</p>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#3ED1B8]/10 text-[#3ED1B8] text-xs font-semibold">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#3ED1B8] animate-pulse" />
                      Active / Registered
                    </span>
                  </div>
                </div>
                <div className="rounded-xl bg-white border border-gray-100 p-4 shadow-sm">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Expiration</p>
                  <p className="text-sm font-semibold text-gray-900">12/31/2027</p>
                </div>
              </div>

              {/* Verification CTA */}
              <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 rounded-xl bg-white/80 border border-gray-100">
                <FileCheck className="h-5 w-5 text-[#3257C2] shrink-0" />
                <p className="text-sm text-gray-600 flex-1">
                  Verify our standing at <strong>www.cslb.ca.gov</strong> or by calling <strong>1-800-321-CSLB</strong>.
                </p>
                <a
                  href="https://www.cslb.ca.gov/OnlineServices/CheckLicense/LicenseDetail.aspx?LicNum=165686"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#3ED1B8] hover:bg-[#34b9a2] text-[#0A0D14] text-xs font-semibold transition-colors shrink-0"
                >
                  Verify Now
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* §3 — Scope of Authority */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="mb-10"
        >
          <div className="flex items-start gap-3 mb-5">
            <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-xs font-bold bg-[#3257C2]/8 text-[#3257C2] border border-[#3257C2]/15 shrink-0">3</span>
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-gray-900 pt-0.5">
              SCOPE OF AUTHORITY
            </h2>
          </div>

          <div className="pl-11 space-y-4">
            <p className="text-sm text-gray-600 leading-relaxed font-medium">
              BYLDRS GUARDIAN acts as an independent auditor and homeowner advocate.
            </p>

            <div className="grid gap-3">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#3257C2]/5 border border-[#3257C2]/15">
                <Shield className="h-4 w-4 text-[#3257C2] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Auditing Standards</p>
                  <p className="text-sm text-gray-600 leading-relaxed mt-0.5">
                    We utilize our proprietary 20-Point Shield to evaluate contractor fitness, insurance validity, and bond standing.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#3257C2]/5 border border-[#3257C2]/15">
                <Scale className="h-4 w-4 text-[#3257C2] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Advisory Role</p>
                  <p className="text-sm text-gray-600 leading-relaxed mt-0.5">
                    Our HIS registration ensures that our interactions regarding home improvement projects are conducted in full accordance with California Business and Professions Code requirements.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
                <Building2 className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-900">Final Hiring</p>
                  <p className="text-sm text-gray-700 leading-relaxed mt-0.5">
                    While we provide the data and auditing, the final construction contract remains a direct agreement between the homeowner and the licensed contractor of their choice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* §4 — Intellectual Property */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex items-start gap-3 mb-4">
            <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-xs font-bold bg-gray-100 text-gray-500 border border-gray-200 shrink-0">4</span>
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-gray-900 pt-0.5">
              INTELLECTUAL PROPERTY
            </h2>
          </div>

          <div className="pl-11">
            <div className="rounded-xl bg-gray-50 border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-3.5 w-3.5 text-[#3257C2]" />
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Trademark Notice</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                The Guardian AI logic, the 20-Point Shield methodology, and all proprietary educational content are protected trademarks of the Company. Use of our &quot;Guardian Verified&quot; seal by third parties is permitted only under active certification.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Related Policies */}
        <div className="mt-12 grid sm:grid-cols-3 gap-3">
          <button
            onClick={() => setCurrentPage('privacy-policy')}
            className="p-4 rounded-xl bg-[#3257C2]/5 border border-[#3257C2]/15 flex items-start gap-3 text-left hover:bg-[#3257C2]/10 transition-colors group"
          >
            <Shield className="h-4 w-4 text-[#3257C2] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-900 group-hover:text-[#3257C2] transition-colors">Privacy Policy</p>
              <p className="text-[11px] text-gray-500 mt-0.5">Data collection & use</p>
            </div>
          </button>
          <button
            onClick={() => setCurrentPage('terms-of-service')}
            className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-start gap-3 text-left hover:bg-gray-100 transition-colors group"
          >
            <Scale className="h-4 w-4 text-gray-400 shrink-0 mt-0.5 group-hover:text-[#3257C2]" />
            <div>
              <p className="text-sm font-semibold text-gray-900 group-hover:text-[#3257C2] transition-colors">Terms of Service</p>
              <p className="text-[11px] text-gray-500 mt-0.5">Rights & obligations</p>
            </div>
          </button>
          <button
            onClick={() => setCurrentPage('cookie-policy')}
            className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-start gap-3 text-left hover:bg-gray-100 transition-colors group"
          >
            <Shield className="h-4 w-4 text-gray-400 shrink-0 mt-0.5 group-hover:text-[#3257C2]" />
            <div>
              <p className="text-sm font-semibold text-gray-900 group-hover:text-[#3257C2] transition-colors">Cookie Policy</p>
              <p className="text-[11px] text-gray-500 mt-0.5">Cookie usage & control</p>
            </div>
          </button>
        </div>

        {/* Contact */}
        <div className="mt-8 flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
          <Mail className="h-4 w-4 text-[#3257C2] shrink-0" />
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Questions about our registration?</p>
            <a
              href="mailto:info.vsualdm@gmail.com"
              className="text-sm text-[#3257C2] hover:text-[#2a49a8] font-medium transition-colors"
            >
              info.vsualdm@gmail.com
            </a>
          </div>
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
