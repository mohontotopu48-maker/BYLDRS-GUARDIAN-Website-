'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  ShieldCheck,
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  BookOpen,
  ClipboardCheck,
  ArrowRight,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import type { PageView } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────── Active State Logic ──────────────────────────── */

/**
 * Maps a nav link's page key to all pages that should activate it.
 * This enables parent-link highlighting when the user is on a sub-page.
 */
const pageChildMap: Record<string, string[]> = {
  blog: ['blog', 'property-story'],
  'why-us': ['the-standard', 'blog', 'property-story'],
};

function isPageActive(currentPage: string, linkPage: string | undefined): boolean {
  if (!linkPage) return false;
  const children = pageChildMap[linkPage];
  if (children) return children.includes(currentPage);
  return currentPage === linkPage;
}

/* ──────────────────────── Navigation Data ────────────────────────────────── */

interface FlyoutItem {
  label: string;
  subtext: string;
  icon: React.ComponentType<{ className?: string }>;
  page: PageView;
}

interface NavLink {
  label: string;
  action: 'page' | 'scroll' | 'flyout';
  page?: PageView;
  href?: string;
  isTool?: boolean;
  flyoutItems?: FlyoutItem[];
}

const whyUsFlyoutItems: FlyoutItem[] = [
  {
    label: 'The Standard',
    subtext: 'Learn about our 30-day recurring audit process.',
    icon: ClipboardCheck,
    page: 'the-standard',
  },
  {
    label: 'Property Stories',
    subtext: 'Real stories of homeowners protected by the Guardian system.',
    icon: BookOpen,
    page: 'blog',
  },
];

const publicNavLinks: NavLink[] = [
  { label: 'Check My Pro', action: 'page', page: 'check-my-pro', isTool: true },
  { label: 'Hire a Pro', action: 'scroll', href: '#pro-grid' },
  { label: 'The Standard', action: 'page', page: 'the-standard' },
  {
    label: 'Why Us',
    action: 'flyout',
    flyoutItems: whyUsFlyoutItems,
  },
  { label: 'Contact', action: 'page', page: 'contact' },
];

const dashboardNavLinks: NavLink[] = [
  { label: 'Dashboard', action: 'page', page: 'dashboard' },
  { label: 'Check My Pro', action: 'page', page: 'check-my-pro', isTool: true },
  { label: 'Hire a Pro', action: 'scroll', href: '#pro-grid' },
  { label: 'The Standard', action: 'page', page: 'the-standard' },
  {
    label: 'Why Us',
    action: 'flyout',
    flyoutItems: whyUsFlyoutItems,
  },
  { label: 'Contact', action: 'page', page: 'contact' },
];

/* ──────────────────────── Why Us Mega-Flyout ─────────────────────────────── */

