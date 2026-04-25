'use client';

import { motion } from 'framer-motion';
import {
  Shield,
  BadgeCheck,
  Home,
  ArrowRight,
  CheckCircle2,
  Printer,
  Download,
  AlertTriangle,
  Scale,
  Eye,
  Users,
  Clock,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  visible: { transition: { staggerChildren: 0.08 } },
};

const childFade = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

/* ───────────────────────── step data ──────────────────────────────── */
interface GuideStep {
  step: number;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  accentColor: string;
  accentLight: string;
  description: string;
  keyPoints: string[];
  callout?: {
    icon: React.ElementType;
    text: string;
    label: string;
  };
}

const guideSteps: GuideStep[] = [
  {
    step: 1,
    title: 'The Money Shield',
    subtitle: 'Keep your cash safe before work begins',
    icon: Shield,
    iconBg: 'bg-[#3257C2]/[0.08]',
    iconColor: 'text-[#3257C2]',
    accentColor: '#3257C2',
    accentLight: 'bg-[#3257C2]/[0.04]',
    description:
      'California law caps your deposit at $1,000 — no matter the project size. Yet contractors routinely ask for 30–50% upfront. This step teaches you the rules that protect your wallet and what to do when someone asks for more.',
    keyPoints: [
      'The $1,000 deposit limit (CA BPC §7159) — it\'s the law',
      'Milestone payment structures that keep cash in your control',
      'Workers\' Comp verification — if they\'re not covered, you\'re liable',
      'Mechanic\'s lien prevention — protect your property title',
      'Insurance & bond verification before a single nail is driven',
    ],
    callout: {
      icon: AlertTriangle,
      label: 'Red Flag',
      text: 'If a Pro asks for more than $1,000 upfront, it\'s illegal in California. Walk away or demand compliance.',
    },
  },
  {
    step: 2,
    title: 'The Pro Check',
    subtitle: 'Verify who\'s really behind the hammer',
    icon: BadgeCheck,
    iconBg: 'bg-[#3ED1B8]/[0.08]',
    iconColor: 'text-[#3ED1B8]',
    accentColor: '#3ED1B8',
    accentLight: 'bg-[#3ED1B8]/[0.04]',
    description:
      'A license on the wall means nothing if it\'s expired, fictitious, or held under a different name. We teach you how to cross-reference the CSLB database, read complaint histories, and confirm every credential — so you know exactly who\'s entering your home.',
    keyPoints: [
      'Active CSLB license — verified in real time against state records',
      'Background check — government ID on file, no criminal history',
      'Complaint history — how to read CSLB records like a detective',
      'Reference verification — past clients, before-and-after photos',
      '30-day re-audit cycle — we check again, and again, and again',
    ],
    callout: {
      icon: Eye,
      label: 'Did You Know?',
      text: 'California homeowners lose an estimated $1.2 billion annually to unlicensed or uninsured Pros. Most of it is preventable.',
    },
  },
  {
    step: 3,
    title: 'The Job Standard',
    subtitle: 'How a Pro should treat your home',
    icon: Home,
    iconBg: 'bg-[#F5A623]/[0.08]',
    iconColor: 'text-[#F5A623]',
    accentColor: '#F5A623',
    accentLight: 'bg-[#F5A623]/[0.04]',
    description:
      'Your home is your property — not a job site. Clean uniforms, magnetic sweeps for nails, dust barriers, and daily site cleanup aren\'t luxuries. They\'re the baseline standard we hold every Pro to. And ghosting? Not on our watch.',
    keyPoints: [
      'Property shielding — landscaping, hardscape, and HVAC protection',
      'Magnetic sweeps — daily debris scans before the crew leaves',
      'Dust containment — zip-wall barriers and air quality monitoring',
      'Branded uniforms & vehicle ID — no mystery workers at your door',
      'Anti-ghosting protocol — guaranteed response within 24 hours',
    ],
    callout: {
      icon: Clock,
      label: 'Ghosting Fact',
      text: '1 in 4 California homeowners report their contractor disappearing mid-project. Our 24-hour response guarantee makes it nearly impossible.',
    },
  },
];

/* ───────────────────────── cheat sheet data ───────────────────────── */
const cheatSheetItems = [
  { icon: Scale, text: 'Never pay more than $1,000 upfront — it\'s CA law', color: '#3257C2' },
  { icon: BadgeCheck, text: 'Verify the CSLB license number yourself at cslb.ca.gov', color: '#3ED1B8' },
  { icon: FileText, text: 'Get everything in writing — change orders, timelines, scope', color: '#F5A623' },
  { icon: Users, text: 'Ask for 3 recent references and call every single one', color: '#CD7F32' },
  { icon: Shield, text: 'Confirm Workers\' Comp and GL insurance before Day 1', color: '#3257C2' },
  { icon: AlertTriangle, text: 'Red flag: cash-only payments, no written contract, no license', color: '#EF4444' },
];

