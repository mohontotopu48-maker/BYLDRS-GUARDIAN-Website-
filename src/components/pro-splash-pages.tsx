'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAppStore } from '@/lib/store';
import {
  Shield,
  Star,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  Award,
  Users,
  Home,
  Play,
  Briefcase,
  Wrench,
  FileCheck,
  HeartHandshake,
  ArrowLeft,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
};

/* ──────────────────────────────────────────────────────────
   Tier 3 — Certified Guardian (Gold)
   ────────────────────────────────────────────────────────── */

export function Tier3Splash() {
  const { setCurrentPage } = useAppStore();
  const score = 96;

  const timeline = [
    { year: '2009', event: 'Founded Rivera Roofing & Solar in Los Angeles' },
    { year: '2012', event: 'Expanded to full-service residential and commercial roofing' },
    { year: '2016', event: 'Added solar installation division — 100+ installs completed' },
    { year: '2020', event: 'Achieved Certified Guardian status on BYLDRS GUARDIAN' },
    { year: '2024', event: 'Reached 500+ verified projects with 4.9/5 average rating' },
  ];

  return (
    <section className="min-h-screen bg-white pt-24">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#0F1219] via-[#1A2744] to-[#3257C2] py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#F5A623]/[0.08] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#3ED1B8]/[0.06] blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Guardian Seal */}
          <motion.div initial="hidden" animate="visible" className="text-center mb-10">
            <motion.div variants={fadeUp} custom={0} className="inline-flex flex-col items-center">
              <div className="relative">
                <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full border-[3px] border-[#F5A623] flex items-center justify-center bg-[#F5A623]/10 shadow-xl shadow-[#F5A623]/20">
                  <Shield className="h-10 w-10 sm:h-12 sm:w-12 text-[#F5A623]" />
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#F5A623] to-[#e09518] text-white text-[8px] font-bold uppercase tracking-[0.2em] px-3 py-0.5 rounded-full whitespace-nowrap shadow-sm">
                  Certified Guardian
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Pro Info */}
          <motion.div initial="hidden" animate="visible" className="text-center mb-10">
            <motion.h1 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3">
              Marcus Rivera
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-lg text-white/60 mb-6">
              Rivera Roofing & Solar — Los Angeles, CA
            </motion.p>

            {/* Score */}
            <motion.div variants={fadeUp} custom={3} className="flex justify-center mb-8">
              <div className="relative">
                <svg className="w-32 h-32 sm:w-36 sm:h-36 -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                  <circle
                    cx="60" cy="60" r="52" fill="none"
                    stroke="#F5A623"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${(score / 100) * 327} 327`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white">{score}</span>
                  <span className="text-[10px] font-semibold text-[#F5A623] uppercase tracking-wider">Sanctuary Score</span>
                </div>
              </div>
            </motion.div>

            {/* Verified Badges */}
            <motion.div variants={fadeUp} custom={4} className="flex flex-wrap justify-center gap-2 mb-8">
              {[
                'License Verified',
                'Insured',
                'Background Checked',
                'Workers\' Comp',
              ].map((badge) => (
                <div
                  key={badge}
                  className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#3ED1B8]" />
                  <span className="text-xs font-medium text-white/80">{badge}</span>
                </div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} custom={5} className="flex flex-wrap justify-center gap-6 sm:gap-10 text-center">
              {[
                { value: '15+', label: 'Years' },
                { value: '500+', label: 'Projects' },
                { value: '4.9', label: 'Rating' },
                { value: '324', label: 'Reviews' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-extrabold text-white">{stat.value}</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-wider font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* CTA */}
          <motion.div initial="hidden" animate="visible" className="text-center">
            <motion.div variants={fadeUp} custom={6}>
              <Button className="h-12 px-8 rounded-lg bg-[#F5A623] hover:bg-[#e09518] text-[#1A1D2E] font-bold text-sm shadow-lg shadow-[#F5A623]/30 hover:shadow-xl transition-all duration-300 group">
                Request Audit
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Video Section Placeholder */}
      <div className="bg-[#F4F7F9] py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#1A2744] to-[#3257C2] rounded-2xl aspect-video max-h-80 flex items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <div className="flex flex-col items-center gap-3">
              <button className="h-16 w-16 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/25 transition-colors">
                <Play className="h-7 w-7 text-white ml-1" />
              </button>
              <span className="text-sm font-medium text-white/60">Watch Marcus&apos;s Video Introduction</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#1A1D2E] mb-8 flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-[#3257C2]" />
            Experience & History
          </h2>
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="flex gap-6"
              >
                <div className="flex flex-col items-center">
                  <div className="h-3 w-3 rounded-full bg-[#F5A623] ring-4 ring-[#F5A623]/20" />
                  {i < timeline.length - 1 && <div className="w-px flex-1 bg-[#E5E7EB] min-h-12" />}
                </div>
                <div className="pb-8">
                  <span className="text-xs font-bold text-[#F5A623]">{item.year}</span>
                  <p className="text-sm text-[#1A1D2E]/70 mt-0.5">{item.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Back Link */}
      <div className="text-center pb-16">
        <button
          onClick={() => setCurrentPage('home')}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#3257C2] hover:underline group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </button>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   Tier 2 — Vetted Partner (Silver)
   ────────────────────────────────────────────────────────── */

const neighborhoodReviews = [
  {
    name: 'Maria T.',
    location: 'San Diego, CA',
    rating: 5,
    text: 'Sarah fixed our burst pipe in under 2 hours on a Sunday. Incredible service and very fair pricing.',
    date: 'December 2024',
  },
  {
    name: 'David K.',
    location: 'La Mesa, CA',
    rating: 5,
    text: 'Professional, clean work area, and transparent pricing. Would absolutely hire again for any plumbing needs.',
    date: 'November 2024',
  },
  {
    name: 'Jennifer M.',
    location: 'Chula Vista, CA',
    rating: 4,
    text: 'Explained the issue thoroughly before starting any work. No surprises on the bill. Highly recommended.',
    date: 'October 2024',
  },
];

export function Tier2Splash() {
  const { setCurrentPage } = useAppStore();
  const score = 82;

  return (
    <section className="min-h-screen bg-[#F4F7F9] pt-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-[#E5E7EB] shadow-xl shadow-[#1A1D2E]/[0.06] overflow-hidden"
        >
          {/* Card Header */}
          <div className="bg-gradient-to-r from-[#6B7280] via-[#9CA3AF] to-[#D1D5DB] p-8 sm:p-10 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="h-20 w-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-lg">
                  <Wrench className="h-10 w-10 text-white" />
                </div>
                <div>
                  <Badge className="bg-white/20 text-white border-white/20 hover:bg-white/30 mb-2 text-xs">
                    🥈 VETTED PARTNER
                  </Badge>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Sarah Chen</h1>
                  <p className="text-white/70 mt-1">Chen Plumbing Solutions — San Diego, CA</p>
                </div>
              </div>

              {/* Score */}
              <div className="self-start">
                <div className="relative">
                  <svg className="w-24 h-24 -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="6" />
                    <circle
                      cx="60" cy="60" r="52" fill="none"
                      stroke="white"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={`${(score / 100) * 327} 327`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-extrabold text-white">{score}</span>
                    <span className="text-[8px] font-semibold text-white/70 uppercase tracking-wider">Score</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-8 sm:p-10">
            {/* Verified Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['License Verified', 'Insured', 'Background Checked'].map((badge) => (
                <div key={badge} className="inline-flex items-center gap-1.5 bg-[#9CA3AF]/[0.08] border border-[#9CA3AF]/20 rounded-full px-3 py-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#9CA3AF]" />
                  <span className="text-xs font-medium text-[#9CA3AF]">{badge}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { value: '8+', label: 'Years', icon: Clock },
                { value: '218', label: 'Projects', icon: Briefcase },
                { value: '4.8', label: 'Rating', icon: Star },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-3 rounded-xl bg-[#F4F7F9]">
                  <stat.icon className="h-5 w-5 text-[#9CA3AF] mx-auto mb-1.5" />
                  <div className="text-xl font-extrabold text-[#1A1D2E]">{stat.value}</div>
                  <div className="text-[10px] text-[#1A1D2E]/40 uppercase tracking-wider font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Button className="w-full h-12 rounded-lg bg-[#3257C2] hover:bg-[#2a49a8] text-white font-semibold text-sm shadow-lg shadow-[#3257C2]/20 hover:shadow-xl transition-all duration-300 group mb-8">
              Request Audit
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>

        {/* Neighborhood Review Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10"
        >
          <h2 className="text-xl font-bold text-[#1A1D2E] mb-6 flex items-center gap-2">
            <HeartHandshake className="h-5 w-5 text-[#9CA3AF]" />
            Neighborhood Reviews
          </h2>

          <div className="space-y-4">
            {neighborhoodReviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="bg-white rounded-xl border border-[#E5E7EB] p-5 sm:p-6 hover:shadow-lg hover:shadow-[#1A1D2E]/[0.04] transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#9CA3AF]/[0.1] flex items-center justify-center">
                      <span className="text-sm font-bold text-[#9CA3AF]">
                        {review.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1A1D2E]">{review.name}</p>
                      <div className="flex items-center gap-1.5 text-xs text-[#1A1D2E]/40">
                        <MapPin className="h-3 w-3" />
                        {review.location}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-[#1A1D2E]/30">{review.date}</span>
                </div>

                <div className="flex items-center gap-0.5 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`h-4 w-4 ${s <= review.rating ? 'fill-[#F5A623] text-[#F5A623]' : 'fill-[#E5E7EB] text-[#E5E7EB]'}`}
                    />
                  ))}
                </div>

                <p className="text-sm text-[#1A1D2E]/60 leading-relaxed">
                  &quot;{review.text}&quot;
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Back Link */}
        <div className="text-center pt-12">
          <button
            onClick={() => setCurrentPage('home')}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#3257C2] hover:underline group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </button>
        </div>
      </div>
    </section>
  );
}
