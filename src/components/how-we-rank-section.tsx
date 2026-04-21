'use client';

import {
  Trophy,
  Medal,
  Award,
  CheckCircle2,
  Star,
  Video,
  Users,
  Clock,
  BadgeCheck,
  Building2,
  Palette,
  BarChart3,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface TierDetail {
  level: number;
  name: string;
  badge: string;
  icon: React.ElementType;
  medal: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
  requirements: string[];
  perks: string[];
  pros: { name: string; company: string; rating: number }[];
}

const tiers: TierDetail[] = [
  {
    level: 3,
    name: 'Certified Guardian',
    badge: 'Gold',
    icon: Trophy,
    medal: '🥇',
    color: 'text-[#F5A623]',
    bgColor: 'bg-[#F5A623]/[0.06]',
    borderColor: 'border-[#F5A623]/30',
    description:
      'The pinnacle of Pro excellence. Certified Guardians represent the top 5% of all Pros — zero audit failures, full CRM integration, and a verified video splash page.',
    requirements: [
      '100% audit pass rate (all 20 points)',
      '3+ years verified history on platform',
      'Full CRM & scheduling integration',
      'Professional video splash page',
      'Zero unresolved complaints',
    ],
    perks: [
      'Priority listing in all search results',
      'Featured on homepage & category pages',
      'Direct lead routing from BYLDRS platform',
      'Guardian certification badge on profile',
      'Exclusive access to premium homeowner leads',
    ],
    pros: [
      { name: 'Marcus Rivera', company: 'Rivera Roofing & Solar', rating: 4.9 },
      { name: 'James Okafor', company: 'Okafor Electrical', rating: 4.9 },
    ],
  },
  {
    level: 2,
    name: 'Vetted Partner',
    badge: 'Silver',
    icon: Medal,
    medal: '🥈',
    color: 'text-[#9CA3AF]',
    bgColor: 'bg-[#9CA3AF]/[0.06]',
    borderColor: 'border-[#9CA3AF]/30',
    description:
      'Community-recommended professionals with a proven track record. Vetted Partners have demonstrated consistent quality and carry branded uniforms on every job site.',
    requirements: [
      '3+ years active contracting history',
      'Community recommended (50+ positive reviews)',
      'Branded uniforms & vehicle identification',
      'Active license & insurance verification',
      '90%+ audit pass rate',
    ],
    perks: [
      'Enhanced profile with trust indicators',
      'Vetted Partner badge displayed prominently',
      'Access to standard homeowner leads',
      'Priority response to audit requests',
      'Monthly performance reports',
    ],
    pros: [
      { name: 'Sarah Chen', company: 'Chen Plumbing Solutions', rating: 4.8 },
      { name: 'Maria Gonzalez', company: 'MG Home Remodeling', rating: 4.7 },
    ],
  },
  {
    level: 1,
    name: 'Verified Pro',
    badge: 'Bronze',
    icon: Award,
    medal: '🥉',
    color: 'text-[#CD7F32]',
    bgColor: 'bg-[#CD7F32]/[0.06]',
    borderColor: 'border-[#CD7F32]/30',
    description:
      'Every Pro starts here. Background checked, actively licensed, and performance-tracked from day one. The foundation of trust on BYLDRS GUARDIAN.',
    requirements: [
      'Active CSLB license verification',
      'Background check cleared',
      'Insurance & bond verification',
      'Performance tracking enabled',
      'Initial Homeowner Protection Guide assessment',
    ],
    perks: [
      'Standard profile listing in search',
      'Verified Pro badge on profile',
      'Access to homeowner review system',
      '30-day audit cycle enrollment',
      'Basic performance analytics',
    ],
    pros: [
      { name: 'David Park', company: 'Park HVAC Services', rating: 4.8 },
      { name: 'Emily Watson', company: 'Watson Landscaping', rating: 4.6 },
    ],
  },
];

const tierIcons = [Building2, Palette, BarChart3];

export function HowWeRankSection() {
  return (
    <section id="how-we-rank" className="relative bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14 lg:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#F5A623]/10 px-4 py-1.5 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-[#F5A623]" />
            <span className="text-xs font-semibold text-[#F5A623] tracking-wide uppercase">
              The 3-Tier System
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1A1D2E]">
            How We{' '}
            <span className="text-[#3257C2]">Rank</span>
          </h2>
          <p className="mt-4 text-lg text-[#1A1D2E]/60 max-w-2xl mx-auto">
            Our transparent tier system ensures homeowners know exactly what level
            of verification each Pro has achieved.
          </p>
        </div>

        {/* Tier Cards */}
        <div className="space-y-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.level}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className={`bg-white rounded-2xl border-2 ${tier.borderColor} ${tier.bgColor} p-6 lg:p-8 hover:shadow-xl hover:shadow-[#1A1D2E]/[0.06] transition-all duration-300`}
            >
              <div className="grid lg:grid-cols-[auto_1fr_auto] gap-6 lg:gap-10 items-start">
                {/* Left - Tier Info */}
                <div className="lg:w-[380px]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{tier.medal}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl sm:text-2xl font-extrabold text-[#1A1D2E]">
                          {tier.name}
                        </h3>
                        <span
                          className={`text-xs font-bold ${tier.color} ${tier.bgColor} px-2.5 py-0.5 rounded-full`}
                        >
                          {tier.badge}
                        </span>
                      </div>
                      <span className="text-xs font-medium text-[#1A1D2E]/40">
                        Tier {tier.level}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-[#1A1D2E]/60 leading-relaxed">
                    {tier.description}
                  </p>

                  {/* Sample Pros */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tier.pros.map((pro, pi) => (
                      <div
                        key={pi}
                        className="inline-flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-[#E5E7EB]/80 shadow-sm"
                      >
                        <div
                          className={`h-7 w-7 rounded-full ${tier.level === 3 ? 'bg-[#F5A623]' : tier.level === 2 ? 'bg-[#9CA3AF]' : 'bg-[#CD7F32]'} flex items-center justify-center text-white text-[10px] font-bold`}
                        >
                          {pro.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[#1A1D2E]">
                            {pro.name}
                          </div>
                          <div className="text-[10px] text-[#1A1D2E]/40">
                            {pro.company}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Middle - Requirements */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1D2E]/40 mb-3">
                    Requirements
                  </h4>
                  <ul className="space-y-2.5">
                    {tier.requirements.map((req, ri) => (
                      <li key={ri} className="flex items-start gap-2.5">
                        <CheckCircle2 className={`h-4 w-4 ${tier.color} flex-shrink-0 mt-0.5`} />
                        <span className="text-sm text-[#1A1D2E]/70">
                          {req}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right - Perks */}
                <div className="lg:w-[280px]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1D2E]/40 mb-3">
                    Perks
                  </h4>
                  <ul className="space-y-2.5">
                    {tier.perks.map((perk, pi) => (
                      <li key={pi} className="flex items-start gap-2.5">
                        <Star className={`h-3.5 w-3.5 ${tier.color} flex-shrink-0 mt-0.5 fill-current`} />
                        <span className="text-sm text-[#1A1D2E]/70">
                          {perk}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 text-sm font-semibold text-[#3257C2] hover:text-[#2a49a8] transition-colors group">
            See How Pros Advance Through Tiers
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
