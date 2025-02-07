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
import LinearGradient from 'react-native-linear-gradient';

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
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <Text style={styles.title}>App Guide</Text>
          <Text style={styles.subtitle}>Learn how to use the app like a pro!</Text>
        </Animated.View>

        {/* Step-by-Step Guide */}
        <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
          <Text style={styles.sectionTitle}>Getting Started</Text>
          <Text style={styles.guideText}>1. Sign up or log in to your account.</Text>
          <Text style={styles.guideText}>2. Complete your profile details.</Text>
          <Text style={styles.guideText}>3. Explore the app's features.</Text>
        </Animated.View>

        {/* Tips Section */}
        <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
          <Text style={styles.sectionTitle}>Pro Tips</Text>
          <Text style={styles.guideText}>- Use dark mode for better battery life.</Text>
          <Text style={styles.guideText}>- Refer friends to earn rewards.</Text>
          <Text style={styles.guideText}>- Check settings for customization options.</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 18,
    color: '#ddd',
    marginTop: 5,
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 22,
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