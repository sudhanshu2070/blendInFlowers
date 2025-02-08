import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  Animated,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons'; // For icons
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const AppGuide = () => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const scrollY = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.gradient}>
      <ScrollView
        contentContainerStyle={styles.container}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* Header Section */}
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <Text style={styles.title}>App Guide</Text>
          <Text style={styles.subtitle}>Learn how to use the app like a pro!</Text>
        </Animated.View>

        {/* Getting Started Section */}
        <Animated.View
          style={[
            styles.card,
            {
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, -20],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Getting Started</Text>
          <TouchableOpacity style={styles.guideItem}>
            <Icon name="person-add-outline" size={24} color="#fff" />
            <Text style={styles.guideText}>Sign up or log in to your account.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.guideItem}>
            <Icon name="create-outline" size={24} color="#fff" />
            <Text style={styles.guideText}>Complete your profile details.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.guideItem}>
            <Icon name="compass-outline" size={24} color="#fff" />
            <Text style={styles.guideText}>Explore the app's features.</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Pro Tips Section */}
        <Animated.View
          style={[
            styles.card,
            {
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, -40],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Pro Tips</Text>
          <TouchableOpacity style={styles.guideItem}>
            <Icon name="moon-outline" size={24} color="#fff" />
            <Text style={styles.guideText}>Use dark mode for better battery life.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.guideItem}>
            <Icon name="people-outline" size={24} color="#fff" />
            <Text style={styles.guideText}>Refer friends to earn rewards.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.guideItem}>
            <Icon name="settings-outline" size={24} color="#fff" />
            <Text style={styles.guideText}>Check settings for customization options.</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Call-to-Action Button */}
        <Animated.View
          style={[
            styles.ctaButtonContainer,
            {
              opacity: fadeAnim,
              transform: [
                {
                  scale: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Start Exploring Now</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#ddd',
    marginTop: 5,
  },
  card: {
    width: '90%',
    backgroundColor: '#2b4f8b',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  guideItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  guideText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
  },
  ctaButtonContainer: {
    width: '80%',
    marginBottom: 40,
  },
  ctaButton: {
    backgroundColor: '#ff6f61',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default AppGuide;