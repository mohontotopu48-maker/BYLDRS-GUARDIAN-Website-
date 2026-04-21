'use client';

import { motion } from 'framer-motion';
import { Scale, ArrowRight, Shield, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/lib/store';

/* ───────────────────────── fade‑up animation ───────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
};

const fadeInView = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

/* ───────────────────────── pillar data ──────────────────────────────── */
interface Pillar {
  number: string;
  title: string;
  color: string;
  colorBg: string;
  colorBorder: string;
  colorFaint: string;
  icon: string;
  description: string;
  checkpoints: string[];
}

const pillars: Pillar[] = [
  {
    number: 'I',
    title: 'Legal & Financial Immunity',
    color: '#3257C2',
    colorBg: 'bg-[#3257C2]',
    colorBorder: 'border-[#3257C2]/20',
    colorFaint: 'bg-[#3257C2]/[0.06]',
    icon: '⚖️',
    description:
      'Protect yourself from financial loss. Every Pro must pass these checks before stepping foot on your property.',
    checkpoints: [
      'Active CSLB License Verification',
      "Workers' Compensation Coverage Current",
      'Insurance & Bond Validity Confirmed',
      'Deposit Within CA Legal Limit ($1,000 max)',
      "Mechanic's Lien Prevention Compliance",
    ],
  },
  {
    number: 'II',
    title: 'Operational Defense',
    color: '#3ED1B8',
    colorBg: 'bg-[#3ED1B8]',
    colorBorder: 'border-[#3ED1B8]/20',
    colorFaint: 'bg-[#3ED1B8]/[0.06]',
    icon: '🛡️',
    description:
      "Validate that your Pro operates at the highest professional standard — from warranties to inspections.",
    checkpoints: [
      'Warranty Documentation on File',
      'Pre-Construction Diagnostic Complete',
      'Material Quality Standards Verified',
      'Inspection Scheduling Protocol Active',
      'Post-Completion Quality Assurance',
    ],
  },
  {
    number: 'III',
    title: 'Sanctuary Site Standard',
    color: '#F5A623',
    colorBg: 'bg-[#F5A623]',
    colorBorder: 'border-[#F5A623]/20',
    colorFaint: 'bg-[#F5A623]/[0.06]',
    icon: '🏠',
    description:
      'Your home is your sanctuary. These standards ensure it stays that way during any project.',
    checkpoints: [
      'Property Shielding & Landscaping Protection',
      'Magnetic Sweeps for Construction Debris',
      'Dust Containment & Air Quality Standards',
      'Noise Ordinance Compliance Verified',
      'Daily Site Cleanup Protocol Active',
    ],
  },
  {
    number: 'IV',
    title: 'Accountability & Ethics',
    color: '#CD7F32',
    colorBg: 'bg-[#CD7F32]',
    colorBorder: 'border-[#CD7F32]/20',
    colorFaint: 'bg-[#CD7F32]/[0.06]',
    icon: '🤝',
    description:
      'Trust is built on transparency. Every Pro must demonstrate ethical business practices.',
    checkpoints: [
      'Verified Identity & Background Check',
      'Anti-Ghosting Communication Standards',
      'Documentation Best Practices Enforced',
      'Ethical Bidding & Fair Pricing Guidelines',
      'Dispute Resolution Clause in Contract',
    ],
  },
];

/* ───────────────────────── stat cards data ──────────────────────────── */
const stats = [
  { value: '20', label: 'Checkpoints', color: '#3257C2' },
  { value: '4', label: 'Pillars', color: '#3ED1B8' },
  { value: '30-Day', label: 'Cycle', color: '#F5A623' },
  { value: '98%', label: 'Accuracy', color: '#CD7F32' },
];

/* ───────────────────────── component ────────────────────────────────── */
export function TheStandardView() {
  const { setCurrentPage } = useAppStore();

  return (
    <section className="min-h-screen bg-white">
      {/* ───── Dark Header Banner ───── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0F1219] to-[#1A1D2E] pt-[100px] lg:pt-[88px] pb-20 px-4 sm:px-6 lg:px-8">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#3257C2]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#3ED1B8]/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div initial="hidden" animate="visible">
            <motion.div variants={fadeUp} custom={0}>
              <Badge className="mb-4 bg-[#3ED1B8]/20 text-[#3ED1B8] border border-[#3ED1B8]/30 px-3 py-1 text-sm font-medium">
                <Scale className="mr-1.5 h-3.5 w-3.5" />
                The Standard
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white"
            >
              The 20-Point Protocol
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mx-auto mt-4 max-w-2xl text-lg text-white/60 leading-relaxed"
            >
              Four pillars of protection. Every Pro on BYLDRS GUARDIAN is
              measured against this standard — no exceptions.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="mt-8">
              <Button
                variant="ghost"
                onClick={() => setCurrentPage('home')}
                className="text-white/60 hover:text-white hover:bg-white/10"
              >
                <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                Back to Home
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ───── Protocol Overview Section ───── */}
      <div className="bg-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeInView}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1D2E] mb-4">
              What Is the 20-Point Protocol?
            </h2>
            <p className="mx-auto max-w-2xl text-[#1A1D2E]/60 leading-relaxed text-base sm:text-lg">
              The 20-Point Protocol is BYLDRS GUARDIAN&apos;s complete vetting
              system. It covers everything a Pro must prove before they can work
              on your home — from licenses and insurance to how they treat your
              property. Every single checkpoint is verified on a 30-day cycle so
              nothing slips through the cracks.
            </p>
          </motion.div>

          {/* Stat Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                custom={i}
                className="relative rounded-xl border border-[#E5E7EB] bg-white p-5 sm:p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className="mx-auto mb-3 h-1 w-10 rounded-full"
                  style={{ backgroundColor: stat.color }}
                />
                <p
                  className="text-3xl sm:text-4xl font-extrabold leading-none"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </p>
                <p className="mt-1.5 text-sm font-medium text-[#1A1D2E]/50">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ───── The Four Pillars Section ───── */}
      <div className="bg-[#F4F7F9] px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeInView}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1D2E] mb-3">
              The Four Pillars
            </h2>
            <p className="mx-auto max-w-xl text-[#1A1D2E]/50 text-base">
              Each pillar covers a critical area of protection. Together, they
              form the most complete vetting system in the industry.
            </p>
          </motion.div>

          {/* Pillar Cards */}
          <div className="space-y-8 sm:space-y-10">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.number}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeInView}
                className="rounded-2xl bg-white border border-[#E5E7EB] overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                {/* Pillar Header */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-start gap-4 sm:gap-5">
                    {/* Icon */}
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${pillar.colorFaint} text-2xl`}
                    >
                      {pillar.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                        <span
                          className="text-xs font-bold uppercase tracking-widest"
                          style={{ color: pillar.color }}
                        >
                          Pillar {pillar.number}
                        </span>
                        <div
                          className="hidden sm:block h-1 w-1 rounded-full"
                          style={{ backgroundColor: pillar.color, opacity: 0.4 }}
                        />
                        <h3 className="text-lg sm:text-xl font-bold text-[#1A1D2E]">
                          {pillar.title}
                        </h3>
                      </div>
                      <p className="text-[#1A1D2E]/60 leading-relaxed text-sm sm:text-base">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Checkpoints */}
                <div
                  className={`border-t ${pillar.colorBorder} bg-[#FAFBFC] px-6 sm:px-8 py-5 sm:py-6`}
                >
                  <ul className="grid gap-3 sm:gap-3.5 sm:grid-cols-2">
                    {pillar.checkpoints.map((checkpoint, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle2
                          className="mt-0.5 h-4.5 w-4.5 shrink-0"
                          style={{ color: pillar.color }}
                        />
                        <span className="text-sm text-[#1A1D2E]/70 leading-snug">
                          {checkpoint}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ───── Bottom CTA ───── */}
      <div className="bg-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={fadeInView}
          className="mx-auto max-w-lg text-center"
        >
          <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3257C2]/[0.07]">
            <Shield className="h-7 w-7 text-[#3257C2]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1D2E] mb-3">
            Ready to Get Protected?
          </h2>
          <p className="text-[#1A1D2E]/50 text-base mb-8 leading-relaxed">
            Every Pro on our platform is measured against all 20 points. Find
            one you can trust.
          </p>

          <Button
            onClick={() => setCurrentPage('home')}
            size="lg"
            className="h-13 px-8 rounded-xl bg-[#3257C2] hover:bg-[#2a49a8] text-white font-semibold shadow-lg shadow-[#3257C2]/25 hover:shadow-xl transition-all duration-300 group"
          >
            Find a Pro Who Meets The Standard
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>

          <p className="mt-4 text-xs text-[#1A1D2E]/35">
            Every Pro on our platform is measured against all 20 points.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
