import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import OTPVerificationScreen from '../screens/Auth/OTPVerificationScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UserDetailScreen from '../screens/UserDetailScreen';
import { RootStackParamList } from '../utils/types';
import LoggedInUserProfileScreen from '../screens/User/LoggedInUserProfileScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
      <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitleStyle: {
              fontStyle: 'italic',
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('LoggedInUserProfileScreen')}>
                <Image
                  source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
            ),
          })}
        />
      <Stack.Screen name="LoggedInUserProfileScreen" component={LoggedInUserProfileScreen} />
      <Stack.Screen name="UserDetail" component={UserDetailScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="ProfileSettings" component={ProfileScreen} />
      <Stack.Screen name="HelpSupport" component={ProfileScreen} />
      <Stack.Screen name="ReferWin" component={ProfileScreen} />
      <Stack.Screen name="AppGuide" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
    marginRight: 10,
  },
});

export default AppNavigator;