
import { getCurrentUser } from '@/lib/appwrite';
import { UserProps } from '@/types/user';
import { create } from 'zustand';

interface GlobalStore {
  isLoggedIn: boolean;
  user: UserProps | null;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUser: (user: UserProps) => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  isLoggedIn: false,
  user: null,
  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  setUser: (user) => set({ user }),
}))
