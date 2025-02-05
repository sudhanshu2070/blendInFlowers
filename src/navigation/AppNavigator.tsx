import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import OTPVerificationScreen from '../screens/Auth/OTPVerificationScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/pop-up/ProfileScreen';
import UserDetailScreen from '../screens/UserDetailScreen';
import { RootStackParamList } from '../utils/types';
import Sidebar from '../components/Sidebar';
import HelpSupport from '../screens/pop-up/HelpSupport';
import ReferWin from '../screens/pop-up/ReferWin';
import AppGuide from '../screens/pop-up/AppGuide';
import { profiles } from '../utils/data/profiles';
// import LoggedInUserProfileScreen from '../screens/User/LoggedInUserProfileScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0); // Key to force re-fetching
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state


  // Function to close the sidebar
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Fetch userId and profile image on component mount or refresh
  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        console.log('Fetched userId from AppNav:', userId); // Debugging log
        if (userId) {
          setIsLoggedIn(true); // User is logged in
          const loggedUser = profiles.find((user) => user.userId === userId);
          if (loggedUser) {
            setProfileImage(loggedUser.image); // Set profile image in state
          } else {
            setProfileImage(null); // Clear profile image if no user is found
          }
        } else {
          setIsLoggedIn(false); // User is not logged in
          setProfileImage(null); // Clear profile image
        }
      } catch (error) {
        console.error('Failed to fetch profile image:', error);
      }
    };

    fetchProfileImage();
  }, [refreshKey]); // Re-run when refreshKey changes

  // Function to update userId and refresh the profile image
  const refreshUserId = () => {
    setRefreshKey((prevKey) => prevKey + 1); // Increment refreshKey to trigger re-fetch
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
                  source={{ uri: profileImage || 'https://images.unsplash.com/photo-1635107510862-53886e926b74' }}
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
          component={HelpSupport}
          options={{
            title: 'Help & Support',
          }}
        />
        <Stack.Screen
          name="ReferWin"
          component={ReferWin }
          options={{
            title: 'Refer & Win',
          }}
        />
        <Stack.Screen
          name="AppGuide"
          component={AppGuide}
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