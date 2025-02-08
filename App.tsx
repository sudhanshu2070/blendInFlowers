import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import LoadingScreen from './src/screens/LoadingScreen';
import { useFontLoader } from './src/utils/fontLoader';
import { Provider, useSelector } from 'react-redux';
import store, { RootState } from './src/store/store';
import ThemeProvider from './src/components/ThemeProvider'; 

const App = () => {
  const fontsLoaded = useFontLoader();

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider> {/* Wrapping the app with ThemeProvider */}
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App;