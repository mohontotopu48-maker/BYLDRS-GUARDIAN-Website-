'use client';

import {
  Shield,
  ClipboardCheck,
  FileSearch,
  Award,
  ArrowRight,
  BookOpen,
  Clock,
  Users,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Pillar {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
  lessons: number;
  duration: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

const pillars: Pillar[] = [
  {
    id: 1,
    icon: Shield,
    title: 'License & Insurance Verification',
    description:
      'Learn how to verify contractor licenses with the CSLB, understand insurance requirements, and spot fake credentials before they cost you thousands.',
    lessons: 5,
    duration: '25 min',
    color: 'text-[#3257C2]',
    bgColor: 'bg-[#3257C2]/[0.07]',
    borderColor: 'border-[#3257C2]/20',
  },
  {
    id: 2,
    icon: ClipboardCheck,
    title: 'Contract & Bid Analysis',
    description:
      'Master the art of reading construction contracts, identifying hidden clauses, and understanding when a bid is too good (or too bad) to be true.',
    lessons: 4,
    duration: '20 min',
    color: 'text-[#3ED1B8]',
    bgColor: 'bg-[#3ED1B8]/[0.07]',
    borderColor: 'border-[#3ED1B8]/20',
  },
  {
    id: 3,
    icon: FileSearch,
    title: 'Project Oversight & Milestones',
    description:
      'Discover the 20-Point Protocol for monitoring your project, setting up milestone payments, and keeping your renovation on track.',
    lessons: 6,
    duration: '30 min',
    color: 'text-[#F5A623]',
    bgColor: 'bg-[#F5A623]/[0.07]',
    borderColor: 'border-[#F5A623]/20',
  },
  {
    id: 4,
    icon: Award,
    title: 'Dispute Resolution & Warranties',
    description:
      'Know your rights under California law, learn how to file complaints, and understand warranty coverage for workmanship and materials.',
    lessons: 5,
    duration: '25 min',
    color: 'text-[#CD7F32]',
    bgColor: 'bg-[#CD7F32]/[0.07]',
    borderColor: 'border-[#CD7F32]/20',
  },
];

export function AcademySection() {
  return (
    <section id="academy" className="relative bg-[#F4F7F9] py-16 lg:py-24">
      {/* Subtle Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#3257C2]/[0.02] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#F5A623]/10 px-4 py-1.5 mb-4">
            <BookOpen className="h-3.5 w-3.5 text-[#F5A623]" />
            <span className="text-xs font-semibold text-[#F5A623] tracking-wide uppercase">
              Homeowner Education
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1A1D2E]">
            The Homeowner{' '}
            <span className="text-[#3257C2]">Academy</span>
          </h2>
          <p className="mt-4 text-lg text-[#1A1D2E]/60 max-w-2xl mx-auto">
            Master the 4 Pillars of the 20-Point Protocol. Free lessons designed
            to protect your investment and give you confidence.
          </p>
        </div>

        {/* Academy Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {[
            {
              icon: BookOpen,
              value: '20',
              label: 'Lessons',
            },
            {
              icon: Users,
              value: '150k+',
              label: 'Homeowners Trained',
            },
            {
              icon: Clock,
              value: '100 min',
              label: 'Total Duration',
            },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                <stat.icon className="h-5 w-5 text-[#3257C2]" />
              </div>
              <div>
                <div className="text-xl font-extrabold text-[#1A1D2E]">
                  {stat.value}
                </div>
                <div className="text-xs text-[#1A1D2E]/50 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pillar Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group bg-white rounded-xl border border-[#E5E7EB] p-6 lg:p-8 hover:shadow-xl hover:shadow-[#1A1D2E]/[0.06] hover:border-[#E5E7EB] transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#3257C2]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative">
                {/* Pillar Number */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`h-12 w-12 rounded-xl ${pillar.bgColor} flex items-center justify-center`}
                  >
                    <pillar.icon className={`h-6 w-6 ${pillar.color}`} />
                  </div>
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${pillar.color}`}
                  >
                    Pillar {pillar.id}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#1A1D2E] mb-3 group-hover:text-[#3257C2] transition-colors">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#1A1D2E]/60 leading-relaxed mb-5">
                  {pillar.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex items-center gap-1.5 text-xs text-[#1A1D2E]/50">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span className="font-medium">{pillar.lessons} lessons</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#1A1D2E]/50">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="font-medium">{pillar.duration}</span>
                  </div>
                </div>

                {/* Lesson Preview List */}
                <div className="border-t border-[#E5E7EB] pt-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#3257C2] group-hover:gap-3 transition-all duration-300">
                    <span>Start Learning</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <button className="inline-flex items-center gap-2 text-sm font-semibold text-[#3257C2] hover:text-[#2a49a8] transition-colors group">
            Explore All 20 Lessons in the Full Protocol
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
