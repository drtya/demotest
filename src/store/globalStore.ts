import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface IGlobalParams {
  search: string;
  filter: string;
  countInPage: number;
}

interface IGlobalState {
  burger: boolean;
  globalParams: IGlobalParams;
}

const initialState: IGlobalState = {
  burger: false,
  globalParams: {
    search: '',
    filter: '',
    countInPage: 6,
  },
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    toggleBurgerMenu: (state) => {
      state.burger = !state.burger;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.globalParams.search = action.payload;
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.globalParams.filter = action.payload;
    },
    setCountInPage: (state, action: PayloadAction<number>) => {
      state.globalParams.countInPage = action.payload;
    },
  },
});

export const { toggleBurgerMenu, setFilter, setSearch, setCountInPage } =
  globalSlice.actions;

export const selectGlobal = (state: RootState) => state.global;

export default globalSlice.reducer;
