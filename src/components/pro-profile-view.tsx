'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/lib/store';
import { getProById, tierConfig } from '@/lib/pro-data';
import {
  Shield,
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Calendar,
  FileCheck,
  Award,
  Briefcase,
  Users,
  HeartHandshake,
  ImageIcon,
  Wrench,
  Phone,
  Mail,
  AlertTriangle,
  Building2,
  ChevronRight,
  Quote,
} from 'lucide-react';
import { useEffect } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const childFade = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

/* ────────────────────────────────────────────────────────────────── */

export function ProProfileView() {
  const { selectedProId, setCurrentPage } = useAppStore();
  const pro = getProById(selectedProId ?? 0);

  useEffect(() => {
    if (!pro) {
      setCurrentPage('home');
    }
  }, [pro, setCurrentPage]);

  if (!pro) return null;

  const config = tierConfig[pro.tier];

  return (
    <section className="min-h-screen bg-white">
      {/* ═══════════════════════════════════════════════════════════
          HERO — Cover Photo + Headshot + Guardian Status
          ═══════════════════════════════════════════════════════════ */}
      <div className="relative">
        {/* Cover Photo */}
        <div className="relative h-[280px] sm:h-[360px] lg:h-[420px] overflow-hidden">
          {pro.coverPhoto ? (
            <img
              src={pro.coverPhoto}
              alt={`${pro.company} work`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1A1D2E] via-[#242845] to-[#3257C2]" />
          )}
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-[#0A0D14]/60 to-transparent" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        {/* Hero Content — over cover */}
        <div className="relative -mt-32 sm:-mt-40">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            {/* Back link */}
            <motion.div initial="hidden" animate="visible">
              <motion.button
                variants={fadeUp}
                custom={0}
                onClick={() => setCurrentPage('home')}
                className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white mb-6 transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Pros
              </motion.button>
            </motion.div>

            {/* Main profile header */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="flex flex-col sm:flex-row sm:items-end gap-5 sm:gap-6"
            >
              {/* Headshot */}
              <motion.div variants={childFade} className="shrink-0">
                <div className="relative">
                  <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-2xl overflow-hidden ring-4 ring-white shadow-2xl">
                    {pro.headshot ? (
                      <img
                        src={pro.headshot}
                        alt={pro.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-[#3257C2] flex items-center justify-center text-white text-3xl font-bold">
                        {pro.avatar}
                      </div>
                    )}
                  </div>
                  {/* Guardian Status Badge */}
                  <div
                    className={`absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r ${config.gradient} text-white text-[9px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full whitespace-nowrap shadow-lg`}
                  >
                    {config.badge} {config.label}
                  </div>
                </div>
              </motion.div>

              {/* Name + Info */}
              <motion.div variants={childFade} className="flex-1 min-w-0 pb-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-1">
                  {pro.name}
                </h1>
                <p className="text-base sm:text-lg text-white/60 mb-3">
                  {pro.company} — {pro.location}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  {/* Rating */}
                  <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/10">
                    <Star className="h-4 w-4 fill-[#F5A623] text-[#F5A623]" />
                    <span className="text-sm font-bold text-white">{pro.rating}</span>
                    <span className="text-xs text-white/50">({pro.reviewCount})</span>
                  </div>
                  {/* Response Time */}
                  <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/10">
                    <Clock className="h-3.5 w-3.5 text-[#3ED1B8]" />
                    <span className="text-xs font-medium text-white/70">{pro.responseTime}</span>
                  </div>
                  {/* Verified */}
                  {pro.verified && (
                    <div className="flex items-center gap-1.5 bg-[#3ED1B8]/15 rounded-full px-3 py-1.5 border border-[#3ED1B8]/25">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#3ED1B8]" />
                      <span className="text-xs font-semibold text-[#3ED1B8]">Verified</span>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div variants={childFade} className="shrink-0 pb-1">
                <Button className="h-12 px-6 sm:px-8 rounded-xl bg-[#3257C2] hover:bg-[#2a49a8] text-white font-bold text-sm shadow-xl shadow-[#3257C2]/30 hover:shadow-2xl transition-all duration-300 group whitespace-nowrap">
                  Get a Quote from {pro.name.split(' ')[0]}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          MAIN CONTENT — 2-Column Layout
          ═══════════════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12 pb-20">
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 lg:gap-10">
          {/* ─── Left Column: Content Sections ──────────────────────── */}
          <div className="space-y-10">
            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-[#E5E7EB] p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className={`h-10 w-10 rounded-xl ${config.bg} flex items-center justify-center`}>
                  <Briefcase className="h-5 w-5" style={{ color: config.text === 'text-[#F5A623]' ? '#F5A623' : config.text === 'text-[#9CA3AF]' ? '#9CA3AF' : '#CD7F32' }} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#1A1D2E]">About</h2>
                  <p className="text-xs text-[#1A1D2E]/40">Their story and specialty</p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-[#1A1D2E]/65 leading-relaxed mb-4">
                {pro.about}
              </p>
              <div className="bg-[#F4F7F9] rounded-xl p-4">
                <h4 className="text-xs font-bold text-[#1A1D2E]/40 uppercase tracking-wider mb-2">Specialty</h4>
                <p className="text-sm text-[#1A1D2E]/70 leading-relaxed">{pro.specialty}</p>
              </div>
            </motion.div>

            {/* Gallery Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-[#E5E7EB] p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 rounded-xl bg-[#3257C2]/[0.08] flex items-center justify-center">
                  <ImageIcon className="h-5 w-5 text-[#3257C2]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#1A1D2E]">Property Projects</h2>
                  <p className="text-xs text-[#1A1D2E]/40">Recent work gallery</p>
                </div>
              </div>

              {pro.gallery.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {pro.gallery.map((img, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
                    >
                      <img
                        src={img}
                        alt={`${pro.company} project ${i + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[1, 2, 3].map((n) => (
                    <div
                      key={n}
                      className="aspect-square rounded-xl bg-[#F4F7F9] border border-dashed border-[#E5E7EB] flex flex-col items-center justify-center"
                    >
                      <ImageIcon className="h-8 w-8 text-[#CBD5E1] mb-2" />
                      <span className="text-[10px] text-[#CBD5E1] font-medium">Coming Soon</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Services Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-[#E5E7EB] p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 rounded-xl bg-[#3ED1B8]/[0.08] flex items-center justify-center">
                  <Wrench className="h-5 w-5 text-[#3ED1B8]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#1A1D2E]">Services</h2>
                  <p className="text-xs text-[#1A1D2E]/40">What they offer</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {pro.services.map((service, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-center gap-2 bg-[#F4F7F9] rounded-lg px-3.5 py-2.5"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#3ED1B8] shrink-0" />
                    <span className="text-xs font-medium text-[#1A1D2E]/70">{service}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Reviews Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 rounded-xl bg-[#F5A623]/[0.08] flex items-center justify-center">
                  <HeartHandshake className="h-5 w-5 text-[#F5A623]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#1A1D2E]">Homeowner Reviews</h2>
                  <p className="text-xs text-[#1A1D2E]/40">{pro.reviewCount} verified reviews</p>
                </div>
              </div>

              <div className="space-y-4">
                {pro.reviews.map((review, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-white rounded-xl border border-[#E5E7EB] p-5 sm:p-6 hover:shadow-lg hover:shadow-[#1A1D2E]/[0.04] transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-full ${config.bg} flex items-center justify-center`}>
                          <span className="text-sm font-bold" style={{ color: config.text === 'text-[#F5A623]' ? '#F5A623' : config.text === 'text-[#9CA3AF]' ? '#9CA3AF' : '#CD7F32' }}>
                            {review.name.split(' ').map((n) => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#1A1D2E]">{review.name}</p>
                          <div className="flex items-center gap-1.5 text-xs text-[#1A1D2E]/40">
                            <MapPin className="h-3 w-3" />
                            {review.location}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-[#1A1D2E]/30">{review.date}</span>
                    </div>

                    <div className="flex items-center gap-0.5 mb-2.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`h-4 w-4 ${
                            s <= review.rating
                              ? 'fill-[#F5A623] text-[#F5A623]'
                              : 'fill-[#E5E7EB] text-[#E5E7EB]'
                          }`}
                        />
                      ))}
                    </div>

                    <div className="relative">
                      <Quote className="absolute -left-1 -top-1 h-4 w-4 text-[#E5E7EB] rotate-180" />
                      <p className="text-sm text-[#1A1D2E]/60 leading-relaxed pl-4">
                        {review.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden"
            >
              <div className="relative bg-gradient-to-br from-[#0F1219] via-[#1A1D2E] to-[#0F1219] p-8 sm:p-10 text-center">
                <div className="pointer-events-none absolute top-0 right-0 h-48 w-48 rounded-full bg-[#3257C2]/10 blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-[#3ED1B8]/[0.08] blur-3xl" />
                <div className="relative">
                  <div className="mx-auto mb-4 h-14 w-14 rounded-xl bg-[#3257C2]/20 flex items-center justify-center">
                    <Shield className="h-7 w-7 text-[#3257C2]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Ready to work with {pro.name.split(' ')[0]}?
                  </h3>
                  <p className="text-sm text-white/40 mb-6 max-w-md mx-auto">
                    Get a free quote — backed by the Guardian Risk Report and
                    full Homeowner Protection Guide compliance.
                  </p>
                  <Button className="h-12 px-8 rounded-xl bg-[#3257C2] hover:bg-[#2a49a8] text-white font-bold text-sm shadow-xl shadow-[#3257C2]/30 hover:shadow-2xl transition-all duration-300 group">
                    Get a Quote from {pro.name.split(' ')[0]}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ─── Right Column: Sticky Verified Sidebar ──────────────── */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-5">
            {/* Guardian Status Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden"
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${config.gradient} p-5 text-center`}>
                <div className="inline-flex flex-col items-center">
                  <div className="h-14 w-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-3 ring-white/30 shadow-lg mb-2">
                    <Shield className="h-7 w-7 text-white" />
                  </div>
                  <span className="text-white font-extrabold text-lg">{config.label}</span>
                  <span className="text-white/60 text-xs">{config.metal} Tier</span>
                </div>
              </div>

              {/* Score */}
              <div className="p-5 border-b border-[#E5E7EB]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#1A1D2E]/40 uppercase tracking-wider">
                    Property Score
                  </span>
                  <span className="text-xl font-extrabold" style={{ color: config.text === 'text-[#F5A623]' ? '#F5A623' : config.text === 'text-[#9CA3AF]' ? '#9CA3AF' : '#CD7F32' }}>
                    {pro.propertyScore}/100
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-[#E5E7EB] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pro.propertyScore}%` }}
                    transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                    className={`h-full rounded-full bg-gradient-to-r ${config.gradient}`}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="p-5 border-b border-[#E5E7EB] grid grid-cols-3 gap-3 text-center">
                {[
                  { value: `${pro.yearsExperience}+`, label: 'Years' },
                  { value: `${pro.projectCount}+`, label: 'Projects' },
                  { value: pro.rating, label: 'Rating' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-lg font-extrabold text-[#1A1D2E]">{stat.value}</div>
                    <div className="text-[10px] text-[#1A1D2E]/40 uppercase tracking-wider font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Verified Badges */}
              <div className="p-5 space-y-3">
                <h4 className="text-xs font-bold text-[#1A1D2E]/40 uppercase tracking-wider">
                  Verification Status
                </h4>

                <VerificationRow
                  icon={FileCheck}
                  label="License Status"
                  value={pro.licenseStatus}
                  detail={pro.licenseNumber}
                  verified={pro.licenseStatus === 'Active'}
                  verifiedDate={pro.licenseVerifiedDate}
                />
                <VerificationRow
                  icon={ShieldCheck}
                  label="Insurance"
                  value="Verified"
                  verified={true}
                  verifiedDate={pro.insuranceVerifiedDate}
                />
                <VerificationRow
                  icon={Building2}
                  label="Workers' Comp"
                  value={pro.workersComp ? 'Active' : 'Not Found'}
                  verified={pro.workersComp}
                />
                <VerificationRow
                  icon={Calendar}
                  label="Last Audited"
                  value={pro.lastAuditedDate}
                  verified={true}
                  verifiedDate={null}
                  highlight
                />
                <VerificationRow
                  icon={Calendar}
                  label="Next Audit"
                  value={pro.nextAuditDate}
                  verified={true}
                  verifiedDate={null}
                />
              </div>
            </motion.div>

            {/* Quick Contact Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#F4F7F9] rounded-2xl border border-[#E5E7EB] p-5"
            >
              <h4 className="text-xs font-bold text-[#1A1D2E]/40 uppercase tracking-wider mb-3">
                Quick Contact
              </h4>
              <Button className="w-full h-11 rounded-lg bg-[#3257C2] hover:bg-[#2a49a8] text-white font-semibold text-sm mb-2.5">
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </Button>
              <Button
                variant="outline"
                className="w-full h-11 rounded-lg border-[#E5E7EB] text-[#1A1D2E]/70 hover:bg-white font-semibold text-sm"
              >
                <Mail className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </motion.div>

            {/* Not Sure? CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#3ED1B8]/[0.05] rounded-2xl border border-[#3ED1B8]/15 p-5"
            >
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-[#3ED1B8]" />
                <span className="text-xs font-bold text-[#3ED1B8]">Not sure yet?</span>
              </div>
              <p className="text-xs text-[#1A1D2E]/50 leading-relaxed mb-3">
                Submit any bid through Check My Pro to see their full Guardian Risk Report before you sign.
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage('check-my-pro')}
                className="w-full h-9 rounded-lg text-[#3ED1B8] hover:bg-[#3ED1B8]/10 font-semibold text-xs"
              >
                Check My Pro
                <ChevronRight className="ml-1 h-3 w-3" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Verification Row ────────────────────────── */

function VerificationRow({
  icon: Icon,
  label,
  value,
  verified,
  verifiedDate,
  highlight,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  verified: boolean;
  verifiedDate: string | null;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={`flex items-center justify-center shrink-0 mt-0.5 h-7 w-7 rounded-lg ${
          verified
            ? highlight
              ? 'bg-[#3257C2]/[0.08]'
              : 'bg-[#3ED1B8]/[0.08]'
            : 'bg-red-50'
        }`}
      >
        {verified ? (
          <CheckCircle2
            className={`h-4 w-4 ${highlight ? 'text-[#3257C2]' : 'text-[#3ED1B8]'}`}
          />
        ) : (
          <XCircle className="h-4 w-4 text-red-400" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#1A1D2E]">{label}</span>
          <span
            className={`text-[11px] font-bold ${
              verified
                ? highlight
                  ? 'text-[#3257C2]'
                  : 'text-[#3ED1B8]'
                : 'text-red-500'
            }`}
          >
            {value}
          </span>
        </div>
        {verifiedDate && (
          <span className="text-[10px] text-[#1A1D2E]/30">
            Verified {verifiedDate}
          </span>
        )}
        {!verified && label === "Workers' Comp" && (
          <div className="flex items-center gap-1 mt-0.5">
            <AlertTriangle className="h-3 w-3 text-red-400" />
            <span className="text-[10px] text-red-400 font-medium">
              Not on file — request proof
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
