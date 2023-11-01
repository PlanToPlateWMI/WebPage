import { configureStore } from '@reduxjs/toolkit';
import { api } from '../redux/api/index.js';

import authSlice from '../redux/slices/authSlice.js';

export const store = configureStore({
  reducer: {

    authSlice: authSlice,
    
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

