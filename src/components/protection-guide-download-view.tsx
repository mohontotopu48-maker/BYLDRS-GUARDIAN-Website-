'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Scale,
  ClipboardList,
  FolderOpen,
  Download,
  ArrowRight,
  CheckCircle2,
  FileText,
  Lock,
  Users,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';

/* ───────────────────────── animations ─────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const childFade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ───────────────────────── feature data ───────────────────────────── */
const guideFeatures = [
  {
    icon: Scale,
    title: 'Contractor Law Cheat Sheet',
    subtitle: 'The $1,000 Deposit Limit',
    description:
      'California Business & Professions Code §7159 caps your deposit at $1,000 — period. Learn the exact language to use when a Pro demands more, plus the legal recourse available to you.',
    accent: '#3257C2',
    items: [
      'Exact CA BPC §7159 statute text',
      'What to say when asked for 30-50% upfront',
      'Milestone payment template',
      'Mechanic\'s lien prevention checklist',
    ],
  },
  {
    icon: ClipboardList,
    title: '30-Day Audit Checklist',
    subtitle: 'How to verify their Health Score',
    description:
      'The same 20-point checklist our auditors use to score every Pro. CSLB license, workers\' comp, GL insurance, complaint history — all verified in a structured repeatable process.',
    accent: '#3ED1B8',
    items: [
      '20-point Guardian verification scorecard',
      'CSLB real-time lookup instructions',
      'Workers\' comp cross-reference steps',
      'Insurance minimum thresholds ($1M+ GL)',
    ],
  },
  {
    icon: FolderOpen,
    title: 'The Vault Organizer',
    subtitle: 'Where to store your 4 core documents',
    description:
      'Never scramble for paperwork again. The Vault Organizer gives you a simple folder structure for the 4 essential documents every homeowner needs before, during, and after a project.',
    accent: '#F5A623',
    items: [
      'Signed contract + change orders',
      'Insurance certificates & bonds',
      'Permit & inspection records',
      'Final lien release & warranty docs',
    ],
  },
];

/* ───────────────────────── stat counters ──────────────────────────── */
const stats = [
  { value: '20', suffix: '', label: 'Verification checkpoints', icon: ShieldCheck },
  { value: '3', suffix: '', label: 'Core sections', icon: FileText },
  { value: '100%', suffix: '', label: 'Free — no catch', icon: Lock },
  { value: '4.9', suffix: '/5', label: 'Homeowner rating', icon: Users },
];

