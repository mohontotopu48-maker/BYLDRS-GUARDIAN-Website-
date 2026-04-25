'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Clock,
  TrendingUp,
  Mail,
  ArrowRight,
  Filter,
  Star,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/lib/store';

/* ───────────────────────── fade‑up animation ───────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: 'easeOut' as const },
  }),
};

/* ───────────────────────── types & data ────────────────────────────── */
type Category =
  | 'All'
  | 'Legal'
  | 'Roofing'
  | 'Plumbing'
  | 'Electrical'
  | 'HVAC'
  | 'Foundation'
  | 'Solar'
  | 'Pool/Spa'
  | 'Pest Control'
  | 'Safety'
  | 'Tips';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: Category;
  categoryColor: string;
  readTime: string;
  date: string;
  featured?: boolean;
}

const categoryColorMap: Record<string, string> = {
  Legal: 'bg-amber-100 text-amber-800 hover:bg-amber-200',
  Roofing: 'bg-sky-100 text-sky-800 hover:bg-sky-200',
  Plumbing: 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200',
  Electrical: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  HVAC: 'bg-rose-100 text-rose-800 hover:bg-rose-200',
  Foundation: 'bg-stone-200 text-stone-800 hover:bg-stone-300',
  Solar: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
  'Pool/Spa': 'bg-teal-100 text-teal-800 hover:bg-teal-200',
  'Pest Control': 'bg-lime-100 text-lime-800 hover:bg-lime-200',
  Safety: 'bg-red-100 text-red-700 hover:bg-red-200',
  Tips: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200',
};

const filterOptions: Category[] = [
  'All',
  'Legal',
  'Roofing',
  'Plumbing',
  'Electrical',
  'Safety',
  'Tips',
];

const articles: Article[] = [
  {
    id: 0,
    title: 'The $1,000 Deposit Rule: How California Law Protects You',
    excerpt:
      "Most homeowners don't know that California limits Pro deposits to $1,000 or 10% of the total price. Here's how to enforce your rights.",
    category: 'Legal',
    categoryColor: categoryColorMap['Legal'],
    readTime: '8 min read',
    date: 'January 2025',
    featured: true,
  },
  {
    id: 1,
    title: "Why the Workers' Comp Audit is Your Roof's Best Insurance",
    excerpt:
      "Before any crew steps on your roof, verify they carry valid workers' compensation. One lapse could leave you liable for six-figure medical bills.",
    category: 'Roofing',
    categoryColor: categoryColorMap['Roofing'],
    readTime: '6 min read',
    date: 'December 2024',
  },
  {
    id: 2,
    title: 'The $1,000 Deposit Rule in Plumbing',
    excerpt:
      'Plumbers are bound by the same deposit limits as every other Pro in California. Learn how to spot violations before you write the check.',
    category: 'Plumbing',
    categoryColor: categoryColorMap['Plumbing'],
    readTime: '5 min read',
    date: 'November 2024',
  },
  {
    id: 3,
    title: 'Electrical Safety: What Every Homeowner Must Verify',
    excerpt:
      'From panel upgrades to rewiring, electrical work carries life‑safety stakes. Use this checklist before your next electrical project.',
    category: 'Electrical',
    categoryColor: categoryColorMap['Electrical'],
    readTime: '7 min read',
    date: 'November 2024',
  },
  {
    id: 4,
    title: 'HVAC Scams: 5 Red Flags Before You Sign',
    excerpt:
      'Sky‑high quotes, vague contracts, and pressure tactics — learn the five most common HVAC fraud schemes and how to avoid them.',
    category: 'HVAC',
    categoryColor: categoryColorMap['HVAC'],
    readTime: '6 min read',
    date: 'October 2024',
  },
  {
    id: 5,
    title: "Foundation Repair: Don't Pay Without These 3 Checks",
    excerpt:
      'Foundation repairs can cost tens of thousands. Run these three verifications before authorizing any work on your home.',
    category: 'Foundation',
    categoryColor: categoryColorMap['Foundation'],
    readTime: '8 min read',
    date: 'October 2024',
  },
  {
    id: 6,
    title: 'Solar Panel Installation: The Audit Protocol',
    excerpt:
      'Solar contracts are packed with hidden fees and performance guarantees that never materialize. Here is your step‑by‑step audit guide.',
    category: 'Solar',
    categoryColor: categoryColorMap['Solar'],
    readTime: '7 min read',
    date: 'September 2024',
  },
  {
    id: 7,
    title: 'Pool Construction Permits: A California Survival Guide',
    excerpt:
      'Building a pool? Permits, inspections, and code compliance can sink your dream project. Know the rules before you dig.',
    category: 'Pool/Spa',
    categoryColor: categoryColorMap['Pool/Spa'],
    readTime: '5 min read',
    date: 'September 2024',
  },
  {
    id: 8,
    title: 'Pest Control Contracts: What They Don\'t Tell You',
    excerpt:
      'Auto‑renewals, treatment exclusions, and vague guarantees — these are the clauses pest‑control companies hope you never read.',
    category: 'Pest Control',
    categoryColor: categoryColorMap['Pest Control'],
    readTime: '4 min read',
    date: 'August 2024',
  },
];

