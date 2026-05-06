'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Download,
  Filter,
  Copy,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Video,
  FileText,
  Quote,
  ArrowRight,
  Shield,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/lib/store';
import {
  shieldScripts,
  scriptCategories,
  categoryColors,
  type ShieldScript,
} from '@/lib/shield-scripts';

/* ───────────────────────── animations ─────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const childFade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

/* ───────────────────────── component ──────────────────────────────── */
export function ShieldScriptsView() {
  const { setCurrentPage } = useAppStore();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set([1]));
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const filteredScripts = useMemo(() => {
    let result = shieldScripts;
    if (activeCategory !== 'all') {
      result = result.filter((s) => s.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.hook.toLowerCase().includes(q) ||
          s.caption.toLowerCase().includes(q) ||
          s.script.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, searchQuery]);

  const toggleCard = (num: number) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      return next;
    });
  };

  const copyScript = async (script: ShieldScript) => {
    const text = `Point ${script.num}: ${script.title}\n\nHook: ${script.hook}\nCaption: ${script.caption}\n\nScript:\n${script.script}`;
    await navigator.clipboard.writeText(text);
    setCopiedId(script.num);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadPdf = async () => {
    // Download from API endpoint
    try {
      const res = await fetch('/api/shield-pdf');
      if (!res.ok) throw new Error('Failed to generate PDF');
      const contentType = res.headers.get('content-type') || '';

      if (contentType.includes('application/pdf')) {
        // Got a real PDF blob — download directly
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'BYLDRS_GUARDIAN_20_Point_Shield_Marketers_Pack.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        // Got HTML fallback (Playwright not available) — open in new tab for print
        const html = await res.text();
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const win = window.open(url, '_blank');
        if (!win) {
          // Popup blocked — download HTML file
          const a = document.createElement('a');
          a.href = url;
          a.download = 'BYLDRS_GUARDIAN_20_Point_Shield_Marketers_Pack.html';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
        URL.revokeObjectURL(url);
      }
    } catch {
      // Final fallback to text download
      const content = shieldScripts
        .map(
          (s) =>
            `════════════════════════════════════════\n` +
            `POINT ${s.num}: ${s.title}\n` +
            `════════════════════════════════════════\n\n` +
            `HOOK:\n${s.hook}\n\n` +
            `CAPTION:\n${s.caption}\n\n` +
            `SCRIPT:\n${s.script}\n`
        )
        .join('\n');
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'BYLDRS_GUARDIAN_20_Point_Shield_Marketers_Pack.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <section className="min-h-screen bg-[#0A0D14] text-white">
      {/* ═══════════════════════════════════════════════════════════════
          HERO
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
        <div className="pointer-events-none absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-[#3257C2]/[0.08] blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-[#3ED1B8]/[0.06] blur-[100px]" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-[#F5A623]/[0.04] blur-[80px]" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-[100px] lg:pt-[110px] pb-16 sm:pb-24 text-center">
          <motion.div initial="hidden" animate="visible">
            {/* Badge */}
            <motion.div variants={fadeUp} custom={0} className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#F5A623]/[0.1] border border-[#F5A623]/20 px-5 py-2 text-xs font-bold tracking-widest uppercase text-[#F5A623]">
                <Video className="h-3.5 w-3.5" />
                Marketer&apos;s Pack
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.75rem] font-extrabold tracking-tight text-white leading-[1.08] mb-5"
            >
              The 20-Point Shield
              <br />
              <span className="bg-gradient-to-r from-[#3ED1B8] via-[#3257C2] to-[#F5A623] bg-clip-text text-transparent">
                Scripts &amp; Captions
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mx-auto max-w-xl text-base sm:text-lg text-white/40 leading-relaxed mb-10"
            >
              20 ready-to-use video scripts with hooks, captions, and full narration.
              Designed for social media, email campaigns, and community outreach.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                onClick={handleDownloadPdf}
                size="lg"
                className="h-13 px-8 rounded-xl bg-[#3ED1B8] hover:bg-[#34b9a2] text-[#0A0D14] font-bold text-sm shadow-xl shadow-[#3ED1B8]/20 hover:shadow-[#3ED1B8]/30 transition-all duration-300 group"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Full Pack (PDF)
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="ghost"
                onClick={() => setCurrentPage('the-standard')}
                size="lg"
                className="h-13 px-8 rounded-xl border border-white/15 text-white/70 hover:text-white hover:bg-white/[0.06] font-semibold text-sm transition-all duration-300"
              >
                <ShieldCheck className="mr-2 h-5 w-5" />
                View The 20-Point Shield
              </Button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={fadeUp}
              custom={4}
              className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-8"
            >
              {[
                { value: '20', label: 'Video Scripts' },
                { value: '20', label: 'Social Captions' },
                { value: '20', label: 'Custom Hooks' },
                { value: 'PDF', label: 'Download' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <span className="block text-xl sm:text-2xl font-extrabold text-white">{stat.value}</span>
                  <span className="block text-[11px] text-white/30 font-medium mt-0.5">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          FILTER BAR
          ═══════════════════════════════════════════════════════════════ */}
      <div className="sticky top-16 z-30 bg-[#0F1219]/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-4">
          {/* Search + category filter */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            {/* Search */}
            <div className="relative w-full sm:w-64 shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search scripts..."
                aria-label="Search scripts"
                className="w-full h-10 pl-10 pr-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-[#3ED1B8]/20 focus:border-[#3ED1B8]/30 transition-all"
              />
            </div>

            {/* Category pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto scrollbar-hide">
              <Filter className="h-4 w-4 text-white/20 shrink-0" />
              {scriptCategories.map((cat) => {
                const isActive = activeCategory === cat.key;
                const color = cat.key === 'all' ? '#3ED1B8' : categoryColors[cat.key] || '#3ED1B8';
                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`
                      shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200
                      ${isActive
                        ? 'text-[#0A0D14] shadow-sm'
                        : 'bg-white/[0.04] text-white/40 hover:text-white/60 border border-white/[0.06] hover:border-white/[0.12]'
                      }
                    `}
                    style={isActive ? { backgroundColor: color } : undefined}
                  >
                    {cat.label}
                    <span className={`ml-1.5 ${isActive ? 'text-[#0A0D14]/50' : 'text-white/20'}`}>
                      {cat.key === 'all' ? shieldScripts.length : cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results count */}
          <div className="mt-3 text-[11px] text-white/25 font-medium">
            Showing {filteredScripts.length} of {shieldScripts.length} scripts
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SCRIPTS GRID
          ═══════════════════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pb-20">
        {filteredScripts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <Search className="h-12 w-12 text-white/10 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white/40 mb-2">No scripts found</h3>
            <p className="text-sm text-white/25">Try a different search term or category.</p>
          </motion.div>
        ) : (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {filteredScripts.map((script) => {
              const isExpanded = expandedCards.has(script.num);
              const catColor = categoryColors[script.category] || '#3ED1B8';
              const isCopied = copiedId === script.num;

              return (
                <motion.div
                  key={script.num}
                  variants={childFade}
                  layout
                  className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 overflow-hidden"
                >
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px opacity-40 group-hover:opacity-70 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, transparent, ${catColor}60, transparent)` }}
                  />

                  <div className="p-5 sm:p-6">
                    {/* Header row */}
                    <div className="flex items-start gap-4">
                      {/* Number badge */}
                      <div
                        className="shrink-0 flex items-center justify-center h-12 w-12 rounded-xl text-sm font-extrabold transition-colors duration-300"
                        style={{ backgroundColor: `${catColor}15`, color: catColor }}
                      >
                        {String(script.num).padStart(2, '0')}
                      </div>

                      {/* Title + meta */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-base sm:text-lg font-bold text-white truncate">
                            {script.title}
                          </h3>
                          <span
                            className="shrink-0 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border"
                            style={{
                              color: `${catColor}CC`,
                              backgroundColor: `${catColor}10`,
                              borderColor: `${catColor}20`,
                            }}
                          >
                            {script.category}
                          </span>
                        </div>

                        {/* Hook — always visible */}
                        <div className="flex items-start gap-2 mt-2">
                          <Quote className="h-4 w-4 mt-0.5 shrink-0" style={{ color: `${catColor}60` }} />
                          <p className="text-sm text-white/50 leading-relaxed font-medium italic">
                            &ldquo;{script.hook}&rdquo;
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="shrink-0 flex items-center gap-2">
                        <button
                          onClick={() => copyScript(script)}
                          className="flex items-center justify-center h-9 w-9 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-200"
                          title="Copy script"
                          aria-label="Copy script"
                        >
                          {isCopied ? (
                            <CheckCircle2 className="h-4 w-4 text-[#3ED1B8]" />
                          ) : (
                            <Copy className="h-4 w-4 text-white/40" />
                          )}
                        </button>
                        <button
                          onClick={() => toggleCard(script.num)}
                          className="flex items-center justify-center h-9 w-9 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-200"
                          title={isExpanded ? 'Collapse' : 'Expand'}
                          aria-label={isExpanded ? 'Collapse script details' : 'Expand script details'}
                          aria-expanded={isExpanded}
                        >
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4 text-white/40" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-white/40" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Expanded content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="mt-5 pt-5 border-t border-white/[0.06] space-y-5">
                            {/* Caption */}
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <FileText className="h-3.5 w-3.5" style={{ color: catColor }} />
                                <span
                                  className="text-[11px] font-bold uppercase tracking-wider"
                                  style={{ color: `${catColor}CC` }}
                                >
                                  Caption
                                </span>
                              </div>
                              <p className="text-sm text-white/55 leading-relaxed pl-5">
                                {script.caption}
                              </p>
                            </div>

                            {/* Script */}
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Video className="h-3.5 w-3.5" style={{ color: catColor }} />
                                <span
                                  className="text-[11px] font-bold uppercase tracking-wider"
                                  style={{ color: `${catColor}CC` }}
                                >
                                  Full Video Script
                                </span>
                              </div>
                              <div
                                className="rounded-xl p-4 sm:p-5 border border-white/[0.04]"
                                style={{ backgroundColor: `${catColor}05` }}
                              >
                                <p className="text-sm text-white/65 leading-[1.8] whitespace-pre-line">
                                  {script.script}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          DOWNLOAD CTA
          ═══════════════════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F1219] via-[#1A1D2E] to-[#0F1219]" />
          <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 rounded-full bg-[#3257C2]/10 blur-[80px]" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-[#3ED1B8]/[0.08] blur-[60px]" />

          <div className="relative px-6 py-12 sm:px-10 sm:py-16 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F5A623]/15 backdrop-blur-sm border border-[#F5A623]/20">
              <Shield className="h-7 w-7 text-[#F5A623]" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 leading-tight">
              Download the Complete Pack
            </h2>
            <p className="text-white/40 text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">
              Get all 20 scripts with hooks, captions, and full narration in a professionally designed PDF.
              Print-ready for your marketing team.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                onClick={handleDownloadPdf}
                size="lg"
                className="h-13 px-8 rounded-xl bg-[#3ED1B8] hover:bg-[#34b9a2] text-[#0A0D14] font-bold text-sm shadow-xl shadow-[#3ED1B8]/20 hover:shadow-[#3ED1B8]/30 transition-all duration-300 group"
              >
                <Download className="mr-2 h-5 w-5" />
                Download PDF Pack
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="ghost"
                onClick={() => setCurrentPage('protection-guide-download')}
                size="lg"
                className="h-13 px-8 rounded-xl border border-white/15 text-white/70 hover:text-white hover:bg-white/[0.06] font-semibold text-sm"
              >
                <FileText className="mr-2 h-5 w-5" />
                20-Point Shield Guide
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
