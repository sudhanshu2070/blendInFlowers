// src/utils/themes.ts
export const themes = {
  light: {
    backgroundColor: '#FFFFFF',
    textColor: '#000000', // Renamed from 'color' to 'textColor'
    cardColor: '#F5F5F5',
    primaryColor: '#007BFF',
  },
  dark: {
    backgroundColor: '#121212',
    textColor: '#FFFFFF', // Renamed from 'color' to 'textColor'
    cardColor: '#1E1E1E',
    primaryColor: '#BB86FC',
  },
  custom: {
    backgroundColor: '#FFD700',
    textColor: '#333333', // Renamed from 'color' to 'textColor'
    cardColor: '#FFFAF0',
    primaryColor: '#FF4500',
  },
  default: {
    backgroundColor: '#2C3E50',
    textColor: '#ECF0F1', // Already uses 'textColor'
    cardColor: '#34495E',
    primaryColor: '#1ABC9C',
  },
};

// Default theme (used as fallback)
export const defaultTheme = themes.light;