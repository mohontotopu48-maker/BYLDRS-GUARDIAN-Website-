'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Menu, X, Home, LayoutDashboard, LogOut } from 'lucide-react';
import { useAppStore } from '@/lib/store';

const publicNavLinks = [
  { label: 'Find a Pro', action: 'scroll' as const, href: '#pro-grid' },
  { label: 'The Standard', action: 'scroll' as const, href: '#audit-engine' },
  { label: 'Our Mission', action: 'scroll' as const, href: '#mission' },
  { label: 'How it Works', action: 'scroll' as const, href: '#how-it-works' },
  { label: 'Contact', action: 'page' as const, page: 'contact' as const },
];

const dashboardNavLinks = [
  { label: 'Dashboard', action: 'page' as const, page: 'dashboard' as const },
  { label: 'Find a Pro', action: 'scroll' as const, href: '#pro-grid' },
  { label: 'Audit Anything', action: 'scroll' as const, href: '#audit-engine' },
  { label: 'Academy', action: 'scroll' as const, href: '#academy' },
  { label: 'Blog', action: 'page' as const, page: 'blog' as const },
  { label: 'Contact', action: 'page' as const, page: 'contact' as const },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { currentPage, setCurrentPage, isLoggedIn, userType, logout } = useAppStore();

  // Mobile menu is closed in all navigation click handlers below

  const handleNavClick = (link: { action: string; href?: string; page?: string }) => {
    setMobileOpen(false);
    if (link.action === 'page' && link.page) {
      setCurrentPage(link.page as 'home' | 'dashboard' | 'pro-onboarding' | 'blog' | 'contact' | 'tier-2' | 'tier-3');
    } else if (link.href) {
      if (currentPage !== 'home') setCurrentPage('home');
      setTimeout(() => {
        document.querySelector(link.href!)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  const goHome = () => {
    setMobileOpen(false);
    setCurrentPage('home');
  };

  const navLinks = isLoggedIn && userType === 'homeowner' ? dashboardNavLinks : publicNavLinks;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F1219]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-[72px]">
          {/* Logo — always returns to home */}
          <button
            onClick={goHome}
            className="flex items-center gap-2.5 group"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#3257C2] shadow-lg shadow-[#3257C2]/30 group-hover:shadow-[#3257C2]/50 transition-shadow">
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link, i) => (
              <button
                key={i}
                onClick={() => handleNavClick(link)}
                className="px-3.5 py-2 text-[13px] font-medium text-white/60 hover:text-white rounded-lg hover:bg-white/[0.06] transition-all duration-200"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-2.5">
            {!isLoggedIn ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => setCurrentPage('pro-onboarding')}
                  className="rounded-lg border border-white/15 text-white/70 hover:text-white hover:bg-white/[0.06] hover:border-white/25 font-semibold text-sm px-5 py-2.5 transition-all duration-200"
                >
                  Join as a Pro
                </Button>
                <Button
                  onClick={() => {
                    useAppStore.getState().login('homeowner');
                    setCurrentPage('dashboard');
                  }}
                  className="rounded-lg bg-[#3257C2] hover:bg-[#2a49a8] text-white font-semibold text-sm px-5 py-2.5 shadow-lg shadow-[#3257C2]/25 hover:shadow-[#3257C2]/40 transition-all duration-200"
                >
                  Join as a Property Owner
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => setCurrentPage(currentPage === 'dashboard' ? 'home' : 'dashboard')}
                  className="rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] font-semibold text-sm px-4 py-2.5 transition-all duration-200 flex items-center gap-2"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  {currentPage === 'dashboard' ? 'Home' : 'Dashboard'}
                </Button>
                <Button
                  variant="ghost"
                  onClick={logout}
                  className="rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 font-semibold text-sm px-3 py-2.5 transition-all duration-200"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/[0.06] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5 text-white" />
            ) : (
              <Menu className="h-5 w-5 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/[0.06] bg-[#0F1219]">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link, i) => (
              <button
                key={i}
                onClick={() => handleNavClick(link)}
                className="w-full text-left px-4 py-2.5 text-sm font-medium text-white/60 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 space-y-2 border-t border-white/[0.06]">
              {!isLoggedIn ? (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => { setCurrentPage('pro-onboarding'); setMobileOpen(false); }}
                    className="w-full rounded-lg border border-white/15 text-white/70 hover:text-white hover:bg-white/[0.06] font-semibold text-sm"
                  >
                    Join as a Pro
                  </Button>
                  <Button
                    onClick={() => { useAppStore.getState().login('homeowner'); setCurrentPage('dashboard'); setMobileOpen(false); }}
                    className="w-full rounded-lg bg-[#3257C2] hover:bg-[#2a49a8] text-white font-semibold text-sm"
                  >
                    Join as a Property Owner
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => { setCurrentPage(currentPage === 'dashboard' ? 'home' : 'dashboard'); setMobileOpen(false); }}
                    className="w-full rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] font-semibold text-sm flex items-center justify-center gap-2"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    {currentPage === 'dashboard' ? 'Home' : 'Dashboard'}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => { logout(); setMobileOpen(false); }}
                    className="w-full rounded-lg text-red-400 hover:bg-red-500/10 font-semibold text-sm"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
