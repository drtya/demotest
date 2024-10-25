import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './globalStore';
import { vehiclesApi } from '@/services/vehicles';
import { setupListeners } from '@reduxjs/toolkit/query';
import { profileApi } from '@/services/profile';
import userUUIDReducer from './user';

export const store = configureStore({
  reducer: {
    global: globalReducer,
    userUUID: userUUIDReducer,
    [vehiclesApi.reducerPath]: vehiclesApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(vehiclesApi.middleware)
      .concat(profileApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
