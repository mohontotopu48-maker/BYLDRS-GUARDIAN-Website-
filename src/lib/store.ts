import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface VaultSyncedBid {
  id: string;
  proName: string;
  licenseNumber: string;
  tradeCategory: string;
  bidAmount: string;
  healthScore: number;
  riskLevel: string;
  fileName: string;
  syncedAt: string;
  reportId: string;
}

export type PageView = 'home' | 'dashboard' | 'pro-onboarding' | 'blog' | 'contact' | 'check-my-pro' | 'the-standard' | 'why-us' | 'pro-profile' | 'tier-2' | 'tier-3' | 'property-story' | 'protection-guide-download' | 'vault' | 'enroll-shield' | 'shield-scripts';

/* ─── Page title map for dynamic document.title ──────────────────────── */
export const PAGE_TITLES: Record<PageView, string> = {
  home: 'BYLDRS GUARDIAN – Hire with Certainty. Protect Your Property.',
  dashboard: 'Dashboard – BYLDRS GUARDIAN',
  'check-my-pro': 'Check My Pro – BYLDRS GUARDIAN',
  'the-standard': 'The 20-Point Shield – BYLDRS GUARDIAN',
  'why-us': 'Why BYLDRS GUARDIAN – California Pro Protection',
  'pro-onboarding': 'Join as a Pro – BYLDRS GUARDIAN',
  blog: 'Property Stories – BYLDRS GUARDIAN',
  contact: 'Contact Us – BYLDRS GUARDIAN',
  'pro-profile': 'Pro Profile – BYLDRS GUARDIAN',
  'tier-2': 'Vetted Partner – BYLDRS GUARDIAN',
  'tier-3': 'Certified Guardian – BYLDRS GUARDIAN',
  'property-story': 'Property Story – BYLDRS GUARDIAN',
  'protection-guide-download': 'Download Shield Guide – BYLDRS GUARDIAN',
  vault: 'Homeowner Vault – BYLDRS GUARDIAN',
  'enroll-shield': 'Enroll in Shield – BYLDRS GUARDIAN',
  'shield-scripts': "Marketer's Pack – BYLDRS GUARDIAN",
};

/* ─── Helpers for URL hash sync ───────────────────────────────────────── */
const HASH_PREFIX = '#/';

function pageToHash(page: PageView): string {
  if (page === 'home') return '/';
  return `/${page}`;
}

function hashToPage(hash: string): PageView {
  const validPages: PageView[] = [
    'home', 'dashboard', 'pro-onboarding', 'blog', 'contact',
    'check-my-pro', 'the-standard', 'why-us', 'pro-profile',
    'tier-2', 'tier-3', 'property-story',
    'protection-guide-download', 'vault', 'enroll-shield', 'shield-scripts',
  ];
  const clean = hash.replace(HASH_PREFIX, '').replace(/^\/+/, '').replace(/\/+$/, '') as PageView;
  if (!clean) return 'home';
  if (validPages.includes(clean)) return clean;
  return 'home';
}

function updateDocumentTitle(page: PageView) {
  const title = PAGE_TITLES[page] || PAGE_TITLES.home;
  if (typeof document !== 'undefined' && document.title !== title) {
    document.title = title;
  }
}

/* ─── Store ──────────────────────────────────────────────────────────── */
interface AppStore {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  isLoggedIn: boolean;
  userType: 'homeowner' | 'pro' | null;
  login: (type: 'homeowner' | 'pro') => void;
  logout: () => void;
  selectedProId: number | null;
  setSelectedProId: (id: number | null) => void;
  searchZipCode: string;
  setSearchZipCode: (zip: string) => void;
  searchCategory: string;
  setSearchCategory: (category: string) => void;
  hasSearched: boolean;
  setHasSearched: (searched: boolean) => void;
  selectedArticleId: number | null;
  setSelectedArticleId: (id: number | null) => void;
  showEnrollSuccess: boolean;
  setShowEnrollSuccess: (show: boolean) => void;
  vaultSyncedBids: VaultSyncedBid[];
  addVaultSyncedBid: (bid: VaultSyncedBid) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      currentPage: 'home' as PageView,
      setCurrentPage: (page) => {
        set({ currentPage: page });
        // Sync URL hash for back button support + shareable links
        if (typeof window !== 'undefined') {
          const newHash = pageToHash(page);
          if (window.location.hash !== newHash) {
            window.history.pushState(null, '', newHash || '/');
          }
          updateDocumentTitle(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      },
      isLoggedIn: false,
      userType: null,
      login: (type) => set({ isLoggedIn: true, userType: type }),
      logout: () => {
        set({ isLoggedIn: false, userType: null, currentPage: 'home' as PageView });
        if (typeof window !== 'undefined') {
          window.history.pushState(null, '', '/');
          updateDocumentTitle('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      },
      selectedProId: null,
      setSelectedProId: (id) => set({ selectedProId: id }),
      searchZipCode: '',
      setSearchZipCode: (zip) => set({ searchZipCode: zip }),
      searchCategory: '',
      setSearchCategory: (category) => set({ searchCategory: category }),
      hasSearched: false,
      setHasSearched: (searched) => set({ hasSearched: searched }),
      selectedArticleId: null,
      setSelectedArticleId: (id) => set({ selectedArticleId: id }),
      showEnrollSuccess: false,
      setShowEnrollSuccess: (show) => set({ showEnrollSuccess: show }),
      vaultSyncedBids: [],
      addVaultSyncedBid: (bid) => set((state) => ({ vaultSyncedBids: [...state.vaultSyncedBids, bid] })),
    }),
    {
      name: 'byldrs-guardian-store',
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        userType: state.userType,
        vaultSyncedBids: state.vaultSyncedBids,
        searchZipCode: state.searchZipCode,
        searchCategory: state.searchCategory,
      }),
    }
  )
);

/* ─── Initialize hash routing on client ───────────────────────────────── */
export function initHashRouting() {
  if (typeof window === 'undefined') return;

  // Set initial page from URL hash
  const initialPage = hashToPage(window.location.hash);
  const store = useAppStore.getState();
  if (initialPage !== 'home' || window.location.hash) {
    store.setCurrentPage(initialPage);
  }
  updateDocumentTitle(initialPage);

  // Listen for back/forward button
  window.addEventListener('hashchange', () => {
    const page = hashToPage(window.location.hash);
    useAppStore.getState().setCurrentPage(page);
  });
}
