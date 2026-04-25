'use client';

import { useState } from 'react';
import {
  Gift,
  Star,
  Users,
  Crown,
  ScanLine,
  Droplets,
  Camera,
  Award,
  Zap,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Trophy,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Reward {
  icon: React.ElementType;
  title: string;
  points: number;
  description: string;
  color: string;
  bg: string;
}

interface Milestone {
  label: string;
  points: number;
  icon: React.ElementType;
}

const waysToEarn = [
  {
    icon: Star,
    action: 'Leave a Verified Review',
    points: 50,
    color: 'text-[#3257C2]',
    bg: 'bg-[#3257C2]/[0.07]',
  },
  {
    icon: Users,
    action: 'Refer a Friend',
    points: 200,
    color: 'text-[#3ED1B8]',
    bg: 'bg-[#3ED1B8]/[0.07]',
  },
  {
    icon: Award,
    action: 'Complete a Lesson',
    points: 25,
    color: 'text-[#F5A623]',
    bg: 'bg-[#F5A623]/[0.07]',
  },
  {
    icon: CheckCircle2,
    action: 'Submit an Audit Request',
    points: 100,
    color: 'text-[#CD7F32]',
    bg: 'bg-[#CD7F32]/[0.07]',
  },
  {
    icon: Trophy,
    action: 'First Successful Hire',
    points: 500,
    color: 'text-purple-500',
    bg: 'bg-purple-50',
  },
  {
    icon: TrendingUp,
    action: 'Monthly Streak Bonus',
    points: 75,
    color: 'text-rose-500',
    bg: 'bg-rose-50',
  },
];

const rewards: Reward[] = [
  {
    icon: ScanLine,
    title: 'Drone Roof Scan',
    points: 500,
    description:
      'Get an aerial drone inspection of your roof — high-res imagery, damage detection, and a detailed report delivered to your vault.',
    color: 'text-[#3257C2]',
    bg: 'bg-[#3257C2]/[0.07]',
  },
  {
    icon: Droplets,
    title: 'Leak Detection Service',
    points: 400,
    description:
      'Professional non-invasive leak detection for your plumbing system. Includes thermal imaging and a full diagnostic report.',
    color: 'text-[#3ED1B8]',
    bg: 'bg-[#3ED1B8]/[0.07]',
  },
  {
    icon: Camera,
    title: 'Property Photo Audit',
    points: 300,
    description:
      'A professional photographer documents your property before and after any project — perfect evidence for insurance or disputes.',
    color: 'text-[#F5A623]',
    bg: 'bg-[#F5A623]/[0.07]',
  },
  {
    icon: Zap,
    title: 'Priority Pro Access',
    points: 250,
    description:
      'Skip the line — your project request gets routed to the top of our Certified Guardian queue for immediate response.',
    color: 'text-[#CD7F32]',
    bg: 'bg-[#CD7F32]/[0.07]',
  },
];

const milestones: Milestone[] = [
  { label: 'Bronze Guardian', points: 500, icon: Award },
  { label: 'Silver Guardian', points: 1500, icon: Crown },
  { label: 'Gold Guardian', points: 3000, icon: Trophy },
];

export function RewardsSection() {
  const [currentPoints] = useState(1250);

  return (
    <section id="rewards" className="relative bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14 lg:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#3ED1B8]/10 px-4 py-1.5 mb-4">
            <Gift className="h-3.5 w-3.5 text-[#3ED1B8]" />
            <span className="text-xs font-semibold text-[#3ED1B8] tracking-wide uppercase">
              Loyalty Program
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1A1D2E]">
            Homeowner{' '}
            <span className="text-[#3257C2]">Rewards</span>
          </h2>
          <p className="mt-4 text-lg text-[#1A1D2E]/60 max-w-2xl mx-auto">
            Earn Property Points for every action on the platform. Redeem them
            for premium services that protect and enhance your home.
          </p>
        </div>

        {/* Points Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-[#3257C2] to-[#1A1D2E] rounded-2xl p-6 lg:p-10 mb-14 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#3ED1B8]/[0.08] blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Crown className="h-6 w-6 text-[#3ED1B8]" />
                </div>
                <div>
                  <p className="text-white/60 text-sm font-medium">
                    Your Property Points
                  </p>
                  <p className="text-4xl font-extrabold text-white">
                    {currentPoints.toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="text-sm text-white/50 max-w-md">
                You&apos;re only{' '}
                <span className="text-[#3ED1B8] font-semibold">
                  {1500 - currentPoints} points
                </span>{' '}
                away from Silver Guardian status. Keep engaging to unlock premium
                rewards!
              </p>

              {/* Progress Bar */}
              <div className="mt-4 max-w-sm">
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#3ED1B8] to-[#F5A623] transition-all duration-1000"
                    style={{ width: `${(currentPoints / 1500) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-white/40 font-medium">
                  <span>Bronze: 500</span>
                  <span className="text-[#3ED1B8] font-bold">Silver: 1,500</span>
                  <span>Gold: 3,000</span>
                </div>
              </div>
            </div>

            {/* Milestones */}
            <div className="flex lg:flex-col gap-3">
              {milestones.map((ms, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 ${
                    currentPoints >= ms.points
                      ? 'bg-[#3ED1B8]/20 border border-[#3ED1B8]/30'
                      : 'bg-white/5 border border-white/10'
                  }`}
                >
                  <ms.icon
                    className={`h-5 w-5 ${
                      currentPoints >= ms.points
                        ? 'text-[#3ED1B8]'
                        : 'text-white/30'
                    }`}
                  />
                  <div>
                    <p
                      className={`text-xs font-bold ${
                        currentPoints >= ms.points
                          ? 'text-[#3ED1B8]'
                          : 'text-white/40'
                      }`}
                    >
                      {ms.label}
                    </p>
                    <p className="text-[10px] text-white/30">
                      {ms.points.toLocaleString()} pts
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left - Ways to Earn */}
          <div>
            <h3 className="text-xl font-bold text-[#1A1D2E] mb-6">
              Ways to Earn Points
            </h3>
            <div className="space-y-3">
              {waysToEarn.map((item, index) => (
                <motion.div
                  key={item.action}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.06 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#F4F7F9] hover:bg-white hover:shadow-md hover:shadow-[#1A1D2E]/[0.04] hover:border hover:border-[#E5E7EB] transition-all duration-200 border border-transparent"
                >
                  <div
                    className={`flex-shrink-0 h-10 w-10 rounded-lg ${item.bg} flex items-center justify-center`}
                  >
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#1A1D2E]">
                      {item.action}
                    </p>
                  </div>
                  <span
                    className={`text-sm font-extrabold ${item.color}`}
                  >
                    +{item.points}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right - Redeem Rewards */}
          <div>
            <h3 className="text-xl font-bold text-[#1A1D2E] mb-6">
              Redeem Rewards
            </h3>
            <div className="space-y-4">
              {rewards.map((reward, index) => (
                <motion.div
                  key={reward.title}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                  className="group bg-white rounded-xl border border-[#E5E7EB] p-5 hover:shadow-lg hover:shadow-[#1A1D2E]/[0.06] transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 h-12 w-12 rounded-xl ${reward.bg} flex items-center justify-center`}
                    >
                      <reward.icon className={`h-6 w-6 ${reward.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-bold text-[#1A1D2E]">
                          {reward.title}
                        </h4>
                        <span className="text-xs font-bold text-[#3257C2] bg-[#3257C2]/[0.06] px-2.5 py-1 rounded-full">
                          {reward.points} pts
                        </span>
                      </div>
                      <p className="text-xs text-[#1A1D2E]/50 leading-relaxed">
                        {reward.description}
                      </p>
                      <button className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#3257C2] hover:underline group-hover:gap-2.5 transition-all">
                        Redeem Now
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