/* ───────────────────────── component ──────────────────────────────── */
export function ProtectionGuideDownloadView() {
  const { setCurrentPage } = useAppStore();
  const [downloading, setDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);

    // Simulate a brief preparation delay for dramatic effect
    await new Promise((r) => setTimeout(r, 1200));

    // Create a placeholder PDF content (simple text file for now)
    const content = `
═══════════════════════════════════════════════════════════════
          BYLDRS GUARDIAN — HOMEOWNER PROTECTION GUIDE
═══════════════════════════════════════════════════════════════

The 20-Point Shield: Your Complete Homeowner Playbook
California Edition — Free Download

─────────────────────────────────────────────────────────────
SECTION 1: CONTRACTOR LAW CHEAT SHEET
─────────────────────────────────────────────────────────────

  ⚖️  The $1,000 Deposit Limit (CA BPC §7159)

  California law strictly limits the deposit a contractor may
  request to $1,000 — regardless of project size. If a Pro
  asks for more, they are breaking the law.

  Key protections:
  • Maximum upfront deposit: $1,000
  • Milestone payments must be tied to completed work
  • Change orders require written approval
  • Final payment only after satisfactory completion

─────────────────────────────────────────────────────────────
SECTION 2: 30-DAY AUDIT CHECKLIST
─────────────────────────────────────────────────────────────

  🛡️  How to Verify Their Health Score

  Every BYLDRS GUARDIAN Pro undergoes this 20-point audit
  every 30 days. Here's what to check yourself:

  1. Active CSLB license (verify at cslb.ca.gov)
  2. Workers' compensation insurance (active)
  3. General liability insurance ($1M+ minimum)
  4. Bond verification
  5. Complaint history review
  6. Background check status
  7. Reference verification
  8. Vehicle & uniform identification
  9. Property protection protocols
  10. Anti-ghosting guarantee

─────────────────────────────────────────────────────────────
SECTION 3: THE VAULT ORGANIZER
─────────────────────────────────────────────────────────────

  📂  Where to Store Your 4 Core Documents

  1. CONTRACT FOLDER
     • Signed original contract
     • All change orders (dated & signed)
     • Scope of work document
     • Payment schedule

  2. INSURANCE FOLDER
     • Contractor's GL certificate
     • Workers' comp certificate
     • Bond documentation
     • Your own homeowner's policy

  3. PERMITS FOLDER
     • Building permits (copies)
     • Inspection reports
     • Correction notices (if any)
     • Final sign-off

  4. COMPLETION FOLDER
     • Final lien release
     • Warranty documentation
     • Before/after photos
     • Maintenance schedule

═══════════════════════════════════════════════════════════════
  This guide is provided free of charge by BYLDRS GUARDIAN.
  For the most up-to-date version, visit:
  https://byldersguardian.com/the-standard
═══════════════════════════════════════════════════════════════
`.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'BYLDRS_GUARDIAN_Protection_Guide.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloading(false);
    setDownloadComplete(true);
  };

  return (
    <section className="min-h-screen">
      {/* ═══════════════════════════════════════════════════════════════
          HERO — Elite Dark Theme
          ═══════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden bg-[#0A0D14]">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Gradient orbs */}
        <div className="pointer-events-none absolute -top-32 right-1/4 h-[600px] w-[600px] rounded-full bg-[#3257C2]/[0.07] blur-[140px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-[#3ED1B8]/[0.05] blur-[100px]" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-[100px] lg:pt-[110px] pb-20 sm:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* ── Left: Text Content ── */}
            <motion.div initial="hidden" animate="visible" className="text-center lg:text-left">
              {/* Badge */}
              <motion.div variants={fadeUp} custom={0} className="mb-6">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#3ED1B8]/[0.08] border border-[#3ED1B8]/20 px-5 py-2 text-xs font-bold tracking-widest uppercase text-[#3ED1B8]/80">
                  <Sparkles className="h-3.5 w-3.5" />
                  Your guide is ready — free forever
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                custom={1}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-white leading-[1.08] mb-5"
              >
                Your 20-Point
                <br />
                <span className="bg-gradient-to-r from-[#3ED1B8] via-[#3ED1B8] to-[#3257C2] bg-clip-text text-transparent">
                  Shield is Ready.
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-base sm:text-lg text-white/40 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
              >
                The complete Homeowner Protection Guide — from contractor law to audit
                checklists to document vaults. Download it, print it, and bring it to
                every bid.
              </motion.p>

              {/* Quick stats row */}
              <motion.div
                variants={fadeUp}
                custom={3}
                className="flex flex-wrap justify-center lg:justify-start gap-6 mb-10"
              >
                {stats.map((stat) => {
                  const StatIcon = stat.icon;
                  return (
                    <div key={stat.label} className="flex items-center gap-2.5">
                      <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-white/[0.05]">
                        <StatIcon className="h-4 w-4 text-[#3ED1B8]" />
                      </div>
                      <div className="leading-tight">
                        <span className="text-sm font-bold text-white">
                          {stat.value}{stat.suffix}
                        </span>
                        <span className="block text-[11px] text-white/30 font-medium">
                          {stat.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </motion.div>

              {/* Primary CTA — Download */}
              <motion.div variants={fadeUp} custom={4}>
                <AnimatePresence mode="wait">
                  {!downloadComplete ? (
                    <motion.div
                      key="download-btn"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Button
                        onClick={handleDownload}
                        disabled={downloading}
                        size="lg"
                        className="h-14 px-8 sm:px-10 rounded-xl bg-[#3ED1B8] hover:bg-[#34b9a2] text-[#0A0D14] font-bold text-sm shadow-xl shadow-[#3ED1B8]/20 hover:shadow-[#3ED1B8]/30 transition-all duration-300 group disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {downloading ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="mr-2 h-5 w-5 border-2 border-[#0A0D14]/20 border-t-[#0A0D14] rounded-full"
                            />
                            Preparing your guide...
                          </>
                        ) : (
                          <>
                            <Download className="mr-2 h-5 w-5" />
                            Download the Free Guide
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </Button>
                      <p className="mt-4 text-[11px] text-white/20">
                        Instant download &middot; No email required &middot; TXT format (placeholder)
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-col items-center lg:items-start gap-4"
                    >
                      {/* Success Animation */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                      >
                        {/* Ring pulse */}
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: [0.8, 1.6], opacity: [0.6, 0] }}
                          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
                          className="absolute inset-0 rounded-full bg-[#3ED1B8]/20"
                          style={{ margin: '-8px' }}
                        />
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: [0.8, 2], opacity: [0.4, 0] }}
                          transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
                          className="absolute inset-0 rounded-full bg-[#3ED1B8]/10"
                          style={{ margin: '-8px' }}
                        />
                        <div className="relative flex items-center justify-center h-16 w-16 rounded-full bg-[#3ED1B8]/15 border-2 border-[#3ED1B8]/30">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <CheckCircle2 className="h-8 w-8 text-[#3ED1B8]" />
                          </motion.div>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                      >
                        <p className="text-lg font-bold text-white">
                          Guide downloaded successfully!
                        </p>
                        <p className="text-sm text-white/40 mt-1">
                          Check your downloads folder. Print it and bring it to every bid.
                        </p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.4 }}
                        className="flex items-center gap-3"
                      >
                        <Button
                          variant="ghost"
                          onClick={handleDownload}
                          size="sm"
                          className="rounded-lg text-white/50 hover:text-white hover:bg-white/[0.06] text-sm font-medium"
                        >
                          <Download className="mr-1.5 h-3.5 w-3.5" />
                          Download again
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => setCurrentPage('check-my-pro')}
                          size="sm"
                          className="rounded-lg text-[#3ED1B8]/70 hover:text-[#3ED1B8] hover:bg-[#3ED1B8]/[0.06] text-sm font-medium"
                        >
                          Now, Check My Pro
                          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </Button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>

            {/* ── Right: Book Mockup ── */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex justify-center lg:justify-end"
            >
              {/* Glow behind book */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[300px] rounded-full bg-[#3ED1B8]/[0.08] blur-[80px]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[250px] rounded-full bg-[#3257C2]/[0.06] blur-[60px]" />

              {/* Book image */}
              <div className="relative">
                <img
                  src="/guide-book-mockup.png"
                  alt="BYLDRS GUARDIAN Homeowner Protection Guide"
                  className="relative z-10 w-[240px] sm:w-[280px] lg:w-[320px] rounded-lg shadow-2xl shadow-black/50"
                />
                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="absolute -bottom-4 -left-4 sm:-left-8 z-20 flex items-center gap-2 rounded-xl bg-[#1A1D2E]/90 backdrop-blur-xl border border-white/[0.08] px-4 py-3 shadow-xl"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3ED1B8]/15">
                    <ShieldCheck className="h-4 w-4 text-[#3ED1B8]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Guardian Verified</span>
                    <span className="text-[10px] text-white/30">Updated 2025</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0F1219] to-transparent" />
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          FEATURES — What's Inside the Guide
          ═══════════════════════════════════════════════════════════════ */}
      <div className="bg-[#0F1219]">
        {/* Section header */}
        <div className="px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.05] border border-white/[0.08] px-4 py-1.5 mb-5 text-xs font-bold tracking-widest uppercase text-white/40">
              What&apos;s Inside
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Everything you need to
              <br />
              <span className="text-[#3ED1B8]">stay protected.</span>
            </h2>
          </motion.div>
        </div>

        {/* Feature cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-6"
        >
          {guideFeatures.map((feature, idx) => {
            const FeatureIcon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={childFade}
                className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 overflow-hidden"
              >
                {/* Accent line at top */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-40 group-hover:opacity-70 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${feature.accent}60, transparent)` }}
                />

                <div className="relative p-6 sm:p-8 lg:p-10">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-8">
                    {/* Icon */}
                    <div
                      className="shrink-0 flex items-center justify-center h-14 w-14 rounded-xl"
                      style={{ backgroundColor: `${feature.accent}12` }}
                    >
                      <FeatureIcon className="h-7 w-7" style={{ color: feature.accent }} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="mb-1">
                        <span
                          className="text-[11px] font-extrabold tracking-[0.12em] uppercase block"
                          style={{ color: `${feature.accent}90` }}
                        >
                          Section {idx + 1}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                          {feature.title}
                        </h3>
                        <p className="text-sm font-medium text-white/30 mt-0.5">
                          {feature.subtitle}
                        </p>
                      </div>

                      <p className="text-sm sm:text-base text-white/40 leading-relaxed mt-4 mb-5 max-w-xl">
                        {feature.description}
                      </p>

                      {/* Items grid */}
                      <div className="grid sm:grid-cols-2 gap-2.5">
                        {feature.items.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 bg-white/[0.02] border border-white/[0.04]"
                          >
                            <CheckCircle2
                              className="h-3.5 w-3.5 shrink-0"
                              style={{ color: feature.accent }}
                            />
                            <span className="text-[13px] text-white/50 font-medium leading-snug">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom spacer */}
        <div className="h-12" />
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          FINAL CTA — Download Again + Check My Pro
          ═══════════════════════════════════════════════════════════════ */}
      <div className="bg-[#0A0D14] px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#3ED1B8]/30" />
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3ED1B8]/10">
              <ShieldCheck className="h-4 w-4 text-[#3ED1B8]" />
            </div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#3ED1B8]/30" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 leading-tight">
            Now put the guide to work.
          </h3>
          <p className="text-white/35 text-sm sm:text-base mb-10 max-w-md mx-auto leading-relaxed">
            You have the protection playbook. Now check any Pro&apos;s Guardian Risk
            Report — free, in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              onClick={handleDownload}
              size="lg"
              className="h-13 px-8 rounded-xl bg-[#3ED1B8] hover:bg-[#34b9a2] text-[#0A0D14] font-bold text-sm shadow-lg shadow-[#3ED1B8]/20 hover:shadow-xl transition-all duration-300 group"
            >
              <Download className="mr-2 h-4 w-4" />
              Download the Guide Again
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              onClick={() => setCurrentPage('check-my-pro')}
              size="lg"
              variant="outline"
              className="h-13 px-8 rounded-xl border-white/15 text-white/70 hover:text-white hover:bg-white/[0.06] hover:border-white/25 font-bold text-sm transition-all duration-300 group"
            >
              <ShieldCheck className="mr-2 h-4 w-4" />
              Check My Pro Now
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
