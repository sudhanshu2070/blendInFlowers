import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
  Modal,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { logout as reduxLogout } from '../../store/authSlice';
import { RootStackParamList } from '../../utils/types';

const { width, height } = Dimensions.get('window');

type ProfileSettingsRouteProp = RouteProp<
  RootStackParamList,
  'ProfileSettings'
>;

const ProfileSettings = () => {
  const route = useRoute<ProfileSettingsRouteProp>();
  const { image = 'https://i.imgur.com/HNZ7DSm.png', name = 'Guest' } = route.params;
  const [fadeAnim] = useState(new Animated.Value(0)); // For fade-in animation
  const [modalFadeAnim] = useState(new Animated.Value(0)); // For modal animation
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  // Fade-in animation when the screen loads
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // Function to handle opening the modal
  const openModal = () => {
    setIsModalVisible(true);
    Animated.timing(modalFadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Function to handle closing the modal
  const closeModal = () => {
    Animated.timing(modalFadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsModalVisible(false));
  };

  const handleLogoutProfileSetting = async () => {
    await AsyncStorage.removeItem('userId'); // Clear only userId
    dispatch(reduxLogout()); // Dispatch Redux logout action
    navigation.navigate('Login'); // Navigate to Login screen
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header Section */}
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <TouchableOpacity onPress={openModal} accessibilityLabel="View profile picture in full screen">
            <Image
              source={{ uri: image }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <Text style={styles.profileName}>{name}</Text>
          <Text style={styles.profileBio}>Software Engineer | Tech Enthusiast</Text>
        </Animated.View>

        {/* Stats Section */}
        <Animated.View style={[styles.statsContainer, { opacity: fadeAnim }]}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>1.2K</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>567</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>345</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View style={[styles.actionButtons, { opacity: fadeAnim }]}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Dark Mode</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Additional Info Section */}
        <Animated.View style={[styles.infoSection, { opacity: fadeAnim }]}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.sectionContent}>
            I'm a passionate software engineer who loves building innovative solutions. When I'm not coding, you'll find me exploring new technologies or hiking in nature.
          </Text>
        </Animated.View>

        {/* Links Section */}
        <Animated.View style={[styles.linksSection, { opacity: fadeAnim }]}>
          <TouchableOpacity style={styles.linkItem}>
            <Text style={styles.linkText}>Help & Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkItem}>
            <Text style={styles.linkText}>Terms & Conditions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkItem}>
            <Text style={styles.linkText}>Privacy Policy</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Logout Button */}
        <Animated.View style={[styles.logoutButtonContainer, { opacity: fadeAnim }]}>
          <TouchableOpacity
            onPress={handleLogoutProfileSetting}
            style={styles.logoutButton}
            accessibilityLabel="Logout from the app"
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Modal for Full-Screen Image */}
        <Modal visible={isModalVisible} transparent={true} onRequestClose={closeModal}>
          <View style={styles.modalContainer}>
            {/* Background Overlay */}
            <TouchableOpacity
              style={styles.modalBackground}
              activeOpacity={1}
              onPress={closeModal}
            />

            {/* Full-Screen Image */}
            <Animated.Image
              source={{ uri: image }}
              style={[
                styles.fullScreenImage,
                {
                  transform: [
                    {
                      scale: modalFadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.2], // Slight zoom-in effect
                      }),
                    },
                  ],
                },
              ]}
            />
          </View>
        </Modal>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FFD700',
    marginTop: 5,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileBio: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 20,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#2C3E50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoSection: {
    width: '80%',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  linksSection: {
    width: '80%',
    marginBottom: 20,
  },
  linkItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  linkText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  logoutButtonContainer: {
    width: '80%',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#E74C3C',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  fullScreenImage: {
    width: width * 0.8,
    height: height * 0.6,
    resizeMode: 'contain',
  },
});

export default ProfileSettings;