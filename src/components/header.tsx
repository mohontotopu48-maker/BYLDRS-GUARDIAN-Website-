'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Menu, X, Home, LayoutDashboard, FileText, PenTool, LogOut } from 'lucide-react';
import { useAppStore } from '@/lib/store';

const publicNavLinks = [
  { label: 'Find a Pro', action: 'scroll' as const, href: '#pro-grid' },
  { label: 'The Standard', action: 'scroll' as const, href: '#audit-section' },
  { label: 'Our Mission', action: 'scroll' as const, href: '#mission' },
];

const dashboardNavLinks = [
  { label: 'Dashboard', action: 'page' as const, page: 'dashboard' as const, icon: Home },
  { label: 'Audit Anything', action: 'page' as const, page: 'home' as const, icon: FileText },
  { label: 'Academy', action: 'scroll' as const, href: '#academy' },
  { label: 'Blog', action: 'page' as const, page: 'blog' as const, icon: PenTool },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { currentPage, setCurrentPage, isLoggedIn, userType, logout } = useAppStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (link: { action: string; href?: string; page?: string }) => {
    setMobileOpen(false);
    if (link.action === 'page' && link.page) {
      setCurrentPage(link.page as 'home' | 'dashboard' | 'pro-onboarding' | 'blog');
    } else if (link.href) {
      if (currentPage !== 'home') setCurrentPage('home');
      setTimeout(() => {
        document.querySelector(link.href!)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const navLinks = isLoggedIn && userType === 'homeowner' ? dashboardNavLinks : publicNavLinks;

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
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2.5 group"
          >
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
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <button
                key={i}
                onClick={() => handleNavClick(link)}
                className="px-4 py-2 text-sm font-medium text-[#1A1D2E]/70 hover:text-[#3257C2] rounded-lg hover:bg-[#3257C2]/5 transition-all duration-200 flex items-center gap-1.5"
              >
                {'icon' in link && link.icon && <link.icon className="h-4 w-4" />}
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {!isLoggedIn ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage('pro-onboarding')}
                  className="rounded-lg border-[#3257C2]/20 text-[#3257C2] hover:bg-[#3257C2]/5 hover:border-[#3257C2]/40 font-semibold text-sm px-5 py-2.5 transition-all duration-200"
                >
                  Join as a Pro
                </Button>
                <Button
                  onClick={() => {
                    useAppStore.getState().login('homeowner');
                    setCurrentPage('dashboard');
                  }}
                  className="rounded-lg bg-[#3257C2] hover:bg-[#2a49a8] text-white font-semibold text-sm px-5 py-2.5 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  Join a Property Owner
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(currentPage === 'dashboard' ? 'home' : 'dashboard')}
                  className="rounded-lg border-[#3257C2]/20 text-[#3257C2] hover:bg-[#3257C2]/5 hover:border-[#3257C2]/40 font-semibold text-sm px-5 py-2.5 transition-all duration-200 flex items-center gap-2"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  {currentPage === 'dashboard' ? 'Home' : 'Home Dashboard'}
                </Button>
                <Button
                  variant="ghost"
                  onClick={logout}
                  className="rounded-lg text-[#1A1D2E]/50 hover:text-red-500 hover:bg-red-50 font-semibold text-sm px-3 py-2.5 transition-all duration-200"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            )}
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
            {navLinks.map((link, i) => (
              <button
                key={i}
                onClick={() => handleNavClick(link)}
                className="w-full text-left px-4 py-2.5 text-sm font-medium text-[#1A1D2E]/70 hover:text-[#3257C2] rounded-lg hover:bg-[#3257C2]/5 transition-colors flex items-center gap-2"
              >
                {'icon' in link && link.icon && <link.icon className="h-4 w-4" />}
                {link.label}
              </button>
            ))}
            <div className="pt-3 space-y-2 border-t border-[#E5E7EB]">
              {!isLoggedIn ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => { setCurrentPage('pro-onboarding'); setMobileOpen(false); }}
                    className="w-full rounded-lg border-[#3257C2]/20 text-[#3257C2] hover:bg-[#3257C2]/5 font-semibold text-sm"
                  >
                    Join as a Pro
                  </Button>
                  <Button
                    onClick={() => { useAppStore.getState().login('homeowner'); setCurrentPage('dashboard'); setMobileOpen(false); }}
                    className="w-full rounded-lg bg-[#3257C2] hover:bg-[#2a49a8] text-white font-semibold text-sm"
                  >
                    Join a Property Owner
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => { setCurrentPage(currentPage === 'dashboard' ? 'home' : 'dashboard'); setMobileOpen(false); }}
                    className="w-full rounded-lg border-[#3257C2]/20 text-[#3257C2] hover:bg-[#3257C2]/5 font-semibold text-sm flex items-center justify-center gap-2"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    {currentPage === 'dashboard' ? 'Home' : 'Home Dashboard'}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => { logout(); setMobileOpen(false); }}
                    className="w-full rounded-lg text-red-500 hover:bg-red-50 font-semibold text-sm"
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
