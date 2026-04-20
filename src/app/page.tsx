import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { HowItWorksSection } from '@/components/how-it-works-section';
import { WhoWeAreSection } from '@/components/who-we-are-section';
import { HowWeRankSection } from '@/components/how-we-rank-section';
import { AuditSection } from '@/components/audit-section';
import { ProGrid } from '@/components/pro-grid';
import { AcademySection } from '@/components/academy-section';
import { RewardsSection } from '@/components/rewards-section';
import { VaultSection } from '@/components/vault-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <HowItWorksSection />
        <WhoWeAreSection />
        <HowWeRankSection />
        <AuditSection />
        <ProGrid />
        <AcademySection />
        <RewardsSection />
        <VaultSection />
      </main>
      <Footer />
    </div>
  );
}