function WhyUsFlyout({
  items,
  onNavigate,
  onClose,
}: {
  items: FlyoutItem[];
  onNavigate: (page: PageView) => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[420px] sm:w-[480px]"
    >
      {/* Glassmorphism card */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#1A1D2E]/85 backdrop-blur-2xl shadow-2xl shadow-black/40 overflow-hidden">
        {/* Subtle top accent line */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#3ED1B8]/40 to-transparent" />

        <div className="p-3">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => {
                  onNavigate(item.page);
                  onClose();
                }}
                className={`
                  w-full flex items-start gap-4 rounded-xl p-4
                  transition-all duration-200 text-left group
                  hover:bg-white/[0.06]
                  ${idx > 0 ? 'mt-1' : ''}
                `}
              >
                {/* Icon */}
                <div className="shrink-0 mt-0.5 h-11 w-11 rounded-xl bg-[#3ED1B8]/10 flex items-center justify-center group-hover:bg-[#3ED1B8]/15 transition-colors duration-200">
                  <Icon className="h-5 w-5 text-[#3ED1B8]" />
                </div>

                {/* Text content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-white group-hover:text-[#3ED1B8] transition-colors duration-200">
                      {item.label}
                    </span>
                    <ArrowRight className="h-4 w-4 text-white/0 group-hover:text-[#3ED1B8] transition-all duration-200 translate-x-0 group-hover:translate-x-0.5" />
                  </div>
                  <p className="mt-1 text-[13px] leading-relaxed text-white/45 group-hover:text-white/60 transition-colors duration-200">
                    {item.subtext}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom accent */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>
    </motion.div>
  );
}

/* ──────────────────────── Header Component ───────────────────────────────── */

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileWhyUsOpen, setMobileWhyUsOpen] = useState(false);
  const [flyoutOpen, setFlyoutOpen] = useState(false);
  const flyoutTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const flyoutContainerRef = useRef<HTMLDivElement>(null);

  const { currentPage, setCurrentPage, isLoggedIn, userType, logout } = useAppStore();

  // Close flyout on outside click
  useEffect(() => {
    if (!flyoutOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (flyoutContainerRef.current && !flyoutContainerRef.current.contains(e.target as Node)) {
        setFlyoutOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [flyoutOpen]);

  const clearFlyoutTimeout = useCallback(() => {
    if (flyoutTimeoutRef.current) {
      clearTimeout(flyoutTimeoutRef.current);
      flyoutTimeoutRef.current = null;
    }
  }, []);

  const handleNavClick = (link: NavLink) => {
    setMobileOpen(false);
    setMobileWhyUsOpen(false);
    setFlyoutOpen(false);

    if (link.action === 'page' && link.page) {
      setCurrentPage(link.page);
    } else if (link.action === 'scroll' && link.href) {
      if (currentPage !== 'home') setCurrentPage('home');
      setTimeout(() => {
        document.querySelector(link.href!)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
    // 'flyout' action doesn't navigate, only opens the flyout
  };

  const goHome = () => {
    setMobileOpen(false);
    setMobileWhyUsOpen(false);
    setCurrentPage('home');
  };

  const navLinks = isLoggedIn && userType === 'homeowner' ? dashboardNavLinks : publicNavLinks;

  /* ─────────── Nav link rendering helper ─────────── */
  const getNavLinkClasses = (link: NavLink): string => {
    const base = 'px-3.5 py-2 text-[13px] font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5';

    if (link.isTool) {
      return `${base} text-[#3ED1B8] hover:text-[#3ED1B8] bg-[#3ED1B8]/[0.08] hover:bg-[#3ED1B8]/[0.15]`;
    }

    // For flyout links, check if any child page is active
    const isActive = link.action === 'flyout'
      ? isPageActive(currentPage, 'why-us')
      : isPageActive(currentPage, link.page);

    if (isActive) {
      return `${base} text-[#3ED1B8] hover:text-[#3ED1B8] bg-[#3ED1B8]/[0.08]`;
    }
    return `${base} text-white/60 hover:text-white hover:bg-white/[0.06]`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F1219]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-[72px]">
          {/* Logo — always returns to home */}
          <button onClick={goHome} className="flex items-center gap-2.5 group">
            <img
              src="/guardian-logo.png"
              alt="BYLDRS GUARDIAN"
              className="h-9 w-auto object-contain"
            />
            <div className="flex flex-col leading-none">
              <span className="text-base font-bold tracking-tight text-white">BYLDRS</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3ED1B8]">
                Guardian
              </span>
            </div>
          </button>

          {/* ──────── Desktop Navigation ──────── */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link, i) => {
              if (link.action === 'flyout' && link.flyoutItems) {
                const isFlyoutActive = isPageActive(currentPage, 'why-us');
                return (
                  <div
                    key={i}
                    ref={flyoutContainerRef}
                    className="relative"
                    onMouseEnter={() => {
                      clearFlyoutTimeout();
                      setFlyoutOpen(true);
                    }}
                    onMouseLeave={() => {
                      clearFlyoutTimeout();
                      flyoutTimeoutRef.current = setTimeout(() => {
                        setFlyoutOpen(false);
                      }, 180);
                    }}
                  >
                    <button
                      className={`
                        px-3.5 py-2 text-[13px] font-medium rounded-lg transition-all duration-200
                        flex items-center gap-1.5
                        ${isFlyoutActive
                          ? 'text-[#3ED1B8] hover:text-[#3ED1B8] bg-[#3ED1B8]/[0.08]'
                          : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
                        }
                      `}
                    >
                      {link.label}
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${
                          flyoutOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {flyoutOpen && (
                        <WhyUsFlyout
                          items={link.flyoutItems}
                          onNavigate={(page) => setCurrentPage(page)}
                          onClose={() => setFlyoutOpen(false)}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <button
                  key={i}
                  onClick={() => handleNavClick(link)}
                  className={getNavLinkClasses(link)}
                >
                  {link.isTool && <ShieldCheck className="h-3.5 w-3.5" />}
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* ──────── Desktop CTA Buttons ──────── */}
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
                  onClick={() =>
                    setCurrentPage(currentPage === 'dashboard' ? 'home' : 'dashboard')
                  }
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

          {/* ──────── Mobile Menu Toggle ──────── */}
          <button
            onClick={() => {
              setMobileOpen(!mobileOpen);
              setMobileWhyUsOpen(false);
            }}
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

      {/* ──────── Mobile Menu ──────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden border-t border-white/[0.06] bg-[#0F1219]"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, i) => {
                if (link.action === 'flyout' && link.flyoutItems) {
                  const isFlyoutActive = isPageActive(currentPage, 'why-us');
                  return (
                    <div key={i}>
                      <button
                        onClick={() => setMobileWhyUsOpen(!mobileWhyUsOpen)}
                        className={`
                          w-full text-left px-4 py-2.5 text-sm font-medium rounded-lg transition-colors
                          flex items-center justify-between
                          ${isFlyoutActive
                            ? 'text-[#3ED1B8] bg-[#3ED1B8]/[0.08]'
                            : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
                          }
                        `}
                      >
                        {link.label}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            mobileWhyUsOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {/* Mobile flyout sub-items */}
                      <AnimatePresence>
                        {mobileWhyUsOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.15 }}
                            className="overflow-hidden"
                          >
                            <div className="ml-4 mt-1 space-y-1 border-l border-white/[0.06] pl-4">
                              {link.flyoutItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                  <button
                                    key={item.label}
                                    onClick={() => handleNavClick({ ...item, action: 'page', page: item.page })}
                                    className="w-full text-left px-3 py-2.5 text-sm rounded-lg flex items-start gap-3 group hover:bg-white/[0.06] transition-colors"
                                  >
                                    <div className="shrink-0 mt-0.5 h-8 w-8 rounded-lg bg-[#3ED1B8]/10 flex items-center justify-center">
                                      <Icon className="h-4 w-4 text-[#3ED1B8]" />
                                    </div>
                                    <div>
                                      <span className="text-sm font-medium text-white/80 group-hover:text-[#3ED1B8] transition-colors">
                                        {item.label}
                                      </span>
                                      <p className="mt-0.5 text-xs text-white/40 leading-relaxed">
                                        {item.subtext}
                                      </p>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleNavClick(link)}
                    className={getNavLinkClasses(link)}
                  >
                    {link.isTool && <ShieldCheck className="h-4 w-4" />}
                    {link.label}
                  </button>
                );
              })}

              {/* Mobile CTA Buttons */}
              <div className="pt-3 space-y-2 border-t border-white/[0.06]">
                {!isLoggedIn ? (
                  <>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setCurrentPage('pro-onboarding');
                        setMobileOpen(false);
                      }}
                      className="w-full rounded-lg border border-white/15 text-white/70 hover:text-white hover:bg-white/[0.06] font-semibold text-sm"
                    >
                      Join as a Pro
                    </Button>
                    <Button
                      onClick={() => {
                        useAppStore.getState().login('homeowner');
                        setCurrentPage('dashboard');
                        setMobileOpen(false);
                      }}
                      className="w-full rounded-lg bg-[#3257C2] hover:bg-[#2a49a8] text-white font-semibold text-sm"
                    >
                      Join as a Property Owner
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setCurrentPage(currentPage === 'dashboard' ? 'home' : 'dashboard');
                        setMobileOpen(false);
                      }}
                      className="w-full rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] font-semibold text-sm flex items-center justify-center gap-2"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      {currentPage === 'dashboard' ? 'Home' : 'Dashboard'}
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                      }}
                      className="w-full rounded-lg text-red-400 hover:bg-red-500/10 font-semibold text-sm"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
