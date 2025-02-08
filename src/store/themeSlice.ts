import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeType } from '../utils/types';

const initialState = {
  theme: 'light' as ThemeType, // Default theme with explicit type
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

// Middleware to persist theme in AsyncStorage
export const persistThemeMiddleware =
  (store: any) => (next: any) => async (action: any) => {
    const result = next(action);
    if (action.type === 'theme/setTheme') {
      await AsyncStorage.setItem('appTheme', action.payload);
    }
    return result;
  };

export default themeSlice.reducer;