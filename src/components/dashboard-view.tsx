'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAppStore } from '@/lib/store';
import {
  Shield,
  FileText,
  GraduationCap,
  FolderOpen,
  Upload,
  Users,
  Star,
  BookOpen,
  Award,
  ChevronRight,
  FileCheck,
  FileWarning,
  Lock,
  ArrowRight,
  Sparkles,
  Zap,
  Gift,
  Trophy,
  Heart,
  AlertTriangle,
  CheckCircle2,
  Crown,
  Target,
} from 'lucide-react';

// ── Animation Variants ──────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// ── Data ────────────────────────────────────────────────────────
const quickStats = [
  {
    label: 'Property Points',
    value: '4,700 pts',
    icon: Trophy,
    color: 'text-[#F5A623]',
    bg: 'bg-[#F5A623]/10',
    border: 'border-[#F5A623]/20',
  },
  {
    label: 'Vault Documents',
    value: '10 files',
    icon: Lock,
    color: 'text-[#3257C2]',
    bg: 'bg-[#3257C2]/10',
    border: 'border-[#3257C2]/20',
  },
  {
    label: 'Academy Progress',
    value: '8/20 lessons',
    icon: GraduationCap,
    color: 'text-[#3ED1B8]',
    bg: 'bg-[#3ED1B8]/10',
    border: 'border-[#3ED1B8]/20',
  },
  {
    label: 'Active Projects',
    value: '2',
    icon: FolderOpen,
    color: 'text-[#3257C2]',
    bg: 'bg-[#3257C2]/10',
    border: 'border-[#3257C2]/20',
  },
];

const recentDocuments = [
  { name: 'Contract_AbcRoofing.pdf', type: 'contract', date: 'Dec 14, 2024', icon: FileCheck },
  { name: 'Insurance_Cert.pdf', type: 'insurance', date: 'Dec 12, 2024', icon: Shield },
  { name: 'Permit_LACounty.pdf', type: 'permit', date: 'Dec 10, 2024', icon: FileWarning },
];

const rewardItems = [
  {
    label: 'Referrals',
    current: 2,
    target: 5,
    points: '+1,000 pts each',
    icon: Users,
    color: 'text-[#3257C2]',
    description: '2 referred (+2,000 pts earned)',
  },
  {
    label: 'Verified Ratings',
    current: 3,
    target: 5,
    points: '+500 pts each',
    icon: Star,
    color: 'text-[#F5A623]',
    description: '3 given (+1,500 pts earned)',
  },
  {
    label: 'Lessons Completed',
    current: 8,
    target: 20,
    points: '25 pts each',
    icon: BookOpen,
    color: 'text-[#3ED1B8]',
    description: '8/20 complete',
  },
];

const academyPillars = [
  { name: 'Pillar I: Legal & Financial Immunity', current: 3, total: 6, color: '#3257C2' },
  { name: 'Pillar II: Operational Defense', current: 2, total: 5, color: '#3ED1B8' },
  { name: 'Pillar III: Property Site Standard', current: 2, total: 5, color: '#F5A623' },
  { name: 'Pillar IV: Accountability & Ethics', current: 1, total: 4, color: '#3257C2' },
];

