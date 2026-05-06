'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Scale,
  ClipboardList,
  FolderOpen,
  Download,
  ArrowRight,
  CheckCircle2,
  FileText,
  Lock,
  Users,
  Sparkles,
  Shield,
  Shovel,
  Trash2,
  CloudRain,
  HardHat,
  PackageCheck,
  PenTool,
  MessageSquare,
  BadgeCheck,
  UserCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';

/* ───────────────────────── animations ─────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const childFade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ───────────────────────── all 20 points for unlock animation ────── */
const allPoints = [
  { num: 1, label: 'CSLB License Verification', section: 'Audit' },
  { num: 2, label: 'Workers\' Comp Check', section: 'Audit' },
  { num: 3, label: 'GL Insurance ($1M+)', section: 'Audit' },
  { num: 4, label: 'Bond Verification', section: 'Audit' },
  { num: 5, label: 'Complaint History Review', section: 'Audit' },
  { num: 6, label: 'Background Check', section: 'Audit' },
  { num: 7, label: 'Reference Verification', section: 'Audit' },
  { num: 8, label: 'Vehicle & Uniform ID', section: 'Audit' },
  { num: 9, label: 'Property Protection', section: 'Audit' },
  { num: 10, label: 'Anti-Ghosting Guarantee', section: 'Audit' },
  { num: 11, label: 'Property Shielding', section: 'Site' },
  { num: 12, label: 'Utility Mapping (811)', section: 'Site' },
  { num: 13, label: 'Debris Management', section: 'Site' },
  { num: 14, label: 'Weather Preparedness', section: 'Site' },
  { num: 15, label: 'Sub-Contractor Vetting', section: 'Site' },
  { num: 16, label: 'Material Verification', section: 'Integrity' },
  { num: 17, label: 'Change Order Protocol', section: 'Integrity' },
  { num: 18, label: '24h Communication', section: 'Integrity' },
  { num: 19, label: 'Permit Close-out', section: 'Integrity' },
  { num: 20, label: 'Anti-Ghosting Guarantee', section: 'Integrity' },
];

const sectionColors: Record<string, string> = {
  Audit: '#3257C2',
  Site: '#F5A623',
  Integrity: '#3ED1B8',
};

