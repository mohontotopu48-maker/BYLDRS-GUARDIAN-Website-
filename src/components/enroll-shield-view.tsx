'use client';

import { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  Lock,
  ArrowRight,
  User,
  Mail,
  MapPin,
  CheckCircle2,
  BadgeCheck,
  Zap,
  HardDrive,
  FileText,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';

const benefits = [
  { icon: Shield, text: 'Full 20-Point Shield access', color: 'text-[#3257C2]' },
  { icon: Lock, text: 'Encrypted Property Vault (5GB)', color: 'text-[#3ED1B8]' },
  { icon: Zap, text: 'Check My Pro risk reports', color: 'text-[#F5A623]' },
  { icon: FileText, text: 'Downloadable Shield playbook', color: 'text-[#CD7F32]' },
];

export function EnrollShieldView() {
  const { setCurrentPage, login, setShowEnrollSuccess } = useAppStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Enter a valid email';
    if (!zipCode.trim()) newErrors.zipCode = 'ZIP Code is required';
    else if (!/^\d{5}(-\d{4})?$/.test(zipCode.trim())) newErrors.zipCode = 'Enter a valid ZIP Code';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate enrollment
    await new Promise((resolve) => setTimeout(resolve, 1800));

    setIsSubmitting(false);
    login('homeowner');
    setShowEnrollSuccess(true);
    setCurrentPage('vault');
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white">
      {/* ─── Decorative Background ────────────────────────────── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[700px] h-[700px] rounded-full bg-[#3257C2]/[0.07] blur-[140px]" />
        <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] rounded-full bg-[#3ED1B8]/[0.05] blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-11rem)]">
          {/* ─── Left: Benefits / Pitch ───────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block"
          >
            {/* Shield Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8"
            >
              <div className="relative inline-flex">
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-[#3257C2] to-[#3ED1B8] flex items-center justify-center shadow-xl shadow-[#3257C2]/20">
                  <ShieldCheck className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-[#3ED1B8] flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="h-4 w-4 text-[#0A0D14]" />
                </div>
              </div>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-5">
              Activate Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3ED1B8] to-[#3257C2]">
                20-Point Shield
              </span>{' '}
              Protection
            </h1>

            <p className="text-base sm:text-lg text-white/45 leading-relaxed mb-10 max-w-md">
              Join thousands of California homeowners who trust BYLDRS GUARDIAN to
              verify Pros, protect their money, and secure every document in one
              encrypted vault. Free. No credit card. No catch.
            </p>

            {/* Benefits */}
            <div className="space-y-4">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="h-10 w-10 rounded-xl bg-white/[0.05] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                    <benefit.icon className={`h-5 w-5 ${benefit.color}`} />
                  </div>
                  <span className="text-sm font-medium text-white/60">{benefit.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Trust Signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-10 flex items-center gap-4"
            >
              <div className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-[#3ED1B8]" />
                <span className="text-[11px] font-semibold text-white/30 uppercase tracking-wider">256-bit Encrypted</span>
              </div>
              <div className="h-3 w-px bg-white/10" />
              <div className="flex items-center gap-1.5">
                <BadgeCheck className="h-3.5 w-3.5 text-[#3ED1B8]" />
                <span className="text-[11px] font-semibold text-white/30 uppercase tracking-wider">CSLB Verified</span>
              </div>
            </motion.div>
          </motion.div>

          {/* ─── Right: Enrollment Form ───────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto"
          >
            {/* Mobile-only headline */}
            <div className="lg:hidden mb-8 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-[#3257C2] to-[#3ED1B8] mb-4">
                <ShieldCheck className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight mb-3">
                Activate Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3ED1B8] to-[#3257C2]">
                  20-Point Shield
                </span>{' '}
                Protection
              </h1>
              <p className="text-sm text-white/40 leading-relaxed">
                Free for every California homeowner. No credit card required.
              </p>
            </div>

            {/* Glassmorphism Form Card */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-black/30">
              {/* Top accent */}
              <div className="h-0.5 w-full rounded-full bg-gradient-to-r from-[#3257C2] via-[#3ED1B8] to-[#3257C2] mb-6" />

              <h2 className="text-lg font-bold text-white mb-1">Create Your Account</h2>
              <p className="text-xs text-white/35 mb-6">It only takes 10 seconds to get protected.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                  <label htmlFor="enroll-name" className="block text-xs font-semibold text-white/50 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                    <input
                      id="enroll-name"
                      type="text"
                      value={name}
                      onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((p) => ({ ...p, name: '' })); }}
                      placeholder="John Smith"
                      className={`w-full h-12 pl-10 pr-4 rounded-xl bg-white/[0.04] border text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 transition-all ${
                        errors.name
                          ? 'border-red-500/50 focus:ring-red-500/20 focus:border-red-500/60'
                          : 'border-white/[0.08] focus:ring-[#3ED1B8]/20 focus:border-[#3ED1B8]/40'
                      }`}
                    />
                  </div>
                  {errors.name && <p className="mt-1 text-[11px] text-red-400 font-medium">{errors.name}</p>}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="enroll-email" className="block text-xs font-semibold text-white/50 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                    <input
                      id="enroll-email"
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: '' })); }}
                      placeholder="john@example.com"
                      className={`w-full h-12 pl-10 pr-4 rounded-xl bg-white/[0.04] border text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 transition-all ${
                        errors.email
                          ? 'border-red-500/50 focus:ring-red-500/20 focus:border-red-500/60'
                          : 'border-white/[0.08] focus:ring-[#3ED1B8]/20 focus:border-[#3ED1B8]/40'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-[11px] text-red-400 font-medium">{errors.email}</p>}
                </div>

                {/* ZIP Code Field */}
                <div>
                  <label htmlFor="enroll-zip" className="block text-xs font-semibold text-white/50 mb-1.5">
                    ZIP Code
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                    <input
                      id="enroll-zip"
                      type="text"
                      value={zipCode}
                      onChange={(e) => { setZipCode(e.target.value); if (errors.zipCode) setErrors((p) => ({ ...p, zipCode: '' })); }}
                      placeholder="90210"
                      maxLength={10}
                      className={`w-full h-12 pl-10 pr-4 rounded-xl bg-white/[0.04] border text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 transition-all ${
                        errors.zipCode
                          ? 'border-red-500/50 focus:ring-red-500/20 focus:border-red-500/60'
                          : 'border-white/[0.08] focus:ring-[#3ED1B8]/20 focus:border-[#3ED1B8]/40'
                      }`}
                    />
                  </div>
                  {errors.zipCode && <p className="mt-1 text-[11px] text-red-400 font-medium">{errors.zipCode}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 rounded-xl bg-[#3ED1B8] hover:bg-[#34b9a2] disabled:opacity-60 disabled:cursor-not-allowed text-[#0A0D14] font-bold text-base shadow-xl shadow-[#3ED1B8]/25 hover:shadow-[#3ED1B8]/35 transition-all duration-300 flex items-center justify-center gap-2.5 group"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="h-5 w-5 border-2 border-[#0A0D14]/20 border-t-[#0A0D14] rounded-full"
                      />
                      Activating...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-5 w-5" />
                      Unlock My Shield &amp; Vault
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>

              {/* Divider + trust text */}
              <div className="mt-5 flex items-center gap-3">
                <div className="flex-1 h-px bg-white/[0.06]" />
                <Lock className="h-3.5 w-3.5 text-white/15" />
                <div className="flex-1 h-px bg-white/[0.06]" />
              </div>
              <p className="text-center text-[10px] text-white/20 mt-2 leading-relaxed">
                Your data is encrypted and never shared. By enrolling, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
