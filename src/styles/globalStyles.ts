import { StyleSheet } from 'react-native';
import { themes } from '../utils/themes';
import { ThemeType } from '../utils/types';

export const getGlobalStyles = (theme: ThemeType) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes[theme].backgroundColor,
  },
  text: {
    color: themes[theme].color,
    fontSize: 16,
  },
  card: {
    backgroundColor: themes[theme].cardColor,
    padding: 10,
    borderRadius: 8,
    margin: 10,
  },
});