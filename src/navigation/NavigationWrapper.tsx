import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setTheme } from '../store/themeSlice';
import { ThemeType } from '../utils/types';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';

const NavigationWrapper = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('appTheme');
      if (savedTheme) {
        dispatch(setTheme(savedTheme as ThemeType));
      } else {
        dispatch(setTheme('light')); // Setting default theme if none is saved
      }
    };
    loadTheme();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default NavigationWrapper;