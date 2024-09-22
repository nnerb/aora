
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
  fetchCurrentUser: () => Promise<void>
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  isLoggedIn: false,
  user: null,
  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  setUser: (user) => set({ user }),
  fetchCurrentUser: async() => {
    try {
      set({ isLoading: true })
      const session = await getCurrentUser();
      if (session) {
        set({ 
          user: session as UserProps, 
          isLoading: true, 
          isLoggedIn: true,
        })
      } else {
        // If no session, reset to logged-out state
        set({
          user: null,
          isLoggedIn: false,
          isLoading: false
        })
      }
    } catch (error) {
      console.log("Error fetching users", error)
    } finally {
      set({ isLoading: false })
    }
  }
}))
