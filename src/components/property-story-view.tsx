'use client';

import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  BookOpen,
  Star,
  ShieldCheck,
  Award,
  CheckCircle2,
  MessageSquare,
  Gift,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/lib/store';

/* ───────────────────────── fade-up animation ───────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: 'easeOut' },
  }),
};

/* ───────────────────────── article data ────────────────────────────── */
interface ArticleData {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  categoryColor: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  imageKey: string;
  topicTags: string[];
  sections: { heading: string; body: string }[];
}

const articles: Record<number, ArticleData> = {
  0: {
    id: 0,
    title: 'The $1,000 Deposit Rule: How California Law Protects You',
    subtitle: 'A deep dive into CA BPC §7159 and why it matters for every homeowner starting a renovation project.',
    category: 'Legal',
    categoryColor: 'bg-amber-100 text-amber-800',
    author: 'BYLDRS GUARDIAN Legal Team',
    authorRole: 'Homeowner Protection Division',
    date: 'January 2025',
    readTime: '8 min read',
    imageKey: 'blog-featured-deposit-law',
    topicTags: ['Legal', 'Deposit Law', 'Consumer Protection'],
    sections: [
      {
        heading: 'The Law Every Homeowner Must Know',
        body: 'Under California Business and Professions Code §7159, home improvement contractors — what BYLDRS GUARDIAN calls "Pros" — are legally prohibited from collecting a deposit greater than $1,000 or 10% of the total contract price, whichever is less. This law exists for one reason: to protect you from upfront financial exposure before work begins.\n\nToo many homeowners hand over thousands of dollars in good faith, only to watch their Pro vanish or deliver substandard work. The $1,000 cap is your first line of defense.',
      },
      {
        heading: 'Real-World Scenarios',
        body: 'Scenario 1: You sign a $25,000 kitchen remodel contract. The Pro asks for a $5,000 "materials deposit." Under §7159, the maximum legal deposit is $1,000 (10% of $25,000 = $2,500, but the hard cap is $1,000). You should decline and pay only $1,000 upfront.\n\nScenario 2: A $8,000 bathroom renovation. The Pro wants $2,500 down. The legal maximum is $800 (10% of $8,000). Paying more means you are waiving a protection the state gave you.\n\nScenario 3: A small $3,000 repair job. The Pro asks for $500. This is legal — $500 is less than both $1,000 and 10% ($300).',
      },
      {
        heading: 'What to Do If a Pro Demands More',
        body: 'If a Pro insists on a deposit that exceeds the legal limit, document everything in writing. Note the date, the amount requested, and the contract total. File a complaint with the CSLB (Contractors State License Board) at cslb.ca.gov. The CSLB takes deposit violations seriously and can revoke or suspend licenses.\n\nYou can also use BYLDRS GUARDIAN\'s "Check My Pro" tool to flag this violation before you sign. Our 30-day recurring audits catch exactly this kind of red flag.',
      },
      {
        heading: 'Milestone Payments: The Right Way',
        body: 'Instead of large upfront deposits, the BYLDRS GUARDIAN Homeowner Protection Guide recommends milestone payments. Break the total into 3–4 payments tied to completed work stages. This keeps your money aligned with actual progress and gives you leverage if quality drops.\n\nExample for a $20,000 project: $1,000 deposit (legal max) → $6,000 after framing → $6,500 after plumbing/electrical rough-in → $6,500 at final inspection and walkthrough.',
      },
      {
        heading: 'The Bottom Line',
        body: 'The $1,000 deposit rule is not a suggestion — it is the law. Any Pro who asks for more is either uninformed or intentionally bypassing consumer protections. Neither is acceptable. Use Check My Pro to verify compliance before you write a single check.',
      },
    ],
  },
  1: {
    id: 1,
    title: "Why the Workers' Comp Audit is Your Roof's Best Insurance",
    subtitle: "Before any crew steps on your roof, verify they carry valid workers' compensation. One lapse could leave you liable for six-figure medical bills.",
    category: 'Roofing',
    categoryColor: 'bg-sky-100 text-sky-800',
    author: 'BYLDRS GUARDIAN Safety Division',
    authorRole: 'Roofing Audit Specialists',
    date: 'December 2024',
    readTime: '6 min read',
    imageKey: 'blog-featured-workers-comp',
    topicTags: ['Roofing', 'Workers Comp', 'Insurance'],
    sections: [
      {
        heading: 'The Hidden Liability on Your Roof',
        body: 'When a roofing crew arrives at your home, you probably check their license and insurance. But there is a specific type of coverage that most homeowners overlook: workers\' compensation insurance.\n\nIf a roofer falls from your roof and the company does not carry valid workers\' comp, California law may hold you — the property owner — financially responsible for medical bills, lost wages, and rehabilitation costs. These claims routinely exceed $100,000.',
      },
      {
        heading: 'How BYLDRS GUARDIAN Audits Workers\' Comp',
        body: 'As part of our Homeowner Protection Guide, every Pro in the BYLDRS GUARDIAN system undergoes a 30-day recurring audit. One of the key checkpoints is workers\' compensation verification. We cross-reference the Pro\'s policy number with the California Department of Industrial Relations database to confirm the policy is active, current, and covers the specific trade (roofing).\n\nIf a Pro\'s workers\' comp lapses between audits, our system flags it immediately, and the Pro\'s Guardian status is suspended until the gap is resolved.',
      },
      {
        heading: 'What to Ask Your Roofer',
        body: 'Before signing any roofing contract, ask these three questions:\n\n1. "Can you provide a current Certificate of Workers\' Compensation Insurance?" — Request the actual certificate, not just a verbal confirmation.\n\n2. "Is your WC policy specific to roofing?" — General policies may not cover high-risk trades.\n\n3. "What happens if your policy lapses during my project?" — A reputable Pro will have an answer that protects you.',
      },
      {
        heading: 'Real Case: The $180,000 Gap',
        body: 'In 2023, a Los Angeles homeowner hired an unlicensed roofer who promised a $12,000 full roof replacement. The homeowner paid a $2,000 deposit (already over the legal limit). On day two of the project, a crew member fell 18 feet from a second-story roof and suffered multiple fractures.\n\nThe "Pro" had no workers\' comp. The injured worker\'s attorney filed a premises liability claim against the homeowner. Final settlement: $180,000 — 15 times the original project cost. This is exactly the scenario BYLDRS GUARDIAN exists to prevent.',
      },
    ],
  },
  2: {
    id: 2,
    title: 'The $1,000 Deposit Rule in Plumbing',
    subtitle: 'Plumbers are bound by the same deposit limits as every other Pro in California. Learn how to spot violations before you write the check.',
    category: 'Plumbing',
    categoryColor: 'bg-cyan-100 text-cyan-800',
    author: 'BYLDRS GUARDIAN Audit Team',
    authorRole: 'Homeowner Protection Specialists',
    date: 'November 2024',
    readTime: '5 min read',
    imageKey: 'blog-featured-plumbing',
    topicTags: ['Plumbing', 'Deposit Law', 'Consumer Protection'],
    sections: [
      {
        heading: 'Same Law, Different Trade',
        body: 'The $1,000 deposit cap under CA BPC §7159 applies equally to all licensed trades — plumbing, electrical, roofing, HVAC, and general contracting. Yet plumbing is one of the most common categories where we see violations at BYLDRS GUARDIAN.\n\nWhy? Emergency calls. When a pipe bursts at 2 AM, homeowners are desperate. They hand over whatever the plumber asks, often $2,000–$3,000, just to get someone on-site. That desperation is exactly what unethical Pros exploit.',
      },
      {
        heading: 'Emergency vs. Scheduled Work',
        body: 'The deposit law applies to both emergency and scheduled work. An emergency plumber who demands $2,500 upfront to "start diagnosing" is violating the same law that applies to a planned bathroom renovation.\n\nFor true emergencies, California allows reasonable charges for emergency service calls and initial diagnostics. But these are separate from "deposits toward the total contract price." A $300 emergency dispatch fee is different from a $3,000 project deposit.',
      },
      {
        heading: 'How to Protect Yourself',
        body: '1. Before paying anything, ask for a written estimate or contract with a total price.\n\n2. If the total is more than $10,000, your deposit cannot exceed $1,000.\n\n3. If the total is under $10,000, your deposit cannot exceed 10% of the total.\n\n4. Get every payment in writing — cash payments without receipts are impossible to recover.\n\n5. Use BYLDRS GUARDIAN\'s Check My Pro tool to verify the plumber\'s license, insurance, and complaint history before you need them in an emergency.',
      },
      {
        heading: 'BYLDRS GUARDIAN Plumbing Standards',
        body: 'Every plumbing Pro in the BYLDRS GUARDIAN system has passed our Homeowner Protection Guide checks: valid CSLB license (C-36), active workers\' compensation, general liability insurance of at least $1M, and a clean complaint history with the CSLB. Our 30-day recurring audits ensure these credentials stay current.\n\nWhen you hire a Guardian-vetted plumber, the deposit rule is not just followed — it is guaranteed.',
      },
    ],
  },
  3: {
    id: 3,
    title: 'Electrical Safety: What Every Homeowner Must Verify',
    subtitle: 'From panel upgrades to rewiring, electrical work carries life-safety stakes. Use this checklist before your next electrical project.',
    category: 'Electrical',
    categoryColor: 'bg-yellow-100 text-yellow-800',
    author: 'BYLDRS GUARDIAN Safety Division',
    authorRole: 'Electrical Audit Specialists',
    date: 'November 2024',
    readTime: '7 min read',
    imageKey: '',
    topicTags: ['Electrical', 'Safety', 'Inspection'],
    sections: [
      {
        heading: 'Why Electrical Verification Matters',
        body: 'Electrical work is the single most dangerous trade in home improvement. A mistake in plumbing causes water damage; a mistake in electrical work causes fires, electrocution, and death. California requires a C-10 license for all electrical work beyond basic fixture replacement.\n\nYet our audits consistently find homeowners hiring unlicensed handymen for panel upgrades, sub-panel installations, and whole-house rewiring — work that requires permits, inspections, and specialized training.',
      },
      {
        heading: 'The Pre-Hire Electrical Checklist',
        body: 'Before hiring any electrical Pro, verify these five items:\n\n1. C-10 License — Confirm the license is active and in good standing on the CSLB website.\n\n2. City/County Permit — Electrical work over $500 requires a permit. If your Pro says "you don\'t need one," find a new Pro.\n\n3. Workers\' Comp — If a crew member is injured on your property without coverage, you may be liable.\n\n4. Liability Insurance — Minimum $1M general liability protects you if the Pro damages your home.\n\n5. References — Ask for at least three recent electrical project references and call them.',
      },
      {
        heading: 'Red Flags to Walk Away From',
        body: '"I can do it without a permit" — This is illegal for any electrical work requiring a permit. A Pro who skips permits is cutting corners.\n\n"We don\'t need to upgrade your panel" — If your home was built before 1970, your panel likely has aluminum wiring, which is a documented fire hazard. Any Pro who dismisses this is not protecting you.\n\n"All wiring looks fine" — No qualified electrician makes this claim without a thorough inspection. Electrical issues are often hidden behind walls.',
      },
      {
        heading: 'The BYLDRS GUARDIAN Electrical Standard',
        body: 'BYLDRS GUARDIAN\'s Homeowner Protection Guide requires all electrical Pros to hold an active C-10 license, carry $1M+ general liability, maintain active workers\' comp, and pass our 30-day recurring audit. We verify permits are pulled for all work that requires them and that inspections are scheduled at every required milestone.',
      },
    ],
  },
  4: {
    id: 4,
    title: 'HVAC Scams: 5 Red Flags Before You Sign',
    subtitle: 'Sky-high quotes, vague contracts, and pressure tactics — learn the five most common HVAC fraud schemes and how to avoid them.',
    category: 'HVAC',
    categoryColor: 'bg-rose-100 text-rose-800',
    author: 'BYLDRS GUARDIAN Investigation Team',
    authorRole: 'Fraud Prevention Division',
    date: 'October 2024',
    readTime: '6 min read',
    imageKey: '',
    topicTags: ['HVAC', 'Scams', 'Consumer Protection'],
    sections: [
      {
        heading: 'Why HVAC is a Scammer\'s Favorite Target',
        body: 'HVAC systems are expensive, complex, and most homeowners know very little about how they work. That combination makes HVAC one of the most fraud-prone trades in California. The average HVAC replacement costs $7,000–$12,000, and scammers know homeowners will pay to restore comfort quickly.\n\nBYLDRS GUARDIAN\'s audit data shows that HVAC-related complaints are 40% higher than any other single trade category.',
      },
      {
        heading: 'Red Flag #1: "Your System Is Beyond Repair"',
        body: 'A common scam involves declaring your existing system unrepairable when a simple $300–$500 fix would resolve the issue. Always get a second opinion before authorizing a full system replacement. A reputable Pro will explain exactly what failed and show you the diagnostic evidence.',
      },
      {
        heading: 'Red Flag #2: Urgency Pressure',
        body: '"This price is only good for today." "I have another job tomorrow and can\'t come back for weeks." These pressure tactics are designed to prevent you from comparing quotes. Take your time. A legitimate Pro will honor a quote for at least 7–14 days.',
      },
      {
        heading: 'Red Flag #3: Oversized or Undersized Equipment',
        body: 'Installing the wrong size unit is one of the most expensive mistakes in HVAC. An oversized unit short-cycles (wastes energy, wears out faster); an undersized unit runs constantly (never reaches target temperature). Your Pro should perform a Manual J load calculation before recommending a system size. If they skip this step, they are guessing.',
      },
      {
        heading: 'Red Flags #4 and #5: Hidden Fees and Non-Permit Work',
        body: 'Hidden Fees: The quote says $8,500, but the final bill is $11,200 after "surprise" charges for ductwork modifications, electrical upgrades, and permit fees that were "not included." Every cost should be in the original contract.\n\nNon-Permit Work: HVAC replacements require permits in almost every California jurisdiction. If your Pro says permits are unnecessary, they are cutting corners — and you may have trouble selling your home later without inspection records.',
      },
    ],
  },
  5: {
    id: 5,
    title: "Foundation Repair: Don't Pay Without These 3 Checks",
    subtitle: 'Foundation repairs can cost tens of thousands. Run these three verifications before authorizing any work on your home.',
    category: 'Foundation',
    categoryColor: 'bg-stone-200 text-stone-800',
    author: 'BYLDRS GUARDIAN Structural Team',
    authorRole: 'Foundation Audit Specialists',
    date: 'October 2024',
    readTime: '8 min read',
    imageKey: '',
    topicTags: ['Foundation', 'Inspection', 'Structural'],
    sections: [
      {
        heading: 'The Stakes Are Enormous',
        body: 'Foundation repairs in California routinely cost $10,000–$50,000+, depending on severity, method, and home size. Because the costs are so high and the technical complexity so deep, foundation repair is one of the most vulnerable categories for homeowner exploitation.\n\nA dishonest Pro can fabricate problems, recommend unnecessary repairs, or use substandard materials — and the average homeowner has no way to tell the difference.',
      },
      {
        heading: 'Check #1: Independent Geotechnical Report',
        body: 'Before accepting any foundation repair recommendation, hire an independent structural engineer (not affiliated with the repair company) to evaluate your foundation. A geotechnical report costs $800–$2,000 and will tell you exactly what is wrong, what caused it, and what repair method is appropriate.\n\nIf a Pro discourages you from getting an independent report, that is a major red flag. A reputable foundation specialist welcomes third-party verification.',
      },
      {
        heading: 'Check #2: License and Specialization',
        body: 'Foundation repair typically requires a C-8 (Concrete) or A (General Engineering) license. Verify the license on the CSLB website. Also check how long the company has been in business under its current name — some companies change names every few years to escape complaint histories.\n\nBYLDRS GUARDIAN\'s 30-day audits track license status, complaint history, and business longevity for all foundation Pros in our system.',
      },
      {
        heading: 'Check #3: Written Warranty',
        body: 'Foundation repairs should come with a written warranty of at least 10 years, ideally transferable to future owners. The warranty should specify exactly what is covered (structural components, materials, workmanship) and what is not (cosmetic damage, landscaping, drainage unrelated to the repair).\n\nIf the warranty is verbal, "lifetime," or less than 10 years, negotiate before signing.',
      },
    ],
  },
  6: {
    id: 6,
    title: 'Solar Panel Installation: The Audit Protocol',
    subtitle: 'Solar contracts are packed with hidden fees and performance guarantees that never materialize. Here is your step-by-step audit guide.',
    category: 'Solar',
    categoryColor: 'bg-orange-100 text-orange-800',
    author: 'BYLDRS GUARDIAN Energy Division',
    authorRole: 'Solar Audit Specialists',
    date: 'September 2024',
    readTime: '7 min read',
    imageKey: '',
    topicTags: ['Solar', 'Audit', 'Contracts'],
    sections: [
      {
        heading: 'The Solar Contract Trap',
        body: 'California leads the nation in residential solar installations, but the industry is also one of the most complained-about trades at the CSLB. Common issues include inflated production guarantees, hidden equipment costs, lease-vs-own confusion, and performance that falls far short of what was promised during the sales pitch.\n\nA typical solar contract runs 15–25 pages and contains legal language that most homeowners cannot parse. BYLDRS GUARDIAN\'s Check My Pro tool is specifically designed to help you identify these traps before you sign.',
      },
      {
        heading: 'Step 1: Verify the Installer',
        body: 'The company installing your panels must hold a valid C-46 (Solar) or C-10 (Electrical) license. Check the CSLB database. Verify that the license holder matches the company name on your contract — some solar companies subcontract installation to unlicensed crews.',
      },
      {
        heading: 'Step 2: Audit the Production Guarantee',
        body: 'Most solar contracts include a production guarantee (e.g., "your system will produce 9,500 kWh/year"). Read the fine print: is the guarantee based on actual output or estimated output? What happens if the system underperforms? Is there a minimum threshold for the guarantee to kick in?\n\nA legitimate guarantee should specify annual production targets, measurement methodology, and compensation if targets are missed.',
      },
      {
        heading: 'Step 3: Compare Total Cost of Ownership',
        body: 'Don\'t just compare monthly payments. Calculate the total cost over the life of the contract (loan term or lease term). Include: equipment cost, installation, permits, interconnection fees, monitoring, maintenance, insurance, and potential roof repairs if penetrations leak.\n\nBYLDRS GUARDIAN Pros are required to provide transparent total-cost breakdowns. Our 30-day audits verify that the actual contract terms match what was presented during the sales process.',
      },
    ],
  },
  7: {
    id: 7,
    title: 'Pool Construction Permits: A California Survival Guide',
    subtitle: 'Building a pool? Permits, inspections, and code compliance can sink your dream project. Know the rules before you dig.',
    category: 'Pool/Spa',
    categoryColor: 'bg-teal-100 text-teal-800',
    author: 'BYLDRS GUARDIAN Compliance Team',
    authorRole: 'Permit & Inspection Specialists',
    date: 'September 2024',
    readTime: '5 min read',
    imageKey: '',
    topicTags: ['Pool/Spa', 'Permits', 'Compliance'],
    sections: [
      {
        heading: 'The Permit Process Is Non-Negotiable',
        body: 'Every California pool construction project requires permits from your local building department. This includes grading, excavation, electrical (for pumps, lighting, heaters), plumbing (for filtration, drainage), and potentially fencing/barrier compliance.\n\nA Pro who offers to "skip permits to save time and money" is committing a code violation that could result in stop-work orders, fines, and mandatory removal of completed work.',
      },
      {
        heading: 'Inspection Milestones',
        body: 'A typical pool project requires 4–6 inspections: pre-construction (grading/compaction), steel/rebar placement, plumbing rough-in, electrical rough-in, gunite/shotcrete application, and final. Each inspection must pass before the next phase begins.\n\nBYLDRS GUARDIAN\'s Homeowner Protection Guide tracks these milestones and alerts you if an inspection is skipped or overdue.',
      },
      {
        heading: 'The VGB Act and Safety Barriers',
        body: 'Federal law (Virginia Graeme Baker Pool and Spa Safety Act) requires anti-entrapment drain covers and safety barriers for all new pools. California adds additional requirements: a 5-foot barrier around the pool, self-closing/self-latching gates, and specific drain cover standards.\n\nYour Pro should include all safety compliance in their contract. If it is not listed, ask before signing.',
      },
    ],
  },
  8: {
    id: 8,
    title: "Pest Control Contracts: What They Don't Tell You",
    subtitle: 'Auto-renewals, treatment exclusions, and vague guarantees — these are the clauses pest-control companies hope you never read.',
    category: 'Pest Control',
    categoryColor: 'bg-lime-100 text-lime-800',
    author: 'BYLDRS GUARDIAN Legal Team',
    authorRole: 'Contract Review Division',
    date: 'August 2024',
    readTime: '4 min read',
    imageKey: '',
    topicTags: ['Pest Control', 'Contracts', 'Consumer Protection'],
    sections: [
      {
        heading: 'The Auto-Renewal Trap',
        body: 'Most pest control contracts automatically renew for 12-month terms unless you cancel within a narrow window (often 30 days before renewal). If you miss the window, you are locked in for another full year — even if you no longer need the service.\n\nCalifornia law requires that auto-renewal clauses be clearly disclosed, but many pest control companies bury this information in fine print or use confusing language.',
      },
      {
        heading: 'Treatment Exclusions',
        body: 'Read the "What Is Not Covered" section carefully. Many contracts exclude: wood-destroying organisms (termites), bed bugs, roof rats, wildlife (raccoons, possums), and seasonal spikes. You may think you have comprehensive coverage, only to discover that the most common pest issues require separate — and expensive — treatments.',
      },
      {
        heading: 'BYLDRS GUARDIAN\'s Recommendation',
        body: 'Before signing any pest control contract: 1) Get the full list of included and excluded pests in writing, 2) Confirm the cancellation policy and auto-renewal terms, 3) Check the company\'s CSLB license (they need a Structural Pest Control Board license for termite work), and 4) Compare at least three quotes.\n\nUse Check My Pro to verify the company\'s license status, complaint history, and insurance coverage.',
      },
    ],
  },
};

