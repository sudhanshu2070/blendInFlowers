import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../utils/types';
import { StackNavigationProp } from '@react-navigation/stack';

const { width } = Dimensions.get('window');

type SidebarNavigationProp = StackNavigationProp<RootStackParamList, 'Sidebar'>; 

const Sidebar: React.FC = () => {
    const navigation = useNavigation<SidebarNavigationProp>(); // Typed navigation hook

    const navigateToScreen = (screenName: string) => {
        navigation.navigate(screenName);
      };

  return (
    <View style={styles.sidebarContainer}>
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
    width: width / 2,
    backgroundColor: '#fff',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
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