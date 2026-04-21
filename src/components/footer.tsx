'use client';

import { Shield, Facebook, Instagram, Linkedin } from 'lucide-react';
import { useAppStore } from '@/lib/store';

const footerLinks = {
  platform: [
    { label: 'Check My Pro', action: 'page', page: 'check-my-pro' },
    { label: 'Hire a Pro', action: 'scroll', href: '#pro-grid' },
    { label: 'The Standard', action: 'page', page: 'the-standard' },
    { label: 'How We Rank', action: 'scroll', href: '#how-we-rank' },
  ],
  company: [
    { label: 'Our Mission', action: 'scroll', href: '#mission' },
    { label: 'Homeowner Academy', action: 'scroll', href: '#academy' },
    { label: 'Rewards Program', action: 'scroll', href: '#rewards' },
    { label: 'Homeowner Vault', action: 'scroll', href: '#vault' },
  ],
  resources: [
    { label: 'Help Center', action: 'page', page: 'contact' },
    { label: 'Blog', action: 'page', page: 'blog' },
    { label: 'Contact Us', action: 'page', page: 'contact' },
    { label: 'Pro Onboarding', action: 'page', page: 'pro-onboarding' },
  ],
  legal: [
    { label: 'Privacy Policy', action: 'none' },
    { label: 'Terms of Service', action: 'none' },
    { label: 'Cookie Policy', action: 'none' },
    { label: 'Licenses', action: 'none' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
];

export function Footer() {
  const { setCurrentPage } = useAppStore();

  const handleLinkClick = (link: { action: string; href?: string; page?: string }) => {
    if (link.action === 'page' && link.page) {
      setCurrentPage(link.page as 'home' | 'dashboard' | 'pro-onboarding' | 'blog' | 'contact' | 'check-my-pro' | 'the-standard' | 'pro-profile' | 'tier-2' | 'tier-3');
    } else if (link.action === 'scroll' && link.href) {
      if (useAppStore.getState().currentPage !== 'home') setCurrentPage('home');
      setTimeout(() => {
        document.querySelector(link.href!)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  return (
    <footer className="bg-[#0F1219] text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center gap-2.5 group mb-4"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#3257C2] shadow-sm">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base font-bold tracking-tight text-white">
                  BYLDRS
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3ED1B8]">
                  Guardian
                </span>
              </div>
            </button>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs mb-6">
              California&apos;s only platform that audits Pros every 30
              days. Hire with certainty, protect your property.
            </p>

            {/* Social Icons — FB, IG, LinkedIn */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="h-9 w-9 rounded-lg bg-white/[0.06] hover:bg-[#3257C2] flex items-center justify-center transition-all duration-200 group/soc"
                >
                  <social.icon className="h-4 w-4 text-white/50 group-hover/soc:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/25 mb-4">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleLinkClick(link)}
                      className="text-sm text-white/40 hover:text-[#3ED1B8] transition-colors duration-200"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-white/[0.06]">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="text-sm text-white/35">
              <span className="text-white/50 font-medium">LA Office:</span>{' '}
              12510 Mc Cann Dr., Santa Fe Springs, CA 90670
            </div>
            <div className="text-sm text-white/35">
              <span className="text-white/50 font-medium">OC Office:</span>{' '}
              Irvine Spectrum Center, Irvine, CA 92618
            </div>
            <div className="text-sm text-white/35">
              <span className="text-white/50 font-medium">Phone:</span>{' '}
              562-944-0500
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-white/[0.06]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/25">
              © {new Date().getFullYear()} BYLDRS GUARDIAN. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/25">
                Powered by
              </span>
              <span className="text-xs font-bold text-[#3ED1B8] tracking-wide">
                NXLBYLDR CRM
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
