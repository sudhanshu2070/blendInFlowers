import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  ScrollView,
} from 'react-native';

const { width, height } = Dimensions.get('window');

type ProfileSettingsRouteProp = RouteProp<
  { params: { image: string; name: string } },
  'params'
>;

const ProfileSettings = () => {
  const route = useRoute<ProfileSettingsRouteProp>();
  const { image, name } = route.params;
  const [fadeAnim] = useState(new Animated.Value(0)); // For fade-in animation

  // Fade-in animation when the screen loads
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <Image
          source={{ uri: image }}
          style={styles.profileImage}
        />
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
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#F5F5F5', // Light background
    paddingTop: 20,
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
    borderColor: '#FFD700', // Golden border
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
});

export default ProfileSettings;