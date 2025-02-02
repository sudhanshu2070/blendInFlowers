import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../utils/types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>; // Typing the navigation prop

const HomeScreen: React.FC = () => {

  const navigation = useNavigation<HomeScreenNavigationProp>(); // Typed navigation hook
  // Define the mock bio data for now
  const bioData = {
    name: 'John Doe',
    hobby: 'Loves to code and create awesome apps!',
  };

    const profiles = [
      { name: 'John Doe', hobby: 'Loves to code and create awesome apps la la la la la la ala ala alala al ala la al aala la ala al aal al a!', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
      { name: 'Jane Smith', hobby: 'Enjoys hiking and photography.', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
      { name: 'Mark Johnson', hobby: 'Passionate about graphic design and digital art.', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
      { name: 'Emily Davis', hobby: 'Cooking and exploring new cuisines.', image: 'https://randomuser.me/api/portraits/women/4.jpg' },
      { name: 'Michael Brown', hobby: 'Guitar playing and music production.', image: 'https://randomuser.me/api/portraits/men/5.jpg' },
      { name: 'Sarah Wilson', hobby: 'Yoga and mindfulness meditation.', image: 'https://randomuser.me/api/portraits/women/6.jpg' },
      { name: 'David Martinez', hobby: 'Loves traveling and exploring new cultures.', image: 'https://randomuser.me/api/portraits/men/7.jpg' },
      { name: 'Olivia Garcia', hobby: 'Reading novels and poetry writing.', image: 'https://randomuser.me/api/portraits/women/8.jpg' },
      { name: 'James Lee', hobby: 'Fitness and bodybuilding enthusiast.', image: 'https://randomuser.me/api/portraits/men/9.jpg' },
      { name: 'Sophia Anderson', hobby: 'Painting and home decor.', image: 'https://randomuser.me/api/portraits/women/10.jpg' },
      { name: 'Matthew Harris', hobby: 'Technology and gadgets lover.', image: 'https://randomuser.me/api/portraits/men/11.jpg' },
      { name: 'Isabella Clark', hobby: 'Running and volunteer work.', image: 'https://randomuser.me/api/portraits/women/12.jpg' },
      { name: 'Lucas Walker', hobby: 'Gaming and coding.', image: 'https://randomuser.me/api/portraits/men/13.jpg' },
      { name: 'Charlotte Allen', hobby: 'Dancing and fashion design.', image: 'https://randomuser.me/api/portraits/women/14.jpg' },
      { name: 'Daniel Young', hobby: 'Football and sports coaching.', image: 'https://randomuser.me/api/portraits/men/15.jpg' },
      { name: 'Mia King', hobby: 'Photography and nature walks.', image: 'https://randomuser.me/api/portraits/women/16.jpg' },
      { name: 'Ethan Scott', hobby: 'Cycling and environmental sustainability.', image: 'https://randomuser.me/api/portraits/men/17.jpg' },
      { name: 'Amelia Green', hobby: 'Gardening and DIY crafts.', image: 'https://randomuser.me/api/portraits/women/18.jpg' },
      { name: 'Aiden Adams', hobby: 'Reading and writing stories.', image: 'https://randomuser.me/api/portraits/men/19.jpg' },
      { name: 'Harper Nelson', hobby: 'Swimming and environmental awareness.', image: 'https://randomuser.me/api/portraits/women/20.jpg' },
      { name: 'Sebastian Carter', hobby: 'Skiing and extreme sports.', image: 'https://randomuser.me/api/portraits/men/21.jpg' },
      { name: 'Evelyn Rodriguez', hobby: 'Cooking and exploring new cuisines.', image: 'https://randomuser.me/api/portraits/women/22.jpg' },
      { name: 'Benjamin Perez', hobby: 'Football and community work.', image: 'https://randomuser.me/api/portraits/men/23.jpg' },
      { name: 'Chloe Martinez', hobby: 'Running and marathon training.', image: 'https://randomuser.me/api/portraits/women/24.jpg' },
      { name: 'Jackson Lee', hobby: 'Baking and creating new recipes.', image: 'https://randomuser.me/api/portraits/men/25.jpg' },
    ];
  
  const [liked, setLiked] = useState(false);
  const cardAnim = new Animated.Value(0); // For card swipe animation
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLike = () => {
    setLiked(true);
    // Add more animation effects or transition to next card
    Animated.spring(cardAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start(() => {
      // Move to the next profile after animation ends
      setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length); // Loop back to start
      cardAnim.setValue(0); // Reset the animation for the next card
    });
  };

  const handleDislike = () => {
    // Similar action to dislike
    setLiked(false);
    Animated.spring(cardAnim, {
      toValue: -1,
      friction: 3,
      useNativeDriver: true,
    }).start(() => {
      // Move to the next profile after animation ends
      setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length); // Loop back to start
      cardAnim.setValue(0); // Reset the animation for the next card
    });
  };

  const currentProfile = profiles[currentIndex];

  const goToUserDetail = (profile: { name: string; hobby: string; image: string }) => {
    navigation.navigate('UserDetail', {
      name: profile.name,
      hobby: profile.hobby,
      image: profile.image,
    });
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
                  inputRange: [-1, 0, 1],
                  outputRange: [-50, 0, 50], // Swipe out and in the cards
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity onPress={() => goToUserDetail(currentProfile)}>
        {/* Profile Picture */}
        <Image source={{ uri: currentProfile.image }} style={styles.profileImage} />
        </TouchableOpacity>

        {/* Profile Bio */}
        <View style={styles.bioContainer}>
          <Text style={styles.nameText}>{currentProfile.name}</Text>
          <Text style={styles.hobbyText}>{currentProfile.hobby}</Text>
        </View>
      </Animated.View>

      {/* Buttons below the card */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#ff6347' }]} onPress={handleDislike}>
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
    height: '90%', // Profile card takes 80% of the height
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
    fontFamily: 'Comico-Regular',  
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