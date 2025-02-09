import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, Animated, PanResponder } from 'react-native';
import { RootStackParamList } from '../utils/types';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { logout as reduxLogout } from '../store/authSlice';
import { profiles } from '../utils/data/profiles';
import { useGlobalStyles } from '../hooks/useGlobalStyles';

const { width } = Dimensions.get('window');

type SidebarProps = {
  closeSidebar: () => void;
};

const Sidebar = ({ closeSidebar }: SidebarProps) => {
  const sidebarWidth = width * 0.5; // Sidebar takes 50% of screen width
  const animation = new Animated.Value(0); // For slide-in animation
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const { colors } = useGlobalStyles();

  // Fetch user data from Redux global state
  const { isLoggedIn, profileData } = useSelector((state: RootState) => state.auth);

  // Gesture handling for swipe-to-close
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dx < 0) {
        animation.setValue(Math.max(gestureState.dx, -sidebarWidth));
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx < -50) {
        // Swipe left to close
        closeSidebar();
      } else {
        // Snap back to open position
        Animated.spring(animation, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  // Interpolate animation for sliding effect
  const translateX = animation.interpolate({
    inputRange: [-sidebarWidth, 0],
    outputRange: [-sidebarWidth, 0],
    extrapolate: 'clamp',
  });

  // Function to navigate to different screens
  const navigateToScreen = (screenName: Exclude<keyof RootStackParamList, 'UserDetail'>) => {
    if (screenName === 'ProfileSettings') {
      // Pass image and name as params for ProfileSettings
      navigation.navigate(screenName, { image, name });
    } else {
      navigation.navigate(screenName);
    }
    closeSidebar();
  };

  // Logout logic
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userId'); // Clear userId from AsyncStorage
    await AsyncStorage.clear(); // Clear all AsyncStorage data
    dispatch(reduxLogout()); // Dispatch Redux logout action
    navigation.navigate('Login'); // Navigate to Login screen
    closeSidebar(); // Closing sidebar
  };

  // Get profile details from `profiles` array
  const getProfileDetails = () => {
    if (profileData && profileData._id) {
      const loggedUser = profiles.find((profile) => profile.userId === profileData._id);
      return {
        image: loggedUser?.image || 'https://i.imgur.com/HNZ7DSm.png',
        name: loggedUser?.name || 'Guest',
      };
    }
    return {
      image: 'https://i.imgur.com/HNZ7DSm.png',
      name: 'Guest',
    };
  };

  const { image, name } = getProfileDetails();

  return (
    <>
      {/* Backdrop */}
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1} // Prevent opacity change on press
        onPress={closeSidebar} // Close sidebar when tapping outside
      />
      {/* Sidebar */}
      <Animated.View
        style={[
          styles.sidebarContainer,
          { backgroundColor: colors.backgroundColor }, // Dynamic background color
          { width: sidebarWidth, transform: [{ translateX }] },
        ]}
        {...panResponder.panHandlers}
      >
        {/* Close Button */}
        <TouchableOpacity onPress={closeSidebar} style={styles.closeButton}>
          <Text style={[styles.closeButtonText, { color: colors.textColor }]}>×</Text>
        </TouchableOpacity>

        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <Image source={{ uri: image }} style={styles.profileImage} />
          <Text style={[styles.profileName, { color: colors.textColor }]}>{name}</Text>
        </View>

        {/* Menu Items */}
        <TouchableOpacity onPress={() => navigateToScreen('ProfileSettings')} style={styles.menuItem}>
          <Text style={[styles.menuItemText, { color: colors.textColor }]}>Profile Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('HelpSupport')} style={styles.menuItem}>
          <Text style={[styles.menuItemText, { color: colors.textColor }]}>Help & Support</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('ReferWin')} style={styles.menuItem}>
          <Text style={[styles.menuItemText, { color: colors.textColor }]}>Refer & Win</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('AppGuide')} style={styles.menuItem}>
          <Text style={[styles.menuItemText, { color: colors.textColor }]}>Your App Guide</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('ThemeSelector')} style={styles.menuItem}>
          <Text style={[styles.menuItemText, { color: colors.textColor }]}>Change Theme</Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
    zIndex: 999,
  },
  sidebarContainer: {
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1000,
    padding: 20,
    justifyContent: 'flex-start',
  },
  closeButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  closeButtonText: {
    fontSize: 40,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#34495E',
  },
  menuItemText: {
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 15,
    backgroundColor: '#E74C3C',
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#ECF0F1',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Sidebar;