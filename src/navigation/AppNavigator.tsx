import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import OTPVerificationScreen from '../screens/Auth/OTPVerificationScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UserDetailScreen from '../screens/UserDetailScreen';
import { RootStackParamList } from '../utils/types';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
      <Stack.Screen name="Home" component={HomeScreen} 
      options={{
        headerShown: true,  // Show the header
        headerTitleStyle: {
          fontStyle: 'italic', // Apply italic style to the title
        },
      }}
      />
      <Stack.Screen name="UserDetail" component={UserDetailScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;