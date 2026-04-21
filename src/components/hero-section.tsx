'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Star, Users, ArrowRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const top20Services = [
  'Roofing',
  'Plumbing',
  'Electrical',
  'HVAC',
  'Landscaping',
  'Kitchen Remodel',
  'Bathroom Remodel',
  'Foundation',
  'Solar',
  'Flooring',
  'Painting',
  'Windows/Doors',
  'Concrete',
  'Pool/Spa',
  'Pest Control',
  'Cleaning',
  'Handyman',
  'Drywall',
  'Masonry',
  'Fencing',
];

export function HeroSection() {
  const [selectedService, setSelectedService] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherValue, setOtherValue] = useState('');

  const handleSelect = (service: string) => {
    if (service === 'Other') {
      setShowOtherInput(true);
      setSelectedService('');
    } else {
      setSelectedService(service);
      setShowOtherInput(false);
    }
    setDropdownOpen(false);
  };

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
                California&apos;s #1 Pro Verification Platform
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
              Every Pro is verified, vetted, and monitored — so you never
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

            {/* Perfect Pro Search Box */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-lg shadow-[#1A1D2E]/[0.04] p-5 sm:p-6">
              <h3 className="text-sm font-semibold text-[#1A1D2E] mb-4">
                Find Your Perfect Pro
              </h3>
              <div className="space-y-3">
                {/* Custom Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full h-12 rounded-lg border border-[#E5E7EB] bg-[#F4F7F9] text-sm text-left px-4 flex items-center justify-between hover:border-[#3257C2]/30 transition-colors"
                  >
                    <span className={showOtherInput ? 'text-[#3257C2] font-medium' : selectedService ? 'text-[#1A1D2E]' : 'text-[#1A1D2E]/40'}>
                      {showOtherInput ? otherValue || 'Tell us exactly what you need...' : selectedService || 'Select a Service'}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-[#1A1D2E]/40 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-20 top-full left-0 right-0 mt-1 bg-white rounded-lg border border-[#E5E7EB] shadow-xl shadow-[#1A1D2E]/[0.1] overflow-hidden max-h-72 overflow-y-auto scrollbar-thin"
                      >
                        <div className="py-1">
                          {top20Services.map((service) => (
                            <button
                              key={service}
                              type="button"
                              onClick={() => handleSelect(service)}
                              className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[#3257C2]/5 transition-colors ${
                                selectedService === service ? 'text-[#3257C2] font-semibold bg-[#3257C2]/5' : 'text-[#1A1D2E]/80'
                              }`}
                            >
                              {service}
                            </button>
                          ))}
                          <div className="border-t border-[#E5E7EB] my-1" />
                          <button
                            type="button"
                            onClick={() => handleSelect('Other')}
                            className="w-full text-left px-4 py-2.5 text-sm text-[#3ED1B8] font-semibold hover:bg-[#3ED1B8]/5 transition-colors flex items-center gap-2"
                          >
                            <span className="text-base">+</span>
                            Other — Tell us exactly what you need; we'll vet them for you.
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Other text input (shown when Other is selected) */}
                <AnimatePresence>
                  {showOtherInput && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Input
                        value={otherValue}
                        onChange={(e) => setOtherValue(e.target.value)}
                        placeholder="Tell us exactly what you need; we'll vet them for you."
                        className="h-12 rounded-lg border-[#3257C2]/30 bg-[#F4F7F9] text-sm placeholder:text-[#1A1D2E]/30 focus:border-[#3257C2]"
                        autoFocus
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

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
