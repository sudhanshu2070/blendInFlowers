import { StyleSheet } from 'react-native';
import { defaultTheme, themes } from '../utils/themes';
import { ThemeType } from '../utils/types';

export const getGlobalStyles = (theme: ThemeType) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes[theme].backgroundColor,
  },
  text: {
    color: themes[theme].textColor,
    fontSize: 16,
  },
  card: {
    backgroundColor: themes[theme].cardColor,
    padding: 10,
    borderRadius: 8,
    margin: 10,
  },
});

export const getGlobalColors = (theme: ThemeType) => {
  if (theme === 'default') {
    return themes.default; // Using the hardcoded default theme
  }

  const selectedTheme = themes[theme] || defaultTheme; // Fallback to defaultTheme if the selected theme is not found
  return {
    backgroundColor: selectedTheme.backgroundColor,
    textColor: selectedTheme.textColor,
    primaryColor: selectedTheme.primaryColor,
    cardColor: selectedTheme.cardColor,
  };
};

export const globalFonts = {
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 16,
  },
};