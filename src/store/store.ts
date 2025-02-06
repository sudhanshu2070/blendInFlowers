import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

// Configuring the Redux store
const store = configureStore({
  reducer: {
    auth: authReducer, // Adding the auth slice to the store
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;