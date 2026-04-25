'use client';

import {
  Search,
  Activity,
  UserCheck,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Search',
    subtitle: 'Find Local Pros',
    description:
      'Search our database of California-licensed Pros who have passed the initial 20-Point Shield. Filter by trade, location, tier, and real-time audit health scores.',
    features: [
      '20+ California home service categories',
      'Real-time license & insurance verification',
      'Community reviews and performance ratings',
    ],
    color: 'text-[#3257C2]',
    bg: 'bg-[#3257C2]',
    lightBg: 'bg-[#3257C2]/[0.07]',
    accent: 'bg-[#3257C2]',
  },
  {
    number: '02',
    icon: Activity,
    title: 'Audit',
    subtitle: 'View Real-Time Health',
    description:
      'Every Pro\'s "Health Score" is publicly visible — License Status, Insurance Coverage, Bond Validity, Complaint History, and Community Standing — all refreshed every 30 days.',
    features: [
      'Live Health Score dashboard per Pro',
      '30-day recurring audit cycle',
      'CSLB cross-referencing & red-flag alerts',
    ],
    color: 'text-[#3ED1B8]',
    bg: 'bg-[#3ED1B8]',
    lightBg: 'bg-[#3ED1B8]/[0.07]',
    accent: 'bg-[#3ED1B8]',
  },
  {
    number: '03',
    icon: UserCheck,
    title: 'Hire',
    subtitle: 'Check My Pro',
    description:
      'Before signing, submit any outside bid through our "Check My Pro" tool. We verify compliance with CA law — including the $1,000 deposit limit — so you never overpay upfront.',
    features: [
      'Free bid verification & market comparison',
      'CA deposit law compliance check ($1,000 max)',
      'Contract review & red-flag detection',
    ],
    color: 'text-[#F5A623]',
    bg: 'bg-[#F5A623]',
    lightBg: 'bg-[#F5A623]/[0.07]',
    accent: 'bg-[#F5A623]',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative bg-[#F4F7F9] py-16 lg:py-24">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #1A1D2E 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14 lg:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#3257C2]/[0.07] px-4 py-1.5 mb-4">
            <Activity className="h-3.5 w-3.5 text-[#3257C2]" />
            <span className="text-xs font-semibold text-[#3257C2] tracking-wide uppercase">
              The Process
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1A1D2E]">
            How It{' '}
            <span className="text-[#3257C2]">Works</span>
          </h2>
          <p className="mt-4 text-lg text-[#1A1D2E]/60 max-w-2xl mx-auto">
            Three simple steps to protect your home and hire with confidence.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative group"
            >
              {/* Connector Line (desktop) */}
              {index < 2 && (
                <div className="hidden lg:block absolute top-16 left-[calc(50%+60px)] right-[calc(-50%+60px)] h-px border-t-2 border-dashed border-[#3257C2]/15" />
              )}

              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg shadow-[#1A1D2E]/[0.04] border border-[#E5E7EB]/60 hover:shadow-xl hover:shadow-[#1A1D2E]/[0.08] transition-all duration-300 relative">
                {/* Step Number */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div
                        className={`h-14 w-14 rounded-xl ${step.lightBg} flex items-center justify-center`}
                      >
                        <step.icon className={`h-7 w-7 ${step.color}`} />
                      </div>
                      <div
                        className={`absolute -top-2 -right-2 h-6 w-6 rounded-full ${step.bg} text-white text-[10px] font-bold flex items-center justify-center shadow-sm`}
                      >
                        {step.number}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-extrabold text-[#1A1D2E] mb-1">
                  {step.title}
                </h3>
                <p className={`text-sm font-semibold ${step.color} mb-3`}>
                  {step.subtitle}
                </p>
                <p className="text-sm text-[#1A1D2E]/60 leading-relaxed mb-5">
                  {step.description}
                </p>

                {/* Features */}
                <ul className="space-y-2.5">
                  {step.features.map((feature, fi) => (
                    <li key={fi} className="flex items-start gap-2.5">
                      <div
                        className={`flex-shrink-0 mt-0.5 h-5 w-5 rounded-full ${step.lightBg} flex items-center justify-center`}
                      >
                        <div
                          className={`h-1.5 w-1.5 rounded-full ${step.accent}`}
                        />
                      </div>
                      <span className="text-xs font-medium text-[#1A1D2E]/70 leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA — Start Your Search */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-12 lg:mt-16"
        >
          <button
            onClick={() => {
              document.querySelector('#search-pros')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2.5 rounded-xl bg-[#3257C2] hover:bg-[#2a49a8] text-white font-bold px-8 py-3.5 text-sm shadow-lg shadow-[#3257C2]/25 hover:shadow-xl hover:shadow-[#3257C2]/35 transition-all duration-300 group cursor-pointer"
          >
            Start Your Search
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
