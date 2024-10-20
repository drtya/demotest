import { create } from 'zustand';

interface IBurgerMenu {
  isOpen: boolean;
  toggleOpen: () => void;
}

export const useBurgerMenuStore = create<IBurgerMenu>((set) => ({
  isOpen: false,
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));


interface IGlobalParams {
  search: string;
  filter: string;
  countInPage: number;
}

export const useParamsStore = create<IGlobalParams>()((set) => ({
  search:'',
  filter:'',
  countInPage:6,
  setSearch:(search:string) => {
    set({
      search
    });
  },
  setFilter:(filter:string) => {
    set({
      filter
    });
  },
  setCountInPage:(count:number) => {
    set({
      countInPage:count
    });
  },
}));
