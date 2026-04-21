'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Scale,
  ArrowRight,
  Shield,
  CheckCircle2,
  Lock,
  Sparkles,
  BookOpen,
  Download,
  ChevronDown,
  ChevronUp,
  Users,
  Award,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/lib/store';

/* ───────────────────────── animations ─────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const childFade = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

/* ───────────────────────── pillar data ─────────────────────────────── */
interface Pillar {
  module: string;
  number: string;
  title: string;
  color: string;
  colorLight: string;
  colorGlow: string;
  icon: string;
  description: string;
  why: string;
  checkpoints: string[];
}

const pillars: Pillar[] = [
  {
    module: 'MODULE 01',
    number: 'I',
    title: 'Legal & Financial Immunity',
    color: '#3257C2',
    colorLight: 'bg-blue-50',
    colorGlow: 'shadow-blue-500/10',
    icon: '⚖️',
    description:
      'Protect yourself from financial loss before the first hammer swings.',
    why: 'In California, homeowners lose an estimated $1.2 billion annually to unlicensed or uninsured Pros. This pillar alone could save you tens of thousands.',
    checkpoints: [
      'Active CSLB License — verified in real time against state records',
      "Workers' Comp Coverage — current, active, and named correctly",
      'Insurance & Bond — general liability + performance bond on file',
      'Deposit Compliance — never exceeds CA\'s $1,000 legal limit',
      "Mechanic's Lien Prevention — waiver clause present in every contract",
    ],
  },
  {
    module: 'MODULE 02',
    number: 'II',
    title: 'Operational Defense',
    color: '#3ED1B8',
    colorLight: 'bg-emerald-50',
    colorGlow: 'shadow-emerald-500/10',
    icon: '🛡️',
    description:
      'Confirm your Pro operates at the highest professional standard.',
    why: 'The #1 complaint from homeowners isn\'t price — it\'s quality. This pillar ensures your Pro delivers what they promised, on time and on spec.',
    checkpoints: [
      'Warranty Documentation — written, signed, and stored in your Vault',
      'Pre-Construction Diagnostic — full assessment before work begins',
      'Material Quality Standards — brand-name vs. generic verification',
      'Inspection Scheduling — permits pulled, inspections booked',
      'Post-Completion Quality Assurance — walkthrough checklist signed off',
    ],
  },
  {
    module: 'MODULE 03',
    number: 'III',
    title: 'Sanctuary Site Standard',
    color: '#F5A623',
    colorLight: 'bg-amber-50',
    colorGlow: 'shadow-amber-500/10',
    icon: '🏠',
    description:
      'Your home is your sanctuary. These rules keep it that way.',
    why: 'Construction damage — nails in tires, paint on driveways, dust everywhere — costs homeowners an average of $3,200 in cleanup. This pillar eliminates it.',
    checkpoints: [
      'Property Shielding — landscaping, hardscape, and HVAC protection',
      'Magnetic Sweeps — daily debris scans before the crew leaves',
      'Dust Containment — zip-wall barriers and air quality monitoring',
      'Noise Ordinance Compliance — verified against local codes',
      'Daily Site Cleanup — documented with time-stamped photos in your Vault',
    ],
  },
  {
    module: 'MODULE 04',
    number: 'IV',
    title: 'Accountability & Ethics',
    color: '#CD7F32',
    colorLight: 'bg-orange-50',
    colorGlow: 'shadow-orange-500/10',
    icon: '🤝',
    description:
      'Trust is earned through transparency. This is how we measure it.',
    why: 'Ghosting — when a Pro disappears mid-project — affects 1 in 4 California homeowners. This pillar makes it virtually impossible on our platform.',
    checkpoints: [
      'Verified Identity — government ID + background check on file',
      'Anti-Ghosting Protocol — guaranteed response within 24 hours',
      'Documentation Standards — every change order in writing, photographed',
      'Ethical Bidding — market-rate comparison provided for every quote',
      'Dispute Resolution Clause — binding mediation in every contract',
    ],
  },
];

