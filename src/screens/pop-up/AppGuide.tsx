import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  ScrollView,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const AppGuide = () => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <Text style={styles.title}>App Guide</Text>
        <Text style={styles.subtitle}>Learn how to use the app like a pro!</Text>
      </Animated.View>

      {/* Step-by-Step Guide */}
      <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
        <Text style={styles.sectionTitle}>Getting Started</Text>
        <Text style={styles.guideText}>1. Sign up or log in to your account.</Text>
        <Text style={styles.guideText}>2. Complete your profile details.</Text>
        <Text style={styles.guideText}>3. Explore the app's features.</Text>
      </Animated.View>

      {/* Tips Section */}
      <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
        <Text style={styles.sectionTitle}>Pro Tips</Text>
        <Text style={styles.guideText}>- Use dark mode for better battery life.</Text>
        <Text style={styles.guideText}>- Refer friends to earn rewards.</Text>
        <Text style={styles.guideText}>- Check settings for customization options.</Text>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  section: {
    width: '90%',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  guideText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
});

export default AppGuide;