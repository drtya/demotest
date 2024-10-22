import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface IGlobalParams {
  search: string;
  currentPage: string;
  pageSize: string;
}

interface IGlobalState {
  burger: boolean;
  globalParams: IGlobalParams;
}

const initialState: IGlobalState = {
  burger: false,
  globalParams: {
    search: '',
    currentPage: '1',
    pageSize: '6',
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
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.globalParams.currentPage = action.payload;
    },
    setPageSize: (state, action: PayloadAction<string>) => {
      state.globalParams.pageSize = action.payload;
    },
  },
});

export const { toggleBurgerMenu, setCurrentPage, setSearch, setPageSize } =
  globalSlice.actions;

export const selectGlobal = (state: RootState) => state.global;

export default globalSlice.reducer;
