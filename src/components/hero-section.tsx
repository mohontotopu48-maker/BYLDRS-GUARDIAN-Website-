'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Star,
  Users,
  ArrowRight,
  ChevronDown,
  Home,
  Droplets,
  Zap,
  Wind,
  Paintbrush,
  Hammer,
  TreePine,
  Sparkles,
  Square,
  Grid3x3,
  Sun,
  Fence,
  ShieldCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';

/* ─── Category Icons ──────────────────────────────────────────── */
const categoryIcons = [
  { name: 'Roofing', icon: Home, color: '#3257C2' },
  { name: 'Plumbing', icon: Droplets, color: '#3257C2' },
  { name: 'Electrical', icon: Zap, color: '#DC2626' },
  { name: 'HVAC', icon: Wind, color: '#3257C2' },
  { name: 'Painting', icon: Paintbrush, color: '#DC2626' },
  { name: 'Remodeling', icon: Hammer, color: '#3257C2' },
  { name: 'Landscaping', icon: TreePine, color: '#3257C2' },
  { name: 'Cleaning', icon: Sparkles, color: '#DC2626' },
  { name: 'Windows', icon: Square, color: '#3257C2' },
  { name: 'Concrete', icon: Grid3x3, color: '#DC2626' },
  { name: 'Solar', icon: Sun, color: '#3257C2' },
  { name: 'Fencing', icon: Fence, color: '#DC2626' },
];

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
  const [zipCode, setZipCode] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    setSearchZipCode,
    setSearchCategory,
    setHasSearched,
    setCurrentPage,
  } = useAppStore();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const handleCategoryClick = (name: string) => {
    setSelectedService(name);
    setShowOtherInput(false);
  };

  const handleSearch = () => {
    const service = showOtherInput ? otherValue : selectedService;
    setSearchCategory(service);
    setSearchZipCode(zipCode);
    setHasSearched(true);
    // Smooth scroll to pro-grid section
    setTimeout(() => {
      document.querySelector('#pro-grid')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  // Filter services for auto-fill
  const filteredServices = top20Services.filter((s) =>
    s.toLowerCase().includes(selectedService.toLowerCase()),
  );

  return (
    <section className="relative overflow-hidden bg-white pt-28 pb-16 lg:pt-36 lg:pb-24">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#3257C2]/[0.03] blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#3ED1B8]/[0.04] blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#3257C2]/[0.02] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ─── Badge ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-[#3257C2]/[0.07] px-4 py-1.5 mb-6">
            <div className="h-2 w-2 rounded-full bg-[#3ED1B8] animate-pulse" />
            <span className="text-xs font-semibold text-[#3257C2] tracking-wide uppercase">
              California&apos;s #1 Pro Verification Platform
            </span>
          </div>

          {/* ─── Headline ─────────────────────────────────────── */}
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold leading-[1.08] tracking-tight text-[#1A1D2E] max-w-4xl mx-auto">
            Your Project,{' '}
            <span className="text-[#3257C2]">Protected</span>{' '}
            by Pros.
          </h1>

          <p className="mt-5 text-lg sm:text-xl text-[#1A1D2E]/55 leading-relaxed max-w-2xl mx-auto">
            Stop guessing. Every Pro below has passed our{' '}
            <span className="font-semibold text-[#1A1D2E]">20-Point Shield</span>{' '}
            audit in the last{' '}
            <span className="font-semibold text-[#3ED1B8]">30 days</span>.
          </p>
        </motion.div>

        {/* ─── Visual Icon Grid (12 Categories) ──────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 mb-10"
        >
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {categoryIcons.map((cat) => (
              <button
                key={cat.name}
                onClick={() => handleCategoryClick(cat.name)}
                className={`group flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl border transition-all duration-200 hover:shadow-lg hover:shadow-[#1A1D2E]/[0.06] hover:border-transparent hover:-translate-y-0.5 ${
                  selectedService === cat.name
                    ? 'border-[#3257C2]/30 bg-[#3257C2]/[0.04] shadow-md'
                    : 'border-[#E5E7EB] bg-white hover:bg-[#3257C2]/[0.02]'
                }`}
              >
                <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg flex items-center justify-center transition-colors duration-200" style={{ backgroundColor: `${cat.color}10` }}>
                  <cat.icon className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: cat.color }} />
                </div>
                <span className="text-[11px] sm:text-xs font-semibold text-[#1A1D2E]/60 group-hover:text-[#1A1D2E] transition-colors whitespace-nowrap">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* ─── Command Center Search Bar ──────────────────────── */}
        <motion.div
          id="search-pros"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="max-w-3xl mx-auto scroll-mt-24"
        >
          <div className="bg-[#F8FAFB] rounded-2xl border border-[#E5E7EB] p-3 sm:p-4 shadow-lg shadow-[#1A1D2E]/[0.04]">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Left: Service Auto-fill */}
              <div className="relative flex-1" ref={dropdownRef}>
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1A1D2E]/30" />
                  <input
                    type="text"
                    value={showOtherInput ? otherValue : selectedService}
                    onChange={(e) => {
                      if (showOtherInput) {
                        setOtherValue(e.target.value);
                      } else {
                        setSelectedService(e.target.value);
                        setShowOtherInput(false);
                        setDropdownOpen(true);
                      }
                    }}
                    onFocus={() => {
                      if (!showOtherInput) setDropdownOpen(true);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="What do you need help with?"
                    className="w-full h-12 pl-10 pr-4 rounded-xl border border-[#E5E7EB] bg-white text-sm text-[#1A1D2E] placeholder:text-[#1A1D2E]/35 focus:outline-none focus:border-[#3257C2]/40 focus:ring-2 focus:ring-[#3257C2]/10 transition-all"
                  />
                </div>

                <AnimatePresence>
                  {dropdownOpen && !showOtherInput && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute z-20 top-full left-0 right-0 mt-1 bg-white rounded-xl border border-[#E5E7EB] shadow-xl shadow-[#1A1D2E]/[0.1] overflow-hidden max-h-72 overflow-y-auto scrollbar-thin"
                    >
                      <div className="py-1">
                        {filteredServices.map((service) => (
                          <button
                            key={service}
                            type="button"
                            onClick={() => handleSelect(service)}
                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[#3257C2]/5 transition-colors flex items-center gap-3 ${
                              selectedService === service
                                ? 'text-[#3257C2] font-semibold bg-[#3257C2]/5'
                                : 'text-[#1A1D2E]/80'
                            }`}
                          >
                            {(() => {
                              const iconMatch = categoryIcons.find((c) =>
                                service.toLowerCase().includes(c.name.toLowerCase()),
                              );
                              const Icon = iconMatch?.icon || Search;
                              const color = iconMatch?.color || '#3257C2';
                              return <Icon className="h-4 w-4 shrink-0" style={{ color }} />;
                            })()}
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
                          Other &mdash; Tell us what you need
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right: ZIP Code */}
              <div className="relative w-full sm:w-48">
                <div className="relative">
                  <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1A1D2E]/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter ZIP Code"
                    maxLength={10}
                    className="w-full h-12 pl-10 pr-4 rounded-xl border border-[#E5E7EB] bg-white text-sm text-[#1A1D2E] placeholder:text-[#1A1D2E]/35 focus:outline-none focus:border-[#3257C2]/40 focus:ring-2 focus:ring-[#3257C2]/10 transition-all"
                  />
                </div>
              </div>

              {/* Search Button */}
              <Button
                onClick={handleSearch}
                className="h-12 px-6 sm:px-8 rounded-xl bg-[#3257C2] hover:bg-[#2a49a8] text-white font-bold text-sm shadow-lg shadow-[#3257C2]/20 hover:shadow-xl hover:shadow-[#3257C2]/30 transition-all duration-300 group whitespace-nowrap"
              >
                <ShieldCheck className="mr-2 h-4 w-4" />
                Search Verified Pros
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* ─── Social Proof Bar ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
          className="mt-12 lg:mt-16"
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
              <ShieldCheck className="h-5 w-5 text-[#3ED1B8]" />
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
