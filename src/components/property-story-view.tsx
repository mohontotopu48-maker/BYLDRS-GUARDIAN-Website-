'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  Clock,
  BookOpen,
  ShieldCheck,
  Star,
  Award,
  Crown,
  Trophy,
  Gift,
  ChevronRight,
  CheckCircle2,
  User,
  MapPin,
  Calendar,
  MessageSquareQuote,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';
import { proProfiles, tierConfig } from '@/lib/pro-data';

/* ───────────────────────── Types & Data ────────────────────────────── */

interface StoryMeta {
  title: string;
  subtitle: string;
  category: string;
  categoryColor: string;
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  featureImage: string;
  featuredProId: number;
  sections: { heading: string; body: string[] }[];
}

const storyDatabase: Record<number, StoryMeta> = {
  0: {
    title: 'The $1,000 Deposit Rule: How California Law Protects You',
    subtitle: 'Most homeowners don\'t know their rights when a contractor asks for money upfront. Here\'s your complete legal guide.',
    category: 'Legal',
    categoryColor: 'bg-amber-100 text-amber-800',
    readTime: '8 min read',
    date: 'January 2025',
    author: 'BYLDRS GUARDIAN Legal Team',
    authorRole: 'Homeowner Protection Guide',
    featureImage: '/blog-featured-deposit-law.png',
    featuredProId: 1,
    sections: [
      {
        heading: 'Why the $1,000 Rule Exists',
        body: [
          'California Business & Professions Code § 7159 is one of the most powerful consumer protection laws in home improvement — and it\'s one that the vast majority of homeowners have never heard of. The law states that for any home improvement project priced at $500 or more, a contractor may not demand or accept a deposit exceeding $1,000 or 10% of the total contract price, whichever is less.',
          'This law was written in response to a simple, devastating pattern: unscrupulous contractors would collect deposits of 30%, 50%, or even 100% upfront — then vanish without doing any work. California lawmakers recognized that homeowners needed a hard ceiling to prevent these losses.',
          'At BYLDRS GUARDIAN, every Pro on our platform is audited against this exact requirement. If a Pro\'s contracts ever request deposits above the legal limit, they lose their Guardian status immediately.',
        ],
      },
      {
        heading: 'How to Enforce Your Rights',
        body: [
          'If a contractor asks for more than $1,000 upfront, you have several options. First, you can simply decline and cite § 7159. Most legitimate contractors will immediately adjust their terms. Second, you can file a complaint with the Contractors State License Board (CSLB) at cslb.ca.gov — the board takes deposit violations seriously and can suspend or revoke a contractor\'s license.',
          'Third, you can request a progress payment schedule instead. This structure ties each payment to a specific milestone — for example: $1,000 deposit, 25% after framing, 25% after rough-in, and the final 40% upon completion and inspection.',
          'Never pay the final balance until you\'ve done a walkthrough inspection and all punch-list items are resolved. Your leverage disappears the moment the final check clears.',
        ],
      },
      {
        heading: 'Red Flags to Watch For',
        body: [
          'A contractor who pressures you for a large upfront deposit is waving a red flag. Additional warning signs include: cash-only payment demands, no written contract, refusal to provide their CSLB license number, and reluctance to break payments into milestones.',
          'Before signing any contract, verify the contractor\'s license at cslb.ca.gov. Check for active status, bond information, and workers\' compensation coverage. These three data points take less than five minutes to confirm and can save you tens of thousands of dollars.',
        ],
      },
      {
        heading: 'The Bottom Line',
        body: [
          'The $1,000 deposit rule is your first line of defense. It doesn\'t mean you shouldn\'t pay deposits at all — it means you should never pay more than the law allows. Use BYLDRS GUARDIAN\'s Check My Pro tool to verify any contractor before signing, and store every contract and receipt in your Homeowner Vault for future reference.',
        ],
      },
    ],
  },
  1: {
    title: 'Why the Workers\' Comp Audit is Your Roof\'s Best Insurance',
    subtitle: 'Before any crew steps on your roof, verify they carry valid workers\' compensation. One lapse could leave you liable for six-figure medical bills.',
    category: 'Roofing',
    categoryColor: 'bg-sky-100 text-sky-800',
    readTime: '6 min read',
    date: 'December 2024',
    author: 'BYLDRS GUARDIAN Audit Team',
    authorRole: 'Property Protection Insights',
    featureImage: '/blog-featured-workers-comp.png',
    featuredProId: 1,
    sections: [
      {
        heading: 'The Hidden Liability on Your Roof',
        body: [
          'When a roofing crew arrives at your home, you probably check that they look professional — branded trucks, clean uniforms, polite demeanor. But the most important thing they carry isn\'t visible: workers\' compensation insurance.',
          'If an uninsured worker falls off your roof and suffers a serious injury, California law can hold you — the property owner — liable for medical bills, lost wages, and disability payments. These costs routinely exceed $100,000 for serious falls.',
          'This isn\'t a rare edge case. According to the California Division of Occupational Safety and Health (Cal/OSHA), falls are the leading cause of construction fatalities, and roofing has one of the highest injury rates of any trade.',
        ],
      },
      {
        heading: 'How BYLDRS GUARDIAN Audits Workers\' Comp',
        body: [
          'Every 30 days, our audit engine cross-references each Pro\'s workers\' compensation policy status with the California Department of Industrial Relations database. We verify policy number, coverage dates, and carrier information.',
          'If a Pro\'s coverage lapses — even for a single day — their Guardian status is suspended, and homeowners are notified immediately. This automated verification eliminates the gap between "checking a certificate" and "confirming active coverage."',
        ],
      },
      {
        heading: 'What Homeowners Should Do',
        body: [
          'Before any roofing work begins, ask the contractor for a current Certificate of Workers\' Compensation Insurance. Verify the policy number directly with the insurance carrier — don\'t just accept the paper. Then, store that certificate in your Homeowner Vault alongside the contract.',
          'If your Pro is on BYLDRS GUARDIAN with a "Workers\' Comp: Verified" badge, our audit team has already confirmed active coverage within the last 30 days. But it\'s always good practice to keep your own records.',
        ],
      },
    ],
  },
  2: {
    title: 'The $1,000 Deposit Rule in Plumbing',
    subtitle: 'Plumbers are bound by the same deposit limits as every other Pro in California. Learn how to spot violations before you write the check.',
    category: 'Plumbing',
    categoryColor: 'bg-cyan-100 text-cyan-800',
    readTime: '5 min read',
    date: 'November 2024',
    author: 'BYLDRS GUARDIAN Legal Team',
    authorRole: 'Homeowner Protection Guide',
    featureImage: '/blog-featured-plumbing.png',
    featuredProId: 2,
    sections: [
      {
        heading: 'The Law Applies to Every Trade',
        body: [
          'One of the most common misconceptions among California homeowners is that deposit protection laws only apply to large-scale projects like full remodels or new construction. In reality, California Business & Professions Code § 7159 applies to any home improvement project exceeding $500 — including plumbing.',
          'Whether you\'re hiring a plumber for a water heater replacement ($2,500) or a full bathroom repipe ($8,000), the same $1,000 / 10% deposit cap applies. No exceptions. No "industry standard" arguments. No verbal agreements that override the statute.',
        ],
      },
      {
        heading: 'Plumbing-Specific Scam Patterns',
        body: [
          'Plumbing fraud often follows a predictable script. The contractor arrives for a "free estimate," identifies an "emergency" problem, and demands an immediate large deposit to "order parts" or "secure the crew." High-pressure tactics are designed to prevent you from doing your homework.',
          'Legitimate plumbers — like the Vetted Partners on BYLDRS GUARDIAN — provide written estimates, allow time for review, and accept payments tied to milestones. If a plumber won\'t put terms in writing, that\'s your signal to walk away.',
        ],
      },
      {
        heading: 'Protecting Yourself',
        body: [
          'Always get a written contract before any work begins. The contract should include a detailed scope of work, material specifications, payment schedule, warranty terms, and permit requirements. Verify the plumber\'s CSLB license at cslb.ca.gov and confirm their workers\' compensation coverage.',
          'Store every document — estimates, contracts, receipts, warranties, and photos — in your Homeowner Vault. If a dispute arises, documentation is your strongest defense.',
        ],
      },
    ],
  },
};

