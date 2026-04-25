import { create } from 'zustand';

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

export type PageView = 'home' | 'dashboard' | 'pro-onboarding' | 'blog' | 'contact' | 'check-my-pro' | 'the-standard' | 'why-us' | 'pro-profile' | 'tier-2' | 'tier-3' | 'property-story' | 'protection-guide-download' | 'vault' | 'enroll-shield';

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

export const useAppStore = create<AppStore>((set) => ({
  currentPage: 'home',
  setCurrentPage: (page) => {
    set({ currentPage: page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  isLoggedIn: false,
  userType: null,
  login: (type) => set({ isLoggedIn: true, userType: type }),
  logout: () => set({ isLoggedIn: false, userType: null, currentPage: 'home' }),
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
}));