/* ───────────────────────── component ────────────────────────────────── */
export function TheStandardView() {
  const { setCurrentPage } = useAppStore();

  return (
    <section className="min-h-screen bg-white">
      {/* ═══════════════════════════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden bg-[#0A0D14] pt-[100px] lg:pt-[88px] pb-0">
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
        <div className="pointer-events-none absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-[#3257C2]/[0.08] blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-[#3ED1B8]/[0.06] blur-[100px]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-24 sm:pb-32 text-center">
          <motion.div initial="hidden" animate="visible">
            {/* Badge */}
            <motion.div variants={fadeUp} custom={0} className="mb-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] border border-white/10 px-5 py-2 text-xs font-bold tracking-widest uppercase text-white/50">
                <Shield className="h-3.5 w-3.5 text-[#3ED1B8]" />
                Free for every California homeowner
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight text-white leading-[1.08] mb-6"
            >
              The Homeowner
              <br />
              <span className="bg-gradient-to-r from-[#3ED1B8] via-[#3ED1B8] to-[#3257C2] bg-clip-text text-transparent">
                20-Point Shield
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mx-auto max-w-xl text-base sm:text-lg text-white/40 leading-relaxed mb-10"
            >
              3 steps. Zero blind spots. The complete playbook for
              protecting your money, verifying your Pro, and demanding
              the standard your home deserves.
            </motion.p>

            {/* CTA */}
            <motion.div variants={fadeUp} custom={3}>
              <Button
                onClick={() => setCurrentPage('protection-guide-download')}
                size="lg"
                className="h-13 px-8 rounded-xl bg-[#3ED1B8] hover:bg-[#34b9a2] text-[#0A0D14] font-bold text-sm shadow-xl shadow-[#3ED1B8]/20 hover:shadow-[#3ED1B8]/30 transition-all duration-300 group"
              >
                Download My 20-Point Shield
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          3 STEPS — The Clean Journey
          ═══════════════════════════════════════════════════════════════ */}
      <div id="guide-steps" className="bg-white">
        {/* Step 1 — The Money Shield */}
        <div className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mx-auto max-w-3xl"
          >
            {guideSteps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  variants={stagger}
                  className={`${idx > 0 ? 'mt-24 sm:mt-32 pt-24 sm:pt-32 border-t border-[#E5E7EB]' : ''}`}
                >
                  {/* Step Number + Icon */}
                  <motion.div variants={childFade} className="flex items-center gap-5 mb-8">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl shrink-0" style={{ backgroundColor: `${step.accentColor}10` }}>
                      <StepIcon className="h-10 w-10" style={{ color: step.accentColor }} />
                    </div>
                    <div>
                      <span
                        className="text-[11px] font-extrabold tracking-[0.15em] uppercase block mb-1"
                        style={{ color: step.accentColor }}
                      >
                        Step {step.step}
                      </span>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1A1D2E] leading-tight">
                        {step.title}
                      </h2>
                      <p className="text-sm text-[#1A1D2E]/40 mt-1 font-medium">
                        {step.subtitle}
                      </p>
                    </div>
                  </motion.div>

                  {/* Description */}
                  <motion.p variants={childFade} className="text-base sm:text-lg text-[#1A1D2E]/55 leading-relaxed max-w-2xl mb-10">
                    {step.description}
                  </motion.p>

                  {/* Key Points */}
                  <motion.div variants={stagger} className="space-y-4 mb-10">
                    {step.keyPoints.map((point, pi) => (
                      <motion.div
                        key={pi}
                        variants={childFade}
                        className="flex items-start gap-4"
                      >
                        <div
                          className="flex items-center justify-center shrink-0 mt-0.5 h-7 w-7 rounded-lg"
                          style={{ backgroundColor: `${step.accentColor}10` }}
                        >
                          <CheckCircle2 className="h-4 w-4" style={{ color: step.accentColor }} />
                        </div>
                        <p className="text-sm sm:text-base text-[#1A1D2E]/70 leading-relaxed pt-0.5">
                          {point}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Callout Box */}
                  {step.callout && (
                    <motion.div
                      variants={childFade}
                      className="rounded-xl border p-5 sm:p-6"
                      style={{
                        backgroundColor: `${step.accentColor}05`,
                        borderColor: `${step.accentColor}18`,
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <step.callout.icon
                          className="h-5 w-5 shrink-0 mt-0.5"
                          style={{ color: step.accentColor }}
                        />
                        <div>
                          <span
                            className="text-[11px] font-extrabold tracking-wider uppercase block mb-1"
                            style={{ color: step.accentColor }}
                          >
                            {step.callout.label}
                          </span>
                          <p className="text-sm text-[#1A1D2E]/65 leading-relaxed">
                            {step.callout.text}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          EMAIL CTA — "Get the Full Guide"
          ═══════════════════════════════════════════════════════════════ */}
      <div className="bg-[#F8F9FB] px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
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
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            <div className="relative px-6 py-12 sm:px-10 sm:py-16 text-center">
              {/* Icon */}
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#3ED1B8]/15 backdrop-blur-sm border border-[#3ED1B8]/20">
                <Download className="h-7 w-7 text-[#3ED1B8]" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 leading-tight">
                Download My 20-Point Shield
              </h2>
              <p className="text-white/40 text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">
                We&apos;ll send you the complete 20-Point Shield as a
                downloadable PDF. Print it. Bring it to every bid. Hold every
                Pro accountable.
              </p>

              <Button
                size="lg"
                onClick={() => setCurrentPage('protection-guide-download')}
                className="h-13 px-8 rounded-xl bg-[#3ED1B8] hover:bg-[#34b9a2] text-[#0A0D14] font-bold text-sm shadow-lg shadow-[#3ED1B8]/20 hover:shadow-xl transition-all duration-300"
              >
                <Download className="mr-2 h-4 w-4" />
                Download My 20-Point Shield
              </Button>

              <p className="mt-5 text-[11px] text-white/20">
                No spam. No upsell. Just the Shield. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SAFETY SUMMARY — "The Cheat Sheet"
          ═══════════════════════════════════════════════════════════════ */}
      <div className="bg-white px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl"
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F5A623]/[0.08] px-4 py-1.5 mb-4">
              <Printer className="h-3.5 w-3.5 text-[#F5A623]" />
              <span className="text-xs font-semibold text-[#F5A623] tracking-wide uppercase">
                Safety Summary
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1A1D2E]">
              The Cheat Sheet
            </h2>
            <p className="mt-3 text-base text-[#1A1D2E]/40 max-w-lg mx-auto">
              Print this page. Pin it to your fridge. Share it with every
              homeowner you know. These 6 rules stop 90% of contractor fraud.
            </p>
          </div>

          {/* Cheat Sheet Card */}
          <div className="border-2 border-dashed border-[#E5E7EB] rounded-2xl p-6 sm:p-10 bg-[#FAFBFC]">
            <div className="space-y-5">
              {cheatSheetItems.map((item, i) => {
                const ItemIcon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className="flex items-start gap-4"
                  >
                    <div
                      className="flex items-center justify-center shrink-0 mt-0.5 h-8 w-8 rounded-lg"
                      style={{ backgroundColor: `${item.color}10` }}
                    >
                      <ItemIcon className="h-4 w-4" style={{ color: item.color }} />
                    </div>
                    <p className="text-sm sm:text-base text-[#1A1D2E]/75 leading-relaxed font-medium pt-1">
                      {item.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Print / Save Actions */}
            <div className="mt-8 pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant="outline"
                className="rounded-xl border-[#E5E7EB] text-[#1A1D2E]/60 hover:text-[#1A1D2E] hover:bg-white font-semibold text-sm"
                onClick={() => window.print()}
              >
                <Printer className="mr-2 h-4 w-4" />
                Print This Page
              </Button>
              <Button
                variant="outline"
                className="rounded-xl border-[#E5E7EB] text-[#1A1D2E]/60 hover:text-[#1A1D2E] hover:bg-white font-semibold text-sm"
              >
                <Download className="mr-2 h-4 w-4" />
                Save as PDF
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          FINAL CTA — "Now, Check My Pro"
          ═══════════════════════════════════════════════════════════════ */}
      <div className="bg-[#F8F9FB] px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-lg text-center"
        >
          <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3ED1B8]/[0.08]">
            <Shield className="h-7 w-7 text-[#3ED1B8]" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#1A1D2E] mb-3">
            Now put it to use.
          </h3>
          <p className="text-[#1A1D2E]/40 text-sm mb-8 leading-relaxed">
            You&apos;ve read the Shield. Now check any Pro — free. Submit a bid
            and see their full Guardian Risk Report in seconds.
          </p>
          <Button
            onClick={() => setCurrentPage('check-my-pro')}
            size="lg"
            className="h-13 px-8 rounded-xl bg-[#3257C2] hover:bg-[#2a49a8] text-white font-bold shadow-lg shadow-[#3257C2]/25 hover:shadow-xl transition-all duration-300 group"
          >
            <Shield className="mr-2 h-5 w-5" />
            Now, Check My Pro
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
