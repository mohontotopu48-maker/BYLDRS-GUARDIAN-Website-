'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Find a Pro', href: '#pro-grid' },
  { label: 'The Standard', href: '#audit-section' },
  { label: 'Our Mission', href: '#mission' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_12px_rgba(0,0,0,0.08)]'
          : 'bg-white'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#3257C2] shadow-sm group-hover:shadow-md transition-shadow">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-base font-bold tracking-tight text-[#1A1D2E]">
                BYLDRS
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3257C2]">
                Guardian
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-[#1A1D2E]/70 hover:text-[#3257C2] rounded-lg hover:bg-[#3257C2]/5 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="outline"
              className="rounded-lg border-[#3257C2]/20 text-[#3257C2] hover:bg-[#3257C2]/5 hover:border-[#3257C2]/40 font-semibold text-sm px-5 py-2.5 transition-all duration-200"
            >
              Join as a Pro
            </Button>
            <Button className="rounded-lg bg-[#3257C2] hover:bg-[#2a49a8] text-white font-semibold text-sm px-5 py-2.5 shadow-sm hover:shadow-md transition-all duration-200">
              Home Dashboard
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[#F4F7F9] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5 text-[#1A1D2E]" />
            ) : (
              <Menu className="h-5 w-5 text-[#1A1D2E]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#E5E7EB] bg-white">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium text-[#1A1D2E]/70 hover:text-[#3257C2] rounded-lg hover:bg-[#3257C2]/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 space-y-2 border-t border-[#E5E7EB]">
              <Button
                variant="outline"
                className="w-full rounded-lg border-[#3257C2]/20 text-[#3257C2] hover:bg-[#3257C2]/5 font-semibold text-sm"
              >
                Join as a Pro
              </Button>
              <Button className="w-full rounded-lg bg-[#3257C2] hover:bg-[#2a49a8] text-white font-semibold text-sm">
                Home Dashboard
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
