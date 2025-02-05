import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../utils/types';
import { StackNavigationProp } from '@react-navigation/stack';

type SidebarProps = {
  closeSidebar: () => void;
};

type SidebarNavigationProp = StackNavigationProp<RootStackParamList>;

const Sidebar: React.FC<SidebarProps> = ({ closeSidebar }) => {
  const navigation = useNavigation<SidebarNavigationProp>();

  const navigateToScreen = (screenName: Exclude<keyof RootStackParamList, 'UserDetail'>) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.sidebarContainer}>
      <TouchableOpacity onPress={closeSidebar} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>John Doe</Text>
      </View>
      <TouchableOpacity onPress={() => navigateToScreen('ProfileSettings')}>
        <Text style={styles.sidebarItem}>Profile Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('HelpSupport')}>
        <Text style={styles.sidebarItem}>Help & Support</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('ReferWin')}>
        <Text style={styles.sidebarItem}>Refer & Win</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('AppGuide')}>
        <Text style={styles.sidebarItem}>Your App Guide</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    width: '50%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sidebarItem: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
});

export default Sidebar;