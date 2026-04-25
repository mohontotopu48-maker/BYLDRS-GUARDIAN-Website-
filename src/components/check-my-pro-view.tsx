'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AuditEngine } from '@/components/audit-engine';
import { useAppStore } from '@/lib/store';

/* ───────────────────────── fade-up animation ───────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: 'easeOut' as const },
  }),
};

/* ───────────────────────── component ───────────────────────────────── */
export function CheckMyProView() {
  const { setCurrentPage } = useAppStore();

  return (
    <section className="min-h-screen bg-[#F4F7F9]">
      {/* ───── Dark Header Banner ───── */}
      <motion.div
        initial="hidden"
        animate="visible"
        className="relative overflow-hidden bg-gradient-to-br from-[#0F1219] via-[#242845] to-[#1A1D2E] pt-28 pb-20 px-4 sm:px-6 lg:px-8"
      >
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#3257C2]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#3ED1B8]/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          <motion.div variants={fadeUp} custom={0}>
            <Badge className="mb-4 bg-[#3ED1B8]/20 text-[#3ED1B8] border border-[#3ED1B8]/30 px-3 py-1 text-sm font-medium">
              <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
              Safety Check Tool
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white"
          >
            Check My{' '}
            <span className="text-[#3257C2]">Pro</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="mx-auto mt-4 max-w-2xl text-lg text-white/70"
          >
            Got a quote? Tell us who you&apos;re hiring. We&apos;ll check their
            license, insurance, and the law to make sure your home and money are
            safe.
          </motion.p>

          {/* breadcrumb back */}
          <motion.div variants={fadeUp} custom={3} className="mt-8">
            <Button
              variant="ghost"
              onClick={() => setCurrentPage('home')}
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
              Back to Home
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* ───── Content Area ───── */}
      <div className="bg-white">
        <AuditEngine />
      </div>
    </section>
  );
}
