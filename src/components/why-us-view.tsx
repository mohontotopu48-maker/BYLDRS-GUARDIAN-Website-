'use client';

import { motion } from 'framer-motion';
import {
  Shield,
  Eye,
  RefreshCw,
  Scale,
  HeartHandshake,
  ArrowRight,
  Users,
  Target,
  Award,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';

/* ───────────────────────── fade-up animation ───────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: 'easeOut' },
  }),
};

/* ───────────────────────── data ────────────────────────────────────── */

const pillars = [
  {
    icon: Scale,
    title: 'Accountability',
    description:
      'Every Pro on our platform is held to the same rigorous standard. No favoritism, no exceptions — just verifiable performance data.',
    color: 'text-[#3257C2]',
    bg: 'bg-[#3257C2]/[0.07]',
    border: 'hover:border-[#3257C2]/20',
  },
  {
    icon: Eye,
    title: 'Transparency',
    description:
      'Homeowners see everything — audit scores, license status, complaint history, and community reviews. Zero hidden information.',
    color: 'text-[#3ED1B8]',
    bg: 'bg-[#3ED1B8]/[0.07]',
    border: 'hover:border-[#3ED1B8]/20',
  },
  {
    icon: RefreshCw,
    title: '30-Day Recurring Audits',
    description:
      "We don't verify once and forget. Every Pro is re-audited every 30 days against the full 20-Point Shield.",
    color: 'text-[#F5A623]',
    bg: 'bg-[#F5A623]/[0.07]',
    border: 'hover:border-[#F5A623]/20',
  },
];

const differentiators = [
  {
    icon: Shield,
    title: 'Independent Oversight',
    body: 'BYLDRS GUARDIAN is not affiliated with any contractor, trade association, or insurance company. We are a neutral third party — our only client is the homeowner.',
  },
  {
    icon: Target,
    title: 'Data-Driven Vetting',
    body: 'Every rating and tier assignment is backed by verifiable data: CSLB records, insurance certificates, complaint histories, and community reviews. No one can buy a higher tier.',
  },
  {
    icon: Users,
    title: 'Community-Powered',
    body: 'Property Owners contribute reviews and ratings that feed directly into our audit algorithm. Real experiences from real people — not marketing budgets.',
  },
  {
    icon: Award,
    title: 'Three-Tier System',
    body: 'Our Certified Guardian, Vetted Partner, and Verified Pro tiers give homeowners instant clarity on a Pro\'s standing. No ambiguous 4.2-star ratings to decode.',
  },
  {
    icon: TrendingUp,
    title: 'Continuous Improvement',
    body: 'Pros are incentivized to maintain and improve their standing. Our recurring audits catch credential lapses before they become homeowner problems.',
  },
  {
    icon: CheckCircle2,
    title: 'Contract Protection',
    body: 'Every Pro in our system has agreed to our 20-Point Shield — covering deposit limits, milestone payments, warranty requirements, and dispute resolution.',
  },
];

const stats = [
  { value: '4.5M+', label: 'Homeowners Protected' },
  { value: '$2.4M', label: 'Fraud Prevented' },
  { value: '15,000+', label: 'Audits Completed' },
  { value: '98%', label: 'Satisfaction Rate' },
];

/* ───────────────────────── component ───────────────────────────────── */
export function WhyUsView() {
  const { setCurrentPage } = useAppStore();

  return (
    <section className="min-h-screen bg-[#F4F7F9]">
      {/* ───── Hero ───── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1A1D2E] via-[#242845] to-[#1A1D2E] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#3257C2]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#3ED1B8]/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          <motion.div initial="hidden" animate="visible">
            <motion.div variants={fadeUp} custom={0}>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#3ED1B8]/20 px-4 py-1.5 text-sm font-medium text-[#3ED1B8]">
                <HeartHandshake className="h-3.5 w-3.5" />
                Why BYLDRS GUARDIAN
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white"
            >
              We Protect the Homeowner
              <br />
              <span className="bg-gradient-to-r from-[#3ED1B8] to-[#3ED1B8]/70 bg-clip-text text-transparent">
                by Watching the Watchmen.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mx-auto mt-6 max-w-2xl text-lg text-white/70 leading-relaxed"
            >
              California&apos;s home improvement industry generates over{' '}
              <span className="font-semibold text-white">$60 billion</span>{' '}
              annually — yet there&apos;s been no independent oversight. Until now.
            </motion.p>

            <motion.p
              variants={fadeUp}
              custom={3}
              className="mx-auto mt-3 max-w-2xl text-base text-white/50 leading-relaxed"
            >
              We are the Guardian that stands between homeowners and the risks
              of unverified, unaudited, and unaccountable Pros.
            </motion.p>
          </motion.div>

          <motion.div variants={fadeUp} custom={4} className="mt-8 flex justify-center gap-3 flex-wrap">
            <Button
              onClick={() => setCurrentPage('the-standard')}
              className="rounded-lg bg-[#3257C2] hover:bg-[#2a49a8] text-white font-semibold shadow-lg shadow-[#3257C2]/25"
            >
              Read The 20-Point Shield
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => setCurrentPage('blog')}
              className="rounded-lg border border-white/15 text-white/70 hover:text-white hover:bg-white/[0.06] font-semibold"
            >
              Property Stories
            </Button>
          </motion.div>

          <motion.div variants={fadeUp} custom={5} className="mt-8">
            <Button
              variant="ghost"
              onClick={() => setCurrentPage('home')}
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
              Back to Home
            </Button>
          </motion.div>
        </div>
      </div>

      {/* ───── Three Pillars ───── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-3xl sm:text-4xl font-extrabold text-[#1A1D2E] tracking-tight"
          >
            Built on Three Pillars
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={1}
            className="mt-3 text-base text-gray-500 max-w-xl mx-auto"
          >
            Every decision we make, every feature we build, and every audit we
            conduct is anchored in these principles.
          </motion.p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={idx}
                className={`group bg-white rounded-2xl p-8 border border-transparent ${pillar.border} hover:shadow-lg hover:shadow-[#1A1D2E]/[0.06] transition-all duration-300`}
              >
                <div
                  className={`h-14 w-14 rounded-2xl ${pillar.bg} flex items-center justify-center mb-5`}
                >
                  <Icon className={`h-7 w-7 ${pillar.color}`} />
                </div>
                <h3 className="text-xl font-bold text-[#1A1D2E] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ───── What Sets Us Apart ───── */}
      <div className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-3xl sm:text-4xl font-extrabold text-[#1A1D2E] tracking-tight"
            >
              What Sets Us Apart
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="mt-3 text-base text-gray-500 max-w-xl mx-auto"
            >
              The Guardian system is designed from the ground up to put
              homeowners first. Here&apos;s how.
            </motion.p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={idx}
                  className="rounded-2xl bg-[#F4F7F9] p-6 hover:bg-white hover:shadow-lg hover:shadow-[#1A1D2E]/[0.06] hover:border hover:border-gray-100 transition-all duration-300 border border-transparent"
                >
                  <div className="flex gap-4">
                    <div className="shrink-0 h-12 w-12 rounded-xl bg-[#3257C2]/[0.07] flex items-center justify-center">
                      <Icon className="h-6 w-6 text-[#3257C2]" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#1A1D2E] mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ───── Impact Stats ───── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl bg-gradient-to-br from-[#1A1D2E] to-[#242845] p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden"
        >
          <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-[#3ED1B8]/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-[#3257C2]/20 blur-3xl" />

          <div className="relative text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <HeartHandshake className="h-5 w-5 text-[#3ED1B8]" />
              <span className="text-sm font-semibold text-[#3ED1B8] uppercase tracking-widest">
                Our Impact
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-10">
              Numbers That Speak for Themselves
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                >
                  <div className="text-3xl sm:text-4xl font-extrabold">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-white/50 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-white/10 flex justify-center gap-4 flex-wrap">
              <Button
                onClick={() => setCurrentPage('check-my-pro')}
                className="rounded-lg bg-[#3ED1B8] hover:bg-[#3ED1B8]/90 text-[#1A1D2E] font-semibold shadow-lg shadow-[#3ED1B8]/20"
              >
                Check My Pro
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                onClick={() => setCurrentPage('contact')}
                className="rounded-lg border border-white/15 text-white/70 hover:text-white hover:bg-white/[0.06] font-semibold"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ───── The Problem We Solve ───── */}
      <div className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-1.5 mb-6">
                <Shield className="h-3.5 w-3.5 text-red-500" />
                <span className="text-xs font-semibold text-red-600 tracking-wide uppercase">
                  The Problem
                </span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1D2E] tracking-tight leading-tight">
                California Homeowners Deserve{' '}
                <span className="text-[#3257C2]">Better Protection.</span>
              </h2>
              <p className="mt-5 text-base text-gray-500 leading-relaxed">
                Every year, thousands of California homeowners lose millions of
                dollars to unlicensed contractors, excessive deposits, and
                substandard work. The CSLB receives over 30,000 complaints
                annually — but most homeowners don&apos;t even know where to file.
              </p>
              <p className="mt-4 text-base text-gray-500 leading-relaxed">
                BYLDRS GUARDIAN was built to close this gap. We provide the
                independent oversight that the industry has lacked — so
                homeowners can hire with confidence and Pros are incentivized to
                operate at the highest standard.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-4"
            >
              {[
                {
                  label: 'The $1,000 Deposit Rule',
                  detail: 'Most homeowners don\'t know CA limits Pro deposits to $1,000 or 10%.',
                },
                {
                  label: 'Workers\' Comp Verification',
                  detail: 'An uninsured injury on your property can cost $100,000+.',
                },
                {
                  label: 'License Status Tracking',
                  detail: 'Over 20% of complaints involve contractors with lapsed licenses.',
                },
                {
                  label: 'Milestone Payment Protection',
                  detail: 'Tying payments to progress keeps your money aligned with results.',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                  className="flex items-start gap-4 rounded-xl bg-[#F4F7F9] p-5 border border-gray-100"
                >
                  <div className="shrink-0 h-8 w-8 rounded-lg bg-[#3257C2]/10 flex items-center justify-center mt-0.5">
                    <CheckCircle2 className="h-4 w-4 text-[#3257C2]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1A1D2E]">
                      {item.label}
                    </h4>
                    <p className="mt-0.5 text-sm text-gray-500">
                      {item.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
