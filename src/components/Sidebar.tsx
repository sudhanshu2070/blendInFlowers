import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, Animated, PanResponder } from 'react-native';
import { RootStackParamList } from '../utils/types';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { profiles } from '../utils/data/profiles';

const { width } = Dimensions.get('window');

type SidebarProps = {
  closeSidebar: () => void;
};

const Sidebar = ({ closeSidebar }: SidebarProps) => {
  const sidebarWidth = width * 0.5; // Sidebar takes 50% of screen width
  const animation = new Animated.Value(0); // For slide-in animation
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // State for user data
  const [userId, setUserId] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<any | null>(null);

  // Function to refresh userId
  const refreshUserId = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId); // Set userId in state
      } else {
        console.log('No user ID found');
      }
    } catch (error) {
      console.error('Failed to fetch userId:', error);
    }
  };

  // Fetch userId from AsyncStorage on component mount
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId); // Set userId in state
        } else {
          console.log('No user ID found');
        }
      } catch (error) {
        console.error('Failed to fetch userId:', error);
      }
    };

    fetchUserId();
  }, []);

  // Fetch profile data based on userId
  useEffect(() => {
    if (userId) {
      const loggedUser = profiles.find((user) => user.userId === userId);
      if (loggedUser) {
        setProfileData(loggedUser); // Set profile data in state
      } else {
        console.log('No profile found for userId:', userId);
      }
    }
  }, [userId]);

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
    navigation.navigate(screenName);
    closeSidebar();
  };

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
        style={[styles.sidebarContainer, { width: sidebarWidth, transform: [{ translateX }] }]}
        {...panResponder.panHandlers}
      >
        {/* Close Button */}
        <TouchableOpacity onPress={closeSidebar} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>

        {/* Profile Section */}
        <View style={styles.profileContainer}>
          {profileData ? (
            <>
              <Image
                source={{ uri: profileData.image }}
                style={styles.profileImage}
              />
              <Text style={styles.profileName}>{profileData.name}</Text>
            </>
          ) : (
            <Text style={styles.profileName}>Loading...</Text>
          )}
        </View>

        {/* Menu Items */}
        <TouchableOpacity onPress={() => navigateToScreen('ProfileSettings')} style={styles.menuItem}>
          <Text style={styles.menuItemText}>Profile Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('HelpSupport')} style={styles.menuItem}>
          <Text style={styles.menuItemText}>Help & Support</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('ReferWin')} style={styles.menuItem}>
          <Text style={styles.menuItemText}>Refer & Win</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('AppGuide')} style={styles.menuItem}>
          <Text style={styles.menuItemText}>Your App Guide</Text>
        </TouchableOpacity>

        {/* Additional Features */}
        <TouchableOpacity onPress={() => console.log('Dark Mode Toggled')} style={styles.menuItem}>
          <Text style={styles.menuItemText}>Toggle Dark Mode</Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={async () => {
            await AsyncStorage.removeItem('userId'); // Clear userId
            refreshUserId(); // Trigger refresh
            navigation.navigate('Login'); // Navigate to Login screen
          }}
          style={styles.logoutButton}
        >
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
    backgroundColor: '#2C3E50', // Modern dark blue background
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
    color: '#ECF0F1',
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
    color: '#ECF0F1',
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#34495E',
  },
  menuItemText: {
    color: '#ECF0F1',
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