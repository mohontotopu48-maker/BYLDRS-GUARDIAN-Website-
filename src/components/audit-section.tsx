'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Upload,
  CheckCircle2,
  Shield,
  FileWarning,
  DollarSign,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react';
import { motion } from 'framer-motion';

const bulletPoints = [
  {
    icon: Shield,
    text: 'We cross-check licenses, insurance, and complaint history against state records in real time.',
  },
  {
    icon: FileWarning,
    text: 'Our experts flag red flags like inflated pricing, missing permits, or expired bonds.',
  },
  {
    icon: DollarSign,
    text: 'Get a free market comparison — know if your bid is fair, high, or suspiciously low.',
  },
];

export function AuditSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="audit-section"
      className="relative bg-[#F4F7F9] py-16 lg:py-24"
    >
      {/* Subtle Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #1A1D2E 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#3ED1B8]/10 px-4 py-1.5 mb-4">
            <AlertTriangle className="h-3.5 w-3.5 text-[#3ED1B8]" />
            <span className="text-xs font-semibold text-[#3ED1B8] tracking-wide uppercase">
              Contractor Verification
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1A1D2E]">
            Audit My Contractor
          </h2>
          <p className="mt-4 text-lg text-[#1A1D2E]/60 max-w-2xl mx-auto">
            Don&apos;t sign on the dotted line until you know for sure.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-lg shadow-[#1A1D2E]/[0.04] border border-[#E5E7EB]/60">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1A1D2E] leading-snug">
                Got an outside bid?
                <br />
                <span className="text-[#3257C2]">
                  Don&apos;t sign until you know.
                </span>
              </h3>
              <p className="mt-4 text-[#1A1D2E]/60 leading-relaxed">
                Our free audit service reviews your contractor&apos;s bid,
                background, and credentials — giving you the confidence to make
                the right decision.
              </p>

              <div className="mt-8 space-y-6">
                {bulletPoints.map((point, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="h-8 w-8 rounded-lg bg-[#3ED1B8]/10 flex items-center justify-center">
                        <point.icon className="h-4 w-4 text-[#3ED1B8]" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1A1D2E] leading-relaxed">
                        {point.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats Row */}
              <div className="mt-10 pt-8 border-t border-[#E5E7EB] grid grid-cols-3 gap-4">
                {[
                  { value: '98%', label: 'Red Flags Caught' },
                  { value: '$2.4M', label: 'Saved for Homeowners' },
                  { value: '15k+', label: 'Audits Completed' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-xl sm:text-2xl font-extrabold text-[#3257C2]">
                      {stat.value}
                    </div>
                    <div className="text-xs text-[#1A1D2E]/50 mt-1 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Lead Capture Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          >
            <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl shadow-[#1A1D2E]/[0.06] border border-[#E5E7EB]/60">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-[#3257C2]/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-[#3257C2]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1A1D2E]">
                    Free Audit Request
                  </h3>
                  <p className="text-xs text-[#1A1D2E]/50">
                    We&apos;ll review within 24 hours
                  </p>
                </div>
              </div>

              {submitted ? (
                <div className="text-center py-10">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-[#3ED1B8]/10 mb-4">
                    <CheckCircle2 className="h-8 w-8 text-[#3ED1B8]" />
                  </div>
                  <h4 className="text-xl font-bold text-[#1A1D2E] mb-2">
                    Request Submitted!
                  </h4>
                  <p className="text-sm text-[#1A1D2E]/60 max-w-sm mx-auto">
                    Our team will review your contractor and get back to you
                    within 24 hours. Check your email for confirmation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1A1D2E] mb-1.5">
                      Contractor Name
                    </label>
                    <Input
                      required
                      placeholder="e.g. ABC Roofing Co."
                      className="h-12 rounded-lg border-[#E5E7EB] bg-[#F4F7F9] text-sm placeholder:text-[#1A1D2E]/30"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1A1D2E] mb-1.5">
                      Bid Amount ($)
                    </label>
                    <Input
                      required
                      type="number"
                      placeholder="e.g. 15000"
                      className="h-12 rounded-lg border-[#E5E7EB] bg-[#F4F7F9] text-sm placeholder:text-[#1A1D2E]/30"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1A1D2E] mb-1.5">
                      Upload Bid Document (Optional)
                    </label>
                    <div className="border-2 border-dashed border-[#E5E7EB] rounded-lg p-6 text-center hover:border-[#3257C2]/30 transition-colors cursor-pointer bg-[#F4F7F9]/50">
                      <Upload className="h-6 w-6 text-[#1A1D2E]/30 mx-auto mb-2" />
                      <p className="text-sm text-[#1A1D2E]/50">
                        <span className="font-medium text-[#3257C2]">
                          Click to upload
                        </span>{' '}
                        or drag and drop
                      </p>
                      <p className="text-xs text-[#1A1D2E]/30 mt-1">
                        PDF, DOC, or JPG (max 10MB)
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1A1D2E] mb-1.5">
                      Your Email
                    </label>
                    <Input
                      required
                      type="email"
                      placeholder="you@example.com"
                      className="h-12 rounded-lg border-[#E5E7EB] bg-[#F4F7F9] text-sm placeholder:text-[#1A1D2E]/30"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1A1D2E] mb-1.5">
                      Additional Notes (Optional)
                    </label>
                    <Textarea
                      placeholder="Any concerns about this contractor or bid?"
                      rows={3}
                      className="rounded-lg border-[#E5E7EB] bg-[#F4F7F9] text-sm placeholder:text-[#1A1D2E]/30 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 rounded-lg bg-[#3ED1B8] hover:bg-[#36bda6] text-white font-bold text-base shadow-lg shadow-[#3ED1B8]/20 hover:shadow-xl hover:shadow-[#3ED1B8]/30 transition-all duration-300 group mt-2"
                  >
                    Submit Audit Request
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>

                  <p className="text-center text-xs text-[#1A1D2E]/40 mt-3">
                    🔒 Your information is secure and never shared with
                    contractors.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
