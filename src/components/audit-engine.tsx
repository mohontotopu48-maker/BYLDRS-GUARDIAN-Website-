'use client';

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Upload,
  ClipboardCheck,
  User,
  Phone,
  Mail,
  DollarSign,
  Hash,
  Wrench,
  MessageSquare,
  Download,
  Calendar,
  Fingerprint,
  ArrowRight,
  Lock,
  Star,
  FolderOpen,
  BadgeCheck,
  Clock,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppStore } from '@/lib/store';
import { proProfiles, type ProProfile, tierConfig } from '@/lib/pro-data';

// ─── Color Constants ───────────────────────────────────────────────
const TURQUOISE = '#3ED1B8';
const TRUE_BLUE = '#3257C2';
const SOFT_GRAY = '#F4F7F9';
const GOLD = '#F5A623';
const DARK = '#1A1D2E';
const RED = '#EF4444';

// ─── Trade Categories ──────────────────────────────────────────────
const TRADE_CATEGORIES = [
  'Roofing',
  'Plumbing',
  'Electrical',
  'HVAC',
  'General',
  'Solar',
  'Remodeling',
  'Landscaping',
  'Other',
];

// ─── Audit Steps ───────────────────────────────────────────────────
const AUDIT_STEPS = [
  { label: 'Verifying CSLB License & Standing...', icon: Shield },
  { label: "Checking Insurance, Bond & Workers' Comp...", icon: ShieldCheck },
  { label: 'Analyzing 20-Point Shield Compliance...', icon: ClipboardCheck },
  { label: 'Cross-referencing Complaint History...', icon: Fingerprint },
  { label: 'Generating Guardian Risk Report...', icon: FileText },
];

// ─── 20-Point Shield Data ────────────────────────────────────
interface ProtocolPoint {
  id: number;
  label: string;
  passed: boolean;
  detail?: string;
}

const PROTOCOL_POINTS: ProtocolPoint[] = [
  { id: 1, label: 'Active CSLB License', passed: true },
  { id: 2, label: 'Insurance Coverage Verified', passed: true },
  { id: 3, label: "Workers' Comp Current", passed: false, detail: 'FAILED' },
  { id: 4, label: 'Bond Valid & Active', passed: true },
  { id: 5, label: 'Complaint History Clean', passed: true, detail: '0 complaints' },
  { id: 6, label: 'Deposit Within Legal Limit', passed: false, detail: 'FAILED - $3,500 asked' },
  { id: 7, label: 'Permit History Verified', passed: true },
  { id: 8, label: 'Background Check Passed', passed: true },
  { id: 9, label: 'Reference Check Complete', passed: false, detail: 'FAILED - only 1 of 3' },
  { id: 10, label: 'Contract Terms Reviewed', passed: true },
  { id: 11, label: 'Payment Structure Compliant', passed: true },
  { id: 12, label: 'Warranty Documentation', passed: true },
  { id: 13, label: 'Project Timeline Reasonable', passed: true },
  { id: 14, label: 'Material Quality Standard', passed: true },
  { id: 15, label: 'Scope of Work Defined', passed: true },
  { id: 16, label: 'Change Order Policy', passed: false, detail: 'FAILED - missing' },
  { id: 17, label: 'Site Safety Plan', passed: true },
  { id: 18, label: 'Communication Protocol', passed: true },
  { id: 19, label: 'Completion Guarantee', passed: true },
  { id: 20, label: 'Dispute Resolution Clause', passed: true },
];

// ─── Action Items ──────────────────────────────────────────────────
const ACTION_ITEMS = [
  {
    severity: 'WARNING',
    text: "Workers' Comp is expired. Do NOT proceed until updated.",
  },
  {
    severity: 'CAUTION',
    text: 'Deposit of $3,500 exceeds the $1,000 legal limit (CA BPC §7159).',
  },
  {
    severity: 'ALERT',
    text: 'Only 1 of 3 references verified. Request additional references.',
  },
];

// ─── Animation Variants ────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: 'easeOut' as const },
  }),
};

const containerStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

const childFade = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

// ─── Circular Score Component ──────────────────────────────────────
function RiskScoreCircle({ score }: { score: number }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color =
    score > 80
      ? '#22C55E'
      : score >= 60
        ? GOLD
        : RED;

  const bgColor =
    score > 80
      ? 'rgba(34, 197, 94, 0.15)'
      : score >= 60
        ? 'rgba(245, 166, 35, 0.15)'
        : 'rgba(239, 68, 68, 0.15)';

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <svg width="180" height="180" viewBox="0 0 180 180">
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill={bgColor}
            stroke="rgba(0,0,0,0.06)"
            strokeWidth="10"
          />
          <motion.circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
            transform="rotate(-90 90 90)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-4xl font-bold"
            style={{ color }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {score}
          </motion.span>
          <span className="text-sm text-gray-500 font-medium">/100</span>
        </div>
      </div>
    </div>
  );
}

