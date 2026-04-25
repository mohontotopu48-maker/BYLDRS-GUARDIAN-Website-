'use client';

import {
  ArrowRight,
  BookOpen,
  Clock,
  Users,
  Sparkles,
  ChevronRight,
  PlayCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';

interface ProtocolLesson {
  id: string;
  title: string;
  duration: string;
  tag?: string;
}

interface Pillar {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  totalLessons: number;
  totalDuration: string;
  color: string;
  bgColor: string;
  borderColor: string;
  accentBg: string;
  icon: string;
  lessons: ProtocolLesson[];
}

const pillars: Pillar[] = [
  {
    id: 1,
    title: 'Legal & Financial Immunity',
    subtitle: 'Pillar I',
    description:
      'Protect yourself from financial loss. Learn about Workers\' Compensation requirements, California deposit laws, and how to structure payments safely.',
    totalLessons: 6,
    totalDuration: '30 min',
    color: 'text-[#3257C2]',
    bgColor: 'bg-[#3257C2]/[0.06]',
    borderColor: 'border-[#3257C2]/20',
    accentBg: 'bg-[#3257C2]',
    icon: '⚖️',
    lessons: [
      { id: '1.1', title: 'Understanding CA Workers\' Comp Requirements', duration: '5 min' },
      { id: '1.2', title: 'The $1,000 Deposit Limit Law Explained', duration: '6 min', tag: 'Critical' },
      { id: '1.3', title: 'Milestone Payment Structures That Protect You', duration: '5 min' },
      { id: '1.4', title: 'Mechanic\'s Lien Prevention Strategies', duration: '4 min' },
      { id: '1.5', title: 'Insurance Verification: What to Check Before Signing', duration: '5 min' },
      { id: '1.6', title: 'Bond Claims & Financial Recovery Process', duration: '5 min', tag: 'Advanced' },
    ],
  },
  {
    id: 2,
    title: 'Operational Defense',
    subtitle: 'Pillar II',
    description:
      'Validate warranties, run diagnostics, and ensure your project meets professional standards from start to finish.',
    totalLessons: 5,
    totalDuration: '25 min',
    color: 'text-[#3ED1B8]',
    bgColor: 'bg-[#3ED1B8]/[0.06]',
    borderColor: 'border-[#3ED1B8]/20',
    accentBg: 'bg-[#3ED1B8]',
    icon: '🛡️',
    lessons: [
      { id: '2.1', title: 'Warranty Validation: Reading Between the Lines', duration: '5 min' },
      { id: '2.2', title: 'Pre-Construction Diagnostic Checklist', duration: '6 min', tag: 'Critical' },
      { id: '2.3', title: 'Material Quality Verification Standards', duration: '4 min' },
      { id: '2.4', title: 'Inspection Scheduling: When & Who to Involve', duration: '5 min' },
      { id: '2.5', title: 'Post-Completion Quality Assurance Protocol', duration: '5 min' },
    ],
  },
  {
    id: 3,
    title: 'Property Site Standard',
    subtitle: 'Pillar III',
    description:
      'Protect your property during construction. Learn about property shielding, magnetic sweeps, and keeping your home safe while work is underway.',
    totalLessons: 5,
    totalDuration: '25 min',
    color: 'text-[#F5A623]',
    bgColor: 'bg-[#F5A623]/[0.06]',
    borderColor: 'border-[#F5A623]/20',
    accentBg: 'bg-[#F5A623]',
    icon: '🏠',
    lessons: [
      { id: '3.1', title: 'Property Shielding: Protecting Your Landscaping & Hardscape', duration: '5 min' },
      { id: '3.2', title: 'Magnetic Sweeps for Construction Debris', duration: '5 min', tag: 'Pro Tip' },
      { id: '3.3', title: 'Dust Containment & Air Quality Standards', duration: '5 min' },
      { id: '3.4', title: 'Noise Ordinance Compliance in California', duration: '5 min' },
      { id: '3.5', title: 'Daily Site Cleanup Standards Checklist', duration: '5 min' },
    ],
  },
  {
    id: 4,
    title: 'Accountability & Ethics',
    subtitle: 'Pillar IV',
    description:
      'Ensure verified identities, prevent ghosting, and hold Pros accountable with documented evidence and transparency.',
    totalLessons: 4,
    totalDuration: '20 min',
    color: 'text-[#CD7F32]',
    bgColor: 'bg-[#CD7F32]/[0.06]',
    borderColor: 'border-[#CD7F32]/20',
    accentBg: 'bg-[#CD7F32]',
    icon: '🤝',
    lessons: [
      { id: '4.1', title: 'Verified Identity: Why It Matters', duration: '5 min' },
      { id: '4.2', title: 'Anti-Ghosting Protections & Communication Standards', duration: '6 min', tag: 'Critical' },
      { id: '4.3', title: 'Documentation Best Practices: Photos, Emails & Contracts', duration: '4 min' },
      { id: '4.4', title: 'Ethical Bidding & Fair Pricing Guidelines', duration: '5 min' },
    ],
  },
];

export function AcademySection() {
  const { setCurrentPage } = useAppStore();

  return (
    <section id="academy" className="relative bg-[#F4F7F9] py-16 lg:py-24">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#3257C2]/[0.02] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14 lg:mb-20">
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
            Master the complete 20-Point Shield across 4 Pillars. Free lessons
            designed to protect your investment and empower you as a homeowner.
          </p>
        </div>

        {/* Protocol Stats */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-14">
          {[
            { icon: BookOpen, value: '20', label: 'Total Lessons' },
            { icon: Users, value: '150k+', label: 'Homeowners Trained' },
            { icon: Clock, value: '100 min', label: 'Total Duration' },
            { icon: Sparkles, value: '4', label: 'Core Pillars' },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center shadow-sm border border-[#E5E7EB]/60">
                <stat.icon className="h-5 w-5 text-[#3257C2]" />
              </div>
              <div>
                <div className="text-xl font-extrabold text-[#1A1D2E]">
                  {stat.value}
                </div>
                <div className="text-[11px] text-[#1A1D2E]/50 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pillar Cards */}
        <div className="space-y-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden hover:shadow-xl hover:shadow-[#1A1D2E]/[0.06] transition-all duration-300"
            >
              {/* Pillar Header */}
              <div className={`p-6 lg:p-8 ${pillar.bgColor} border-b ${pillar.borderColor}`}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{pillar.icon}</span>
                    <div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${pillar.color}`}>
                        {pillar.subtitle}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#1A1D2E]">
                        {pillar.title}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[#1A1D2E]/50 font-medium">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5" />
                      {pillar.totalLessons} lessons
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {pillar.totalDuration}
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-sm text-[#1A1D2E]/60 leading-relaxed max-w-3xl">
                  {pillar.description}
                </p>
              </div>

              {/* Lesson List */}
              <div className="p-6 lg:p-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {pillar.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={`group flex items-center gap-3 p-3 rounded-lg border border-transparent hover:border-[#E5E7EB] hover:bg-[#F4F7F9] transition-all duration-200 cursor-pointer`}
                    >
                      <div className={`flex-shrink-0 h-8 w-8 rounded-lg ${pillar.bgColor} flex items-center justify-center`}>
                        <PlayCircle className={`h-4 w-4 ${pillar.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold ${pillar.color}`}>
                            {lesson.id}
                          </span>
                          {lesson.tag && (
                            <span className={`text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded ${
                              lesson.tag === 'Critical'
                                ? 'bg-red-50 text-red-500'
                                : lesson.tag === 'Advanced'
                                  ? 'bg-purple-50 text-purple-500'
                                  : 'bg-amber-50 text-amber-600'
                            }`}>
                              {lesson.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-medium text-[#1A1D2E]/80 leading-snug mt-0.5 truncate">
                          {lesson.title}
                        </p>
                        <span className="text-[10px] text-[#1A1D2E]/40 font-medium">
                          {lesson.duration}
                        </span>
                      </div>
                      <ChevronRight className="h-3.5 w-3.5 text-[#1A1D2E]/20 group-hover:text-[#3257C2] transition-colors flex-shrink-0" />
                    </div>
                  ))}
                </div>

                {/* Pillar CTA */}
                <div className="mt-5 pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
                  <span className="text-xs text-[#1A1D2E]/40 font-medium">
                    {pillar.totalLessons} lessons • {pillar.totalDuration} total
                  </span>
                  <button className={`inline-flex items-center gap-1.5 text-xs font-semibold ${pillar.color} hover:underline group`}>
                    Start {pillar.subtitle}
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <button onClick={() => setCurrentPage('enroll-shield')} className="inline-flex items-center gap-2 rounded-lg bg-[#3257C2] hover:bg-[#2a49a8] text-white font-semibold px-7 py-3 text-sm shadow-lg shadow-[#3257C2]/20 hover:shadow-xl hover:shadow-[#3257C2]/30 transition-all duration-300 group cursor-pointer">
            Enroll in the Full 20-Point Shield — Free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <p className="mt-3 text-xs text-[#1A1D2E]/40">
            No sign-up required. Start learning immediately.
          </p>
        </div>
      </div>
    </section>
  );
}
