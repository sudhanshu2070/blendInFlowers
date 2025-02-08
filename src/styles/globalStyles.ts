import { StyleSheet } from 'react-native';
import { themes } from '../utils/themes';

export const getGlobalStyles = (theme: string) => StyleSheet.create({
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