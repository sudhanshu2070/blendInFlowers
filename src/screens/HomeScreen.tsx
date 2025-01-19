import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';

const HomeScreen = () => {
  // Define the mock bio data for now
  const bioData = {
    name: 'John Doe',
    hobby: 'Loves to code and create awesome apps!',
  };

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
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} // Sample image from RandomUser.me API
          style={styles.profileImage}
        />
        {/* Profile Bio */}
        <View style={styles.bioContainer}>
          <Text style={styles.nameText}>{bioData.name}</Text>
          <Text style={styles.hobbyText}>{bioData.hobby}</Text>
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
    maxWidth: '80%', // Limit the bio text width
  },
  nameText: {
    color: '#FFD700', // Gold color for name
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  hobbyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 20,
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