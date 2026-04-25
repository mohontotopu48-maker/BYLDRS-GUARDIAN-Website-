'use client';

import {
  Shield,
  Eye,
  RefreshCw,
  Scale,
  HeartHandshake,
} from 'lucide-react';
import { motion } from 'framer-motion';

const coreValues = [
  {
    icon: Scale,
    title: 'Accountability',
    description:
      'Every Pro on our platform is held to the same rigorous standard. No favoritism, no exceptions — just verifiable performance data.',
    color: 'text-[#3257C2]',
    bg: 'bg-[#3257C2]/[0.07]',
  },
  {
    icon: Eye,
    title: 'Transparency',
    description:
      'Homeowners see everything — audit scores, license status, complaint history, and community reviews. Zero hidden information.',
    color: 'text-[#3ED1B8]',
    bg: 'bg-[#3ED1B8]/[0.07]',
  },
  {
    icon: RefreshCw,
    title: '30-Day Recurring Audits',
    description:
      'We don\'t verify once and forget. Every Pro is re-audited every 30 days against the full 20-Point Shield to ensure ongoing compliance.',
    color: 'text-[#F5A623]',
    bg: 'bg-[#F5A623]/[0.07]',
  },
];

export function WhoWeAreSection() {
  return (
    <section id="mission" className="relative bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Story */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#3257C2]/[0.07] px-4 py-1.5 mb-6">
              <Shield className="h-3.5 w-3.5 text-[#3257C2]" />
              <span className="text-xs font-semibold text-[#3257C2] tracking-wide uppercase">
                Our Mission
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1A1D2E] leading-tight">
              We Protect the Homeowner&apos;s Largest Asset by{' '}
              <span className="text-[#3257C2]">Watching the Watchmen.</span>
            </h2>

            <p className="mt-6 text-base sm:text-lg text-[#1A1D2E]/60 leading-relaxed">
              BYLDRS GUARDIAN was born from a simple truth: homeowners deserve the
              same level of protection when hiring a Pro that they get from
              their bank, their doctor, or their attorney.
            </p>

            <p className="mt-4 text-base sm:text-lg text-[#1A1D2E]/60 leading-relaxed">
              California&apos;s home improvement industry generates over{' '}
              <span className="font-semibold text-[#1A1D2E]">$60 billion</span>{' '}
              annually — yet there&apos;s been no independent oversight. Until now.
              We are the <span className="font-semibold text-[#3257C2]">Guardian</span>{' '}
              that stands between homeowners and the risks of unverified,
              unaudited, and unaccountable Pros.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#E5E7EB]" />
              <span className="text-xs font-bold text-[#3257C2]/60 uppercase tracking-widest">
                Est. 2024 — California
              </span>
              <div className="h-px flex-1 bg-[#E5E7EB]" />
            </div>
          </motion.div>

          {/* Right - Core Values */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="space-y-6"
          >
            {coreValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.12 }}
                className="group bg-[#F4F7F9] rounded-xl p-6 lg:p-8 hover:bg-white hover:shadow-lg hover:shadow-[#1A1D2E]/[0.06] hover:border hover:border-[#E5E7EB] transition-all duration-300 border border-transparent"
              >
                <div className="flex gap-4">
                  <div
                    className={`flex-shrink-0 h-12 w-12 rounded-xl ${value.bg} flex items-center justify-center`}
                  >
                    <value.icon className={`h-6 w-6 ${value.color}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1A1D2E] mb-1.5">
                      {value.title}
                    </h3>
                    <p className="text-sm text-[#1A1D2E]/60 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Impact Stats */}
            <div className="bg-[#3257C2] rounded-xl p-6 lg:p-8 text-white">
              <div className="flex items-center gap-2 mb-4">
                <HeartHandshake className="h-5 w-5 text-[#3ED1B8]" />
                <span className="text-sm font-semibold text-[#3ED1B8]">
                  Our Impact
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '4.5M+', label: 'Homeowners Protected' },
                  { value: '$2.4M', label: 'Fraud Prevented' },
                  { value: '15,000+', label: 'Audits Completed' },
                  { value: '98%', label: 'Satisfaction Rate' },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-2xl font-extrabold">{stat.value}</div>
                    <div className="text-xs text-white/60 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
