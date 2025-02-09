import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import OTPVerificationScreen from '../screens/Auth/OTPVerificationScreen';
import HomeScreen from '../screens/HomeScreen';
import UserDetailScreen from '../screens/UserDetailScreen';
import Sidebar from '../components/Sidebar';
import HelpSupport from '../screens/pop-up/HelpSupport';
import ReferWin from '../screens/pop-up/ReferWin';
import AppGuide from '../screens/pop-up/AppGuide';
import { RootStackParamList } from '../utils/types';
import { profiles } from '../utils/data/profiles';
import ProfileSettings from '../screens/pop-up/ProfileSettings';
import ThemeSelectionScreen from '../screens/ThemeSelectionScreen';
import { useGlobalStyles } from '../hooks/useGlobalStyles';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {

  const { colors } = useGlobalStyles();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { isLoggedIn, profileData } = useSelector((state: RootState) => state.auth);

  // Function to close the sidebar
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Getting profile image dynamically based on Redux state
  const getProfileImage = () => {
    if (profileData && profileData._id) {
      const loggedUser = profiles.find((profile) => profile.userId === profileData._id);
      return loggedUser?.image || 'https://images.unsplash.com/photo-1635107510862-53886e926b74';
    }
    return 'https://images.unsplash.com/photo-1635107510862-53886e926b74'; // Default image
  };

  const profileImageUri = getProfileImage();

  return (
    <>
      {/* Conditional Rendering Based on Login State */}
      <Stack.Navigator initialRouteName={isLoggedIn ? 'Home' : 'Login'}>
        {/* Login Screen */}

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: true,
            headerStyle: {
              height: 100,
            },
            headerTitle: 'Login',
            headerLeft: () => null, // Keeping it blank
          }}
        />        
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{
            headerShown: true,
            headerTitle: 'Register',
            headerLeft: () => null, // Keeping it blank
          }}
          />
        <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />

        {/* Home Screen */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Home',
            headerStyle: {
              height: 100,
              backgroundColor: colors.backgroundColor,
            },
            headerTintColor: colors.textColor, // Color of the header text and icons
            headerTitleStyle: {
              fontStyle: 'italic',
            },
            headerLeft: () => null, // Keeping it blank to remove the back button
            headerRight: () => (
              <TouchableOpacity onPress={() => setIsSidebarOpen(true)}>
                <Image
                  source={{ uri: profileImageUri }}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
            ),
          })}
        />

        {/* User Detail Screen */}
        <Stack.Screen
          name="UserDetail"
          component={UserDetailScreen}
          options={{
            title: 'User Detail',
            headerStyle: {
              height: 100,
            },
          }}
        />

        {/* Profile Settings Screen */}
        <Stack.Screen
          name="ProfileSettings"
          component={ProfileSettings}
          options={{
            title: 'Profile Settings',
            headerStyle: {
              height: 100,
            },
          }}
        />

        {/* Help & Support Screen */}
        <Stack.Screen
          name="HelpSupport"
          component={HelpSupport}
          options={{
            title: 'Help & Support',
            headerStyle: {
              height: 100,
            },
          }}
        />

        {/* Refer & Win Screen */}
        <Stack.Screen
          name="ReferWin"
          component={ReferWin}
          options={{
            title: 'Refer & Win',
            headerStyle: {
              height: 100,
            },
          }}
        />

        {/* App Guide Screen */}
        <Stack.Screen
          name="AppGuide"
          component={AppGuide}
          options={{
            title: 'App Guide',
            headerStyle: {
              height: 100,
            },
          }}
        />
        {/* App Guide Screen */}
        <Stack.Screen
          name="ThemeSelector"
          component={ThemeSelectionScreen}
          options={{
            title: 'Theme Selctor',
            headerStyle: {
              height: 100,
            },
          }}
        />
      </Stack.Navigator>

      {/* Sidebar Overlay */}
      {isSidebarOpen && <Sidebar closeSidebar={closeSidebar} />}
    </>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
    marginRight: 15,
    marginBottom: 10,
  },
});

export default AppNavigator;