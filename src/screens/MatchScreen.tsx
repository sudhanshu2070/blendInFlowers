import React from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';

const MatchScreen = () => {
  const confettiAnim = new Animated.Value(0); // For confetti animation

  React.useEffect(() => {
    Animated.spring(confettiAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.matchText, { transform: [{ scale: confettiAnim }] }]}>
        You've Got a Match!
      </Animated.Text>
      <TouchableOpacity style={styles.chatButton}>
        <Text style={styles.chatText}>Start Chatting</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  matchText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ff6347',
    marginBottom: 20,
  },
  chatButton: {
    backgroundColor: '#ff6347',
    padding: 15,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  chatText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default MatchScreen;