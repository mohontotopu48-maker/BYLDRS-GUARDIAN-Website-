'use client';

import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { HowItWorksSection } from '@/components/how-it-works-section';
import { WhoWeAreSection } from '@/components/who-we-are-section';
import { HowWeRankSection } from '@/components/how-we-rank-section';
import { AuditEngine } from '@/components/audit-engine';
import { ProGrid } from '@/components/pro-grid';
import { AcademySection } from '@/components/academy-section';
import { RewardsSection } from '@/components/rewards-section';
import { VaultSection } from '@/components/vault-section';
import { DashboardView } from '@/components/dashboard-view';
import { ProOnboardingView } from '@/components/pro-onboarding-view';
import { BlogView } from '@/components/blog-view';
import { ContactView } from '@/components/contact-view';
import { Tier2Splash, Tier3Splash } from '@/components/pro-splash-pages';
import { Footer } from '@/components/footer';
import { useAppStore } from '@/lib/store';
import { AnimatePresence, motion } from 'framer-motion';

function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <WhoWeAreSection />
      <HowWeRankSection />
      <AuditEngine />
      <ProGrid />
      <AcademySection />
      <RewardsSection />
      <VaultSection />
    </>
  );
}

function PageView({ page }: { page: string }) {
  switch (page) {
    case 'dashboard':
      return <DashboardView />;
    case 'pro-onboarding':
      return <ProOnboardingView />;
    case 'blog':
      return <BlogView />;
    case 'contact':
      return <ContactView />;
    case 'tier-2':
      return <Tier2Splash />;
    case 'tier-3':
      return <Tier3Splash />;
    default:
      return <HomePage />;
  }
}

export default function Home() {
  const currentPage = useAppStore((s) => s.currentPage);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <PageView page={currentPage} />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
