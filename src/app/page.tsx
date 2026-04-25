'use client';

import { useEffect } from 'react';
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
import { CheckMyProView } from '@/components/check-my-pro-view';
import { TheStandardView } from '@/components/the-standard-view';
import { ProOnboardingView } from '@/components/pro-onboarding-view';
import { BlogView } from '@/components/blog-view';
import { ContactView } from '@/components/contact-view';
import { ProProfileView } from '@/components/pro-profile-view';
import { Tier2Splash, Tier3Splash } from '@/components/pro-splash-pages';
import { PropertyStoryView } from '@/components/property-story-view';
import { WhyUsView } from '@/components/why-us-view';
import { ProtectionGuideDownloadView } from '@/components/protection-guide-download-view';
import { VaultView } from '@/components/vault-view';
import { EnrollShieldView } from '@/components/enroll-shield-view';
import { ShieldScriptsView } from '@/components/shield-scripts-view';
import { Footer } from '@/components/footer';
import { useAppStore, initHashRouting } from '@/lib/store';
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
    case 'check-my-pro':
      return <CheckMyProView />;
    case 'the-standard':
      return <TheStandardView />;
    case 'pro-onboarding':
      return <ProOnboardingView />;
    case 'blog':
      return <BlogView />;
    case 'contact':
      return <ContactView />;
    case 'pro-profile':
      return <ProProfileView />;
    case 'tier-2':
      return <Tier2Splash />;
    case 'tier-3':
      return <Tier3Splash />;
    case 'property-story':
      return <PropertyStoryView />;
    case 'why-us':
      return <WhyUsView />;
    case 'protection-guide-download':
      return <ProtectionGuideDownloadView />;
    case 'vault':
      return <VaultView />;
    case 'enroll-shield':
      return <EnrollShieldView />;
    case 'shield-scripts':
      return <ShieldScriptsView />;
    default:
      return <HomePage />;
  }
}

export default function Home() {
  const currentPage = useAppStore((s) => s.currentPage);

  // Initialize hash routing once on mount
  useEffect(() => {
    initHashRouting();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-[#3ED1B8] focus:text-[#0A0D14] focus:rounded-lg focus:text-sm focus:font-semibold">Skip to main content</a>
      <Header />
      <main id="main-content" className="flex-1">
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
