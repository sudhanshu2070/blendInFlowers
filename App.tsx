import React, { useEffect } from 'react';
import LoadingScreen from './src/screens/LoadingScreen';
import { useFontLoader } from './src/utils/fontLoader';
import { Provider } from 'react-redux';
import store from './src/store/store';
import {AuthProvider} from './src/contexts/AuthContext';
import ThemeProvider from './src/components/ThemeProvider'; 
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigationWrapper from './src/navigation/NavigationWrapper';

const App = () => {
  const fontsLoaded = useFontLoader();

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <Provider store={store}>
      <AuthProvider>
      <SafeAreaProvider>
        <ThemeProvider> {/* Wrapping the app with ThemeProvider */}
          <NavigationWrapper /> {/* Rendering the navigation wrapper */}
        </ThemeProvider>
      </SafeAreaProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App;