import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for the auth state
interface AuthState {
  isLoggedIn: boolean;
  userId: string | null;
  profileData: any | null;
}

// Initial state
const initialState: AuthState = {
  isLoggedIn: false,
  userId: null,
  profileData: null,
};

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ userId: string; profileData: any }>) => {
      state.isLoggedIn = true;
      state.userId = action.payload.userId;
      state.profileData = action.payload.profileData;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userId = null;
      state.profileData = null;
    },
  },
});

// Export actions and reducer
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;