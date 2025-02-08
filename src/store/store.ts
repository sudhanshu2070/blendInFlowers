import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import themeReducer from './themeSlice';
import { persistThemeMiddleware } from './themeSlice';

// Configuring the Redux store
const store = configureStore({
  reducer: {
    auth: authReducer, // Adding the auth slice to the store
    theme: themeReducer, // Adding the theme slice to the store
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistThemeMiddleware), // Adding the custom middleware
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;