const fallbackStories: Record<number, { featureImage: string; featuredProId: number }> = {
  3: { featureImage: '/blog-featured-deposit-law.png', featuredProId: 3 },
  4: { featureImage: '/blog-featured-workers-comp.png', featuredProId: 5 },
  5: { featureImage: '/blog-featured-plumbing.png', featuredProId: 1 },
  6: { featureImage: '/blog-featured-workers-comp.png', featuredProId: 1 },
  7: { featureImage: '/blog-featured-plumbing.png', featuredProId: 2 },
  8: { featureImage: '/blog-featured-deposit-law.png', featuredProId: 2 },
};

/* ───────────────────────── Animation ────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' as const },
  }),
};

/* ───────────────────────── Component ────────────────────────────── */

export function PropertyStoryView() {
  const { selectedArticleId, setCurrentPage, setSelectedArticleId } = useAppStore();
  const articleId = selectedArticleId ?? 0;
  const story = storyDatabase[articleId];
  const fallback = fallbackStories[articleId];

  if (!story && !fallback) {
    return (
      <section className="min-h-screen bg-[#F4F7F9] flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <h2 className="text-xl font-bold text-gray-500 mb-2">Story Not Found</h2>
          <Button onClick={() => setCurrentPage('blog')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Button>
        </div>
      </section>
    );
  }

  const title = story?.title ?? 'Property Story';
  const subtitle = story?.subtitle ?? '';
  const category = story?.category ?? 'Tips';
  const categoryColor = story?.categoryColor ?? 'bg-emerald-100 text-emerald-800';
  const readTime = story?.readTime ?? '5 min read';
  const date = story?.date ?? '2024';
  const author = story?.author ?? 'BYLDRS GUARDIAN';
  const authorRole = story?.authorRole ?? 'Property Protection';
  const featureImage = story?.featureImage ?? fallback?.featureImage ?? '';
  const featuredProId = story?.featuredProId ?? fallback?.featuredProId ?? 1;
  const sections = story?.sections ?? [];

  const featuredPro = proProfiles.find((p) => p.id === featuredProId);
  const tier = featuredPro ? tierConfig[featuredPro.tier] : null;

  const handleProClick = () => {
    if (featuredPro) {
      useAppStore.getState().setSelectedProId(featuredPro.id);
      setCurrentPage('pro-profile');
    }
  };

  const goBackToBlog = () => {
    setSelectedArticleId(null);
    setCurrentPage('blog');
  };

  return (
    <section className="min-h-screen bg-[#F4F7F9]">
      {/* ───── Feature Image ───── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full h-56 sm:h-72 md:h-80 lg:h-96 overflow-hidden bg-[#1A1D2E]"
      >
        {featureImage ? (
          <img src={featureImage} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1A1D2E] via-[#3257C2] to-[#3ED1B8]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1219] via-[#0F1219]/40 to-transparent" />

        <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
          <Button
            onClick={goBackToBlog}
            variant="ghost"
            className="text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm rounded-lg font-medium text-sm"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
          <motion.div initial="hidden" animate="visible" className="max-w-5xl mx-auto">
            <motion.div variants={fadeUp} custom={0} className="mb-3">
              <Badge className={`${categoryColor} border-0 text-xs font-semibold`}>{category}</Badge>
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1}
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white leading-tight">
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p variants={fadeUp} custom={2}
                className="mt-2 text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed">
                {subtitle}
              </motion.p>
            )}
            <motion.div variants={fadeUp} custom={3}
              className="mt-4 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-white/50 font-medium">
              <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" />{author}</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{date}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{readTime}</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* ───── Main Content + Sidebar ───── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">

          {/* ── Main Body ── */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 min-w-0"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6 sm:p-8 lg:p-10">
              {/* Author banner */}
              <div className="flex items-center gap-3 pb-6 mb-6 border-b border-[#E5E7EB]">
                <div className="h-10 w-10 rounded-full bg-[#3257C2]/10 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-[#3257C2]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1A1D2E]">{author}</p>
                  <p className="text-xs text-[#1A1D2E]/50">{authorRole}</p>
                </div>
              </div>

              {/* Story Sections */}
              {sections.length > 0 ? (
                sections.map((section, i) => (
                  <div key={i} className={i > 0 ? 'mt-8' : ''}>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#1A1D2E] leading-snug mb-4">
                      {section.heading}
                    </h2>
                    {section.body.map((paragraph, j) => (
                      <p key={j} className="mt-3 text-base text-[#1A1D2E]/70 leading-[1.8] first:mt-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ))
              ) : (
                <p className="text-base text-[#1A1D2E]/70 leading-[1.8]">
                  Full article content coming soon. Check back for the complete Property Story with expert analysis and actionable protection tips for California homeowners.
                </p>
              )}

              {/* Tags */}
              <div className="mt-10 pt-6 border-t border-[#E5E7EB]">
                <p className="text-xs font-bold uppercase tracking-wider text-[#1A1D2E]/30 mb-3">Topics</p>
                <div className="flex flex-wrap gap-2">
                  {['Homeowner Protection', category, 'California Law', 'Property Rights'].map((tag) => (
                    <Badge key={tag} variant="outline"
                      className="text-xs font-medium border-[#E5E7EB] text-[#1A1D2E]/60 hover:border-[#3257C2]/30 hover:text-[#3257C2] transition-colors cursor-pointer">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* ───── Property Points Reward Banner ───── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 rounded-2xl bg-gradient-to-br from-[#1A1D2E] via-[#242845] to-[#1A1D2E] p-6 sm:p-8 relative overflow-hidden"
            >
              <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[#3ED1B8]/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-[#F5A623]/10 blur-3xl" />
              <div className="relative flex items-start gap-4">
                <div className="shrink-0 h-12 w-12 rounded-xl bg-[#3ED1B8]/15 flex items-center justify-center">
                  <Gift className="h-6 w-6 text-[#3ED1B8]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-white">Earn Property Points for Your Testimonial</h3>
                  <p className="text-sm text-white/60 leading-relaxed mt-1">
                    Share your experience working with a Guardian Pro and earn{' '}
                    <span className="text-[#3ED1B8] font-bold">+50 Property Points</span>.
                    Your testimonial helps other homeowners make safer decisions — and moves you closer to your next Guardian tier reward.
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <Button className="rounded-lg bg-[#3ED1B8] text-[#1A1D2E] font-semibold text-sm hover:bg-[#3ED1B8]/90 shadow-lg shadow-[#3ED1B8]/20 group">
                      <MessageSquareQuote className="mr-2 h-4 w-4" />
                      Leave a Testimonial
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                    <div className="flex items-center gap-3 text-xs text-white/40">
                      <span className="flex items-center gap-1"><Award className="h-3.5 w-3.5 text-[#F5A623]" />+50 pts</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Crown className="h-3.5 w-3.5 text-[#9CA3AF]" />Tier Progress</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.article>

          {/* ── Right Sidebar ── */}
          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full shrink-0 lg:w-80 space-y-6"
          >
            {/* Featured Pro Card */}
            {featuredPro && tier && (
              <div className="rounded-2xl bg-white shadow-sm border border-[#E5E7EB] overflow-hidden">
                {featuredPro.coverPhoto ? (
                  <div className="h-24 relative">
                    <img src={featuredPro.coverPhoto} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="h-24 bg-gradient-to-r from-[#3257C2] to-[#3ED1B8] relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                  </div>
                )}
                <div className="px-5 pb-5 -mt-6 relative">
                  <div className="flex items-end gap-3 mb-4">
                    {featuredPro.headshot ? (
                      <img src={featuredPro.headshot} alt={featuredPro.name}
                        className="h-14 w-14 rounded-xl object-cover border-2 border-white shadow-md" />
                    ) : (
                      <div className={`h-14 w-14 rounded-xl ${tier.bg} border-2 border-white shadow-md flex items-center justify-center`}>
                        <span className={`text-sm font-bold ${tier.text}`}>{featuredPro.avatar}</span>
                      </div>
                    )}
                    <div className="mb-1">
                      <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${tier.bg} ${tier.text} ${tier.border} border`}>
                        <span>{tier.badge}</span> {tier.label}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-[#1A1D2E]">{featuredPro.name}</h3>
                  <p className="text-xs text-[#1A1D2E]/50 mt-0.5">{featuredPro.company}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <MapPin className="h-3 w-3 text-[#1A1D2E]/30" />
                    <span className="text-xs text-[#1A1D2E]/40">{featuredPro.location}</span>
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-[#F5A623] text-[#F5A623]" />
                      <span className="font-bold text-[#1A1D2E]">{featuredPro.rating}</span>
                      <span className="text-[#1A1D2E]/40">({featuredPro.reviewCount})</span>
                    </div>
                    {featuredPro.verified && (
                      <div className="flex items-center gap-1 text-[#3ED1B8]">
                        <ShieldCheck className="h-3.5 w-3.5" /><span className="font-semibold">Verified</span>
                      </div>
                    )}
                  </div>
                  <button onClick={handleProClick}
                    className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#3257C2]/[0.06] hover:bg-[#3257C2]/[0.12] text-[#3257C2] font-semibold text-sm py-2.5 px-4 transition-all duration-200 group">
                    View Full Profile
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Property Points Summary Card */}
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-[#E5E7EB]">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="h-5 w-5 text-[#F5A623]" />
                <h3 className="text-sm font-bold text-[#1A1D2E]">Property Points</h3>
              </div>
              <div className="space-y-3">
                {[
                  { action: 'Leave a Verified Review', pts: 50, icon: Star, color: 'text-[#3257C2]', bg: 'bg-[#3257C2]/[0.07]' },
                  { action: 'Submit an Audit Request', pts: 100, icon: CheckCircle2, color: 'text-[#CD7F32]', bg: 'bg-[#CD7F32]/[0.07]' },
                  { action: 'Refer a Friend', pts: 200, icon: Gift, color: 'text-[#3ED1B8]', bg: 'bg-[#3ED1B8]/[0.07]' },
                ].map((item) => (
                  <div key={item.action} className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-lg ${item.bg} flex items-center justify-center shrink-0`}>
                      <item.icon className={`h-4 w-4 ${item.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#1A1D2E] truncate">{item.action}</p>
                    </div>
                    <span className={`text-xs font-extrabold ${item.color}`}>+{item.pts}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-[#E5E7EB]">
                <p className="text-[10px] text-[#1A1D2E]/40 font-medium">Next tier: Silver Guardian at 1,500 pts</p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-[#E5E7EB]">
              <h3 className="text-sm font-bold text-[#1A1D2E] mb-3">Explore More</h3>
              <div className="space-y-2">
                {[
                  { label: 'Homeowner Protection Guide', page: 'the-standard' as const },
                  { label: 'All Property Stories', page: 'blog' as const },
                  { label: 'Check My Pro', page: 'check-my-pro' as const },
                ].map((link) => (
                  <button key={link.label}
                    onClick={() => { if (link.page === 'blog') setSelectedArticleId(null); setCurrentPage(link.page); }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium text-[#1A1D2E]/70 hover:text-[#3257C2] hover:bg-[#3257C2]/[0.04] transition-all group">
                    {link.label}
                    <ChevronRight className="h-3.5 w-3.5 text-[#1A1D2E]/20 group-hover:text-[#3257C2] transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
