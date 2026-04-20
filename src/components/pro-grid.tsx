'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

type Tier = 'certified' | 'vetted' | 'verified';

interface Pro {
  id: number;
  name: string;
  company: string;
  category: string;
  location: string;
  rating: number;
  reviews: number;
  tier: Tier;
  avatar: string;
  verified: boolean;
  responseTime: string;
}

const tierConfig: Record<
  Tier,
  { label: string; bg: string; text: string; border: string; badge: string }
> = {
  certified: {
    label: 'Certified Guardian',
    bg: 'bg-[#F5A623]/[0.08]',
    text: 'text-[#F5A623]',
    border: 'border-[#F5A623]/20',
    badge: '🥇',
  },
  vetted: {
    label: 'Vetted Partner',
    bg: 'bg-[#9CA3AF]/[0.08]',
    text: 'text-[#9CA3AF]',
    border: 'border-[#9CA3AF]/20',
    badge: '🥈',
  },
  verified: {
    label: 'Verified Pro',
    bg: 'bg-[#CD7F32]/[0.08]',
    text: 'text-[#CD7F32]',
    border: 'border-[#CD7F32]/20',
    badge: '🥉',
  },
};

const pros: Pro[] = [
  {
    id: 1,
    name: 'Marcus Rivera',
    company: 'Rivera Roofing & Solar',
    category: 'Roofing & Solar',
    location: 'Los Angeles, CA',
    rating: 4.9,
    reviews: 324,
    tier: 'certified',
    avatar: 'MR',
    verified: true,
    responseTime: '< 2 hours',
  },
  {
    id: 2,
    name: 'Sarah Chen',
    company: 'Chen Plumbing Solutions',
    category: 'Plumbing',
    location: 'San Diego, CA',
    rating: 4.8,
    reviews: 218,
    tier: 'vetted',
    avatar: 'SC',
    verified: true,
    responseTime: '< 1 hour',
  },
  {
    id: 3,
    name: 'James Okafor',
    company: 'Okafor Electrical',
    category: 'Electrical',
    location: 'San Francisco, CA',
    rating: 4.9,
    reviews: 156,
    tier: 'certified',
    avatar: 'JO',
    verified: true,
    responseTime: '< 3 hours',
  },
  {
    id: 4,
    name: 'Maria Gonzalez',
    company: 'MG Home Remodeling',
    category: 'Remodeling',
    location: 'Sacramento, CA',
    rating: 4.7,
    reviews: 189,
    tier: 'vetted',
    avatar: 'MG',
    verified: true,
    responseTime: '< 4 hours',
  },
  {
    id: 5,
    name: 'David Park',
    company: 'Park HVAC Services',
    category: 'HVAC',
    location: 'San Jose, CA',
    rating: 4.8,
    reviews: 142,
    tier: 'verified',
    avatar: 'DP',
    verified: true,
    responseTime: '< 2 hours',
  },
  {
    id: 6,
    name: 'Emily Watson',
    company: 'Watson Landscaping',
    category: 'Landscaping',
    location: 'Orange County, CA',
    rating: 4.6,
    reviews: 98,
    tier: 'verified',
    avatar: 'EW',
    verified: true,
    responseTime: '< 5 hours',
  },
];

const tierColors = [
  'bg-[#3257C2]',
  'bg-[#3ED1B8]',
  'bg-[#F5A623]',
  'bg-[#9CA3AF]',
  'bg-[#CD7F32]',
  'bg-[#3257C2]',
];

export function ProGrid() {
  return (
    <section id="pro-grid" className="relative bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#3257C2]/[0.07] px-4 py-1.5 mb-4">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#3257C2]" />
            <span className="text-xs font-semibold text-[#3257C2] tracking-wide uppercase">
              Verified Professionals
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1A1D2E]">
            Find a Pro You Can{' '}
            <span className="text-[#3257C2]">Trust</span>
          </h2>
          <p className="mt-4 text-lg text-[#1A1D2E]/60 max-w-2xl mx-auto">
            Every pro on our platform is background-checked, licensed, and
            audited every 30 days. No exceptions.
          </p>
        </div>

        {/* Tier Legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {(Object.keys(tierConfig) as Tier[]).map((tier) => {
            const config = tierConfig[tier];
            return (
              <div
                key={tier}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 border ${config.border} ${config.bg}`}
              >
                <span className="text-sm">{config.badge}</span>
                <span className={`text-xs font-semibold ${config.text}`}>
                  {config.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Pro Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pros.map((pro, index) => {
            const config = tierConfig[pro.tier];
            return (
              <motion.div
                key={pro.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group bg-white rounded-xl border border-[#E5E7EB] p-6 hover:bg-[#F4F7F9] hover:shadow-lg hover:shadow-[#1A1D2E]/[0.06] hover:border-[#E5E7EB] transition-all duration-300 cursor-pointer"
              >
                {/* Top Row: Avatar + Tier Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-12 w-12 rounded-full ${tierColors[pro.id - 1]} flex items-center justify-center text-white text-sm font-bold shadow-sm`}
                    >
                      {pro.avatar}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#1A1D2E] group-hover:text-[#3257C2] transition-colors">
                        {pro.name}
                      </h3>
                      <p className="text-xs text-[#1A1D2E]/50 font-medium">
                        {pro.company}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 border ${config.border} ${config.bg}`}
                  >
                    <span className="text-xs">{config.badge}</span>
                    <span className={`text-[10px] font-bold ${config.text}`}>
                      {pro.tier === 'certified'
                        ? 'Gold'
                        : pro.tier === 'vetted'
                          ? 'Silver'
                          : 'Bronze'}
                    </span>
                  </div>
                </div>

                {/* Category */}
                <Badge
                  variant="secondary"
                  className="text-[10px] font-semibold bg-[#3257C2]/[0.06] text-[#3257C2] hover:bg-[#3257C2]/[0.1] mb-3"
                >
                  {pro.category}
                </Badge>

                {/* Location & Response Time */}
                <div className="flex items-center gap-3 mb-4 text-xs text-[#1A1D2E]/50">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {pro.location}
                  </div>
                  <span className="text-[#E5E7EB]">•</span>
                  <span>Responds {pro.responseTime}</span>
                </div>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${i <= Math.floor(pro.rating) ? 'fill-[#F5A623] text-[#F5A623]' : 'fill-[#E5E7EB] text-[#E5E7EB]'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-[#1A1D2E]">
                    {pro.rating}
                  </span>
                  <span className="text-xs text-[#1A1D2E]/40">
                    ({pro.reviews} reviews)
                  </span>
                </div>

                {/* Verified Check */}
                {pro.verified && (
                  <div className="flex items-center gap-1.5 mb-4">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#3ED1B8]" />
                    <span className="text-[11px] font-medium text-[#3ED1B8]">
                      Audited & Verified
                    </span>
                  </div>
                )}

                {/* CTA */}
                <Button
                  variant="outline"
                  className="w-full h-10 rounded-lg border-[#3257C2]/15 text-[#3257C2] hover:bg-[#3257C2] hover:text-white font-semibold text-xs transition-all duration-300 group/btn"
                >
                  View Profile
                  <ArrowRight className="ml-1.5 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Button
            size="lg"
            variant="outline"
            className="rounded-lg border-[#3257C2]/20 text-[#3257C2] hover:bg-[#3257C2] hover:text-white font-semibold px-8 py-3 text-sm transition-all duration-300 group"
          >
            View All Pros
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