/* ───────────────────────── feature data ───────────────────────────── */
const guideFeatures = [
  {
    icon: Scale,
    title: 'Contractor Law Cheat Sheet',
    subtitle: 'The $1,000 Deposit Limit',
    description:
      'California Business & Professions Code §7159 caps your deposit at $1,000 — period. Learn the exact language to use when a Pro demands more, plus the legal recourse available to you.',
    accent: '#3257C2',
    points: '1–10',
    items: [
      'Exact CA BPC §7159 statute text',
      'What to say when asked for 30-50% upfront',
      'Milestone payment template',
      'Mechanic\'s lien prevention checklist',
    ],
  },
  {
    icon: ClipboardList,
    title: '30-Day Audit Checklist',
    subtitle: 'How to verify their Health Score',
    description:
      'The same 20-point checklist our auditors use to score every Pro. CSLB license, workers\' comp, GL insurance, complaint history — all verified in a structured repeatable process.',
    accent: '#3ED1B8',
    points: '1–10',
    items: [
      '20-point Guardian verification scorecard',
      'CSLB real-time lookup instructions',
      'Workers\' comp cross-reference steps',
      'Insurance minimum thresholds ($1M+ GL)',
    ],
  },
  {
    icon: FolderOpen,
    title: 'The Vault Organizer',
    subtitle: 'Where to store your 4 core documents',
    description:
      'Never scramble for paperwork again. The Vault Organizer gives you a simple folder structure for the 4 essential documents every homeowner needs before, during, and after a project.',
    accent: '#F5A623',
    points: '—',
    items: [
      'Signed contract + change orders',
      'Insurance certificates & bonds',
      'Permit & inspection records',
      'Final lien release & warranty docs',
    ],
  },
  {
    icon: Shield,
    title: 'Site & Property Protection',
    subtitle: 'Points 11–15: Keeping your home safe during work',
    description:
      'From mandatory drop cloths to daily magnetic sweeps, this section ensures your property is shielded at every stage. Covers utility mapping, debris protocols, weather prep, and sub-contractor insurance.',
    accent: '#F5A623',
    points: '11–15',
    items: [
      'Property shielding & dust barrier protocols',
      'Utility mapping: "Call Before You Dig" (811)',
      'Daily magnetic sweeps & hazardous disposal',
      'Weather preparedness & tarping before 5 PM',
      'Sub-contractor insurance vetting steps',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Project Integrity & Ethics',
    subtitle: 'Points 16–20: No blind spots, no excuses',
    description:
      'Material verification, written-only change orders, guaranteed 24-hour response times, mandatory final inspections, and our ironclad anti-ghosting guarantee. This is where good enough isn\'t good enough.',
    accent: '#3ED1B8',
    points: '16–20',
    items: [
      'Material brand/grade match verification',
      'Change order protocol (no verbal agreements)',
      '24-hour guaranteed response time',
      'Municipal permit close-out before final payment',
      'Anti-ghosting: continuous on-site presence guarantee',
    ],
  },
];

/* ───────────────────────── stat counters ──────────────────────────── */
const stats = [
  { value: '20', suffix: '', label: 'Verification checkpoints', icon: ShieldCheck },
  { value: '5', suffix: '', label: 'Core sections', icon: FileText },
  { value: '100%', suffix: '', label: 'Free — no catch', icon: Lock },
  { value: '4.9', suffix: '/5', label: 'Homeowner rating', icon: Users },
];

/* ───────────────────────── component ──────────────────────────────── */
export function ProtectionGuideDownloadView() {
  const { setCurrentPage } = useAppStore();
  const [downloading, setDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [unlockProgress, setUnlockProgress] = useState(0);

  // Animate unlock points one by one
  useEffect(() => {
    if (!downloading) return;
    let current = 0;
    const interval = setInterval(() => {
      current++;
      setUnlockProgress(current);
      if (current >= 20) clearInterval(interval);
    }, 100); // 20 points over ~2s
    return () => clearInterval(interval);
  }, [downloading]);

  const handleDownload = async () => {
    setDownloading(true);
    setUnlockProgress(0);

    // Wait for unlock animation to finish
    await new Promise((r) => setTimeout(r, 2500));

    const content = `
═══════════════════════════════════════════════════════════════════
       BYLDRS GUARDIAN — THE 20-POINT SHIELD
       The Full 20-Point Shield: No Blind Spots
       California Edition — Free Download
═══════════════════════════════════════════════════════════════════

──────────────────────────────────────────────────────────────────────
SECTION 1: CONTRACTOR LAW CHEAT SHEET (The $1,000 Deposit Limit)
──────────────────────────────────────────────────────────────────────

  California Business & Professions Code §7159 caps your
  upfront deposit at $1,000 — regardless of project size.

  Key protections:
  • Maximum upfront deposit: $1,000
  • Milestone payments must be tied to completed work stages
  • All change orders require written, signed approval
  • Final payment released only after satisfactory completion
  • Mechanic's lien prevention documentation required

──────────────────────────────────────────────────────────────────────
SECTION 2: 30-DAY AUDIT CHECKLIST (How to Verify Their Health Score)
──────────────────────────────────────────────────────────────────────

  Every BYLDRS GUARDIAN Pro undergoes this audit every 30 days.

  POINT 1 — CSLB License Verification
    Verify the Pro's CSLB license number at cslb.ca.gov.
    Confirm it's active, in good standing, and matches the
    trade classification for your project.

  POINT 2 — Workers' Compensation Insurance
    Cross-reference the Pro's workers' comp policy with the
    California Department of Industrial Relations database.
    Policy must be active and cover the specific trade.

  POINT 3 — General Liability Insurance ($1M+)
    Confirm minimum $1M general liability coverage.
    Request a current Certificate of Insurance (COI).

  POINT 4 — Bond Verification
    Verify the contractor's license bond is active and
    meets state minimum requirements.

  POINT 5 — Complaint History Review
    Review CSLB complaint records. Check for unresolved
    complaints, citations, or disciplinary actions.

  POINT 6 — Background Check
    Government-issued ID on file. No criminal history
    that would pose a risk to homeowner safety.

  POINT 7 — Reference Verification
    Minimum 3 verified references with before/after photos
    from completed projects within the last 12 months.

  POINT 8 — Vehicle & Uniform Identification
    Branded vehicles and uniforms. No mystery workers
    at your door — every person on-site is identifiable.

  POINT 9 — Property Protection Protocols
    Documented procedures for shielding landscaping,
    hardscape, HVAC, and interior surfaces during work.

  POINT 10 — Anti-Ghosting Guarantee
    Guaranteed response within 24 hours. Continuous
    on-site presence as scheduled until milestones are met.

──────────────────────────────────────────────────────────────────────
SECTION 3: THE VAULT ORGANIZER (Where to Store Your 4 Core Documents)
──────────────────────────────────────────────────────────────────────

  FOLDER 1 — CONTRACT
    • Signed original contract
    • All change orders (dated & signed)
    • Scope of work document
    • Payment schedule

  FOLDER 2 — INSURANCE
    • Contractor's GL certificate
    • Workers' comp certificate
    • Bond documentation
    • Your homeowner's insurance policy

  FOLDER 3 — PERMITS
    • Building permits (copies)
    • Inspection reports
    • Correction notices (if any)
    • Final municipal sign-off

  FOLDER 4 — COMPLETION
    • Final lien release
    • Warranty documentation
    • Before/after photos
    • Maintenance schedule

──────────────────────────────────────────────────────────────────────
SECTION 4: SITE & PROPERTY PROTECTION (Points 11–15)
──────────────────────────────────────────────────────────────────────

  POINT 11 — Property Shielding
    Mandatory use of drop cloths, floor runners, and zip-wall
    dust barriers before any work begins. Your home is not a
    job site — it's your property.

  POINT 12 — Utility Mapping
    Verification of "Call Before You Dig" (811) compliance
    and internal line marking before excavation or heavy
    equipment work.

  POINT 13 — Debris Management
    Daily magnetic sweeps for nails and screws. Safe disposal
    of hazardous materials per EPA and local regulations.
    Site must be broom-clean before crew departs.

  POINT 14 — Weather Preparedness
    All open projects (roofs, foundations, framing) must be
    tarped and secured before 5:00 PM daily. No exceptions.

  POINT 15 — Sub-Contractor Vetting
    Every sub-contractor on-site must be covered under the
    primary Pro's insurance policy. Verify COI for each
    sub before they begin work.

──────────────────────────────────────────────────────────────────────
SECTION 5: PROJECT INTEGRITY & ETHICS (Points 16–20)
──────────────────────────────────────────────────────────────────────

  POINT 16 — Material Verification
    Delivered materials must match the specific brand, grade,
    and model listed in the contract. No substitutions without
    documented written approval.

  POINT 17 — Change Order Protocol
    No verbal agreements — ever. All scope changes, material
    substitutions, and timeline adjustments must be documented
    in writing and signed by both parties BEFORE work begins.

  POINT 18 — Communication Standard
    Guaranteed 24-hour response time on all project updates,
    questions, and concerns. If you reach out, they respond.

  POINT 19 — Permit Close-Out
    Mandatory final municipal inspection must be completed
    and passed before the final payment is released. No
    exceptions. No final check until the city signs off.

  POINT 20 — Anti-Ghosting Guarantee
    Continuous on-site presence as scheduled until all
    project milestones are met. If the Pro disappears
    mid-project, BYLDRS GUARDIAN intervenes immediately.

═══════════════════════════════════════════════════════════════════
  This guide is provided free of charge by BYLDRS GUARDIAN.
  Print it. Bring it to every bid. Hold every Pro accountable.

  For the most up-to-date version, visit:
  https://byldersguardian.com/the-standard
═══════════════════════════════════════════════════════════════════
`.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'BYLDRS_GUARDIAN_20_Point_Shield.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloading(false);
    setDownloadComplete(true);
  };

  return (
    <section className="min-h-screen">
      {/* ═══════════════════════════════════════════════════════════════
          HERO — Elite Dark Theme
          ═══════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden bg-[#0A0D14]">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Gradient orbs */}
        <div className="pointer-events-none absolute -top-32 right-1/4 h-[600px] w-[600px] rounded-full bg-[#3257C2]/[0.07] blur-[140px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-[#3ED1B8]/[0.05] blur-[100px]" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-[100px] lg:pt-[110px] pb-20 sm:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* ── Left: Text Content ── */}
            <motion.div initial="hidden" animate="visible" className="text-center lg:text-left">
              {/* Badge */}
              <motion.div variants={fadeUp} custom={0} className="mb-6">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#3ED1B8]/[0.08] border border-[#3ED1B8]/20 px-5 py-2 text-xs font-bold tracking-widest uppercase text-[#3ED1B8]/80">
                  <Sparkles className="h-3.5 w-3.5" />
                  20 points — fully expanded
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                custom={1}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-white leading-[1.08] mb-5"
              >
                The Full 20-Point Shield:
                <br />
                <span className="bg-gradient-to-r from-[#3ED1B8] via-[#3257C2] to-[#3ED1B8] bg-clip-text text-transparent">
                  No Blind Spots.
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-base sm:text-lg text-white/40 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
              >
                Contractor law, audit checklists, site protection, project integrity, and
                document vaults — all 20 verification points in one complete playbook.
              </motion.p>

              {/* Quick stats row */}
              <motion.div
                variants={fadeUp}
                custom={3}
                className="flex flex-wrap justify-center lg:justify-start gap-5 sm:gap-6 mb-10"
              >
                {stats.map((stat) => {
                  const StatIcon = stat.icon;
                  return (
                    <div key={stat.label} className="flex items-center gap-2.5">
                      <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-white/[0.05]">
                        <StatIcon className="h-4 w-4 text-[#3ED1B8]" />
                      </div>
                      <div className="leading-tight">
                        <span className="text-sm font-bold text-white">
                          {stat.value}{stat.suffix}
                        </span>
                        <span className="block text-[11px] text-white/30 font-medium">
                          {stat.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </motion.div>

              {/* Primary CTA — Download / Unlock Animation */}
              <motion.div variants={fadeUp} custom={4}>
                <AnimatePresence mode="wait">
                  {/* ── DOWNLOADING: 20-Point Unlock Animation ── */}
                  {downloading && (
                    <motion.div
                      key="unlocking"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="max-w-md mx-auto lg:mx-0"
                    >
                      {/* Progress header */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold text-white flex items-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                            className="h-4 w-4 border-2 border-[#3ED1B8]/30 border-t-[#3ED1B8] rounded-full"
                          />
                          Unlocking your shield...
                        </span>
                        <span className="text-sm font-bold text-[#3ED1B8]">
                          {unlockProgress}/20
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden mb-5">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-[#3257C2] via-[#3ED1B8] to-[#3257C2]"
                          initial={{ width: '0%' }}
                          animate={{ width: `${(unlockProgress / 20) * 100}%` }}
                          transition={{ duration: 0.15, ease: 'easeOut' }}
                        />
                      </div>

                      {/* Scrolling point cards */}
                      <div className="grid grid-cols-2 sm:grid-cols-2 gap-1.5 max-h-[280px] overflow-hidden">
                        {allPoints.map((point, idx) => {
                          const unlocked = idx < unlockProgress;
                          const color = sectionColors[point.section];
                          return (
                            <motion.div
                              key={point.num}
                              initial={{ opacity: 0.15, scale: 0.95 }}
                              animate={{
                                opacity: unlocked ? 1 : 0.2,
                                scale: unlocked ? 1 : 0.95,
                              }}
                              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                              className="flex items-center gap-2 rounded-lg px-2.5 py-2 border transition-colors duration-300"
                              style={{
                                backgroundColor: unlocked ? `${color}08` : 'transparent',
                                borderColor: unlocked ? `${color}20` : 'rgba(255,255,255,0.04)',
                              }}
                            >
                              <motion.div
                                initial={false}
                                animate={{
                                  backgroundColor: unlocked ? color : 'rgba(255,255,255,0.06)',
                                }}
                                className="flex items-center justify-center h-5 w-5 rounded-md shrink-0"
                              >
                                {unlocked ? (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                                  >
                                    <CheckCircle2 className="h-3.5 w-3.5 text-[#0A0D14]" />
                                  </motion.div>
                                ) : (
                                  <span className="text-[9px] font-bold text-white/30">{point.num}</span>
                                )}
                              </motion.div>
                              <span
                                className="text-[11px] font-semibold leading-tight truncate"
                                style={{ color: unlocked ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.2)' }}
                              >
                                {point.label}
                              </span>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* ── DEFAULT: Download Button ── */}
                  {!downloading && !downloadComplete && (
                    <motion.div
                      key="download-btn"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Button
                        onClick={handleDownload}
                        size="lg"
                        className="h-14 px-8 sm:px-10 rounded-xl bg-[#3ED1B8] hover:bg-[#34b9a2] text-[#0A0D14] font-bold text-sm shadow-xl shadow-[#3ED1B8]/20 hover:shadow-[#3ED1B8]/30 transition-all duration-300 group"
                      >
                        <Download className="mr-2 h-5 w-5" />
                        Download My 20-Point Shield
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                      <p className="mt-4 text-[11px] text-white/20">
                        Instant download &middot; No email required &middot; All 20 points included
                      </p>
                    </motion.div>
                  )}

                  {/* ── COMPLETE: Success State ── */}
                  {downloadComplete && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-col items-center lg:items-start gap-4"
                    >
                      {/* Verified checkmark with ring pulse */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                      >
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: [0.8, 1.8], opacity: [0.5, 0] }}
                          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
                          className="absolute inset-0 rounded-full bg-[#3ED1B8]/20"
                          style={{ margin: '-10px' }}
                        />
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: [0.8, 2.2], opacity: [0.3, 0] }}
                          transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
                          className="absolute inset-0 rounded-full bg-[#3257C2]/10"
                          style={{ margin: '-10px' }}
                        />
                        <div className="relative flex items-center justify-center h-16 w-16 rounded-full bg-[#3ED1B8]/15 border-2 border-[#3ED1B8]/30">
                          <motion.div
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <CheckCircle2 className="h-8 w-8 text-[#3ED1B8]" />
                          </motion.div>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                      >
                        <p className="text-lg font-bold text-white">
                          All 20 points unlocked!
                        </p>
                        <p className="text-sm text-white/40 mt-1">
                          Check your downloads folder. Print it and bring it to every bid.
                        </p>
                      </motion.div>

                      {/* Mini 20-point summary */}
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.4 }}
                        className="flex items-center gap-2 flex-wrap"
                      >
                        {['Contractor Law', 'Audit Checklist', 'Vault Organizer', 'Site Protection', 'Project Ethics'].map((tag, i) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold border"
                            style={{
                              color: ['#3257C2', '#3ED1B8', '#F5A623', '#F5A623', '#3ED1B8'][i],
                              backgroundColor: `${['#3257C2', '#3ED1B8', '#F5A623', '#F5A623', '#3ED1B8'][i]}10`,
                              borderColor: `${['#3257C2', '#3ED1B8', '#F5A623', '#F5A623', '#3ED1B8'][i]}20`,
                            }}
                          >
                            <CheckCircle2 className="h-2.5 w-2.5" />
                            {tag}
                          </span>
                        ))}
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.4 }}
                        className="flex items-center gap-3"
                      >
                        <Button
                          variant="ghost"
                          onClick={handleDownload}
                          size="sm"
                          className="rounded-lg text-white/50 hover:text-white hover:bg-white/[0.06] text-sm font-medium"
                        >
                          <Download className="mr-1.5 h-3.5 w-3.5" />
                          Download again
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => setCurrentPage('check-my-pro')}
                          size="sm"
                          className="rounded-lg text-[#3ED1B8]/70 hover:text-[#3ED1B8] hover:bg-[#3ED1B8]/[0.06] text-sm font-medium"
                        >
                          Now, Check My Pro
                          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </Button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>

            {/* ── Right: 20-Point Shield Video + Book Mockup ── */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col items-center gap-6"
            >
              {/* NotebookLM Video Embed — The Hook */}
              <div className="relative w-full">
                {/* Glow behind video */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[400px] rounded-full bg-[#3ED1B8]/[0.08] blur-[80px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[200px] w-[300px] rounded-full bg-[#3257C2]/[0.06] blur-[60px]" />

                <div className="relative z-10 rounded-xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/40">
                  <div className="relative">
                    <div className="bg-[#1A1D2E] px-4 py-2.5 flex items-center gap-2.5">
                      <div className="flex gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                      </div>
                      <span className="text-[10px] text-white/30 font-medium flex-1 text-center">BYLDRS GUARDIAN — 20-Point Shield Explained</span>
                    </div>
                    <iframe
                      src="https://www.youtube.com/embed/Oz-NQbmwGRc?rel=0&modestbranding=1&color=white"
                      title="BYLDRS GUARDIAN — 20-Point Shield Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full aspect-video"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Floating badge below video */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="absolute -bottom-4 -left-2 sm:-left-4 z-20 flex items-center gap-2 rounded-xl bg-[#1A1D2E]/90 backdrop-blur-xl border border-white/[0.08] px-4 py-3 shadow-xl"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3ED1B8]/15">
                    <ShieldCheck className="h-4 w-4 text-[#3ED1B8]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">20 Points Complete</span>
                    <span className="text-[10px] text-white/30">Updated 2025</span>
                  </div>
                </motion.div>
              </div>

              {/* AI Interaction CTA — connects video hook to Guardian AI */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-sm"
              >
                <div className="rounded-xl bg-gradient-to-br from-[#3ED1B8]/[0.08] to-[#3257C2]/[0.08] border border-white/[0.06] p-4 text-center">
                  <p className="text-[11px] font-bold text-white/50 uppercase tracking-wider mb-2">
                    Got contractor problems?
                  </p>
                  <p className="text-sm text-white/70 leading-relaxed mb-3">
                    Watch the video, then ask <span className="text-[#3ED1B8] font-semibold">Guardian AI</span> to check your contractor, rescue your project, or find a vetted Pro.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-[10px] text-white/30">
                    <MessageSquare className="h-3 w-3" />
                    <span>Click &quot;Ask Guardian AI&quot; on the right edge of your screen</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0F1219] to-transparent" />
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          FEATURES — What's Inside the Guide (5 Sections)
          ═══════════════════════════════════════════════════════════════ */}
      <div className="bg-[#0F1219]">
        {/* Section header */}
        <div className="px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.05] border border-white/[0.08] px-4 py-1.5 mb-5 text-xs font-bold tracking-widest uppercase text-white/40">
              5 Sections &middot; 20 Points &middot; Zero Blind Spots
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Everything you need to
              <br />
              <span className="text-[#3ED1B8]">stay protected.</span>
            </h2>
          </motion.div>
        </div>

        {/* Feature cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-6"
        >
          {guideFeatures.map((feature, idx) => {
            const FeatureIcon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={childFade}
                className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 overflow-hidden"
              >
                {/* Accent line at top */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-40 group-hover:opacity-70 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${feature.accent}60, transparent)` }}
                />

                <div className="relative p-6 sm:p-8 lg:p-10">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-8">
                    {/* Icon + Points badge */}
                    <div className="shrink-0 flex items-start gap-3">
                      <div
                        className="flex items-center justify-center h-14 w-14 rounded-xl"
                        style={{ backgroundColor: `${feature.accent}12` }}
                      >
                        <FeatureIcon className="h-7 w-7" style={{ color: feature.accent }} />
                      </div>
                      {feature.points !== '—' && (
                        <span
                          className="mt-1 text-[10px] font-extrabold tracking-widest uppercase px-2 py-0.5 rounded-md border"
                          style={{
                            color: feature.accent,
                            backgroundColor: `${feature.accent}08`,
                            borderColor: `${feature.accent}20`,
                          }}
                        >
                          Pts {feature.points}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="mb-1">
                        <span
                          className="text-[11px] font-extrabold tracking-[0.12em] uppercase block"
                          style={{ color: `${feature.accent}90` }}
                        >
                          Section {idx + 1}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                          {feature.title}
                        </h3>
                        <p className="text-sm font-medium text-white/30 mt-0.5">
                          {feature.subtitle}
                        </p>
                      </div>

                      <p className="text-sm sm:text-base text-white/40 leading-relaxed mt-4 mb-5 max-w-xl">
                        {feature.description}
                      </p>

                      {/* Items grid */}
                      <div className="grid sm:grid-cols-2 gap-2.5">
                        {feature.items.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 bg-white/[0.02] border border-white/[0.04]"
                          >
                            <CheckCircle2
                              className="h-3.5 w-3.5 shrink-0"
                              style={{ color: feature.accent }}
                            />
                            <span className="text-[13px] text-white/50 font-medium leading-snug">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom spacer */}
        <div className="h-12" />
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          20-POINT QUICK REFERENCE STRIP
          ═══════════════════════════════════════════════════════════════ */}
      <div className="bg-[#0A0D14]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              The Complete 20-Point Shield
            </h3>
            <p className="text-sm text-white/30 mt-2">
              Every checkpoint — at a glance.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5"
          >
            {allPoints.map((point, idx) => {
              const color = sectionColors[point.section];
              return (
                <motion.div
                  key={point.num}
                  variants={childFade}
                  className="flex items-center gap-2.5 rounded-xl px-3.5 py-3 border border-white/[0.04] bg-white/[0.015] hover:bg-white/[0.03] transition-colors duration-200"
                >
                  <div
                    className="flex items-center justify-center h-6 w-6 rounded-md shrink-0"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    <span className="text-[10px] font-bold" style={{ color }}>
                      {point.num}
                    </span>
                  </div>
                  <span className="text-[12px] font-medium text-white/50 leading-tight">
                    {point.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          FINAL CTA — Download Again + Check My Pro
          ═══════════════════════════════════════════════════════════════ */}
      <div className="bg-[#0F1219] px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#3ED1B8]/30" />
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3ED1B8]/10">
              <ShieldCheck className="h-4 w-4 text-[#3ED1B8]" />
            </div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#3ED1B8]/30" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 leading-tight">
            Now put the Shield to work.
          </h3>
          <p className="text-white/35 text-sm sm:text-base mb-10 max-w-md mx-auto leading-relaxed">
            You have the complete 20-point playbook. Now check any Pro&apos;s Guardian Risk
            Report — free, in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              onClick={handleDownload}
              size="lg"
              className="h-13 px-8 rounded-xl bg-[#3ED1B8] hover:bg-[#34b9a2] text-[#0A0D14] font-bold text-sm shadow-lg shadow-[#3ED1B8]/20 hover:shadow-xl transition-all duration-300 group"
            >
              <Download className="mr-2 h-4 w-4" />
              Download My 20-Point Shield
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              onClick={() => setCurrentPage('check-my-pro')}
              size="lg"
              variant="outline"
              className="h-13 px-8 rounded-xl border-white/15 text-white/70 hover:text-white hover:bg-white/[0.06] hover:border-white/25 font-bold text-sm transition-all duration-300 group"
            >
              <ShieldCheck className="mr-2 h-4 w-4" />
              Check My Pro Now
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