/* ───────────────────────── component ────────────────────────────────── */
export function TheStandardView() {
  const { setCurrentPage } = useAppStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [expandedPillar, setExpandedPillar] = useState<number | null>(0);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="min-h-screen bg-white">
      {/* ═══════════════════════════════════════════════════════════════
          HERO — Cinematic "Blueprint Reveal"
          ═══════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden bg-[#0A0D14] pt-[100px] lg:pt-[88px] pb-0">
        {/* Background grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Gradient orbs */}
        <div className="pointer-events-none absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-[#3257C2]/[0.08] blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-[#3ED1B8]/[0.06] blur-[100px]" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-20 sm:pb-28 text-center">
          <motion.div initial="hidden" animate="visible">
            {/* Top badge row */}
            <motion.div variants={fadeUp} custom={0} className="flex items-center justify-center gap-3 mb-8">
              <Badge className="bg-[#3ED1B8]/15 text-[#3ED1B8] border-[#3ED1B8]/25 px-4 py-1.5 text-xs font-bold tracking-widest uppercase">
                Free Blueprint
              </Badge>
              <Badge className="bg-white/[0.06] text-white/50 border-white/10 px-4 py-1.5 text-xs font-bold tracking-widest uppercase">
                20 Checkpoints
              </Badge>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight text-white leading-[1.05] mb-6"
            >
              The Industry
              <br />
              Doesn&apos;t Want You
              <br />
              <span className="bg-gradient-to-r from-[#3ED1B8] via-[#3ED1B8] to-[#3257C2] bg-clip-text text-transparent">
                to See This.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mx-auto max-w-2xl text-base sm:text-lg text-white/40 leading-relaxed mb-10"
            >
              The 20-Point Protocol is the complete vetting blueprint every
              California homeowner deserves. We&apos;re giving it away — free.
              No signup required. No strings attached.
            </motion.p>

            {/* CTA row */}
            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                onClick={() => {
                  document.getElementById('blueprint-modules')?.scrollIntoView({ behavior: 'smooth' });
                }}
                size="lg"
                className="h-13 px-8 rounded-xl bg-white text-[#0A0D14] font-bold text-sm shadow-xl hover:bg-gray-100 transition-all duration-300 group"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Explore the Blueprint
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="ghost"
                onClick={() => setCurrentPage('home')}
                className="text-white/30 hover:text-white/60 hover:bg-white/[0.04] text-sm font-medium"
              >
                <ArrowRight className="mr-2 h-3.5 w-3.5 rotate-180" />
                Back to Home
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats strip — floating bar at the bottom of the hero */}
        <div className="relative border-t border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-5">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            >
              {[
                { icon: CheckCircle2, value: '20', label: 'Total Checkpoints', color: '#3ED1B8' },
                { icon: Award, value: '4', label: 'Protection Pillars', color: '#3257C2' },
                { icon: Zap, value: '30-Day', label: 'Re-Audit Cycle', color: '#F5A623' },
                { icon: Users, value: '4.5M+', label: 'Homeowners Protected', color: '#CD7F32' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={childFade}
                  className="flex items-center gap-3"
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${stat.color}12` }}
                  >
                    <stat.icon className="h-5 w-5" style={{ color: stat.color }} />
                  </div>
                  <div>
                    <p className="text-lg font-extrabold text-white leading-none">
                      {stat.value}
                    </p>
                    <p className="text-[11px] text-white/30 font-medium mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          "WHY FREE" — The Trust Hook
          ═══════════════════════════════════════════════════════════════ */}
      <div className="bg-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={fadeUp} custom={0} className="flex items-center justify-center gap-2 mb-4">
            <Lock className="h-4 w-4 text-[#3ED1B8]" />
            <span className="text-xs font-bold text-[#3ED1B8] uppercase tracking-widest">
              The Trust Contract
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1A1D2E] leading-tight mb-6"
          >
            We&apos;re giving away our
            <span className="text-[#3257C2]"> industry secret</span>
            <br />
            because an informed homeowner is an
            <span className="text-[#3ED1B8]"> unbreakable homeowner.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-[#1A1D2E]/50 text-base sm:text-lg leading-relaxed"
          >
            Every other platform charges you for vetting. We believe the
            standard itself should be public knowledge — so you can hold any
            Pro accountable, whether they&apos;re on our platform or not.
            This is the blueprint the industry doesn&apos;t want you to have.
          </motion.p>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          THE 4 MODULES — Blueprint Layout
          ═══════════════════════════════════════════════════════════════ */}
      <div id="blueprint-modules" className="bg-[#F8F9FB] px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          {/* Section heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="text-center mb-14 sm:mb-16"
          >
            <motion.div variants={fadeUp} custom={0} className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px flex-1 max-w-[60px] bg-[#1A1D2E]/10" />
              <span className="text-xs font-bold text-[#1A1D2E]/30 uppercase tracking-[0.2em]">
                The Blueprint
              </span>
              <div className="h-px flex-1 max-w-[60px] bg-[#1A1D2E]/10" />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1A1D2E]"
            >
              4 Modules. 20 Checkpoints.
              <br />
              <span className="text-[#1A1D2E]/30">Zero Blind Spots.</span>
            </motion.h2>
          </motion.div>

          {/* Pillar modules */}
          <div className="space-y-6">
            {pillars.map((pillar, i) => {
              const isExpanded = expandedPillar === i;
              return (
                <motion.div
                  key={pillar.number}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`rounded-2xl bg-white border overflow-hidden transition-all duration-500 ${
                    isExpanded
                      ? `shadow-xl ${pillar.colorGlow} shadow-lg border-transparent`
                      : 'border-[#E5E7EB]/80 shadow-sm hover:shadow-md'
                  }`}
                  style={
                    isExpanded
                      ? { borderLeft: `4px solid ${pillar.color}` }
                      : undefined
                  }
                >
                  {/* Module Header — always visible */}
                  <button
                    onClick={() => setExpandedPillar(isExpanded ? null : i)}
                    className="w-full text-left p-5 sm:p-7 flex items-start gap-4 sm:gap-5 group"
                  >
                    {/* Module number + icon */}
                    <div className="shrink-0">
                      <div
                        className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl transition-all duration-300"
                        style={{
                          backgroundColor: isExpanded
                            ? `${pillar.color}15`
                            : '#F4F7F9',
                        }}
                      >
                        <span className="text-2xl sm:text-3xl">{pillar.icon}</span>
                      </div>
                    </div>

                    {/* Title + meta */}
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <span
                          className="text-[10px] font-extrabold tracking-[0.15em] px-2 py-0.5 rounded-md"
                          style={{
                            color: pillar.color,
                            backgroundColor: `${pillar.color}12`,
                          }}
                        >
                          {pillar.module}
                        </span>
                        <span className="text-[10px] text-[#1A1D2E]/25 font-bold tracking-wide">
                          5 CHECKPOINTS
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#1A1D2E] leading-snug">
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-[#1A1D2E]/40 mt-1 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>

                    {/* Expand/collapse indicator */}
                    <div className="shrink-0 mt-1">
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-200"
                        style={{
                          backgroundColor: isExpanded ? `${pillar.color}12` : 'transparent',
                        }}
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4" style={{ color: pillar.color }} />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-[#1A1D2E]/25" />
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        {/* "Why This Matters" callout */}
                        <div className="px-5 sm:px-7 pb-5">
                          <div
                            className="rounded-xl p-4 sm:p-5"
                            style={{
                              backgroundColor: `${pillar.color}06`,
                              borderLeft: `3px solid ${pillar.color}`,
                            }}
                          >
                            <p className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: pillar.color }}>
                              Why This Matters
                            </p>
                            <p className="text-sm text-[#1A1D2E]/60 leading-relaxed">
                              {pillar.why}
                            </p>
                          </div>
                        </div>

                        {/* Checkpoints list */}
                        <div className="border-t border-[#E5E7EB]/60 bg-[#FAFBFC]/50 px-5 sm:px-7 py-5 sm:py-6">
                          <p className="text-[10px] font-bold text-[#1A1D2E]/25 uppercase tracking-[0.15em] mb-4">
                            Protocol Checkpoints
                          </p>
                          <motion.ul
                            initial="hidden"
                            animate="visible"
                            variants={stagger}
                            className="space-y-3"
                          >
                            {pillar.checkpoints.map((cp, j) => (
                              <motion.li
                                key={j}
                                variants={childFade}
                                className="flex items-start gap-3"
                              >
                                <div className="flex items-center justify-center shrink-0 mt-px">
                                  <span
                                    className="flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-extrabold text-white"
                                    style={{ backgroundColor: pillar.color }}
                                  >
                                    {j + 1}
                                  </span>
                                </div>
                                <p className="text-sm text-[#1A1D2E]/70 leading-relaxed">
                                  {cp}
                                </p>
                              </motion.li>
                            ))}
                          </motion.ul>
                        </div>

                        {/* Progress bar visual */}
                        <div className="px-5 sm:px-7 pb-5 sm:pb-7">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold text-[#1A1D2E]/25 uppercase tracking-wider">
                              Coverage
                            </span>
                            <span className="text-[10px] font-bold" style={{ color: pillar.color }}>
                              5/5 Active
                            </span>
                          </div>
                          <div className="h-2 rounded-full bg-[#E5E7EB] overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: pillar.color }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          CONVERSION — "Get Your Free Blueprint" CTA
          ═══════════════════════════════════════════════════════════════ */}
      <div className="bg-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl"
        >
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0F1219] via-[#1A1D2E] to-[#0F1219]" />
            <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 rounded-full bg-[#3257C2]/10 blur-[80px]" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-[#3ED1B8]/[0.08] blur-[60px]" />
            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            <div className="relative px-6 py-10 sm:px-10 sm:py-14 text-center">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#3ED1B8]/15 backdrop-blur-sm border border-[#3ED1B8]/20"
              >
                <Download className="h-7 w-7 text-[#3ED1B8]" />
              </motion.div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 leading-tight">
                Get the Full Blueprint
              </h2>
              <p className="text-white/40 text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">
                Enter your email and we&apos;ll send you the complete 20-Point
                Protocol as a downloadable PDF — free. Print it. Bring it to
                every bid. Hold every Pro accountable.
              </p>

              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-xl bg-[#3ED1B8]/15 border border-[#3ED1B8]/20 p-5 max-w-sm mx-auto"
                >
                  <CheckCircle2 className="h-6 w-6 text-[#3ED1B8] mx-auto mb-2" />
                  <p className="text-sm font-semibold text-[#3ED1B8]">
                    Blueprint sent to your inbox!
                  </p>
                  <p className="text-xs text-white/30 mt-1">
                    Check your email for the download link.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="h-12 rounded-xl border-white/10 bg-white/[0.06] text-white placeholder:text-white/25 text-sm focus-visible:ring-[#3ED1B8] focus-visible:border-[#3ED1B8]"
                  />
                  <Button
                    type="submit"
                    className="h-12 px-6 rounded-xl bg-[#3ED1B8] hover:bg-[#34b9a2] text-[#0A0D14] font-bold text-sm shadow-lg shadow-[#3ED1B8]/20 hover:shadow-xl transition-all duration-300 shrink-0"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Send My Blueprint
                  </Button>
                </form>
              )}

              <p className="mt-5 text-[11px] text-white/20">
                No spam. No upsell. Just the blueprint. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          BOTTOM — Action CTA
          ═══════════════════════════════════════════════════════════════ */}
      <div className="bg-[#F8F9FB] px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-lg text-center"
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#3257C2]/[0.07]">
            <Shield className="h-6 w-6 text-[#3257C2]" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#1A1D2E] mb-3">
            Now put it to use.
          </h3>
          <p className="text-[#1A1D2E]/40 text-sm mb-7 leading-relaxed">
            Find a Pro who already meets every checkpoint. Or submit any bid
            through Check My Pro and see for yourself.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              onClick={() => setCurrentPage('home')}
              size="lg"
              className="h-12 px-7 rounded-xl bg-[#3257C2] hover:bg-[#2a49a8] text-white font-semibold shadow-lg shadow-[#3257C2]/25 hover:shadow-xl transition-all duration-300 group"
            >
              Find a Trusted Pro
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              onClick={() => setCurrentPage('check-my-pro')}
              variant="outline"
              size="lg"
              className="h-12 px-7 rounded-xl border-[#3257C2] text-[#3257C2] hover:bg-[#3257C2]/5 font-semibold transition-all duration-200 group"
            >
              <Shield className="mr-2 h-4 w-4" />
              Check My Pro
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
