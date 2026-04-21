import { create } from 'zustand';

export type PageView = 'home' | 'dashboard' | 'pro-onboarding' | 'blog' | 'contact' | 'check-my-pro' | 'the-standard' | 'pro-profile' | 'tier-2' | 'tier-3';

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
}));
