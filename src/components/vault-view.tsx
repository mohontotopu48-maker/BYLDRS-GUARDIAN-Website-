'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import {
  Shield,
  Lock,
  FileText,
  Upload,
  FolderOpen,
  ArrowRight,
  CheckCircle2,
  X,
  Download,
  Share2,
  Eye,
  Clock,
  HardDrive,
  BadgeCheck,
  FileSignature,
  ShieldCheck,
  ClipboardCheck,
  Award,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';

/* ─── Folder Data ──────────────────────────────────────────── */
interface VaultDocument {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
  type: string;
}

interface VaultFolder {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  borderColor: string;
  documents: VaultDocument[];
  description: string;
}

const initialFolders: VaultFolder[] = [
  {
    id: 'contracts',
    title: 'Contract Folder',
    subtitle: 'Signed contracts, change orders, and payment schedules',
    icon: FileSignature,
    iconColor: 'text-[#3257C2]',
    iconBg: 'bg-[#3257C2]/15',
    borderColor: 'border-[#3257C2]/20',
    description: 'Signed contracts, change orders, and payment schedules',
    documents: [
      { id: 'c1', name: 'Roofing_Contract_2024.pdf', size: '2.4 MB', uploadedAt: 'Dec 15, 2024', type: 'pdf' },
      { id: 'c2', name: 'Change_Order_001.pdf', size: '890 KB', uploadedAt: 'Dec 18, 2024', type: 'pdf' },
      { id: 'c3', name: 'Payment_Schedule.xlsx', size: '1.1 MB', uploadedAt: 'Dec 20, 2024', type: 'xlsx' },
    ],
  },
  {
    id: 'insurance',
    title: 'Insurance Folder',
    subtitle: "Contractor's GL, Workers' Comp, and Bond docs",
    icon: ShieldCheck,
    iconColor: 'text-[#3ED1B8]',
    iconBg: 'bg-[#3ED1B8]/15',
    borderColor: 'border-[#3ED1B8]/20',
    description: "Contractor's GL, Workers' Comp, and Bond docs",
    documents: [
      { id: 'i1', name: 'GL_Insurance_Cert.pdf', size: '1.8 MB', uploadedAt: 'Dec 10, 2024', type: 'pdf' },
    ],
  },
  {
    id: 'permits',
    title: 'Permits Folder',
    subtitle: 'Building permits, inspection reports, and final sign-offs',
    icon: ClipboardCheck,
    iconColor: 'text-[#F5A623]',
    iconBg: 'bg-[#F5A623]/15',
    borderColor: 'border-[#F5A623]/20',
    description: 'Building permits, inspection reports, and final sign-offs',
    documents: [
      { id: 'p1', name: 'Building_Permit_LACounty.pdf', size: '3.2 MB', uploadedAt: 'Dec 8, 2024', type: 'pdf' },
      { id: 'p2', name: 'Inspection_Report_01.pdf', size: '1.5 MB', uploadedAt: 'Dec 22, 2024', type: 'pdf' },
    ],
  },
  {
    id: 'completion',
    title: 'Completion Folder',
    subtitle: 'Final lien releases, warranties, and maintenance schedules',
    icon: Award,
    iconColor: 'text-[#CD7F32]',
    iconBg: 'bg-[#CD7F32]/15',
    borderColor: 'border-[#CD7F32]/20',
    description: 'Final lien releases, warranties, and maintenance schedules',
    documents: [],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export function VaultView() {
  const { setCurrentPage, showEnrollSuccess, setShowEnrollSuccess, vaultSyncedBids } = useAppStore();
  const [folders, setFolders] = useState<VaultFolder[]>(initialFolders);
  const processedBidIds = useRef<Set<string>>(new Set());
  const [expandedFolder, setExpandedFolder] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(showEnrollSuccess);

  // Auto-sync bids from Check My Pro audit
  useEffect(() => {
    const newBids = vaultSyncedBids.filter((b) => !processedBidIds.current.has(b.id));
    if (newBids.length > 0) {
      newBids.forEach((bid) => processedBidIds.current.add(bid.id));
      const newDocs: VaultDocument[] = newBids.map((bid) => ({
        id: bid.id,
        name: `RiskReport_${bid.proName.replace(/\s+/g, '_')}_${bid.reportId}.pdf`,
        size: '1.2 MB',
        uploadedAt: bid.syncedAt,
        type: 'pdf',
      }));
      setFolders((prev) =>
        prev.map((f) =>
          f.id === 'contracts'
            ? { ...f, documents: [...newDocs, ...f.documents] }
            : f
        )
      );
      // Auto-expand contracts folder to show synced bids
      setExpandedFolder('contracts');
    }
  }, [vaultSyncedBids]);

  // Sync enrollment success flag — clear it on first read
  useEffect(() => {
    if (showEnrollSuccess) {
      setShowEnrollSuccess(false);
    }
  }, [showEnrollSuccess, setShowEnrollSuccess]);

  // Auto-dismiss the success toast
  useEffect(() => {
    if (!showSuccessToast) return;
    const timer = setTimeout(() => setShowSuccessToast(false), 5000);
    return () => clearTimeout(timer);
  }, [showSuccessToast]);

  const totalDocs = folders.reduce((sum, f) => sum + f.documents.length, 0);
  const totalSize = '8.9 MB';
  const storageUsed = 8.9;
  const storageTotal = 5120; // 5GB in MB

  const handleDragOver = useCallback((folderId: string) => {
    setDragOverId(folderId);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOverId(null);
  }, []);

  const handleDrop = useCallback((folderId: string) => {
    setDragOverId(null);
    setUploadingId(folderId);
    setTimeout(() => {
      setFolders((prev) =>
        prev.map((f) =>
          f.id === folderId
            ? {
                ...f,
                documents: [
                  ...f.documents,
                  {
                    id: `${folderId}-${Date.now()}`,
                    name: 'Uploaded_Document.pdf',
                    size: '1.0 MB',
                    uploadedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                    type: 'pdf',
                  },
                ],
              }
            : f,
        ),
      );
      setUploadingId(null);
    }, 1500);
  }, []);

  const handleUploadClick = (folderId: string) => {
    setUploadingId(folderId);
    setTimeout(() => {
      setFolders((prev) =>
        prev.map((f) =>
          f.id === folderId
            ? {
                ...f,
                documents: [
                  ...f.documents,
                  {
                    id: `${folderId}-${Date.now()}`,
                    name: 'New_Document.pdf',
                    size: '0.8 MB',
                    uploadedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                    type: 'pdf',
                  },
                ],
              }
            : f,
        ),
      );
      setUploadingId(null);
    }, 1200);
  };

  const toggleFolder = (folderId: string) => {
    setExpandedFolder((prev) => (prev === folderId ? null : folderId));
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white">
      {/* ─── Enrollment Success Toast ──────────────────────── */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] w-[90vw] max-w-md"
          >
            <div className="rounded-2xl border border-[#3ED1B8]/20 bg-[#0F1219]/95 backdrop-blur-2xl shadow-2xl shadow-[#3ED1B8]/10 p-4 flex items-start gap-3.5">
              <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-[#3ED1B8]/15 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-[#3ED1B8]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white mb-0.5">
                  Welcome to the Guardian Standard
                </p>
                <p className="text-xs text-white/50 leading-relaxed">
                  Your Vault is now active. Start uploading your contracts, permits, and insurance documents.
                </p>
              </div>
              <button
                onClick={() => setShowSuccessToast(false)}
                className="flex-shrink-0 h-7 w-7 rounded-lg hover:bg-white/[0.06] flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4 text-white/30 hover:text-white/60" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Decorative Background ────────────────────────────── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#3257C2]/[0.06] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#3ED1B8]/[0.04] blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#3257C2]/[0.02] blur-[150px]" />
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '48px 48px',
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        {/* ─── Header ──────────────────────────────────────────── */}
        <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center mb-12">
          {/* Security Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#3ED1B8]/10 border border-[#3ED1B8]/20 px-4 py-1.5 mb-6">
            <BadgeCheck className="h-4 w-4 text-[#3ED1B8]" />
            <span className="text-xs font-bold text-[#3ED1B8] tracking-wide uppercase">
              Shield Verified &amp; Encrypted
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Your Secure{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3257C2] to-[#3ED1B8]">
              Property Vault
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            Organized protection for your 4 core document categories.
            Every file encrypted, every folder organized, every document protected.
          </p>
        </motion.div>

        {/* ─── Stats Row ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-3 gap-4 max-w-xl mx-auto mb-12"
        >
          {[
            { icon: FileText, label: 'Documents', value: totalDocs.toString(), color: 'text-[#3257C2]' },
            { icon: HardDrive, label: 'Storage', value: totalSize, color: 'text-[#3ED1B8]' },
            { icon: Shield, label: 'Folders', value: '4/4', color: 'text-[#F5A623]' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] rounded-xl p-4 text-center">
              <stat.icon className={`h-5 w-5 ${stat.color} mx-auto mb-1.5`} />
              <p className="text-lg sm:text-xl font-bold text-white">{stat.value}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/30">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* ─── Storage Bar ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-xl mx-auto mb-12"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-white/40">Storage Used</span>
            <span className="text-xs font-bold text-[#3ED1B8]">{storageUsed} MB / 5 GB</span>
          </div>
          <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(storageUsed / storageTotal) * 100}%` }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-[#3257C2] to-[#3ED1B8]"
            />
          </div>
        </motion.div>

        {/* ─── 4 Category Folders ──────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
          {folders.map((folder, index) => {
            const isExpanded = expandedFolder === folder.id;
            const isDragOver = dragOverId === folder.id;
            const isUploading = uploadingId === folder.id;
            const docCount = folder.documents.length;

            return (
              <motion.div
                key={folder.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                {/* Glassmorphism Folder Card */}
                <div
                  className={`relative rounded-2xl border ${isDragOver ? `${folder.borderColor} bg-white/[0.08]` : 'border-white/[0.08] bg-white/[0.04]'} backdrop-blur-xl transition-all duration-300 overflow-hidden`}
                  onDragOver={(e) => { e.preventDefault(); handleDragOver(folder.id); }}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => { e.preventDefault(); handleDrop(folder.id); }}
                >
                  {/* Top Accent Line */}
                  <div className={`h-0.5 w-full bg-gradient-to-r ${folder.iconColor === 'text-[#3257C2]' ? 'from-[#3257C2] to-[#3257C2]/0' : folder.iconColor === 'text-[#3ED1B8]' ? 'from-[#3ED1B8] to-[#3ED1B8]/0' : folder.iconColor === 'text-[#F5A623]' ? 'from-[#F5A623] to-[#F5A623]/0' : 'from-[#CD7F32] to-[#CD7F32]/0'}`} />

                  {/* Folder Header */}
                  <button
                    onClick={() => toggleFolder(folder.id)}
                    className="w-full p-5 sm:p-6 flex items-start gap-4 text-left group cursor-pointer"
                  >
                    <div className={`h-12 w-12 rounded-xl ${folder.iconBg} flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}>
                      <folder.icon className={`h-6 w-6 ${folder.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2.5 mb-1">
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-white transition-colors truncate">
                          {folder.title}
                        </h3>
                        {/* Status Badge */}
                        <span className={`flex-shrink-0 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide ${
                          docCount > 0
                            ? 'bg-[#3ED1B8]/10 text-[#3ED1B8] border border-[#3ED1B8]/20'
                            : 'bg-white/[0.06] text-white/30 border border-white/[0.06]'
                        }`}>
                          {docCount > 0 ? `${docCount} Document${docCount > 1 ? 's' : ''}` : 'Empty'}
                        </span>
                      </div>
                      <p className="text-xs text-white/40 leading-relaxed line-clamp-2">
                        {folder.subtitle}
                      </p>
                    </div>
                    {/* Expand Arrow */}
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0 mt-1"
                    >
                      <svg className="h-5 w-5 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                  </button>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                          {/* Divider */}
                          <div className="border-t border-white/[0.06] mb-4" />

                          {/* Documents List */}
                          {docCount > 0 && (
                            <div className="space-y-2 mb-4">
                              {folder.documents.map((doc) => (
                                <div key={doc.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.04] hover:bg-white/[0.06] transition-colors group/doc">
                                  <div className={`h-8 w-8 rounded-lg ${folder.iconBg} flex items-center justify-center flex-shrink-0`}>
                                    <FileText className={`h-4 w-4 ${folder.iconColor}`} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-white/80 truncate group-hover/doc:text-white transition-colors">
                                      {doc.name}
                                    </p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                      <span className="text-[10px] text-white/25">{doc.size}</span>
                                      <span className="text-[10px] text-white/15">•</span>
                                      <span className="text-[10px] text-white/25">{doc.uploadedAt}</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1 opacity-0 group-hover/doc:opacity-100 transition-opacity">
                                    <button className="h-7 w-7 rounded-lg bg-white/[0.06] hover:bg-[#3257C2]/20 flex items-center justify-center transition-colors" aria-label="Download">
                                      <Download className="h-3.5 w-3.5 text-white/40 hover:text-white/70" />
                                    </button>
                                    <button className="h-7 w-7 rounded-lg bg-white/[0.06] hover:bg-[#3257C2]/20 flex items-center justify-center transition-colors" aria-label="Share">
                                      <Share2 className="h-3.5 w-3.5 text-white/40 hover:text-white/70" />
                                    </button>
                                    <button className="h-7 w-7 rounded-lg bg-white/[0.06] hover:bg-[#3257C2]/20 flex items-center justify-center transition-colors" aria-label="View">
                                      <Eye className="h-3.5 w-3.5 text-white/40 hover:text-white/70" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Upload Zone */}
                          <div
                            className={`relative rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer ${
                              isDragOver
                                ? `${folder.borderColor} bg-white/[0.06]`
                                : 'border-white/[0.08] hover:border-white/[0.15] bg-white/[0.02] hover:bg-white/[0.04]'
                            }`}
                            onClick={() => !isUploading && handleUploadClick(folder.id)}
                          >
                            <div className="p-4 flex flex-col items-center gap-2">
                              {isUploading ? (
                                <>
                                  <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                    className="h-6 w-6 border-2 border-[#3ED1B8]/30 border-t-[#3ED1B8] rounded-full"
                                  />
                                  <span className="text-xs font-semibold text-[#3ED1B8]">Uploading...</span>
                                </>
                              ) : (
                                <>
                                  <Upload className={`h-5 w-5 transition-colors ${isDragOver ? folder.iconColor : 'text-white/20'}`} />
                                  <span className="text-xs font-medium text-white/30 text-center">
                                    Drag & Drop or <span className={`${folder.iconColor} font-semibold`}>Upload Document</span>
                                  </span>
                                  <span className="text-[10px] text-white/15">
                                    PDF, DOC, XLS, PNG, JPG — Max 25MB
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Drag Overlay */}
                  <AnimatePresence>
                    {isDragOver && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-[#3ED1B8]/[0.03] backdrop-blur-sm border-2 border-dashed border-[#3ED1B8]/30 rounded-2xl pointer-events-none flex items-center justify-center"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="h-8 w-8 text-[#3ED1B8]" />
                          <span className="text-sm font-bold text-[#3ED1B8]">Drop to upload</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ─── Security Features ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { icon: Lock, title: 'AES-256 Encryption', desc: 'Military-grade encryption at rest and in transit' },
            { icon: Eye, title: 'Access Control', desc: 'Share only what you want, with whom you choose' },
            { icon: Clock, title: 'Version History', desc: 'Every edit tracked with rollback capability' },
            { icon: CheckCircle2, title: 'Audit Trail', desc: 'Complete log of all views, shares, and downloads' },
          ].map((feature) => (
            <div key={feature.title} className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-xl p-4 hover:bg-white/[0.05] transition-colors">
              <feature.icon className="h-5 w-5 text-[#3ED1B8] mb-2.5" />
              <p className="text-xs font-bold text-white/80 mb-0.5">{feature.title}</p>
              <p className="text-[10px] text-white/30 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* ─── Back to Home ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center mt-14"
        >
          <button
            onClick={() => setCurrentPage('home')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/40 hover:text-white transition-colors duration-200 group"
          >
            <svg className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>
        </motion.div>
      </div>
    </div>
  );
}
