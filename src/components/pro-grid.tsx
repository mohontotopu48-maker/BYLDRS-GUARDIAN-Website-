'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Star,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Search,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import {
  SERVICE_CATEGORIES,
  proProfiles,
  tierConfig,
  type Tier,
  type ProProfile,
} from '@/lib/pro-data';

const tierColors: Record<string, string> = {
  certified: 'bg-[#F5A623]',
  vetted: 'bg-[#9CA3AF]',
  verified: 'bg-[#CD7F32]',
};

/* ─── Card component ─────────────────────────────────────────────── */
function ProCard({ pro, index }: { pro: ProProfile; index: number }) {
  const { setCurrentPage, setSelectedProId } = useAppStore();
  const config = tierConfig[pro.tier];

  const handleViewProfile = () => {
    setSelectedProId(pro.id);
    setCurrentPage('pro-profile');
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="group bg-white rounded-xl border border-[#E5E7EB] overflow-hidden hover:shadow-xl hover:shadow-[#1A1D2E]/[0.08] hover:border-transparent transition-all duration-300 cursor-pointer"
      onClick={handleViewProfile}
    >
      {/* Cover image */}
      <div className="relative h-40 bg-gradient-to-br from-[#F4F7F9] to-[#E8ECF0] overflow-hidden">
        {pro.coverPhoto ? (
          <img
            src={pro.coverPhoto}
            alt={`${pro.company} work`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div
              className={`h-16 w-16 rounded-2xl ${tierColors[pro.tier]} flex items-center justify-center text-white text-xl font-bold opacity-30`}
            >
              {pro.avatar}
            </div>
          </div>
        )}
        {/* Tier badge overlay */}
        <div className="absolute top-3 right-3">
          <div
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 border backdrop-blur-sm bg-white/90 ${config.border} ${config.bg} shadow-sm`}
          >
            <span className="text-xs">{config.badge}</span>
            <span className={`text-[10px] font-bold ${config.text}`}>
              {config.metal}
            </span>
          </div>
        </div>
      </div>

      <div className="p-5">
        {/* Avatar + Name */}
        <div className="flex items-center gap-3 mb-3 -mt-10 relative z-10">
          <div className="relative">
            <div
              className={`h-14 w-14 rounded-xl ${tierColors[pro.tier]} flex items-center justify-center text-white text-sm font-bold shadow-lg ring-4 ring-white`}
            >
              {pro.headshot ? (
                <img
                  src={pro.headshot}
                  alt={pro.name}
                  className="h-full w-full rounded-xl object-cover"
                />
              ) : (
                pro.avatar
              )}
            </div>
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-[#1A1D2E] group-hover:text-[#3257C2] transition-colors truncate">
              {pro.name}
            </h3>
            <p className="text-xs text-[#1A1D2E]/50 font-medium truncate">
              {pro.company}
            </p>
          </div>
        </div>

        {/* Category Badge */}
        <Badge
          variant="secondary"
          className="text-[10px] font-semibold bg-[#3257C2]/[0.06] text-[#3257C2] hover:bg-[#3257C2]/[0.1] mb-2.5"
        >
          {pro.category}
        </Badge>

        {/* Location & Response */}
        <div className="flex items-center gap-3 mb-3 text-xs text-[#1A1D2E]/50">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{pro.location}</span>
          </div>
          <span className="text-[#E5E7EB]">•</span>
          <span className="whitespace-nowrap">Responds {pro.responseTime}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i <= Math.floor(pro.rating)
                    ? 'fill-[#F5A623] text-[#F5A623]'
                    : 'fill-[#E5E7EB] text-[#E5E7EB]'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-[#1A1D2E]">
            {pro.rating}
          </span>
          <span className="text-xs text-[#1A1D2E]/40">
            ({pro.reviewCount})
          </span>
        </div>

        {/* Verified */}
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
          onClick={(e) => {
            e.stopPropagation();
            handleViewProfile();
          }}
        >
          View Profile
          <ArrowRight className="ml-1.5 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  );
}

/* ─── Main Grid component ─────────────────────────────────────────── */
export function ProGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [locationQuery, setLocationQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const filteredPros = useMemo(() => {
    if (!hasSearched && !selectedCategory && !locationQuery) {
      return proProfiles;
    }
    return proProfiles.filter((pro) => {
      const matchCategory = !selectedCategory || pro.category === selectedCategory;
      const matchLocation =
        !locationQuery ||
        pro.location.toLowerCase().includes(locationQuery.toLowerCase()) ||
        pro.zip.startsWith(locationQuery);
      return matchCategory && matchLocation;
    });
  }, [selectedCategory, locationQuery, hasSearched]);

  const handleSearch = () => {
    setHasSearched(true);
  };

  const handleClear = () => {
    setSelectedCategory('');
    setLocationQuery('');
    setHasSearched(false);
  };

  return (
    <section id="pro-grid" className="relative bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#3257C2]/[0.07] px-4 py-1.5 mb-4">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#3257C2]" />
            <span className="text-xs font-semibold text-[#3257C2] tracking-wide uppercase">
              Verified Professionals
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1A1D2E]">
            Hire a Pro You Can{' '}
            <span className="text-[#3257C2]">Trust</span>
          </h2>
          <p className="mt-4 text-lg text-[#1A1D2E]/60 max-w-2xl mx-auto">
            Every Pro on our platform is background-checked, licensed, and
            audited every 30 days. No exceptions.
          </p>
        </div>

        {/* ─── Search & Filter Bar ─────────────────────────────────── */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="bg-[#F4F7F9] rounded-2xl border border-[#E5E7EB] p-4 sm:p-5">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3">
              {/* Service Dropdown */}
              <Select
                value={selectedCategory}
                onValueChange={(val) => setSelectedCategory(val === '__all__' ? '' : val)}
              >
                <SelectTrigger className="h-11 bg-white rounded-lg border-[#E5E7EB] text-sm">
                  <SelectValue placeholder="Select Service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__all__">All Services</SelectItem>
                  {SERVICE_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Location Input */}
              <Input
                type="text"
                placeholder="ZIP Code or City"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                className="h-11 bg-white rounded-lg border-[#E5E7EB] text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch();
                }}
              />

              {/* Search Button */}
              <Button
                onClick={handleSearch}
                className="h-11 px-6 rounded-lg bg-[#3257C2] hover:bg-[#2a49a8] text-white font-semibold text-sm shadow-lg shadow-[#3257C2]/20 hover:shadow-xl transition-all duration-300"
              >
                <Search className="mr-2 h-4 w-4" />
                Find My Pro
              </Button>
            </div>

            {/* Active Filters + Clear */}
            {(selectedCategory || locationQuery || hasSearched) && (
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#E5E7EB]">
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedCategory && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#3257C2]/[0.08] text-[#3257C2] px-3 py-1 text-xs font-semibold">
                      {selectedCategory}
                      <button onClick={() => setSelectedCategory('')}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  {locationQuery && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#3257C2]/[0.08] text-[#3257C2] px-3 py-1 text-xs font-semibold">
                      {locationQuery}
                      <button onClick={() => setLocationQuery('')}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                </div>
                <button
                  onClick={handleClear}
                  className="text-xs font-medium text-[#1A1D2E]/40 hover:text-[#1A1D2E] transition-colors"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tier Legend */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {(Object.keys(tierConfig) as Tier[]).map((tier) => {
            const config = tierConfig[tier];
            return (
              <div
                key={tier}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 border ${config.border} ${config.bg}`}
              >
                <span className="text-xs">{config.badge}</span>
                <span className={`text-[11px] font-semibold ${config.text}`}>
                  {config.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Results count */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filteredPros.length}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center mb-6"
          >
            <p className="text-sm text-[#1A1D2E]/40 font-medium">
              {filteredPros.length} {filteredPros.length === 1 ? 'Pro' : 'Pros'} found
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Pro Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPros.map((pro, index) => (
              <ProCard key={pro.id} pro={pro} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {/* No Results */}
        {filteredPros.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F4F7F9]">
              <Search className="h-7 w-7 text-[#CBD5E1]" />
            </div>
            <h3 className="text-lg font-bold text-[#1A1D2E] mb-2">
              No Pros Found
            </h3>
            <p className="text-sm text-[#1A1D2E]/40 mb-5 max-w-sm mx-auto">
              Try adjusting your filters or expanding your search area. We&apos;re
              always adding new verified Pros.
            </p>
            <Button variant="outline" onClick={handleClear}>
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
