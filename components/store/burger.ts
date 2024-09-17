import { create } from 'zustand';


interface BurgerState {
  isOpen: boolean;
  toggleMenu: () => void;
}

export const useBurgerStore = create<BurgerState>((set) => ({
  isOpen: false,
  toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
}));
