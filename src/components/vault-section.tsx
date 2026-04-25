'use client';

import {
  Shield,
  Lock,
  FileText,
  Upload,
  FolderOpen,
  ArrowRight,
  CheckCircle2,
  CloudOff,
  Eye,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';

const vaultFeatures = [
  {
    icon: Lock,
    title: 'End-to-End Encryption',
    description: 'All documents are encrypted at rest and in transit using AES-256 encryption.',
  },
  {
    icon: FileText,
    title: 'Smart Organization',
    description: 'Auto-categorize contracts, permits, warranties, invoices, and insurance documents.',
  },
  {
    icon: Eye,
    title: 'Access Control',
    description: 'Share specific documents with your Pro or auditor without exposing your entire vault.'
  },
  {
    icon: CloudOff,
    title: 'Offline Backup',
    description: 'Download encrypted backups of your vault for offline storage and disaster recovery.',
  },
];

export function VaultSection() {
  const { setCurrentPage } = useAppStore();
  return (
    <section id="vault" className="relative bg-[#F4F7F9] py-16 lg:py-24">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #1A1D2E 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left - Vault Visual */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="relative bg-white rounded-2xl border border-[#E5E7EB] shadow-xl shadow-[#1A1D2E]/[0.06] p-6 lg:p-8">
              {/* Vault Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-[#3257C2]/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-[#3257C2]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1A1D2E]">
                    Homeowner Vault
                  </h3>
                  <p className="text-xs text-[#1A1D2E]/40">
                    Secure Document Storage
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-1.5 bg-[#3ED1B8]/10 px-2.5 py-1 rounded-full">
                  <Lock className="h-3 w-3 text-[#3ED1B8]" />
                  <span className="text-[10px] font-bold text-[#3ED1B8]">
                    Encrypted
                  </span>
                </div>
              </div>

              {/* Folder Categories */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { icon: FileText, label: 'Contracts', count: 3, color: 'text-[#3257C2]', bg: 'bg-[#3257C2]/[0.07]' },
                  { icon: FolderOpen, label: 'Permits', count: 2, color: 'text-[#3ED1B8]', bg: 'bg-[#3ED1B8]/[0.07]' },
                  { icon: Shield, label: 'Warranties', count: 4, color: 'text-[#F5A623]', bg: 'bg-[#F5A623]/[0.07]' },
                  { icon: FileText, label: 'Insurance Docs', count: 1, color: 'text-[#CD7F32]', bg: 'bg-[#CD7F32]/[0.07]' },
                ].map((folder, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-lg border border-[#E5E7EB] hover:bg-[#F4F7F9] transition-colors cursor-pointer group"
                  >
                    <div className={`h-8 w-8 rounded-lg ${folder.bg} flex items-center justify-center`}>
                      <folder.icon className={`h-4 w-4 ${folder.color}`} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#1A1D2E] group-hover:text-[#3257C2] transition-colors">
                        {folder.label}
                      </p>
                      <p className="text-[10px] text-[#1A1D2E]/40">
                        {folder.count} file{folder.count > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Upload Area */}
              <div className="border-2 border-dashed border-[#E5E7EB] rounded-lg p-4 text-center hover:border-[#3257C2]/30 transition-colors cursor-pointer bg-[#F4F7F9]/50">
                <Upload className="h-5 w-5 text-[#1A1D2E]/30 mx-auto mb-1.5" />
                <p className="text-xs text-[#1A1D2E]/50 font-medium">
                  Drop files to upload
                </p>
              </div>

              {/* Recent Activity */}
              <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#1A1D2E]/30 mb-2">
                  Recent Activity
                </p>
                <div className="space-y-2">
                  {[
                    { action: 'Uploaded', file: 'Roofing_Contract_2024.pdf', time: '2 hours ago' },
                    { action: 'Shared', file: 'Insurance_Certificate.pdf', time: 'Yesterday' },
                    { action: 'Uploaded', file: 'Permit_LACounty.pdf', time: '3 days ago' },
                  ].map((activity, ai) => (
                    <div key={ai} className="flex items-center gap-2 text-[11px]">
                      <span className="font-semibold text-[#3257C2] w-14">{activity.action}</span>
                      <span className="text-[#1A1D2E]/70 truncate flex-1">{activity.file}</span>
                      <span className="text-[#1A1D2E]/30 flex-shrink-0">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#3257C2]/[0.07] px-4 py-1.5 mb-6">
              <Lock className="h-3.5 w-3.5 text-[#3257C2]" />
              <span className="text-xs font-semibold text-[#3257C2] tracking-wide uppercase">
                Secure Storage
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1A1D2E] leading-tight">
              The Homeowner{' '}
              <span className="text-[#3257C2]">Vault</span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#1A1D2E]/60 leading-relaxed">
              Your personal, encrypted document storage inside the Home Dashboard.
              Keep every contract, permit, warranty, and insurance document
              organized and instantly accessible — only you control who sees what.
            </p>

            <div className="mt-8 space-y-4">
              {vaultFeatures.map((feature, index) => (
                <div key={feature.title} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5 h-7 w-7 rounded-lg bg-[#3ED1B8]/10 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-[#3ED1B8]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1A1D2E]">
                      {feature.title}
                    </p>
                    <p className="text-xs text-[#1A1D2E]/50 mt-0.5">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button onClick={() => setCurrentPage('vault')} className="rounded-lg bg-[#3257C2] hover:bg-[#2a49a8] text-white font-semibold text-sm px-6 py-3 shadow-lg shadow-[#3257C2]/20 hover:shadow-xl hover:shadow-[#3257C2]/30 transition-all duration-300 group">
                Open Your Vault
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <p className="mt-3 text-xs text-[#1A1D2E]/40">
                Available inside your Home Dashboard — 5GB free storage included.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