// ── Component ───────────────────────────────────────────────────
export function DashboardView() {
  const { setCurrentPage } = useAppStore();

  return (
    <section className="min-h-screen bg-[#F4F7F9] pt-[100px] lg:pt-[88px]">
      {/* ── Dashboard Header ──────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
          >
            <motion.div variants={fadeUp} custom={0}>
              <p className="text-sm font-medium text-[#3ED1B8] mb-1 flex items-center gap-1.5">
                <Sparkles className="size-4" />
                Dashboard
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1D2E]">
                Welcome back, Property Owner
              </h1>
              <p className="text-gray-500 mt-1 text-sm sm:text-base">
                Your property is protected. Here&apos;s your latest overview.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={1}
              className="flex flex-wrap gap-2 sm:gap-3"
            >
              <Button
                onClick={() => setCurrentPage('check-my-pro')}
                className="bg-[#3ED1B8] hover:bg-[#34b9a2] text-white font-semibold shadow-md text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5"
              >
                <Zap className="size-3.5 sm:size-4" />
                Check My Pro
              </Button>
              <Button
                onClick={() => setCurrentPage('home')}
                variant="outline"
                className="border-[#3257C2] text-[#3257C2] hover:bg-[#3257C2]/5 font-semibold text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5"
              >
                <Users className="size-3.5 sm:size-4" />
                Find a Pro
              </Button>
              <Button
                onClick={() => setCurrentPage('home')}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5"
              >
                <GraduationCap className="size-3.5 sm:size-4" />
                Browse Academy
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        {/* ── Quick Stats Row ─────────────────────────────────── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {quickStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              custom={i}
              className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`size-10 rounded-lg ${stat.bg} flex items-center justify-center`}
                >
                  <stat.icon className={`size-5 ${stat.color}`} />
                </div>
              </div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {stat.label}
              </p>
              <p className={`text-xl sm:text-2xl font-bold mt-1 ${stat.color}`}>
                {stat.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Main Grid: Why + Vault ──────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── "The Why" Section ─────────────────────────────── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm"
          >
            <div className="p-6 sm:p-8">
              <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-5">
                <div className="size-10 rounded-xl bg-[#3257C2]/10 flex items-center justify-center">
                  <Heart className="size-5 text-[#3257C2]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#1A1D2E]">The Why</h2>
                  <p className="text-xs text-gray-500">Our founding story</p>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} custom={1}>
                {/* Broken Promise Narrative */}
                <div className="bg-red-50 border border-red-100 rounded-xl p-5 mb-5">
                  <div className="flex items-start gap-3">
                    <div className="size-8 rounded-lg bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                      <AlertTriangle className="size-4 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-red-800 text-sm mb-2">
                        The Broken Promise
                      </h3>
                      <p className="text-red-700/80 text-sm leading-relaxed">
                        We started BYLDRS GUARDIAN because of a broken promise. A Pro
                        took a $15,000 deposit, disappeared for 6 months, and left a family
                        with an unfinished home. That family lost everything because nobody
                        was watching.
                        <span className="font-semibold text-red-800">
                          {' '}Now, we&apos;re the ones watching.
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mission Statement */}
                <div className="bg-[#3257C2]/5 border border-[#3257C2]/15 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <div className="size-8 rounded-lg bg-[#3257C2]/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Shield className="size-4 text-[#3257C2]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1A1D2E] text-sm mb-2">Our Mission</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        An informed owner is a protected owner. The Academy exists to give
                        every California homeowner the knowledge to spot red flags, negotiate
                        fairly, and hold Pros accountable.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Vault Widget ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col"
          >
            <div className="p-5 sm:p-6 pb-0">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-[#3257C2]/10 flex items-center justify-center">
                    <Lock className="size-5 text-[#3257C2]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#1A1D2E]">Homeowner Vault</h2>
                    <p className="text-xs text-gray-500">AES-256 Encrypted</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 sm:px-6 flex-1">
              <div className="space-y-3">
                {recentDocuments.map((doc) => (
                  <div
                    key={doc.name}
                    className="flex items-center gap-3 p-3 rounded-lg bg-[#F4F7F9] hover:bg-[#eef2f6] transition-colors group cursor-pointer"
                  >
                    <div className="size-9 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0">
                      <doc.icon className="size-4 text-[#3257C2]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#1A1D2E] truncate">
                        {doc.name}
                      </p>
                      <p className="text-xs text-gray-500">{doc.date}</p>
                    </div>
                    <ChevronRight className="size-4 text-gray-400 group-hover:text-[#3257C2] transition-colors shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 sm:p-6 pt-4">
              <Button className="w-full bg-[#3257C2] hover:bg-[#2a4aa8] text-white font-semibold">
                <Upload className="size-4" />
                Upload Document
              </Button>
              <Button
                variant="ghost"
                className="w-full mt-2 text-[#3257C2] hover:bg-[#3257C2]/5 text-sm font-medium"
              >
                View All 10 Files
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* ── Rewards Tracker + Benefit Callout ──────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Rewards Tracker ──────────────────────────────── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm"
          >
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-6">
              <div className="size-10 rounded-xl bg-[#F5A623]/10 flex items-center justify-center">
                <Gift className="size-5 text-[#F5A623]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#1A1D2E]">Rewards Tracker</h2>
                <p className="text-xs text-gray-500">Earn Property Points as you go</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5 bg-[#F5A623]/10 px-3 py-1.5 rounded-full">
                <Trophy className="size-4 text-[#F5A623]" />
                <span className="text-sm font-bold text-[#F5A623]">4,700 pts</span>
              </div>
            </motion.div>

            <div className="space-y-5">
              {rewardItems.map((item, i) => (
                <motion.div key={item.label} variants={fadeUp} custom={i + 1}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <item.icon className={`size-5 ${item.color}`} />
                      <span className="text-sm font-semibold text-[#1A1D2E]">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-gray-500">
                      {item.description}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <Progress
                        value={Math.round((item.current / item.target) * 100)}
                        className="h-2.5"
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-400 whitespace-nowrap">
                      {item.current}/{item.target}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{item.points}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Benefit Callout Card ──────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
            className="bg-gradient-to-br from-[#3257C2] to-[#1e3f8f] rounded-2xl p-6 sm:p-8 shadow-xl text-white flex flex-col justify-between"
          >
            <div>
              <div className="size-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-5">
                <Crown className="size-6 text-[#F5A623]" />
              </div>
              <h3 className="text-lg font-bold mb-3 leading-snug">
                Unlock Your Full Protection
              </h3>
              <p className="text-white/80 text-sm leading-relaxed mb-2">
                Create an account to unlock{' '}
                <span className="font-semibold text-white">Free Inspections</span>,{' '}
                <span className="font-semibold text-white">Legal Compliance Audits</span>, and
                exclusive{' '}
                <span className="font-semibold text-[#F5A623]">
                  Property Member discounts
                </span>
                .
              </p>
              <ul className="space-y-2 mt-4 mb-6">
                <li className="flex items-center gap-2 text-sm text-white/85">
                  <CheckCircle2 className="size-4 text-[#3ED1B8] shrink-0" />
                  Priority access to Certified Guardians
                </li>
                <li className="flex items-center gap-2 text-sm text-white/85">
                  <CheckCircle2 className="size-4 text-[#3ED1B8] shrink-0" />
                  Monthly compliance health reports
                </li>
                <li className="flex items-center gap-2 text-sm text-white/85">
                  <CheckCircle2 className="size-4 text-[#3ED1B8] shrink-0" />
                  2x Property Points on all activities
                </li>
              </ul>
            </div>
            <Button className="w-full bg-[#F5A623] hover:bg-[#e09518] text-[#1A1D2E] font-bold shadow-lg">
              Upgrade to Property Member
              <ArrowRight className="size-4" />
            </Button>
          </motion.div>
        </div>

        {/* ── Academy Progress ────────────────────────────────── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm"
        >
          <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-6">
            <div className="size-10 rounded-xl bg-[#3ED1B8]/10 flex items-center justify-center">
              <GraduationCap className="size-5 text-[#3ED1B8]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1A1D2E]">Academy Progress</h2>
              <p className="text-xs text-gray-500">20-Point Shield</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5 bg-[#3ED1B8]/10 px-3 py-1.5 rounded-full">
              <Target className="size-4 text-[#3ED1B8]" />
              <span className="text-sm font-bold text-[#3ED1B8]">8/20</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {academyPillars.map((pillar, i) => {
              const pct = Math.round((pillar.current / pillar.total) * 100);
              return (
                <motion.div
                  key={pillar.name}
                  variants={fadeUp}
                  custom={i + 1}
                  className="p-4 rounded-xl bg-[#F4F7F9] border border-gray-100 hover:border-gray-200 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-[#1A1D2E] pr-4">
                      {pillar.name}
                    </h3>
                    <span className="text-xs font-bold shrink-0" style={{ color: pillar.color }}>
                      {pct}%
                    </span>
                  </div>
                  <div className="relative">
                    <Progress value={pct} className="h-2.5" />
                    <div
                      className="absolute top-0 left-0 h-2.5 rounded-full opacity-20"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: pillar.color,
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">
                      {pillar.current} of {pillar.total} lessons complete
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs font-medium hover:bg-white"
                      style={{ color: pillar.color }}
                    >
                      Continue
                      <ChevronRight className="size-3" />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
