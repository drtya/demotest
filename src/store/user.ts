import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface IUserUUID {
  uuid: string;
}
const initialState: IUserUUID = {
  uuid: '',
};

export const userUUIDSlice = createSlice({
  name: 'userUUID',
  initialState,
  reducers: {
    setUserUUID: (state, action: PayloadAction<string>) => {
      state.uuid = action.payload;
    },
  },
});

export const { setUserUUID } = userUUIDSlice.actions;

export const selectUserUUID = (state: RootState) => state.userUUID;

export default userUUIDSlice.reducer;
