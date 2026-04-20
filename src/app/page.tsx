import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { AuditSection } from '@/components/audit-section';
import { ProGrid } from '@/components/pro-grid';
import { AcademySection } from '@/components/academy-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AuditSection />
        <ProGrid />
        <AcademySection />
      </main>
      <Footer />
    </div>
  );
}
