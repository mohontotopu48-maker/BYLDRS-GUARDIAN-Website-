'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
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
  ChevronDown,
  Download,
  Calendar,
  Fingerprint,
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

// ─── 20-Point Protocol Data ────────────────────────────────────────
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
    text: 'Deposit of $3,500 exceeds the $1,000 legal limit (CA BPC \u00a77159).',
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
    transition: { delay: i * 0.05, duration: 0.4, ease: 'easeOut' },
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
          {/* Background circle */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill={bgColor}
            stroke="rgba(0,0,0,0.06)"
            strokeWidth="10"
          />
          {/* Score arc */}
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
        {/* Score text */}
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

// ─── Main Component ────────────────────────────────────────────────
export function AuditEngine() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    contractorName: '',
    licenseNumber: '',
    tradeCategory: '',
    phone: '',
    email: '',
    bidAmount: '',
    concerns: '',
  });
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileName, setFileName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const reportId = `GR-${Date.now().toString(36).toUpperCase()}`;
  const reportDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

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
      // Simulate generation time
      setTimeout(() => {
        setIsGenerating(false);
        setSubmitted(true);
      }, 1800);
    },
    []
  );

  const handleReset = useCallback(() => {
    setSubmitted(false);
    setFormData({
      contractorName: '',
      licenseNumber: '',
      tradeCategory: '',
      phone: '',
      email: '',
      bidAmount: '',
      concerns: '',
    });
    setFileName('');
  }, []);

  const passedCount = PROTOCOL_POINTS.filter((p) => p.passed).length;
  const failedCount = PROTOCOL_POINTS.filter((p) => !p.passed).length;

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
            Audit{' '}
            <span style={{ color: TRUE_BLUE }}>Anything</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Submit any contractor for a comprehensive 20-Point Protocol audit
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
                    Audit Request
                  </h3>
                  <p className="text-xs text-gray-500">
                    Fill in contractor details to generate your report
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
                      Contractor Name
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
                      Contractor License #
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
                      Contractor Phone
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
                      Contractor Email
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
                    placeholder="Describe any specific concerns about this contractor, unusual payment demands, missing documentation, etc."
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
                  disabled={isGenerating}
                  className="w-full h-12 text-base font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  style={{
                    backgroundColor: TURQUOISE,
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
                      Generating Report...
                    </>
                  ) : (
                    <>
                      <Shield className="size-5" />
                      Generate Guardian Risk Report
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* ── Right: Guardian Risk Report ────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
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
                    style={{ backgroundColor: `${SOFT_GRAY}` }}
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
                    Complete the audit request form and submit to generate your
                    comprehensive 20-Point Protocol Risk Report.
                  </p>
                  <div className="flex items-center gap-2 mt-6 text-xs text-gray-400">
                    <FileText className="size-3.5" />
                    <span>Report will appear here after submission</span>
                  </div>
                </motion.div>
              ) : (
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
                            20-Point Protocol Assessment
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-1 text-xs text-white/70">
                        <span className="font-semibold text-white/90">
                          {formData.contractorName || 'Contractor Name'}
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
                      {/* Score + Risk Level */}
                      <motion.div
                        className="flex flex-col items-center gap-4"
                        variants={containerStagger}
                        initial="hidden"
                        animate="visible"
                      >
                        <RiskScoreCircle score={72} />

                        <motion.div variants={childFade}>
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
                        </motion.div>
                      </motion.div>

                      {/* 20-Point Protocol Results */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <ClipboardCheck className="size-4" style={{ color: TRUE_BLUE }} />
                          20-Point Protocol Results
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
                      New Audit Request
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 h-11 rounded-xl font-semibold border-gray-300"
                    >
                      <Download className="size-4 mr-2" />
                      Download Report
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
