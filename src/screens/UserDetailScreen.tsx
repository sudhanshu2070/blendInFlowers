import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, Animated } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../utils/types';

type UserDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UserDetail'>;
type UserDetailScreenRouteProp = RouteProp<RootStackParamList, 'UserDetail'>;

interface UserDetailScreenProps {
  navigation: UserDetailScreenNavigationProp;
  route: UserDetailScreenRouteProp;
}

const UserDetailScreen: React.FC<UserDetailScreenProps> = ({ route }) => {
  // Access route params (name, hobby, image)
  const { name, hobby, image } = route.params;

  // State to track heart count
  const [heartCount, setHeartCount] = useState(0);

  // Animated value for heart animation
  const heartAnimation = new Animated.Value(0);

  // Function to handle double tap
  const handleDoubleTap = () => {
    // Increase heart count
    setHeartCount(prev => prev + 1);

    // Trigger heart animation
    Animated.sequence([
      Animated.spring(heartAnimation, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.spring(heartAnimation, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Interpolating scale for the heart animation
  const heartScale = heartAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5],
  });

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleDoubleTap}>
        <View style={styles.tapArea}>
          {/* Heart animation */}
          <Animated.View style={[styles.heartIcon, { transform: [{ scale: heartScale }] }]}>
            <Text style={styles.heartText}>❤️</Text>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>

      <Image source={{ uri: image }} style={styles.profileImage} />
      <View style={styles.bioContainer}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.hobbyText}>{hobby}</Text>
        <Text style={styles.heartCountText}>Hearts: {heartCount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 20,
    marginBottom: 15,
  },
  bioContainer: {
    width: 475,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  hobbyText: {
    fontSize: 18,
    color: '#555',
    marginTop: 10,
  },
  heartCountText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  heartText: {
    fontSize: 48,
    color: 'red',
  },
  heartIcon: {
    position: 'absolute',
    bottom: 150, // Adjust the position based on your design
    right: '40%',
  },
  tapArea: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserDetailScreen;