'use client';

import { Shield, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const footerLinks = {
  platform: [
    { label: 'Find a Pro', href: '#pro-grid' },
    { label: 'The Standard', href: '#audit-section' },
    { label: 'Homeowner Academy', href: '#academy' },
    { label: 'Pricing', href: '#' },
  ],
  company: [
    { label: 'Our Mission', href: '#' },
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
  ],
  resources: [
    { label: 'Help Center', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Contractor Guide', href: '#' },
    { label: 'API Docs', href: '#' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'Licenses', href: '#' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export function Footer() {
  return (
    <footer className="bg-[#1A1D2E] text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2.5 group mb-4">
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
            </a>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs mb-6">
              California&apos;s only platform that audits contractors every 30
              days. Hire with certainty, protect your sanctuary.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="h-9 w-9 rounded-lg bg-white/[0.06] hover:bg-[#3257C2] flex items-center justify-center transition-all duration-200 group/soc"
                >
                  <social.icon className="h-4 w-4 text-white/60 group-hover/soc:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/30 mb-4">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 hover:text-[#3ED1B8] transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-white/[0.06]">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-white/40">
            <div>
              <span className="text-white/60 font-medium">Email:</span>{' '}
              hello@byldersguardian.com
            </div>
            <div>
              <span className="text-white/60 font-medium">Phone:</span>{' '}
              (800) 555-PROS
            </div>
            <div>
              <span className="text-white/60 font-medium">Address:</span>{' '}
              Los Angeles, CA 90001
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-white/[0.06]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30">
              © {new Date().getFullYear()} BYLDRS GUARDIAN. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/30">
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
