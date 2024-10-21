import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './globalStore';
import { vehiclesApi } from '@/services/vehicles';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    global: globalReducer,
    [vehiclesApi.reducerPath]: vehiclesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(vehiclesApi.middleware),
});

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
