'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useAppStore } from '@/lib/store';
import {
  Play,
  Star,
  Shield,
  Award,
  Upload,
  Camera,
  Instagram,
  Facebook,
  Linkedin,
  Globe,
  Building2,
  FileCheck,
  Calendar,
  Clock,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Sparkles,
  BadgeCheck,
  Users,
  Briefcase,
  Heart,
  ArrowRight,
  ImagePlus,
} from 'lucide-react';

// ── Animation Variants ──────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const slideIn = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    x: -40,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

// ── Calendar Helpers ─────────────────────────────────────────────
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const TIME_SLOTS = ['9:00 AM', '11:00 AM', '2:00 PM'];

function getWeekDates(): Date[] {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(now);
  monday.setDate(now.getDate() + mondayOffset);

  return DAYS.map((_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

function formatDateShort(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// ── Component ───────────────────────────────────────────────────
export function ProOnboardingView() {
  const { setCurrentPage } = useAppStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<{
    date: Date;
    time: string;
  } | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    businessName: '',
    licenseNumber: '',
    websiteUrl: '',
    instagram: '',
    facebook: '',
    linkedin: '',
  });

  const weekDates = useMemo(() => getWeekDates(), []);

  const steps = [
    { label: 'Preview', sublabel: 'Your future profile' },
    { label: 'Your Info', sublabel: 'Business details' },
    { label: 'Discovery', sublabel: 'Book a meeting' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <section className="min-h-screen bg-[#F4F7F9]">
      {/* ── Top Header Bar ──────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-[#3257C2]/10 flex items-center justify-center">
                <Shield className="size-5 text-[#3257C2]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#3ED1B8] flex items-center gap-1.5">
                  <Sparkles className="size-4" />
                  Pro Onboarding
                </p>
                <h1 className="text-xl sm:text-2xl font-bold text-[#1A1D2E]">
                  Become a Certified Guardian
                </h1>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} custom={1}>
              <Button
                variant="ghost"
                onClick={() => setCurrentPage('home')}
                className="text-gray-500 hover:text-[#1A1D2E] hover:bg-gray-100 font-medium"
              >
                <ChevronLeft className="size-4" />
                Back to Home
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* ── Step Indicator ───────────────────────────────────── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mb-10"
        >
          <div className="flex items-center justify-center gap-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.label}
                variants={fadeUp}
                custom={i}
                className="flex items-center"
              >
                <button
                  onClick={() => setCurrentStep(i)}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div
                    className={`
                      size-10 sm:size-11 rounded-full flex items-center justify-center font-bold text-sm
                      transition-all duration-300 border-2
                      ${
                        i < currentStep
                          ? 'bg-[#3ED1B8] border-[#3ED1B8] text-white shadow-md shadow-[#3ED1B8]/25'
                          : i === currentStep
                            ? 'bg-[#3257C2] border-[#3257C2] text-white shadow-md shadow-[#3257C2]/25'
                            : 'bg-white border-gray-300 text-gray-400 group-hover:border-[#3257C2]/40 group-hover:text-[#3257C2]/60'
                      }
                    `}
                  >
                    {i < currentStep ? (
                      <CheckCircle2 className="size-5" />
                    ) : (
                      <span>{i + 1}</span>
                    )}
                  </div>
                  <div className="hidden sm:block">
                    <p
                      className={`text-sm font-semibold transition-colors duration-300 ${
                        i <= currentStep ? 'text-[#1A1D2E]' : 'text-gray-400'
                      }`}
                    >
                      {step.label}
                    </p>
                    <p className="text-xs text-gray-400">{step.sublabel}</p>
                  </div>
                </button>
                {i < steps.length - 1 && (
                  <div
                    className={`w-12 sm:w-20 h-0.5 mx-3 sm:mx-4 rounded-full transition-colors duration-500 ${
                      i < currentStep ? 'bg-[#3ED1B8]' : 'bg-gray-200'
                    }`}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Step Content ─────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="step-preview"
              variants={slideIn}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <StepPreview />
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="step-info"
              variants={slideIn}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <StepInfo formData={formData} onChange={handleInputChange} />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step-discovery"
              variants={slideIn}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <StepDiscovery
                weekDates={weekDates}
                selectedSlot={selectedSlot}
                onSelectSlot={setSelectedSlot}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Navigation Buttons ───────────────────────────────── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={2}
          className="flex items-center justify-between mt-10 pt-6 border-t border-gray-200"
        >
          <Button
            onClick={prevStep}
            variant="outline"
            disabled={currentStep === 0}
            className={`font-semibold ${
              currentStep === 0
                ? 'invisible'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <ChevronLeft className="size-4" />
            Previous Step
          </Button>

          <div className="flex items-center gap-2">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentStep ? 'w-6 bg-[#3257C2]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {currentStep < 2 ? (
            <Button
              onClick={nextStep}
              className="bg-[#3257C2] hover:bg-[#2a4aa8] text-white font-semibold shadow-md shadow-[#3257C2]/20"
            >
              Continue
              <ChevronRight className="size-4" />
            </Button>
          ) : (
            <Button
              onClick={() => {
                setCurrentPage('home');
              }}
              className="bg-[#3ED1B8] hover:bg-[#34b9a2] text-white font-semibold shadow-md shadow-[#3ED1B8]/20"
            >
              Submit Application
              <ArrowRight className="size-4" />
            </Button>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════
// STEP 1: Preview — Aspirational Splash Page
// ══════════════════════════════════════════════════════════════════
function StepPreview() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="space-y-8"
    >
      {/* Intro Text */}
      <motion.div variants={fadeUp} custom={0} className="text-center">
        <div className="inline-flex items-center gap-2 bg-[#F5A623]/10 px-4 py-2 rounded-full mb-4">
          <Award className="size-4 text-[#F5A623]" />
          <span className="text-sm font-semibold text-[#F5A623]">This is what you&apos;re building toward</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1D2E] mb-2">
          Your Pro Profile Preview
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          This is how homeowners will see you. Complete onboarding to unlock your Certified Guardian profile.
        </p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        variants={fadeUp}
        custom={1}
        className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden max-w-3xl mx-auto"
      >
        {/* Video Header */}
        <div className="relative h-52 sm:h-64 bg-gradient-to-br from-[#3257C2] via-[#1e3f8f] to-[#1A1D2E]">
          {/* Decorative grid pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
          </div>

          {/* Play button */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="size-16 sm:size-20 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors"
            >
              <Play className="size-7 sm:size-8 text-white ml-1" fill="white" />
            </motion.div>
            <p className="text-white/90 font-semibold mt-3 text-sm sm:text-base">
              Your Video Introduction
            </p>
            <p className="text-white/50 text-xs mt-1">
              60 seconds to showcase your craft
            </p>
          </div>

          {/* Gold badge overlay */}
          <div className="absolute top-4 right-4">
            <div className="inline-flex items-center gap-1.5 bg-[#F5A623] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg shadow-[#F5A623]/30">
              <BadgeCheck className="size-3.5" />
              Certified Guardian
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="p-6 sm:p-8">
          {/* Avatar + Name */}
          <div className="flex items-start gap-4 -mt-10 relative z-10 mb-6">
            <div className="size-20 sm:size-24 rounded-2xl bg-gradient-to-br from-[#3257C2] to-[#3ED1B8] border-4 border-white shadow-lg flex items-center justify-center">
              <Building2 className="size-8 sm:size-10 text-white" />
            </div>
            <div className="pt-8 sm:pt-10">
              <h3 className="text-xl sm:text-2xl font-bold text-[#1A1D2E] flex items-center gap-2">
                Your Business Name
                <Shield className="size-5 text-[#3257C2]" />
              </h3>
              <p className="text-gray-500 text-sm">Licensed Contractor &bull; Los Angeles, CA</p>
            </div>
          </div>

          {/* Experience Stats Bar */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { value: '15+', label: 'Years Experience', icon: Briefcase },
              { value: '500+', label: 'Projects Completed', icon: Users },
              { value: '4.9', label: 'Average Rating', icon: Star },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center p-3 sm:p-4 rounded-xl bg-[#F4F7F9] border border-gray-100"
              >
                <stat.icon className="size-4 text-[#3257C2] mx-auto mb-1.5" />
                <p className="text-lg sm:text-xl font-bold text-[#1A1D2E]">{stat.value}</p>
                <p className="text-[10px] sm:text-xs text-gray-500 leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Sanctuary Score */}
          <div className="bg-[#3257C2]/5 border border-[#3257C2]/15 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Shield className="size-5 text-[#3257C2]" />
                <span className="font-bold text-[#1A1D2E]">Sanctuary Score</span>
              </div>
              <span className="text-xl font-bold text-[#3257C2]">96<span className="text-sm text-gray-400 font-medium">/100</span></span>
            </div>
            <div className="relative">
              <Progress value={96} className="h-3" />
              <div
                className="absolute top-0 left-0 h-3 rounded-full bg-[#3257C2] opacity-30"
                style={{ width: '96%' }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1.5">
              <CheckCircle2 className="size-3 text-[#3ED1B8]" />
              Top 5% of all contractors in California
            </p>
          </div>

          {/* Verified badges */}
          <div className="flex flex-wrap gap-2 mt-5">
            {[
              { label: 'License Verified', icon: FileCheck },
              { label: 'Insured', icon: Shield },
              { label: 'Background Checked', icon: BadgeCheck },
            ].map((badge) => (
              <div
                key={badge.label}
                className="inline-flex items-center gap-1.5 bg-[#3ED1B8]/10 text-[#3ED1B8] px-3 py-1.5 rounded-full text-xs font-semibold"
              >
                <badge.icon className="size-3.5" />
                {badge.label}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════
// STEP 2: Onboarding Form + Business Card Upload
// ══════════════════════════════════════════════════════════════════
function StepInfo({
  formData,
  onChange,
}: {
  formData: {
    businessName: string;
    licenseNumber: string;
    websiteUrl: string;
    instagram: string;
    facebook: string;
    linkedin: string;
  };
  onChange: (field: string, value: string) => void;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={fadeUp} custom={0}>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1D2E] mb-2">
          Tell Us About Your Business
        </h2>
        <p className="text-gray-500">
          Help homeowners understand who you are and what you do.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* ── Form Fields ──────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          custom={1}
          className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 rounded-xl bg-[#3257C2]/10 flex items-center justify-center">
              <Building2 className="size-5 text-[#3257C2]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1A1D2E]">Business Information</h3>
              <p className="text-xs text-gray-500">Basic business and license details</p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Business Name */}
            <div className="space-y-2">
              <Label htmlFor="businessName" className="text-sm font-semibold text-[#1A1D2E]">
                Business Name
              </Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  id="businessName"
                  placeholder="e.g. Acme Roofing & Construction"
                  value={formData.businessName}
                  onChange={(e) => onChange('businessName', e.target.value)}
                  className="pl-10 h-11 border-gray-200 focus:border-[#3257C2] focus:ring-[#3257C2]/20"
                />
              </div>
            </div>

            {/* License # */}
            <div className="space-y-2">
              <Label htmlFor="licenseNumber" className="text-sm font-semibold text-[#1A1D2E]">
                License #
              </Label>
              <div className="relative">
                <FileCheck className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  id="licenseNumber"
                  placeholder="e.g. 987654"
                  value={formData.licenseNumber}
                  onChange={(e) => onChange('licenseNumber', e.target.value)}
                  className="pl-10 h-11 border-gray-200 focus:border-[#3257C2] focus:ring-[#3257C2]/20"
                />
              </div>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <Shield className="size-3" />
                CSLB License Number
              </p>
            </div>

            {/* Website */}
            <div className="space-y-2">
              <Label htmlFor="websiteUrl" className="text-sm font-semibold text-[#1A1D2E]">
                Website URL
              </Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  id="websiteUrl"
                  placeholder="https://yourbusiness.com"
                  value={formData.websiteUrl}
                  onChange={(e) => onChange('websiteUrl', e.target.value)}
                  className="pl-10 h-11 border-gray-200 focus:border-[#3257C2] focus:ring-[#3257C2]/20"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="pt-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="size-10 rounded-xl bg-[#3ED1B8]/10 flex items-center justify-center">
                  <Heart className="size-5 text-[#3ED1B8]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1A1D2E]">Social Media Links</h3>
                  <p className="text-xs text-gray-500">Help homeowners connect with you</p>
                </div>
              </div>
            </div>

            {/* Instagram */}
            <div className="space-y-2">
              <Label htmlFor="instagram" className="text-sm font-semibold text-[#1A1D2E]">
                Instagram
              </Label>
              <div className="relative">
                <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  id="instagram"
                  placeholder="https://instagram.com/yourbusiness"
                  value={formData.instagram}
                  onChange={(e) => onChange('instagram', e.target.value)}
                  className="pl-10 h-11 border-gray-200 focus:border-[#3257C2] focus:ring-[#3257C2]/20"
                />
              </div>
            </div>

            {/* Facebook */}
            <div className="space-y-2">
              <Label htmlFor="facebook" className="text-sm font-semibold text-[#1A1D2E]">
                Facebook
              </Label>
              <div className="relative">
                <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  id="facebook"
                  placeholder="https://facebook.com/yourbusiness"
                  value={formData.facebook}
                  onChange={(e) => onChange('facebook', e.target.value)}
                  className="pl-10 h-11 border-gray-200 focus:border-[#3257C2] focus:ring-[#3257C2]/20"
                />
              </div>
            </div>

            {/* LinkedIn */}
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="text-sm font-semibold text-[#1A1D2E]">
                LinkedIn
              </Label>
              <div className="relative">
                <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  id="linkedin"
                  placeholder="https://linkedin.com/company/yourbusiness"
                  value={formData.linkedin}
                  onChange={(e) => onChange('linkedin', e.target.value)}
                  className="pl-10 h-11 border-gray-200 focus:border-[#3257C2] focus:ring-[#3257C2]/20"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Business Card Upload ──────────────────────────── */}
        <motion.div
          variants={fadeUp}
          custom={2}
          className="lg:col-span-2 space-y-6"
        >
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="size-10 rounded-xl bg-[#F5A623]/10 flex items-center justify-center">
                <Camera className="size-5 text-[#F5A623]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1A1D2E]">Business Card Upload</h3>
                <p className="text-xs text-gray-500">Front &amp; Back of your card</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Front */}
              <UploadZone label="Front of Card" />
              {/* Back */}
              <UploadZone label="Back of Card" />
            </div>

            <p className="text-xs text-gray-400 mt-4 text-center">
              Accepted: JPG, PNG, PDF &bull; Max 10MB each
            </p>
          </div>

          {/* Info Card */}
          <div className="bg-gradient-to-br from-[#3257C2] to-[#1e3f8f] rounded-2xl p-6 shadow-lg text-white">
            <div className="size-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-4">
              <Award className="size-5 text-[#F5A623]" />
            </div>
            <h4 className="font-bold mb-2">Why This Matters</h4>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              A complete profile with verified documents builds trust with homeowners and
              increases your Sanctuary Score by up to <span className="font-bold text-white">15 points</span>.
            </p>
            <div className="space-y-2">
              {[
                'Verified profiles get 3x more inquiries',
                'Business cards add authenticity signals',
                'Social links improve search visibility',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-white/85">
                  <CheckCircle2 className="size-4 text-[#3ED1B8] shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── Upload Zone Sub-component ────────────────────────────────────
function UploadZone({ label }: { label: string }) {
  const [isDragOver, setIsDragOver] = useState(false);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragOver(false);
      }}
      className={`
        flex flex-col items-center justify-center rounded-xl p-4 sm:p-6 cursor-pointer
        transition-all duration-200 min-h-[140px] sm:min-h-[160px]
        border-2 border-dashed
        ${
          isDragOver
            ? 'border-[#3257C2] bg-[#3257C2]/5'
            : 'border-gray-300 bg-[#F4F7F9] hover:border-[#3257C2]/40 hover:bg-[#F4F7F9]'
        }
      `}
    >
      <div
        className={`size-10 rounded-lg flex items-center justify-center mb-2 transition-colors ${
          isDragOver ? 'bg-[#3257C2]/15' : 'bg-gray-200'
        }`}
      >
        <ImagePlus
          className={`size-5 transition-colors ${isDragOver ? 'text-[#3257C2]' : 'text-gray-400'}`}
        />
      </div>
      <p className="text-xs font-semibold text-[#1A1D2E] mb-0.5">Click to upload</p>
      <p className="text-[10px] text-gray-400 text-center leading-tight">{label}</p>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// STEP 3: Discovery Meeting Calendar
// ══════════════════════════════════════════════════════════════════
function StepDiscovery({
  weekDates,
  selectedSlot,
  onSelectSlot,
}: {
  weekDates: Date[];
  selectedSlot: { date: Date; time: string } | null;
  onSelectSlot: (slot: { date: Date; time: string } | null) => void;
}) {
  const isPast = (date: Date) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const check = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return check < today;
  };

  const isSelected = (date: Date, time: string) => {
    if (!selectedSlot) return false;
    return (
      selectedSlot.date.getDate() === date.getDate() &&
      selectedSlot.date.getMonth() === date.getMonth() &&
      selectedSlot.time === time
    );
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={fadeUp} custom={0} className="text-center">
        <div className="inline-flex items-center gap-2 bg-[#3257C2]/10 px-4 py-2 rounded-full mb-4">
          <Calendar className="size-4 text-[#3257C2]" />
          <span className="text-sm font-semibold text-[#3257C2]">15-minute introductory call</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1D2E] mb-2">
          Book Your Discovery Meeting
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          Choose a time that works for you. We&apos;ll walk through the Guardian program and answer any questions.
        </p>
      </motion.div>

      {/* Calendar Widget */}
      <motion.div
        variants={fadeUp}
        custom={1}
        className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden max-w-3xl mx-auto"
      >
        {/* Calendar header */}
        <div className="bg-[#F4F7F9] px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-[#3257C2]" />
              <h3 className="font-bold text-[#1A1D2E]">
                Week of {formatDateShort(weekDates[0])} – {formatDateShort(weekDates[4])}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Clock className="size-3.5" />
              30 min each
            </div>
          </div>
        </div>

        {/* Calendar grid */}
        <div className="p-6">
          {/* Time slot header */}
          <div className="grid grid-cols-[80px_1fr_1fr_1fr] sm:grid-cols-[100px_1fr_1fr_1fr] gap-3 mb-3">
            <div />
            {TIME_SLOTS.map((slot) => (
              <div key={slot} className="text-center text-xs font-semibold text-gray-400 uppercase tracking-wide">
                {slot}
              </div>
            ))}
          </div>

          {/* Day rows */}
          <div className="space-y-2">
            {weekDates.map((date, dayIdx) => {
              const past = isPast(date);
              return (
                <div
                  key={dayIdx}
                  className={`grid grid-cols-[80px_1fr_1fr_1fr] sm:grid-cols-[100px_1fr_1fr_1fr] gap-3 p-2 rounded-xl transition-colors ${
                    past ? 'opacity-40' : 'hover:bg-[#F4F7F9]'
                  }`}
                >
                  {/* Day label */}
                  <div className="flex flex-col items-start justify-center">
                    <span className="text-xs text-gray-400 font-medium uppercase">
                      {DAYS[dayIdx]}
                    </span>
                    <span className="text-lg font-bold text-[#1A1D2E]">
                      {date.getDate()}
                    </span>
                  </div>

                  {/* Time slots */}
                  {TIME_SLOTS.map((time) => {
                    const selected = isSelected(date, time);
                    return (
                      <button
                        key={time}
                        disabled={past}
                        onClick={() =>
                          onSelectSlot(
                            selected
                              ? null
                              : { date: new Date(date), time }
                          )
                        }
                        className={`
                          py-2.5 px-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200
                          ${
                            selected
                              ? 'bg-[#3257C2] text-white shadow-md shadow-[#3257C2]/25'
                              : past
                                ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                : 'bg-[#F4F7F9] text-[#1A1D2E] hover:bg-[#3257C2]/10 hover:text-[#3257C2] border border-gray-200 hover:border-[#3257C2]/30'
                          }
                        `}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected slot display */}
        <div className="px-6 pb-6">
          {selectedSlot ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#3257C2]/5 border border-[#3257C2]/20 rounded-xl p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-[#3257C2]/10 flex items-center justify-center">
                  <Calendar className="size-5 text-[#3257C2]" />
                </div>
                <div>
                  <p className="font-semibold text-[#1A1D2E] text-sm">
                    {formatDate(selectedSlot.date)}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="size-3" />
                    {selectedSlot.time} — 30 minutes
                  </p>
                </div>
              </div>
              <CheckCircle2 className="size-5 text-[#3ED1B8]" />
            </motion.div>
          ) : (
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-400">
                Select a date and time above to book your meeting
              </p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="px-6 pb-6">
          <Button
            disabled={!selectedSlot}
            className={`w-full font-bold text-base py-6 shadow-lg transition-all duration-300 ${
              selectedSlot
                ? 'bg-[#3ED1B8] hover:bg-[#34b9a2] text-white shadow-[#3ED1B8]/25'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
            }`}
          >
            {selectedSlot ? (
              <>
                Yes, I&apos;m interested — Book my Discovery Meeting
                <ArrowRight className="size-4" />
              </>
            ) : (
              <>
                Select a time to continue
                <Calendar className="size-4" />
              </>
            )}
          </Button>
        </div>
      </motion.div>

      {/* Trust signals */}
      <motion.div
        variants={fadeUp}
        custom={2}
        className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400"
      >
        {[
          { icon: Shield, text: 'No commitment required' },
          { icon: Clock, text: 'Free 15-minute call' },
          { icon: CheckCircle2, text: 'Cancel anytime' },
        ].map((item) => (
          <div key={item.text} className="flex items-center gap-1.5">
            <item.icon className="size-3.5" />
            {item.text}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
