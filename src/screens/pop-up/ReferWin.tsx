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

const ReferWin = () => {
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
        <Text style={styles.title}>Refer & Win</Text>
        <Text style={styles.subtitle}>Share the app and earn exciting rewards!</Text>
      </Animated.View>

      {/* Referral Code Section */}
      <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
        <Text style={styles.sectionTitle}>Your Referral Code</Text>
        <View style={styles.referralCodeBox}>
          <Text style={styles.referralCode}>REF12345</Text>
        </View>
        <TouchableOpacity style={styles.copyButton}>
          <Text style={styles.copyButtonText}>Copy Code</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Rewards Section */}
      <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
        <Text style={styles.sectionTitle}>Rewards</Text>
        <Text style={styles.rewardText}>Refer 3 friends and get $10 cashback!</Text>
        <Text style={styles.rewardText}>Refer 10 friends and get a free premium subscription!</Text>
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
  referralCodeBox: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  referralCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  copyButton: {
    backgroundColor: '#27AE60',
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  copyButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rewardText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
});

export default ReferWin;