const popularPosts = [
  { title: 'The $1,000 Deposit Rule: How California Law Protects You', readTime: '8 min read' },
  { title: 'HVAC Scams: 5 Red Flags Before You Sign', readTime: '6 min read' },
  {
    title: "Foundation Repair: Don't Pay Without These 3 Checks",
    readTime: '8 min read',
  },
];

/* ───────────────────────── component ───────────────────────────────── */
export function BlogView() {
  const { setCurrentPage, setSelectedArticleId } = useAppStore();
  const [activeFilter, setActiveFilter] = useState<Category>('All');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const filteredArticles =
    activeFilter === 'All'
      ? articles
      : articles.filter((a) => {
          if (activeFilter === 'Safety')
            return (
              a.category === 'Electrical' ||
              a.category === 'HVAC' ||
              a.category === 'Foundation'
            );
          if (activeFilter === 'Tips')
            return (
              a.category === 'Solar' ||
              a.category === 'Pool/Spa' ||
              a.category === 'Pest Control'
            );
          return a.category === activeFilter;
        });

  const featured = filteredArticles.find((a) => a.featured);
  const gridArticles = filteredArticles.filter((a) => !a.featured);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="min-h-screen bg-[#F4F7F9]" id="blog">
      {/* ───── Blog Header ───── */}
      <motion.div
        initial="hidden"
        animate="visible"
        className="relative overflow-hidden bg-gradient-to-br from-[#1A1D2E] via-[#242845] to-[#1A1D2E] pt-28 pb-20 px-4 sm:px-6 lg:px-8"
      >
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#3257C2]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#3ED1B8]/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          <motion.div variants={fadeUp} custom={0}>
            <Badge className="mb-4 bg-[#3ED1B8]/20 text-[#3ED1B8] border border-[#3ED1B8]/30 px-3 py-1 text-sm font-medium">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Knowledge Hub
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white"
          >
            BYLDRS GUARDIAN{' '}
            <span className="bg-gradient-to-r from-[#3ED1B8] to-[#3ED1B8]/70 bg-clip-text text-transparent">
              Blog
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="mx-auto mt-4 max-w-2xl text-lg text-white/70"
          >
            Expert insights to protect your home and empower your decisions
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

      {/* ───── Category Filter ───── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="sticky top-16 z-30 border-b border-gray-200/60 bg-white/80 backdrop-blur-lg"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8 scrollbar-hide">
          <Filter className="hidden h-4 w-4 text-gray-400 sm:block" />
          {filterOptions.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                activeFilter === cat
                  ? 'bg-[#3257C2] text-white shadow-md shadow-[#3257C2]/25'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ───── Main Content ───── */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row">
          {/* ── Left Column (articles) ── */}
          <div className="flex-1 min-w-0">
            {/* Featured Article */}
            {featured && (
              <motion.div
                initial="hidden"
                animate="visible"
                className="mb-10"
              >
                <motion.div
                  variants={fadeUp}
                  custom={0}
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  onClick={() => { setSelectedArticleId(featured.id); setCurrentPage('property-story'); }}
                >
                  {/* Gradient header band */}
                  <div className="h-48 sm:h-56 bg-gradient-to-br from-[#1A1D2E] via-[#3257C2] to-[#3ED1B8] relative flex items-end p-6 sm:p-8">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTRWMjhIMjR2Mmgxem0tNC00VjI0SDIwdjRoMTJ6bS00LTRWMjBIMjB2NGg4em0wLTRWMTZIMjB2NGg4eiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
                    <div className="relative">
                      <Badge className={featured.categoryColor}>
                        {featured.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1D2E] group-hover:text-[#3257C2] transition-colors leading-snug">
                      {featured.title}
                    </h2>
                    <p className="mt-3 text-gray-600 leading-relaxed">
                      {featured.excerpt}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        {featured.readTime}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="h-4 w-4" />
                        {featured.date}
                      </span>
                      <Badge
                        variant="outline"
                        className="ml-auto border-[#F5A623]/40 text-[#F5A623] bg-[#F5A623]/5"
                      >
                        <Star className="mr-1 h-3 w-3 fill-[#F5A623]" />
                        Featured
                      </Badge>
                    </div>
                    <div className="mt-5 pt-4 border-t border-gray-100">
                      <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#3257C2] group-hover:text-[#2a49a8] transition-colors">
                        Read Full Story
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Article Grid */}
            <div className="grid gap-6 sm:grid-cols-2">
              {gridArticles.map((article, i) => (
                <motion.article
                  key={article.id}
                  initial="hidden"
                  animate="visible"
                  custom={i + 1}
                  variants={fadeUp}
                  className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-[#3257C2]/20"
                  onClick={() => { setSelectedArticleId(article.id); setCurrentPage('property-story'); }}
                >
                  {/* Top color accent bar */}
                  <div className="h-1 w-full bg-gradient-to-r from-[#3257C2] to-[#3ED1B8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <Badge className={`${article.categoryColor} text-xs`}>
                        {article.category}
                      </Badge>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-[#1A1D2E] group-hover:text-[#3257C2] transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="mt-2 flex-1 text-sm text-gray-500 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>

                    <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                      <span className="text-xs text-gray-400">
                        {article.date}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#3257C2] group-hover:text-[#2a49a8] transition-colors">
                        Read Full Story
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {gridArticles.length === 0 && !featured && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <BookOpen className="mb-4 h-12 w-12 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-500">
                  No articles found
                </h3>
                <p className="mt-1 text-sm text-gray-400">
                  Try selecting a different category
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setActiveFilter('All')}
                >
                  View all articles
                </Button>
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="w-full shrink-0 lg:w-80 space-y-6"
          >
            {/* Popular Posts */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp className="h-5 w-5 text-[#F5A623]" />
                <h3 className="text-lg font-bold text-[#1A1D2E]">
                  Popular Posts
                </h3>
              </div>

              <div className="space-y-4">
                {popularPosts.map((post, i) => (
                  <div
                    key={i}
                    className="group flex items-start gap-3 cursor-pointer"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#3257C2]/10 text-sm font-bold text-[#3257C2]">
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#1A1D2E] leading-snug line-clamp-2 group-hover:text-[#3257C2] transition-colors">
                        {post.title}
                      </p>
                      <span className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Subscribe */}
            <div className="rounded-2xl bg-gradient-to-br from-[#1A1D2E] to-[#242845] p-6 shadow-sm text-white relative overflow-hidden">
              <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[#3ED1B8]/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-[#3257C2]/20 blur-2xl" />

              <div className="relative">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#3ED1B8]/15">
                  <Mail className="h-5 w-5 text-[#3ED1B8]" />
                </div>

                <h3 className="text-lg font-bold">
                  Subscribe to Our Newsletter
                </h3>
                <p className="mt-1.5 text-sm text-white/60">
                  Get weekly tips, legal updates, and protection guides
                  delivered to your inbox.
                </p>

                {subscribed ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 rounded-xl bg-[#3ED1B8]/15 p-3 text-center"
                  >
                    <p className="text-sm font-medium text-[#3ED1B8]">
                      ✓ You&#39;re subscribed!
                    </p>
                    <p className="mt-0.5 text-xs text-white/50">
                      Check your inbox for a welcome email.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubscribe} className="mt-4 space-y-3">
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-11 border-white/10 bg-white/10 text-white placeholder:text-white/40 focus-visible:ring-[#3ED1B8] focus-visible:border-[#3ED1B8]"
                    />
                    <Button
                      type="submit"
                      className="h-11 w-full bg-[#3ED1B8] font-semibold text-[#1A1D2E] hover:bg-[#3ED1B8]/90 shadow-lg shadow-[#3ED1B8]/20"
                    >
                      Subscribe
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                )}

                <p className="mt-3 text-xs text-white/30">
                  No spam, ever. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
