import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import { AuthProvider } from './src/contexts/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import LoadingScreen from './src/screens/LoadingScreen';

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Playwrite': require('./assets/fonts/Playwrite.ttf'),
        'Christmas': require('./assets/fonts/Christmas.ttf'),
        'ClashGrotesk': require('./assets/fonts/ClashGrotesk.ttf'),
        'Rosaline-Regular': require('./assets/fonts/Rosaline-Regular.ttf'),
        'Comico-Regular': require('./assets/fonts/Comico-Regular.ttf'),
        'Stardom-Regular': require('./assets/fonts/Stardom-Regular.ttf'),
        'Telma-Variable': require('./assets/fonts/Telma-Variable.ttf'),
        'Pencerio-Hairline': require('./assets/fonts/Pencerio-Hairline.ttf'),
        'BespokeSerif-Variable': require('./assets/fonts/BespokeSerif-Variable.ttf'),
        'BespokeSerif-VariableItalic': require('./assets/fonts/BespokeSerif-VariableItalic.ttf'),
        'BespokeStencil-Variable': require('./assets/fonts/BespokeStencil-Variable.ttf'),
        'BespokeStencil-VariableItalic': require('./assets/fonts/BespokeStencil-VariableItalic.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;