/* ───────────────────────── component ───────────────────────────────── */
export function PropertyStoryView() {
  const { selectedArticleId, setCurrentPage } = useAppStore();
  const articleId = selectedArticleId ?? 0;
  const article = articles[articleId];

  if (!article) {
    return (
      <div className="min-h-screen bg-[#F4F7F9] flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-500">Article Not Found</h2>
          <p className="mt-2 text-gray-400">The article you&apos;re looking for doesn&apos;t exist.</p>
          <Button
            className="mt-6 bg-[#3257C2] hover:bg-[#2a49a8]"
            onClick={() => setCurrentPage('blog')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  const proTierLabel = articleId < 2 ? 'Certified Guardian' : articleId < 5 ? 'Vetted Partner' : 'Verified Pro';
  const proTierColor = articleId < 2 ? 'from-[#F5A623] to-[#D4891A]' : articleId < 5 ? 'from-gray-300 to-gray-500' : 'from-[#CD7F32] to-[#A0622A]';

  return (
    <div className="min-h-screen bg-[#F4F7F9]">
      {/* ───── Article Hero ───── */}
      <div className="relative">
        {article.imageKey ? (
          <div className="relative h-64 sm:h-80 lg:h-[420px] overflow-hidden">
            <img
              src={`/${article.imageKey}.png`}
              alt={article.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1D2E]/90 via-[#1A1D2E]/40 to-transparent" />
          </div>
        ) : (
          <div className="h-48 sm:h-56 bg-gradient-to-br from-[#1A1D2E] via-[#3257C2] to-[#3ED1B8]" />
        )}

        {/* Back to Blog overlay */}
        <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-10">
          <Button
            variant="ghost"
            onClick={() => setCurrentPage('blog')}
            className="text-white/90 hover:text-white bg-black/20 backdrop-blur-sm hover:bg-black/30 border border-white/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </div>

        {/* Article metadata overlay */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-32 sm:-mt-40">
          <motion.div initial="hidden" animate="visible" className="relative z-20">
            <motion.div variants={fadeUp} custom={0}>
              <Badge className={article.categoryColor}>
                {article.category}
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight"
            >
              {article.title}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-3 text-lg text-white/70 max-w-3xl"
            >
              {article.subtitle}
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="mt-5 flex flex-wrap items-center gap-4 text-sm text-white/60">
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" />
                {article.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {article.readTime}
              </span>
              <span>{article.date}</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ───── Main Content ───── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        <div className="flex flex-col gap-10 lg:flex-row">
          {/* ── Article Body ── */}
          <motion.article
            initial="hidden"
            animate="visible"
            className="flex-1 min-w-0"
          >
            <div className="rounded-2xl bg-white p-6 sm:p-8 lg:p-10 shadow-sm border border-gray-100">
              {/* Author Banner */}
              <motion.div variants={fadeUp} custom={0} className="flex items-center gap-4 pb-6 mb-8 border-b border-gray-100">
                <div className="h-12 w-12 rounded-full bg-[#3257C2]/10 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-[#3257C2]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1A1D2E]">{article.author}</p>
                  <p className="text-xs text-gray-400">{article.authorRole}</p>
                </div>
              </motion.div>

              {/* Article Sections */}
              {article.sections.map((section, i) => (
                <motion.div key={i} variants={fadeUp} custom={i + 1} className="mb-8 last:mb-0">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#1A1D2E] mb-4 leading-snug">
                    {section.heading}
                  </h2>
                  <div className="text-gray-600 leading-relaxed text-[15px] space-y-4 whitespace-pre-line">
                    {section.body}
                  </div>
                </motion.div>
              ))}

              {/* Topic Tags */}
              <motion.div variants={fadeUp} custom={article.sections.length + 1} className="mt-10 pt-6 border-t border-gray-100 flex flex-wrap gap-2">
                {article.topicTags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs text-gray-500 border-gray-200 bg-gray-50">
                    {tag}
                  </Badge>
                ))}
              </motion.div>
            </div>

            {/* ── Property Points Reward Banner ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-6 rounded-2xl bg-gradient-to-r from-[#1A1D2E] to-[#242845] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5 relative overflow-hidden"
            >
              <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[#3ED1B8]/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-[#3257C2]/20 blur-2xl" />

              <div className="relative shrink-0 h-14 w-14 rounded-2xl bg-[#3ED1B8]/15 flex items-center justify-center">
                <Gift className="h-7 w-7 text-[#3ED1B8]" />
              </div>
              <div className="relative flex-1 min-w-0">
                <h3 className="text-lg font-bold text-white">Earn Property Points for Your Testimonial</h3>
                <p className="mt-1 text-sm text-white/60">
                  Share your experience with this guide and earn <span className="text-[#3ED1B8] font-semibold">+50 Property Points</span> toward your next reward.
                </p>
              </div>
              <Button className="relative shrink-0 bg-[#3ED1B8] hover:bg-[#3ED1B8]/90 text-[#1A1D2E] font-semibold shadow-lg shadow-[#3ED1B8]/20">
                <MessageSquare className="mr-2 h-4 w-4" />
                Share Feedback
              </Button>
            </motion.div>
          </motion.article>

          {/* ── Sidebar ── */}
          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-full shrink-0 lg:w-80 space-y-6"
          >
            {/* Featured Pro Card */}
            <div className="rounded-2xl bg-white overflow-hidden shadow-sm border border-gray-100">
              {/* Cover band */}
              <div className={`h-20 bg-gradient-to-r ${proTierColor} relative`}>
                <div className="absolute -bottom-6 left-5">
                  <div className="h-14 w-14 rounded-xl bg-white shadow-md flex items-center justify-center border-2 border-white">
                    <Award className="h-7 w-7 text-[#3257C2]" />
                  </div>
                </div>
              </div>

              <div className="pt-9 px-5 pb-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-[#1A1D2E]">Featured Pro</h3>
                  <Badge className={`text-[10px] font-bold px-2 py-0.5 bg-gradient-to-r ${proTierColor} text-white border-0`}>
                    {proTierLabel}
                  </Badge>
                </div>

                <p className="text-sm font-semibold text-[#1A1D2E]">
                  {articleId === 0 ? 'Marcus Rivera' : articleId === 1 ? 'Marcus Rivera' : articleId === 2 ? 'Sarah Chen' : 'James Okafor'}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {articleId < 2 ? 'Rivera Roofing & Solar' : articleId < 5 ? 'Chen Plumbing Solutions' : 'Okafor General Contracting'}
                </p>

                <div className="mt-3 flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1 text-[#F5A623]">
                    <Star className="h-4 w-4 fill-[#F5A623]" />
                    <span className="font-semibold">{articleId < 2 ? '4.9' : articleId < 5 ? '4.8' : '4.7'}</span>
                  </div>
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-500">{articleId < 2 ? '15+ Years' : articleId < 5 ? '8+ Years' : '12+ Years'}</span>
                </div>

                <div className="mt-4 space-y-2">
                  {['License Verified', 'Insured', 'Background Checked'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="h-4 w-4 text-[#3ED1B8] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="mt-5 w-full bg-[#3257C2] hover:bg-[#2a49a8] text-white font-semibold text-sm"
                  onClick={() => {
                    useAppStore.getState().setSelectedProId(articleId + 1);
                    setCurrentPage('pro-profile');
                  }}
                >
                  View Full Profile
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Property Points Card */}
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-9 w-9 rounded-lg bg-[#3ED1B8]/10 flex items-center justify-center">
                  <Gift className="h-5 w-5 text-[#3ED1B8]" />
                </div>
                <h3 className="text-base font-bold text-[#1A1D2E]">Property Points</h3>
              </div>

              <p className="text-sm text-gray-500 mb-4">
                Earn points for engaging with the Guardian community.
              </p>

              <div className="space-y-3">
                {[
                  { label: 'Share this article', pts: 50 },
                  { label: 'Submit a review', pts: 100 },
                  { label: 'Refer a friend', pts: 200 },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <Badge className="bg-[#3ED1B8]/10 text-[#3ED1B8] border-0 font-semibold text-xs">
                      +{item.pts} pts
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links Card */}
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
              <h3 className="text-base font-bold text-[#1A1D2E] mb-4">Quick Links</h3>

              <div className="space-y-2">
                {[
                  { label: 'Homeowner Protection Guide', page: 'the-standard' as const },
                  { label: 'All Property Stories', page: 'blog' as const },
                  { label: 'Check My Pro', page: 'check-my-pro' as const },
                ].map((link) => (
                  <button
                    key={link.label}
                    onClick={() => setCurrentPage(link.page)}
                    className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-medium text-[#1A1D2E] hover:bg-[#F4F7F9] hover:text-[#3257C2] transition-colors text-left group"
                  >
                    {link.label}
                    <ExternalLink className="h-3.5 w-3.5 text-gray-300 group-hover:text-[#3257C2] transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
