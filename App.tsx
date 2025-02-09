import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setTheme } from './src/store/themeSlice';
import { Provider } from 'react-redux';
import store from './src/store/store';
import { AuthProvider } from './src/contexts/AuthContext';
import ThemeProvider from './src/components/ThemeProvider';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import LoadingScreen from './src/screens/LoadingScreen';
import { useFontLoader } from './src/utils/fontLoader';

/**
 * MainApp Component
 * -----------------
 * This component handles the initialization of the app, including:
 * 1. Loading the saved theme from AsyncStorage.
 * 2. Ensuring fonts are loaded before rendering the main content.
 * 3. Rendering the app only after all dependencies (fonts, theme) are ready.
 *
 * Why is this separate from the App component?
 * - Redux hooks like `useDispatch` and `useSelector` require the component to be rendered inside a Redux `Provider`.
 * - By moving this logic into a separate component (`MainApp`), we ensure that the Redux store is available when these hooks are called.
 */
const MainApp = () => {
  const [isThemeLoaded, setIsThemeLoaded] = useState(false); // Tracks whether the theme has been loaded
  const dispatch = useDispatch(); // Access the Redux dispatch function
  const fontsLoaded = useFontLoader(); // Check if custom fonts are loaded

  /**
   * Load the theme asynchronously from AsyncStorage
   * - If a saved theme exists, dispatch it to the Redux store.
   * - If no theme is saved, fallback to the default theme ('light').
   * - Handle errors gracefully by falling back to the default theme.
   * - Mark the theme as loaded once the process is complete.
   */
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('appTheme');
        if (savedTheme) {
          dispatch(setTheme(savedTheme)); // Dispatch the saved theme to the Redux store
        } else {
          dispatch(setTheme('default')); // Set default theme if none is saved
        }
      } catch (error) {
        console.error('Error loading theme:', error);
        dispatch(setTheme('default')); // Fallback to default theme on error
      } finally {
        setIsThemeLoaded(true); // Mark theme as loaded
      }
    };

    loadTheme();
  }, [dispatch]);

  /**
   * Show a loading screen while fonts or theme are being loaded
   * - This ensures that the app doesn't render until all dependencies are ready.
   */
  if (!fontsLoaded || !isThemeLoaded) {
    return <LoadingScreen />;
  }

  /**
   * Render the main app structure
   * - Wrap the app with context providers (AuthProvider, ThemeProvider).
   - Use React Navigation's NavigationContainer to manage navigation.
   */
  return (
    <AuthProvider>
      <ThemeProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </AuthProvider>
  );
};

/**
 * App Component
 * --------------
 * The root component of the app.
 * - Wraps the entire app with the Redux `Provider` to make the Redux store available to all components.
 * - Renders the `MainApp` component, which handles initialization and rendering of the main content.
 *
 * Why is the Redux `Provider` here?
 * - The `Provider` makes the Redux store available to all child components.
 * - Without this, Redux hooks like `useDispatch` and `useSelector` will throw errors.
 */
const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;