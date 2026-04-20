'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, Star, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  'Roofing',
  'Plumbing',
  'Electrical',
  'HVAC',
  'General Contracting',
  'Landscaping',
  'Solar Installation',
  'Remodeling',
  'Painting',
  'Flooring',
  'Window & Door Installation',
  'Kitchen & Bath Renovation',
  'Concrete & Masonry',
  'Fencing & Gates',
  'Pool & Spa Construction',
  'Termite & Pest Control',
  'Waterproofing',
  'Demolition',
  'Tree Service & Removal',
  'Security & Alarm Systems',
  'Interior Design',
  'Structural Engineering',
];

export function HeroSection() {
  const [category, setCategory] = useState('');

  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-16 lg:pt-32 lg:pb-24">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#3257C2]/[0.03] blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#3ED1B8]/[0.04] blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#3257C2]/[0.02] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-[#3257C2]/[0.07] px-4 py-1.5 mb-6">
              <div className="h-2 w-2 rounded-full bg-[#3ED1B8] animate-pulse" />
              <span className="text-xs font-semibold text-[#3257C2] tracking-wide uppercase">
                California&apos;s #1 Contractor Verification Platform
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold leading-[1.08] tracking-tight text-[#1A1D2E]">
              Hire with{' '}
              <span className="text-[#3257C2]">Certainty.</span>
              <br />
              Protect Your{' '}
              <span className="text-[#3ED1B8]">Sanctuary.</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-[#1A1D2E]/60 leading-relaxed max-w-lg">
              California&apos;s only platform that audits Pros every{' '}
              <span className="font-semibold text-[#1A1D2E]">30 days</span>.
              Every contractor is verified, vetted, and monitored — so you never
              have to worry.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="rounded-lg bg-[#3257C2] hover:bg-[#2a49a8] text-white font-semibold px-7 py-3 text-base shadow-lg shadow-[#3257C2]/20 hover:shadow-xl hover:shadow-[#3257C2]/30 transition-all duration-300 group"
              >
                Find a Trusted Pro
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-lg border-[#E5E7EB] text-[#1A1D2E]/70 hover:border-[#3257C2]/30 hover:text-[#3257C2] font-semibold px-7 py-3 text-base transition-all duration-200"
              >
                How It Works
              </Button>
            </div>
          </motion.div>

          {/* Right - Search Box / Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
            {/* Hero Image Card */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-[#1A1D2E]/10 mb-8">
              <img
                src="/hero-home.jpg"
                alt="Beautiful California home"
                className="w-full h-56 sm:h-64 lg:h-72 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1D2E]/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 text-white">
                  <div className="flex -space-x-2">
                    {[
                      'bg-[#3257C2]',
                      'bg-[#3ED1B8]',
                      'bg-[#F5A623]',
                    ].map((bg, i) => (
                      <div
                        key={i}
                        className={`h-8 w-8 rounded-full ${bg} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}
                      >
                        {['JD', 'MK', 'AS'][i]}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm font-medium ml-1">
                    <span className="text-white/90">2,400+</span> Pros Audited
                    This Month
                  </span>
                </div>
              </div>
            </div>

            {/* GHL-Style Search Box */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-lg shadow-[#1A1D2E]/[0.04] p-5 sm:p-6">
              <h3 className="text-sm font-semibold text-[#1A1D2E] mb-4">
                Find Your Perfect Contractor
              </h3>
              <div className="space-y-3">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full h-12 rounded-lg border-[#E5E7EB] bg-[#F4F7F9] text-sm">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex gap-3">
                  <Input
                    placeholder="Enter your ZIP code"
                    className="h-12 rounded-lg border-[#E5E7EB] bg-[#F4F7F9] text-sm"
                  />
                  <Button className="h-12 px-6 rounded-lg bg-[#3257C2] hover:bg-[#2a49a8] text-white font-semibold text-sm shrink-0 shadow-sm hover:shadow-md transition-all duration-200 group">
                    <Search className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Search Now</span>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Social Proof Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.5 }}
          className="mt-14 lg:mt-20"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-center">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#3257C2]" />
              <span className="text-sm font-semibold text-[#1A1D2E]">
                Trusted by{' '}
                <span className="text-[#3257C2]">4.5M+</span> people
              </span>
            </div>
            <div className="hidden sm:block h-5 w-px bg-[#E5E7EB]" />
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-[#F5A623] text-[#F5A623]"
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-[#1A1D2E]">
                <span className="text-[#3257C2]">4.9/5</span> with over 300k
                reviews
              </span>
            </div>
            <div className="hidden sm:block h-5 w-px bg-[#E5E7EB]" />
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#3ED1B8]" />
              <span className="text-sm font-semibold text-[#1A1D2E]">
                All Pros audited every{' '}
                <span className="text-[#3ED1B8]">30 days</span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
