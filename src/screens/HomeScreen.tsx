import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';

const HomeScreen = () => {
  const [liked, setLiked] = useState(false);
  const cardAnim = new Animated.Value(0); // For card swipe animation

  const handleLike = () => {
    setLiked(true);
    // Add more animation effects or transition to next card
    Animated.spring(cardAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* Animated Profile Card */}
      <Animated.View
        style={[
          styles.card,
          {
            transform: [
              {
                translateX: cardAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 300],
                }),
              },
            ],
          },
        ]}
      >
        {/* Profile Picture */}
        <Image
          source={{ uri: 'https://via.placeholder.com/320x400' }} // Placeholder image for profile picture
          style={styles.profileImage}
        />
        {/* Profile Bio */}
        <View style={styles.bioContainer}>
          <Text style={styles.bioText}>This is the bio</Text>
        </View>
      </Animated.View>

      {/* Buttons below the card */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#ff6347' }]}>
          <Text style={styles.buttonText}>Dislike</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#34b7f1' }]} onPress={handleLike}>
          <Text style={styles.buttonText}>Like</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: '100%',
    height: '80%', // Profile card takes 80% of the height
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    marginBottom: 30,
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    resizeMode: 'cover', // Ensures the image fits properly within the card
  },
  bioContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for bio
    padding: 10,
    borderRadius: 8,
  },
  bioText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  button: {
    width: '45%',
    padding: 15,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default HomeScreen;