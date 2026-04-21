'use client';

import { useMemo } from 'react';
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
  Shield,
  ShieldCheck,
  Clock,
  Eye,
  Ban,
  Users,
  Award,
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

function useLiveStats(zip: string, category: string) {
  return useMemo(() => {
    const seed = (zip || '00000').split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const catSeed = (category || '').split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const combined = seed + catSeed;
    return {
      activeAudits: 8 + (combined % 18),
      prosBlocked: 1 + (combined % 6),
      prosActive: 30 + (combined % 40),
    };
  }, [zip, category]);
}

function GuardianChoiceCard({ pro }: { pro: ProProfile }) {
  const { setCurrentPage, setSelectedProId } = useAppStore();
  const handleViewProfile = () => {
    setSelectedProId(pro.id);
    setCurrentPage('pro-profile');
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-white rounded-2xl border-2 border-[#F5A623]/30 overflow-hidden shadow-xl shadow-[#F5A623]/[0.08] group cursor-pointer"
      onClick={handleViewProfile}
    >
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#F5A623] via-[#f7b84e] to-[#F5A623] text-center py-1.5">
        <div className="flex items-center justify-center gap-2">
          <Award className="h-3.5 w-3.5 text-[#1A1D2E]" />
          <span className="text-[11px] font-extrabold text-[#1A1D2E] uppercase tracking-[0.15em]">
            Guardian&apos;s Choice — Top Rated Near You
          </span>
          <Award className="h-3.5 w-3.5 text-[#1A1D2E]" />
        </div>
      </div>
      <div className="pt-8 sm:pt-10 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="shrink-0 w-full sm:w-48">
            <div className="relative h-32 sm:h-36 rounded-xl overflow-hidden bg-gradient-to-br from-[#F5A623]/10 to-[#3257C2]/10">
              {pro.coverPhoto ? (
                <img src={pro.coverPhoto} alt={`${pro.company} work`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Shield className="h-12 w-12 text-[#F5A623]/30" />
                </div>
              )}
            </div>
            <div className="relative -mt-8 ml-4">
              <div className="h-16 w-16 rounded-xl overflow-hidden ring-3 ring-white shadow-lg">
                {pro.headshot ? (
                  <img src={pro.headshot} alt={pro.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full bg-[#F5A623] flex items-center justify-center text-white text-lg font-bold">
                    {pro.avatar}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#1A1D2E] group-hover:text-[#3257C2] transition-colors">
                {pro.name}
              </h3>
              <CheckCircle2 className="h-5 w-5 text-[#3ED1B8]" />
            </div>
            <p className="text-sm text-[#1A1D2E]/50 font-medium mb-1">{pro.company}</p>
            <div className="flex items-center gap-3 text-xs text-[#1A1D2E]/50 mb-3">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {pro.location}
              </div>
              <span className="text-[#E5E7EB]">&bull;</span>
              <Badge className="text-[10px] font-semibold bg-[#3257C2]/[0.06] text-[#3257C2] hover:bg-[#3257C2]/[0.1]">
                {pro.category}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className={`h-4 w-4 ${i <= Math.floor(pro.rating) ? 'fill-[#F5A623] text-[#F5A623]' : 'fill-[#E5E7EB] text-[#E5E7EB]'}`} />
                ))}
                <span className="ml-1 text-sm font-bold text-[#1A1D2E]">{pro.rating}</span>
                <span className="text-xs text-[#1A1D2E]/40">({pro.reviewCount})</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#1A1D2E]/50">
                <Clock className="h-3 w-3" />
                {pro.responseTime}
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-[#F5A623]">
                <Shield className="h-3 w-3" />
                {pro.sanctuaryScore}/100
              </div>
            </div>
            <p className="text-sm text-[#1A1D2E]/55 leading-relaxed line-clamp-2 mb-4">{pro.about}</p>
            <div className="flex items-center gap-3">
              <Button className="h-10 px-5 rounded-lg bg-[#3257C2] hover:bg-[#2a49a8] text-white font-semibold text-sm shadow-lg shadow-[#3257C2]/20 hover:shadow-xl transition-all duration-300 group/btn" onClick={(e) => { e.stopPropagation(); handleViewProfile(); }}>
                Get a Quote from {pro.name.split(' ')[0]}
                <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
              </Button>
              <Button variant="outline" className="h-10 px-5 rounded-lg border-[#E5E7EB] text-[#1A1D2E]/60 hover:text-[#3257C2] hover:border-[#3257C2]/30 font-semibold text-sm transition-all duration-200" onClick={(e) => { e.stopPropagation(); handleViewProfile(); }}>
                View Full Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProCard({ pro, index }: { pro: ProProfile; index: number }) {
  const { setCurrentPage, setSelectedProId } = useAppStore();
  const config = tierConfig[pro.tier];
  const handleViewProfile = () => {
    setSelectedProId(pro.id);
    setCurrentPage('pro-profile');
  };
  return (
    <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.35, delay: index * 0.05 }} className="group bg-white rounded-xl border border-[#E5E7EB] overflow-hidden hover:shadow-xl hover:shadow-[#1A1D2E]/[0.08] hover:border-transparent transition-all duration-300 cursor-pointer" onClick={handleViewProfile}>
      <div className="relative h-40 bg-gradient-to-br from-[#F4F7F9] to-[#E8ECF0] overflow-hidden">
        {pro.coverPhoto ? (
          <img src={pro.coverPhoto} alt={`${pro.company} work`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className={`h-16 w-16 rounded-2xl ${tierColors[pro.tier]} flex items-center justify-center text-white text-xl font-bold opacity-30`}>{pro.avatar}</div>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <div className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 border backdrop-blur-sm bg-white/90 ${config.border} ${config.bg} shadow-sm`}>
            <span className="text-xs">{config.badge}</span>
            <span className={`text-[10px] font-bold ${config.text}`}>{config.metal}</span>
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3 -mt-10 relative z-10">
          <div className="relative">
            <div className={`h-14 w-14 rounded-xl ${tierColors[pro.tier]} flex items-center justify-center text-white text-sm font-bold shadow-lg ring-4 ring-white`}>
              {pro.headshot ? <img src={pro.headshot} alt={pro.name} className="h-full w-full rounded-xl object-cover" /> : pro.avatar}
            </div>
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-[#1A1D2E] group-hover:text-[#3257C2] transition-colors truncate">{pro.name}</h3>
            <p className="text-xs text-[#1A1D2E]/50 font-medium truncate">{pro.company}</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-[10px] font-semibold bg-[#3257C2]/[0.06] text-[#3257C2] hover:bg-[#3257C2]/[0.1] mb-2.5">{pro.category}</Badge>
        <div className="flex items-center gap-3 mb-3 text-xs text-[#1A1D2E]/50">
          <div className="flex items-center gap-1"><MapPin className="h-3 w-3" /><span className="truncate">{pro.location}</span></div>
          <span className="text-[#E5E7EB]">&bull;</span>
          <span className="whitespace-nowrap">Responds {pro.responseTime}</span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((i) => (<Star key={i} className={`h-3.5 w-3.5 ${i <= Math.floor(pro.rating) ? 'fill-[#F5A623] text-[#F5A623]' : 'fill-[#E5E7EB] text-[#E5E7EB]'}`} />))}
          </div>
          <span className="text-xs font-semibold text-[#1A1D2E]">{pro.rating}</span>
          <span className="text-xs text-[#1A1D2E]/40">({pro.reviewCount})</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          {pro.verified && (
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#3ED1B8]" />
              <span className="text-[11px] font-medium text-[#3ED1B8]">Audited & Verified</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Shield className="h-3 w-3 text-[#1A1D2E]/30" />
            <span className="text-[11px] font-bold text-[#1A1D2E]/50">{pro.sanctuaryScore}</span>
          </div>
        </div>
        <Button variant="outline" className="w-full h-10 rounded-lg border-[#3257C2]/15 text-[#3257C2] hover:bg-[#3257C2] hover:text-white font-semibold text-xs transition-all duration-300 group/btn" onClick={(e) => { e.stopPropagation(); handleViewProfile(); }}>
          View Profile
          <ArrowRight className="ml-1.5 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  );
}

function TierSection({ tier, pros }: { tier: Tier; pros: ProProfile[] }) {
  if (pros.length === 0) return null;
  const config = tierConfig[tier];
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-10">
      <div className="flex items-center gap-3 mb-5">
        <div className={`h-8 w-8 rounded-lg ${config.bg} flex items-center justify-center`}><span className="text-sm">{config.badge}</span></div>
        <h3 className={`text-lg font-bold ${config.text}`}>{config.label}<span className="text-[#1A1D2E]/30 font-medium ml-2">({pros.length})</span></h3>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {pros.map((pro, index) => (<ProCard key={pro.id} pro={pro} index={index} />))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function ProGrid() {
  const { searchZipCode, searchCategory, hasSearched, setHasSearched, setSearchZipCode, setSearchCategory } = useAppStore();

  const liveStats = useLiveStats(searchZipCode, searchCategory);

  const filteredPros = useMemo(() => {
    if (!hasSearched && !searchCategory && !searchZipCode) return proProfiles;
    return proProfiles.filter((pro) => {
      const matchCategory = !searchCategory || pro.category === searchCategory;
      const matchLocation = !searchZipCode || pro.location.toLowerCase().includes(searchZipCode.toLowerCase()) || pro.zip.startsWith(searchZipCode);
      return matchCategory && matchLocation;
    });
  }, [searchCategory, searchZipCode, hasSearched]);

  const guardianChoice = useMemo(() => {
    if (filteredPros.length === 0) return null;
    const certified = filteredPros.filter((p) => p.tier === 'certified');
    return certified.length > 0 ? certified[0] : null;
  }, [filteredPros]);

  const restOfPros = useMemo(() => {
    if (!guardianChoice) return filteredPros;
    return filteredPros.filter((p) => p.id !== guardianChoice.id);
  }, [filteredPros, guardianChoice]);

  const tierGroups = useMemo(() => {
    const groups: Record<Tier, ProProfile[]> = { certified: [], vetted: [], verified: [] };
    restOfPros.forEach((pro) => { groups[pro.tier].push(pro); });
    return groups;
  }, [restOfPros]);

  const handleLocalSearch = () => { setHasSearched(true); };

  const handleClear = () => {
    setSearchZipCode('');
    setSearchCategory('');
    setHasSearched(false);
  };

  return (
    <section id="pro-grid" className="relative bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#3257C2]/[0.07] px-4 py-1.5 mb-4">
            <ShieldCheck className="h-3.5 w-3.5 text-[#3257C2]" />
            <span className="text-xs font-semibold text-[#3257C2] tracking-wide uppercase">Verified Professionals</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1A1D2E]">
            Your Elite Pro <span className="text-[#3257C2]">Network</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#1A1D2E]/55 max-w-2xl mx-auto">
            Every Pro is background-checked, licensed, and audited every 30 days. Organized by Guardian Tier so you can hire with confidence.
          </p>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="max-w-3xl mx-auto mb-8">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 py-3.5 px-5 rounded-xl bg-[#F4F7F9] border border-[#E5E7EB]">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-[#3257C2]" />
              <span className="text-xs sm:text-sm font-medium text-[#1A1D2E]/60">Active Audits{searchZipCode ? ` in ${searchZipCode}` : ''}:</span>
              <span className="text-sm sm:text-base font-extrabold text-[#3257C2]">{liveStats.activeAudits}</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-[#E5E7EB]" />
            <div className="flex items-center gap-2">
              <Ban className="h-4 w-4 text-red-500" />
              <span className="text-xs sm:text-sm font-medium text-[#1A1D2E]/60">Pros Blocked This Week:</span>
              <span className="text-sm sm:text-base font-extrabold text-red-500">{liveStats.prosBlocked}</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-[#E5E7EB]" />
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-[#3ED1B8]" />
              <span className="text-xs sm:text-sm font-medium text-[#1A1D2E]/60">Verified Pros Active:</span>
              <span className="text-sm sm:text-base font-extrabold text-[#3ED1B8]">{liveStats.prosActive}</span>
            </div>
          </div>
        </motion.div>

        <div className="max-w-3xl mx-auto mb-10">
          <div className="bg-[#F8FAFB] rounded-2xl border border-[#E5E7EB] p-4 sm:p-5">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3">
              <Select value={searchCategory} onValueChange={(val) => setSearchCategory(val === '__all__' ? '' : val)}>
                <SelectTrigger className="h-11 bg-white rounded-lg border-[#E5E7EB] text-sm"><SelectValue placeholder="Select Service" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="__all__">All Services</SelectItem>
                  {SERVICE_CATEGORIES.map((cat) => (<SelectItem key={cat} value={cat}>{cat}</SelectItem>))}
                </SelectContent>
              </Select>
              <Input type="text" placeholder="ZIP Code or City" value={searchZipCode} onChange={(e) => setSearchZipCode(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleLocalSearch(); }} className="h-11 bg-white rounded-lg border-[#E5E7EB] text-sm" />
              <Button onClick={handleLocalSearch} className="h-11 px-6 rounded-lg bg-[#3257C2] hover:bg-[#2a49a8] text-white font-semibold text-sm shadow-lg shadow-[#3257C2]/20 hover:shadow-xl transition-all duration-300">
                <Search className="mr-2 h-4 w-4" />Find My Pro
              </Button>
            </div>
            {(searchCategory || searchZipCode || hasSearched) && (
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#E5E7EB]">
                <div className="flex items-center gap-2 flex-wrap">
                  {searchCategory && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#3257C2]/[0.08] text-[#3257C2] px-3 py-1 text-xs font-semibold">
                      {searchCategory}
                      <button onClick={() => setSearchCategory('')}><X className="h-3 w-3" /></button>
                    </span>
                  )}
                  {searchZipCode && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#3257C2]/[0.08] text-[#3257C2] px-3 py-1 text-xs font-semibold">
                      {searchZipCode}
                      <button onClick={() => setSearchZipCode('')}><X className="h-3 w-3" /></button>
                    </span>
                  )}
                </div>
                <button onClick={handleClear} className="text-xs font-medium text-[#1A1D2E]/40 hover:text-[#1A1D2E] transition-colors">Clear all</button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {(Object.keys(tierConfig) as Tier[]).map((tier) => {
            const config = tierConfig[tier];
            return (
              <div key={tier} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 border ${config.border} ${config.bg}`}>
                <span className="text-xs">{config.badge}</span>
                <span className={`text-[11px] font-semibold ${config.text}`}>{config.label}</span>
              </div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={filteredPros.length} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center mb-8">
            <p className="text-sm text-[#1A1D2E]/40 font-medium">{filteredPros.length} {filteredPros.length === 1 ? 'Pro' : 'Pros'} found</p>
          </motion.div>
        </AnimatePresence>

        {guardianChoice && (
          <div className="mb-12">
            <GuardianChoiceCard pro={guardianChoice} />
          </div>
        )}

        <div className="space-y-2">
          <TierSection tier="certified" pros={tierGroups.certified} />
          <TierSection tier="vetted" pros={tierGroups.vetted} />
          <TierSection tier="verified" pros={tierGroups.verified} />
        </div>

        {filteredPros.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F4F7F9]"><Search className="h-7 w-7 text-[#CBD5E1]" /></div>
            <h3 className="text-lg font-bold text-[#1A1D2E] mb-2">No Pros Found</h3>
            <p className="text-sm text-[#1A1D2E]/40 mb-5 max-w-sm mx-auto">Try adjusting your filters or expanding your search area. We&apos;re always adding new verified Pros.</p>
            <Button variant="outline" onClick={handleClear}>Clear Filters</Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
