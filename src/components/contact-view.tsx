'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Send,
  Building2,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
};

export function ContactView() {
  const { setCurrentPage } = useAppStore();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [subject, setSubject] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = {
      name: (form.elements.namedItem('contact-name') as HTMLInputElement)?.value || '',
      email: (form.elements.namedItem('contact-email') as HTMLInputElement)?.value || '',
      phone: (form.elements.namedItem('contact-phone') as HTMLInputElement)?.value || '',
      subject,
      message: (form.elements.namedItem('contact-message') as HTMLTextAreaElement)?.value || '',
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setFormError(data.error || 'Something went wrong. Please try again.');
        return;
      }

      setSubmitted(true);
    } catch {
      setFormError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-white pt-24 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0F1219] to-[#1A1D2E] py-12 sm:py-16 -mt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#3ED1B8]/10 px-4 py-1.5 mb-4">
              <Phone className="h-3.5 w-3.5 text-[#3ED1B8]" />
              <span className="text-xs font-semibold text-[#3ED1B8] tracking-wide uppercase">
                Get in Touch
              </span>
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-white/50 max-w-xl mx-auto">
              We&apos;re here to protect your property. Reach out anytime.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Office Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="grid sm:grid-cols-3 gap-4 lg:gap-6 mb-12"
        >
          {[
            {
              icon: Building2,
              title: 'LA Office',
              address: '12510 Mc Cann Dr.',
              city: 'Santa Fe Springs, CA 90670',
              color: 'text-[#3257C2]',
              bg: 'bg-[#3257C2]/[0.07]',
            },
            {
              icon: MapPin,
              title: 'OC Office',
              address: 'Irvine Spectrum Center',
              city: 'Irvine, CA 92618',
              color: 'text-[#3ED1B8]',
              bg: 'bg-[#3ED1B8]/[0.07]',
            },
            {
              icon: Phone,
              title: 'Phone',
              address: '562-944-0500',
              city: 'Mon–Fri 8:00 AM – 5:00 PM PST',
              color: 'text-[#F5A623]',
              bg: 'bg-[#F5A623]/[0.07]',
            },
          ].map((office, i) => (
            <motion.div
              key={office.title}
              variants={fadeUp}
              custom={i + 1}
              className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-lg shadow-[#1A1D2E]/[0.04] hover:shadow-xl transition-shadow"
            >
              <div className={`h-11 w-11 rounded-lg ${office.bg} flex items-center justify-center mb-4`}>
                <office.icon className={`h-5 w-5 ${office.color}`} />
              </div>
              <h3 className="text-sm font-bold text-[#1A1D2E] mb-1">{office.title}</h3>
              <p className="text-sm text-[#1A1D2E]/70">{office.address}</p>
              <p className="text-xs text-[#1A1D2E]/40 mt-0.5">{office.city}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Form + Social */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white rounded-2xl border border-[#E5E7EB] p-6 sm:p-8 shadow-lg shadow-[#1A1D2E]/[0.04]"
          >
            <h2 className="text-xl font-bold text-[#1A1D2E] mb-6">Send Us a Message</h2>

            {submitted ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-[#3ED1B8]/10 mb-4">
                  <CheckCircle2 className="h-8 w-8 text-[#3ED1B8]" />
                </div>
                <h3 className="text-xl font-bold text-[#1A1D2E] mb-2">Message Sent!</h3>
                <p className="text-sm text-[#1A1D2E]/60 max-w-sm mx-auto">
                  We&apos;ll get back to you within 24 hours. For urgent matters, call us at 562-944-0500.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {formError && (
                  <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                    {formError}
                  </div>
                )}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-[#1A1D2E] mb-1.5 block">
                      Full Name
                    </Label>
                    <Input
                      required
                      name="contact-name"
                      placeholder="Your full name"
                      className="h-12 rounded-lg border-[#E5E7EB] bg-[#F4F7F9] text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-[#1A1D2E] mb-1.5 block">
                      Email
                    </Label>
                    <Input
                      required
                      name="contact-email"
                      type="email"
                      placeholder="you@example.com"
                      className="h-12 rounded-lg border-[#E5E7EB] bg-[#F4F7F9] text-sm"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-[#1A1D2E] mb-1.5 block">
                      Phone
                    </Label>
                    <Input
                      name="contact-phone"
                      placeholder="(555) 555-5555"
                      className="h-12 rounded-lg border-[#E5E7EB] bg-[#F4F7F9] text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-[#1A1D2E] mb-1.5 block">
                      Subject
                    </Label>
                    <Select value={subject} onValueChange={setSubject}>
                      <SelectTrigger className="h-12 rounded-lg border-[#E5E7EB] bg-[#F4F7F9] text-sm">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="find-pro">I need help finding a Pro</SelectItem>
                        <SelectItem value="check-quote">I need help checking a quote</SelectItem>
                        <SelectItem value="billing">Billing / Account help</SelectItem>
                        <SelectItem value="report-pro">I want to report a Pro</SelectItem>
                        <SelectItem value="other">Other (Please specify below)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-[#1A1D2E] mb-1.5 block">
                    Message
                  </Label>
                  <Textarea
                    required
                    name="contact-message"
                    placeholder="Tell us more about your project or the problem you're trying to solve..."
                    rows={6}
                    className={`rounded-lg bg-[#F4F7F9] text-sm resize-none transition-all duration-200 ${
                      subject === 'other'
                        ? 'border-2 border-[#3257C2] ring-2 ring-[#3257C2]/20 shadow-sm shadow-[#3257C2]/10'
                        : 'border border-[#E5E7EB]'
                    }`}
                  />
                  {subject === 'other' && (
                    <p className="text-xs text-[#3257C2] font-medium mt-1.5 flex items-center gap-1.5">
                      <span className="inline-block size-1.5 rounded-full bg-[#3257C2] animate-pulse" />
                      Please describe your request in detail above so we can help you faster.
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 rounded-lg bg-[#3257C2] hover:bg-[#2a49a8] text-white font-semibold text-sm shadow-lg shadow-[#3257C2]/20 hover:shadow-xl transition-all duration-300 group disabled:opacity-50"
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                  {!submitting && <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Map Placeholder */}
            <div className="bg-[#F4F7F9] rounded-xl border border-[#E5E7EB] h-48 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 1px 1px, #1A1D2E 1px, transparent 0)',
                  backgroundSize: '20px 20px',
                }}
              />
              {/* LA Marker */}
              <div className="absolute top-1/3 left-1/3 flex flex-col items-center">
                <div className="h-4 w-4 rounded-full bg-[#3257C2] shadow-lg shadow-[#3257C2]/40 animate-pulse" />
                <div className="text-[9px] font-bold text-[#3257C2] bg-white px-1.5 py-0.5 rounded shadow-sm mt-1">
                  LA
                </div>
              </div>
              {/* OC Marker */}
              <div className="absolute top-1/2 right-1/4 flex flex-col items-center">
                <div className="h-4 w-4 rounded-full bg-[#3ED1B8] shadow-lg shadow-[#3ED1B8]/40 animate-pulse" />
                <div className="text-[9px] font-bold text-[#3ED1B8] bg-white px-1.5 py-0.5 rounded shadow-sm mt-1">
                  OC
                </div>
              </div>
              {/* Dashed line */}
              <div className="absolute top-[45%] left-[38%] right-[30%] border-t-2 border-dashed border-[#1A1D2E]/10" />
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-[#F5A623]/[0.07] flex items-center justify-center">
                  <Clock className="h-5 w-5 text-[#F5A623]" />
                </div>
                <h3 className="text-sm font-bold text-[#1A1D2E]">Business Hours</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#1A1D2E]/60">Monday – Friday</span>
                  <span className="font-semibold text-[#1A1D2E]">8:00 AM – 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1A1D2E]/60">Saturday</span>
                  <span className="font-semibold text-[#1A1D2E]">9:00 AM – 1:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1A1D2E]/60">Sunday</span>
                  <span className="font-semibold text-[#1A1D2E]/40">Closed</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
              <h3 className="text-sm font-bold text-[#1A1D2E] mb-4">Follow Us</h3>
              <div className="flex items-center gap-3">
                {[
                  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
                  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
                  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="h-11 w-11 rounded-xl bg-[#F4F7F9] hover:bg-[#3257C2] flex items-center justify-center transition-all duration-200 group/soc border border-transparent hover:border-[#3257C2]/20 hover:shadow-lg hover:shadow-[#3257C2]/10"
                  >
                    <social.icon className="h-5 w-5 text-[#1A1D2E]/50 group-hover/soc:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick CTA */}
            <button
              onClick={() => setCurrentPage('home')}
              className="w-full text-sm font-medium text-[#3257C2] hover:underline flex items-center gap-1.5"
            >
              <ArrowRight className="h-3.5 w-3.5" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
