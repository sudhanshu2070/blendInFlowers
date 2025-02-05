import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import { AuthProvider } from './src/contexts/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import LoadingScreen from './src/screens/LoadingScreen';
import { useFontLoader } from './src/utils/fontLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  useEffect(() => {
    const clearStorageForTesting = async () => {
      try {
        await AsyncStorage.clear();
        console.log('AsyncStorage cleared for testing');
      } catch (error) {
        console.error('Failed to clear AsyncStorage:', error);
      }
    };

    // Uncomment this line to clear storage on app start
    clearStorageForTesting();
  }, []);
  const fontsLoaded = useFontLoader();

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