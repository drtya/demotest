import { create } from 'zustand';

interface IBurgerMenu {
  isOpen: boolean;
  toggleOpen: () => void;
}

export const useBurgerMenu = create<IBurgerMenu>((set) => ({
  isOpen: false,
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));
