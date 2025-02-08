// screens/ThemeSelectionScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootState } from '../store/store';
import { setTheme } from '../store/themeSlice';

const ThemeSelectionScreen = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: RootState) => state.theme.theme);

  const handleThemeChange = (newTheme: string) => {
    dispatch(setTheme(newTheme));
  };

  return (
    <View style={[styles.container, { backgroundColor: themes[currentTheme]?.background }]}>
      <Text style={[styles.title, { color: themes[currentTheme]?.text }]}>Select Theme</Text>

      {/* Theme Options */}
      <View style={styles.themeOptions}>
        {/* Light Theme */}
        <TouchableOpacity
          style={[
            styles.themeOption,
            { backgroundColor: themes.light.background },
            currentTheme === 'light' && styles.selectedTheme,
          ]}
          onPress={() => handleThemeChange('light')}
        >
          <Icon name="sunny" size={30} color="#FFD700" />
          <Text style={styles.themeLabel}>Light</Text>
        </TouchableOpacity>

        {/* Dark Theme */}
        <TouchableOpacity
          style={[
            styles.themeOption,
            { backgroundColor: themes.dark.background },
            currentTheme === 'dark' && styles.selectedTheme,
          ]}
          onPress={() => handleThemeChange('dark')}
        >
          <Icon name="moon" size={30} color="#BB86FC" />
          <Text style={styles.themeLabel}>Dark</Text>
        </TouchableOpacity>

        {/* Custom Theme */}
        <TouchableOpacity
          style={[
            styles.themeOption,
            { backgroundColor: themes.custom.background },
            currentTheme === 'custom' && styles.selectedTheme,
          ]}
          onPress={() => handleThemeChange('custom')}
        >
          <Icon name="color-palette" size={30} color="#FF4500" />
          <Text style={styles.themeLabel}>Custom</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  themeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  themeOption: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  selectedTheme: {
    transform: [{ scale: 1.2 }],
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  themeLabel: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default ThemeSelectionScreen;