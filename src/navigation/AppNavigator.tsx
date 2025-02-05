import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import OTPVerificationScreen from '../screens/Auth/OTPVerificationScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UserDetailScreen from '../screens/UserDetailScreen';
import { RootStackParamList } from '../utils/types';
import Sidebar from '../components/Sidebar';
// import LoggedInUserProfileScreen from '../screens/User/LoggedInUserProfileScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to close the sidebar
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
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
              <TouchableOpacity onPress={() => setIsSidebarOpen(true)}>
                <Image
                  source={{ uri: 'https://i.imgur.com/HNZ7DSm.png' }}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
            ),
          })}
        />
        {/* <Stack.Screen name="LoggedInUserProfileScreen" component={LoggedInUserProfileScreen} /> */}
        <Stack.Screen
          name="UserDetail"
          component={UserDetailScreen}
          options={{
            title: 'User Detail',
          }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen
          name="ProfileSettings"
          component={ProfileScreen}
          options={{
            title: 'Profile Settings',
          }}
        />
        <Stack.Screen
          name="HelpSupport"
          component={ProfileScreen}
          options={{
            title: 'Help & Support',
          }}
        />
        <Stack.Screen
          name="ReferWin"
          component={ProfileScreen}
          options={{
            title: 'Refer & Win',
          }}
        />
        <Stack.Screen
          name="AppGuide"
          component={ProfileScreen}
          options={{
            title: 'App Guide',
          }}
        />
      </Stack.Navigator>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
      )}
    </>
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