// ─── Audit in Progress Panel ───────────────────────────────────────
function AuditProgressPanel({ currentStep }: { currentStep: number }) {
  const progressPercent = ((currentStep + 1) / AUDIT_STEPS.length) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden h-full min-h-[400px] flex flex-col">
      {/* Header */}
      <div
        className="px-6 py-5"
        style={{
          background: `linear-gradient(135deg, ${DARK} 0%, ${TRUE_BLUE} 100%)`,
        }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Shield className="size-7 text-white" />
          </motion.div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-wide">
              AUDIT IN PROGRESS
            </h3>
            <p className="text-xs text-white/60 mt-0.5">
              Running 20-Point Shield Analysis
            </p>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="flex-1 p-6 flex flex-col justify-center">
        <div className="space-y-4">
          {AUDIT_STEPS.map((step, idx) => {
            const StepIcon = step.icon;
            const isActive = idx === currentStep;
            const isComplete = idx < currentStep;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'border-2 shadow-md'
                    : isComplete
                      ? 'bg-green-50 border border-green-100'
                      : 'bg-gray-50 border border-gray-100 opacity-40'
                }`}
                style={isActive ? { borderColor: TURQUOISE, backgroundColor: `${TURQUOISE}08` } : undefined}
              >
                {isComplete ? (
                  <div className="flex items-center justify-center size-8 rounded-lg bg-green-100">
                    <CheckCircle2 className="size-4 text-green-600" />
                  </div>
                ) : isActive ? (
                  <div className="flex items-center justify-center size-8 rounded-lg" style={{ backgroundColor: `${TURQUOISE}20` }}>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <StepIcon className="size-4" style={{ color: TURQUOISE }} />
                    </motion.div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center size-8 rounded-lg bg-gray-200">
                    <StepIcon className="size-4 text-gray-400" />
                  </div>
                )}
                <span
                  className={`text-sm font-medium ${
                    isActive ? 'font-bold' : isComplete ? 'text-green-700' : 'text-gray-400'
                  }`}
                  style={isActive ? { color: TRUE_BLUE } : undefined}
                >
                  {step.label}
                </span>
                {isComplete && (
                  <CheckCircle2 className="size-4 text-green-500 ml-auto" />
                )}
                {isActive && (
                  <motion.div
                    className="ml-auto size-2 rounded-full"
                    style={{ backgroundColor: TURQUOISE }}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <motion.div className="mt-6">
          <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: TURQUOISE }}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
              Scanning...
            </span>
            <span className="text-[10px] font-bold" style={{ color: TRUE_BLUE }}>
              {Math.round(progressPercent)}%
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Professional Opinion Section ──────────────────────────────────
function ProfessionalOpinion({
  score,
  failedPoints,
}: {
  score: number;
  failedPoints: ProtocolPoint[];
}) {
  const riskLabel =
    score > 80 ? 'LOW RISK' : score >= 60 ? 'MODERATE RISK' : 'HIGH RISK';
  const riskColor =
    score > 80 ? '#22C55E' : score >= 60 ? GOLD : RED;
  const riskBg =
    score > 80 ? 'rgba(34,197,94,0.08)' : score >= 60 ? 'rgba(245,166,35,0.08)' : 'rgba(239,68,68,0.08)';
  const riskBorder =
    score > 80 ? 'rgba(34,197,94,0.2)' : score >= 60 ? 'rgba(245,166,35,0.2)' : 'rgba(239,68,68,0.2)';

  // Build dynamic assessment
  const hasWorkersComp = !failedPoints.find((p) => p.id === 3);
  const hasDepositIssue = failedPoints.find((p) => p.id === 6);
  const hasRefIssue = failedPoints.find((p) => p.id === 9);
  const hasChangeOrderIssue = failedPoints.find((p) => p.id === 16);

  let verdict: string;
  let bulletPoints: string[];

  if (score > 80) {
    verdict = 'This Pro demonstrates strong compliance with the 20-Point Shield standard. The minor items noted should be addressed, but overall this contractor meets Guardian standards for safe engagement.';
    bulletPoints = failedPoints.length > 0
      ? failedPoints.map((p) => `Minor: ${p.label}${p.detail ? ` (${p.detail})` : ''}`)
      : ['All 20 points passed — exceptional compliance.'];
  } else if (score >= 60) {
    verdict = 'This Pro shows moderate risk. We identified critical red flags that require immediate attention before signing any contract or making a payment.';
    bulletPoints = [];
    if (!hasWorkersComp) bulletPoints.push("CRITICAL: Worker's Comp is expired — creates legal liability for you if a worker is injured on your property.");
    if (hasDepositIssue) bulletPoints.push('CRITICAL: Deposit exceeds California\'s $1,000 legal limit (CA BPC §7159). This is a red flag for potential fraud.');
    if (hasRefIssue) bulletPoints.push('WARNING: Insufficient verified references — reliability unconfirmed.');
    if (hasChangeOrderIssue) bulletPoints.push('WARNING: No change order policy — leaves you unprotected against scope creep.');
  } else {
    verdict = 'HIGH RISK. This Pro fails multiple critical Shield points. We strongly recommend against proceeding with this contractor. See verified alternatives below.';
    bulletPoints = failedPoints.map((p) => `FAILED: ${p.label}${p.detail ? ` — ${p.detail}` : ''}`);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4 }}
      className="rounded-xl border p-5"
      style={{ backgroundColor: riskBg, borderColor: riskBorder }}
    >
      <div className="flex items-center gap-2.5 mb-3">
        <ClipboardCheck className="size-4" style={{ color: riskColor }} />
        <h4 className="text-sm font-bold uppercase tracking-wider" style={{ color: riskColor }}>
          Professional Opinion
        </h4>
        <Badge
          className="ml-auto px-2.5 py-0.5 text-[10px] font-bold tracking-wider rounded-full"
          style={{
            backgroundColor: riskBg,
            color: riskColor,
            borderColor: riskBorder,
            borderWidth: '1px',
          }}
        >
          {riskLabel}
        </Badge>
      </div>
      <p className="text-sm text-gray-700 leading-relaxed mb-3">
        {verdict}
      </p>
      {bulletPoints.length > 0 && (
        <ul className="space-y-1.5 mb-3">
          {bulletPoints.map((point, idx) => (
            <motion.li
              key={idx}
              custom={idx}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex items-start gap-2 text-xs leading-relaxed"
            >
              {point.startsWith('CRITICAL') || point.startsWith('FAILED') ? (
                <XCircle className="size-3.5 mt-0.5 shrink-0" style={{ color: RED }} />
              ) : (
                <AlertTriangle className="size-3.5 mt-0.5 shrink-0" style={{ color: GOLD }} />
              )}
              <span className={point.startsWith('CRITICAL') || point.startsWith('FAILED') ? 'text-red-700 font-medium' : 'text-gray-600'}>
                {point}
              </span>
            </motion.li>
          ))}
        </ul>
      )}
      <div className="flex items-center gap-1.5 pt-2 border-t" style={{ borderColor: riskBorder }}>
        <Lock className="size-3" style={{ color: riskColor }} />
        <span className="text-[10px] font-medium" style={{ color: `${riskColor}99` }}>
          Assessment based on the BYLDRS GUARDIAN 20-Point Shield Standard
        </span>
      </div>
    </motion.div>
  );
}

// ─── Meet a Verified Pro Section ───────────────────────────────────
function MeetVerifiedPro({
  tradeCategory,
  onViewPro,
}: {
  tradeCategory: string;
  onViewPro: (id: number) => void;
}) {
  // Map audit form categories to pro-data categories
  const categoryMap: Record<string, string[]> = {
    'Roofing': ['Roofing'],
    'Plumbing': ['Plumbing'],
    'Electrical': ['Electrical'],
    'HVAC': ['HVAC'],
    'General': ['General Contractor'],
    'Solar': ['Roofing'],
    'Remodeling': ['Remodeling'],
    'Landscaping': ['Landscaping'],
    'Other': [],
  };

  const matchingCategories = categoryMap[tradeCategory] || [];
  const verifiedPros = proProfiles
    .filter((p) => p.workersComp && p.propertyScore >= 70)
    .sort((a, b) => {
      // Prioritize matching category
      const aMatch = matchingCategories.includes(a.category) ? 1 : 0;
      const bMatch = matchingCategories.includes(b.category) ? 1 : 0;
      if (bMatch !== aMatch) return bMatch - aMatch;
      return b.propertyScore - a.propertyScore;
    })
    .slice(0, 3);

  if (verifiedPros.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6 }}
    >
      <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3 flex items-center gap-2">
        <Star className="size-4" style={{ color: GOLD }} />
        Meet a Guardian Verified Pro
      </h4>
      <p className="text-xs text-gray-500 mb-4 leading-relaxed">
        Your current quote shows red flags. Here are Guardian-verified Pros who pass all 20 protection points and are ready to bid on your project:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {verifiedPros.map((pro, idx) => {
          const tier = tierConfig[pro.tier];
          return (
            <motion.div
              key={pro.id}
              custom={idx}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              {/* Pro card header */}
              <div
                className="px-4 py-3"
                style={{
                  background: `linear-gradient(135deg, ${DARK} 0%, ${TRUE_BLUE}80 100%)`,
                }}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex items-center justify-center size-9 rounded-lg text-xs font-bold text-white"
                    style={{ backgroundColor: `${TURQUOISE}30` }}
                  >
                    {pro.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white truncate">{pro.name}</p>
                    <p className="text-[10px] text-white/60 truncate">{pro.category}</p>
                  </div>
                </div>
              </div>
              {/* Pro card body */}
              <div className="p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="size-3.5 fill-[#F5A623] text-[#F5A623]" />
                    <span className="text-xs font-bold text-gray-800">{pro.rating}</span>
                    <span className="text-[10px] text-gray-400">({pro.reviewCount})</span>
                  </div>
                  <Badge
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${tier.bg} ${tier.text} border ${tier.border}`}
                  >
                    {tier.label}
                  </Badge>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="size-3" style={{ color: TURQUOISE }} />
                  <span className="text-[10px] text-gray-500">
                    Shield Score: <span className="font-bold" style={{ color: TRUE_BLUE }}>{pro.propertyScore}/100</span>
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3 text-green-500" />
                  <span className="text-[10px] text-gray-500">Workers&apos; Comp: <span className="font-semibold text-green-600">Active</span></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BadgeCheck className="size-3" style={{ color: TURQUOISE }} />
                  <span className="text-[10px] text-gray-500">{pro.location}</span>
                </div>
                <button
                  onClick={() => onViewPro(pro.id)}
                  className="w-full mt-1 h-10 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all duration-200 hover:shadow-sm"
                  style={{ backgroundColor: `${TRUE_BLUE}10`, color: TRUE_BLUE }}
                >
                  View Profile
                  <ArrowRight className="size-3" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─── Vault Sync Toast ──────────────────────────────────────────────
function VaultSyncToast({
  proName,
  reportId,
  onOpenVault,
  onDismiss,
}: {
  proName: string;
  reportId: string;
  onOpenVault: () => void;
  onDismiss: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-xl border-2 p-4"
      style={{ backgroundColor: `${TURQUOISE}08`, borderColor: `${TURQUOISE}25` }}
    >
      <button
        onClick={onDismiss}
        className="absolute top-2 right-2 size-8 rounded-md hover:bg-black/5 flex items-center justify-center transition-colors"
        aria-label="Dismiss"
      >
        <XCircle className="size-3.5 text-gray-400" />
      </button>
      <div className="flex items-start gap-3">
        <div
          className="flex items-center justify-center size-10 rounded-xl shrink-0"
          style={{ backgroundColor: `${TURQUOISE}15` }}
        >
          <FolderOpen className="size-5" style={{ color: TURQUOISE }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Lock className="size-3.5" style={{ color: TURQUOISE }} />
            <span className="text-sm font-bold" style={{ color: TRUE_BLUE }}>
              Bid Secured in Your Vault
            </span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed mb-3">
            Your quote from <span className="font-semibold text-gray-800">{proName}</span> has been saved to your Contracts folder. Our auditors will review and add their professional rating to your report ({reportId}).
          </p>
          <button
            onClick={onOpenVault}
            className="inline-flex items-center gap-1.5 text-xs font-bold rounded-lg px-3 py-1.5 transition-all duration-200 hover:shadow-sm"
            style={{ backgroundColor: TURQUOISE, color: DARK }}
          >
            Open Your Vault
            <ArrowRight className="size-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Component ────────────────────────────────────────────────
export function AuditEngine() {
  const { setCurrentPage, setSelectedProId, addVaultSyncedBid } = useAppStore();
  const [submitted, setSubmitted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [auditStep, setAuditStep] = useState(0);
  const [showVaultToast, setShowVaultToast] = useState(false);
  const [formData, setFormData] = useState({
    contractorName: '',
    licenseNumber: '',
    tradeCategory: '',
    phone: '',
    email: '',
    bidAmount: '',
    concerns: '',
    smsPhone: '',
  });
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileName, setFileName] = useState('');
  const auditTimerRef = useRef<NodeJS.Timeout | null>(null);

  const reportId = useMemo(() => `GR-${Date.now().toString(36).toUpperCase()}`, []);
  const reportDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Audit step progression
  useEffect(() => {
    if (!isGenerating) return;
    const stepDuration = 600;
    const timer = setTimeout(() => {
      if (auditStep < AUDIT_STEPS.length - 1) {
        setAuditStep((prev) => prev + 1);
      } else {
        // Audit complete
        setIsGenerating(false);
        setSubmitted(true);
        setAuditStep(0);

        // Sync bid to vault
        const bidFileName = fileName || `Bid_${formData.contractorName.replace(/\s+/g, '_')}.pdf`;
        addVaultSyncedBid({
          id: `bid-${Date.now()}`,
          proName: formData.contractorName || 'Unknown Pro',
          licenseNumber: formData.licenseNumber || 'N/A',
          tradeCategory: formData.tradeCategory || 'General',
          bidAmount: formData.bidAmount || '0',
          healthScore: 72,
          riskLevel: 'MODERATE',
          fileName: bidFileName,
          syncedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          reportId,
        });

        // Show vault sync toast after a short delay
        setTimeout(() => setShowVaultToast(true), 800);
      }
    }, stepDuration);
    auditTimerRef.current = timer;
    return () => {
      if (auditTimerRef.current) clearTimeout(auditTimerRef.current);
    };
  }, [isGenerating, auditStep, addVaultSyncedBid, fileName, formData, reportId]);

  const handleInputChange = useCallback(
    (field: string, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setFileName(files[0].name);
    }
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        setFileName(files[0].name);
      }
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setIsGenerating(true);
      setAuditStep(0);
      setShowVaultToast(false);
    },
    []
  );

  const handleReset = useCallback(() => {
    setSubmitted(false);
    setIsGenerating(false);
    setAuditStep(0);
    setShowVaultToast(false);
    setFormData({
      contractorName: '',
      licenseNumber: '',
      tradeCategory: '',
      phone: '',
      email: '',
      bidAmount: '',
      concerns: '',
      smsPhone: '',
    });
    setFileName('');
  }, []);

  const handleViewPro = useCallback(
    (proId: number) => {
      setSelectedProId(proId);
      setCurrentPage('pro-profile');
    },
    [setCurrentPage, setSelectedProId]
  );

  const handleOpenVault = useCallback(() => {
    setShowVaultToast(false);
    setCurrentPage('vault');
  }, [setCurrentPage]);

  const passedCount = PROTOCOL_POINTS.filter((p) => p.passed).length;
  const failedCount = PROTOCOL_POINTS.filter((p) => !p.passed).length;
  const failedPoints = PROTOCOL_POINTS.filter((p) => !p.passed);
  const healthScore = 72;

  return (
    <section
      id="audit-engine"
      className="relative w-full py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: SOFT_GRAY }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-[0.06]"
          style={{ background: `radial-gradient(circle, ${TRUE_BLUE}, transparent)` }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full opacity-[0.06]"
          style={{ background: `radial-gradient(circle, ${TURQUOISE}, transparent)` }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ──────────────────────────────────── */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge
            className="mb-4 px-4 py-1.5 text-sm font-semibold tracking-wide"
            style={{
              backgroundColor: `${TRUE_BLUE}15`,
              color: TRUE_BLUE,
              borderColor: `${TRUE_BLUE}30`,
            }}
          >
            <Shield className="size-3.5 mr-1.5" />
            The Guardian Risk Report
          </Badge>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"
            style={{ color: DARK }}
          >
            Check My{' '}
            <span style={{ color: TRUE_BLUE }}>Pro</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Got a quote? Tell us who you&apos;re hiring. We&apos;ll check their license,
            insurance, and the law to make sure your home and money are safe.
          </p>
        </motion.div>

        {/* ── Main Content ────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* ── Left: Audit Request Form ──────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="flex items-center justify-center size-10 rounded-xl"
                  style={{ backgroundColor: `${TURQUOISE}18` }}
                >
                  <ClipboardCheck className="size-5" style={{ color: TURQUOISE }} />
                </div>
                <div>
                  <h3 className="text-lg font-bold" style={{ color: DARK }}>
                    Pro Safety Check
                  </h3>
                  <p className="text-xs text-gray-500">
                    Fill in Pro details to generate your report
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Row 1: Name + License */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="contractor-name"
                      className="text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      <User className="size-3.5 mr-1 inline text-gray-400" />
                      Pro Name
                    </Label>
                    <Input
                      id="contractor-name"
                      placeholder="John Smith Roofing"
                      value={formData.contractorName}
                      onChange={(e) =>
                        handleInputChange('contractorName', e.target.value)
                      }
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="license-number"
                      className="text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      <Hash className="size-3.5 mr-1 inline text-gray-400" />
                      Pro License #
                    </Label>
                    <Input
                      id="license-number"
                      placeholder="CSLB #1234567"
                      value={formData.licenseNumber}
                      onChange={(e) =>
                        handleInputChange('licenseNumber', e.target.value)
                      }
                      className="h-10"
                    />
                  </div>
                </div>

                {/* Row 2: Trade Category + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="trade-category"
                      className="text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      <Wrench className="size-3.5 mr-1 inline text-gray-400" />
                      Trade Category
                    </Label>
                    <Select
                      value={formData.tradeCategory}
                      onValueChange={(val) =>
                        handleInputChange('tradeCategory', val)
                      }
                    >
                      <SelectTrigger className="w-full h-10">
                        <SelectValue placeholder="Select trade..." />
                      </SelectTrigger>
                      <SelectContent>
                        {TRADE_CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      <Phone className="size-3.5 mr-1 inline text-gray-400" />
                      Pro Phone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange('phone', e.target.value)
                      }
                      className="h-10"
                    />
                  </div>
                </div>

                {/* Row 3: Email + Bid Amount */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      <Mail className="size-3.5 mr-1 inline text-gray-400" />
                      Pro Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange('email', e.target.value)
                      }
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="bid-amount"
                      className="text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      <DollarSign className="size-3.5 mr-1 inline text-gray-400" />
                      Bid Amount ($)
                    </Label>
                    <Input
                      id="bid-amount"
                      type="number"
                      placeholder="15000"
                      value={formData.bidAmount}
                      onChange={(e) =>
                        handleInputChange('bidAmount', e.target.value)
                      }
                      className="h-10"
                    />
                  </div>
                </div>

                {/* Row 3b: Your Phone for SMS Alerts */}
                <div className="space-y-2">
                  <Label
                    htmlFor="sms-phone"
                    className="text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    <Phone className="size-3.5 mr-1 inline text-[#EF4444]" />
                    <span className="text-[#EF4444]">SMS for Urgent Red-Flag Alerts</span>
                  </Label>
                  <Input
                    id="sms-phone"
                    type="tel"
                    placeholder="(555) 000-0000"
                    value={formData.smsPhone}
                    onChange={(e) =>
                      handleInputChange('smsPhone', e.target.value)
                    }
                    className="h-10 border-[#EF4444]/20 focus:border-[#EF4444]/40 focus:ring-[#EF4444]/10"
                  />
                  <p className="text-[10px] text-gray-400 flex items-center gap-1">
                    <Lock className="size-3 text-gray-300" />
                    Get instant SMS alerts if we detect illegal deposits, expired licenses, or other critical risks.
                  </p>
                </div>

                {/* Row 4: Upload Bid Document */}
                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <FileText className="size-3.5 mr-1 inline text-gray-400" />
                    Upload Bid Document
                  </Label>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() =>
                      document.getElementById('file-upload')?.click()
                    }
                    className={`
                      relative flex flex-col items-center justify-center gap-2
                      h-28 rounded-xl border-2 border-dashed cursor-pointer
                      transition-all duration-200
                      ${
                        isDragOver
                          ? 'border-[#3257C2] bg-[#3257C208]'
                          : fileName
                            ? 'border-[#22C55E] bg-[#22C55E08]'
                            : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
                      }
                    `}
                  >
                    <input
                      id="file-upload"
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.png"
                      className="hidden"
                      onChange={handleFileInput}
                    />
                    {fileName ? (
                      <>
                        <CheckCircle2
                          className="size-6"
                          style={{ color: '#22C55E' }}
                        />
                        <span className="text-sm text-gray-700 font-medium text-center px-4">
                          {fileName}
                        </span>
                        <span className="text-xs text-gray-400">
                          Click to replace
                        </span>
                      </>
                    ) : (
                      <>
                        <Upload
                          className="size-6 text-gray-400"
                        />
                        <span className="text-sm text-gray-500 font-medium">
                          Drag &amp; drop or click to upload
                        </span>
                        <span className="text-xs text-gray-400">
                          PDF, DOC, JPG, PNG (max 10MB)
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Row 5: Additional Concerns */}
                <div className="space-y-2">
                  <Label
                    htmlFor="concerns"
                    className="text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    <MessageSquare className="size-3.5 mr-1 inline text-gray-400" />
                    Additional Concerns
                  </Label>
                  <Textarea
                    id="concerns"
                    placeholder="Describe any specific concerns about this Pro, unusual payment demands, missing documentation, etc."
                    value={formData.concerns}
                    onChange={(e) =>
                      handleInputChange('concerns', e.target.value)
                    }
                    rows={3}
                    className="resize-none"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isGenerating || submitted}
                  className="w-full h-12 text-base font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  style={{
                    backgroundColor: submitted ? '#22C55E' : TURQUOISE,
                    color: DARK,
                  }}
                >
                  {isGenerating ? (
                    <>
                      <motion.div
                        className="size-5 border-2 border-current border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />
                      Auditing in Progress...
                    </>
                  ) : submitted ? (
                    <>
                      <CheckCircle2 className="size-5" />
                      Audit Complete — View Report
                    </>
                  ) : (
                    <>
                      <Shield className="size-5" />
                      Check My Pro Now
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* ── Right: Report / Progress / Placeholder ─────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {/* ── State 1: Placeholder ──────────────────────── */}
              {!isGenerating && !submitted && (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 h-full min-h-[400px] flex flex-col items-center justify-center text-center"
                >
                  <div
                    className="flex items-center justify-center size-20 rounded-full mb-5"
                    style={{ backgroundColor: SOFT_GRAY }}
                  >
                    <Shield
                      className="size-10"
                      style={{ color: '#CBD5E1' }}
                    />
                  </div>
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: '#94A3B8' }}
                  >
                    Guardian Risk Report
                  </h3>
                  <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
                    Complete the Pro Safety Check form and submit to generate your
                    comprehensive 20-Point Shield Risk Report.
                  </p>
                  <div className="flex items-center gap-2 mt-6 text-xs text-gray-400">
                    <FileText className="size-3.5" />
                    <span>Report will appear here after submission</span>
                  </div>
                </motion.div>
              )}

              {/* ── State 2: Audit in Progress ────────────────── */}
              {isGenerating && (
                <motion.div
                  key="auditing"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <AuditProgressPanel currentStep={auditStep} />
                </motion.div>
              )}

              {/* ── State 3: Full Report ──────────────────────── */}
              {!isGenerating && submitted && (
                <motion.div
                  key="report"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  {/* Report Card */}
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Report Header */}
                    <div
                      className="px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                      style={{
                        background: `linear-gradient(135deg, ${DARK} 0%, ${TRUE_BLUE} 100%)`,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <Shield className="size-7 text-white" />
                        <div>
                          <h3 className="text-lg font-bold text-white tracking-wide">
                            GUARDIAN RISK REPORT
                          </h3>
                          <p className="text-xs text-white/70 mt-0.5">
                            20-Point Shield Assessment
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-1 text-xs text-white/70">
                        <span className="font-semibold text-white/90">
                          {formData.contractorName || 'Pro Name'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3" />
                          {reportDate}
                        </span>
                        <span className="flex items-center gap-1 font-mono">
                          <Fingerprint className="size-3" />
                          {reportId}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-6">
                      {/* Health Score + Risk Level */}
                      <motion.div
                        className="flex flex-col items-center gap-4"
                        variants={containerStagger}
                        initial="hidden"
                        animate="visible"
                      >
                        <RiskScoreCircle score={healthScore} />

                        <motion.div variants={childFade}>
                          <div className="flex items-center gap-2">
                            <Badge
                              className="px-5 py-1.5 text-sm font-bold tracking-wider rounded-full shadow-sm"
                              style={{
                                backgroundColor: `${GOLD}18`,
                                color: GOLD,
                                borderColor: `${GOLD}40`,
                                borderWidth: '1px',
                              }}
                            >
                              <AlertTriangle className="size-4 mr-1.5" />
                              MODERATE RISK
                            </Badge>
                            <Badge
                              className="px-3 py-1.5 text-[10px] font-bold tracking-wider rounded-full"
                              style={{
                                backgroundColor: `${TRUE_BLUE}10`,
                                color: TRUE_BLUE,
                                borderColor: `${TRUE_BLUE}20`,
                                borderWidth: '1px',
                              }}
                            >
                              <Zap className="size-3 mr-1" />
                              HEALTH SCORE
                            </Badge>
                          </div>
                        </motion.div>
                      </motion.div>

                      {/* 20-Point Shield Results */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <ClipboardCheck className="size-4" style={{ color: TRUE_BLUE }} />
                          20-Point Shield Results
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                          {PROTOCOL_POINTS.map((point, idx) => (
                            <motion.div
                              key={point.id}
                              custom={idx}
                              variants={fadeUp}
                              initial="hidden"
                              animate="visible"
                              className={`
                                flex items-start gap-2 px-3 py-2.5 rounded-lg text-xs
                                border transition-colors duration-150
                                ${
                                  point.passed
                                    ? 'bg-green-50/60 border-green-100'
                                    : 'bg-red-50/60 border-red-100'
                                }
                              `}
                            >
                              {point.passed ? (
                                <CheckCircle2
                                  className="size-4 shrink-0 mt-0.5"
                                  style={{ color: '#22C55E' }}
                                />
                              ) : (
                                <XCircle
                                  className="size-4 shrink-0 mt-0.5"
                                  style={{ color: RED }}
                                />
                              )}
                              <div className="min-w-0">
                                <span
                                  className={`font-medium leading-tight block ${
                                    point.passed
                                      ? 'text-gray-700'
                                      : 'text-red-700'
                                  }`}
                                >
                                  {point.id}. {point.label}
                                </span>
                                {point.detail && (
                                  <span className="text-[10px] text-red-500 font-semibold mt-0.5 block">
                                    ({point.detail})
                                  </span>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Summary Stats */}
                      <motion.div
                        className="flex items-center justify-center gap-6 py-3 px-4 rounded-xl"
                        style={{ backgroundColor: SOFT_GRAY }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.0 }}
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2
                            className="size-5"
                            style={{ color: '#22C55E' }}
                          />
                          <div className="text-center">
                            <span className="text-xl font-bold text-gray-800">
                              {passedCount}
                            </span>
                            <span className="text-sm text-gray-500">/20</span>
                            <p className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider">
                              Passed
                            </p>
                          </div>
                        </div>
                        <div className="w-px h-10 bg-gray-300" />
                        <div className="flex items-center gap-2">
                          <XCircle
                            className="size-5"
                            style={{ color: RED }}
                          />
                          <div className="text-center">
                            <span className="text-xl font-bold" style={{ color: RED }}>
                              {failedCount}
                            </span>
                            <span className="text-sm text-gray-500">/20</span>
                            <p className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider">
                              Failed
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      {/* Action Items */}
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                      >
                        <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <AlertTriangle className="size-4" style={{ color: RED }} />
                          Action Items
                        </h4>
                        <div className="space-y-2">
                          {ACTION_ITEMS.map((item, idx) => (
                            <motion.div
                              key={idx}
                              custom={idx}
                              variants={fadeUp}
                              initial="hidden"
                              animate="visible"
                              className="flex items-start gap-3 px-4 py-3 rounded-lg border border-red-200 bg-red-50/60"
                            >
                              <div
                                className="flex items-center justify-center size-6 rounded-full shrink-0 mt-0.5"
                                style={{ backgroundColor: `${RED}18` }}
                              >
                                <span
                                  className="text-[10px] font-extrabold"
                                  style={{ color: RED }}
                                >
                                  {idx + 1}
                                </span>
                              </div>
                              <div>
                                <span
                                  className="text-[10px] font-bold tracking-wider"
                                  style={{ color: RED }}
                                >
                                  {item.severity}:
                                </span>{' '}
                                <span className="text-xs text-red-800 leading-relaxed">
                                  {item.text}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Professional Opinion */}
                      <ProfessionalOpinion score={healthScore} failedPoints={failedPoints} />

                      {/* Meet a Verified Pro */}
                      <MeetVerifiedPro
                        tradeCategory={formData.tradeCategory}
                        onViewPro={handleViewPro}
                      />
                    </div>

                    {/* Report Footer */}
                    <div
                      className="px-6 py-3 border-t border-gray-100"
                      style={{ backgroundColor: SOFT_GRAY }}
                    >
                      <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                        This report is generated for informational purposes. Always
                        consult with a licensed attorney for legal advice.
                      </p>
                    </div>
                  </div>

                  {/* Vault Sync Toast */}
                  <AnimatePresence>
                    {showVaultToast && (
                      <VaultSyncToast
                        proName={formData.contractorName || 'Unknown Pro'}
                        reportId={reportId}
                        onOpenVault={handleOpenVault}
                        onDismiss={() => setShowVaultToast(false)}
                      />
                    )}
                  </AnimatePresence>

                  {/* Action Buttons */}
                  <motion.div
                    className="flex flex-col sm:flex-row gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                  >
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="flex-1 h-11 rounded-xl font-semibold border-gray-300"
                    >
                      <ClipboardCheck className="size-4 mr-2" />
                      New Pro Check
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 h-11 rounded-xl font-semibold border-gray-300"
                    >
                      <Download className="size-4 mr-2" />
                      Download Report
                    </Button>
                    <Button
                      onClick={handleOpenVault}
                      className="flex-1 h-11 rounded-xl font-semibold text-white"
                      style={{ backgroundColor: TRUE_BLUE }}
                    >
                      <FolderOpen className="size-4 mr-2" />
                      Open Vault
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
