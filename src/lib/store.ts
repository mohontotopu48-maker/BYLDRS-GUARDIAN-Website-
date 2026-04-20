import { create } from 'zustand';

export type PageView = 'home' | 'dashboard' | 'pro-onboarding' | 'blog';

interface AppStore {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  isLoggedIn: boolean;
  userType: 'homeowner' | 'pro' | null;
  login: (type: 'homeowner' | 'pro') => void;
  logout: () => void;
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
}));
