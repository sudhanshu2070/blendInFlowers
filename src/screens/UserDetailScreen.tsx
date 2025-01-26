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

  // State and animated values for heart animation
  const [hearts, setHearts] = useState<any[]>([]);
  const [count, setCount] = useState(0);

  // Function to handle double tap
  const handleDoubleTap = (e: any) => {
    // Increase heart count
    setHeartCount(prev => prev + 1);

    // Calculate the position of the heart where the user double tapped
    const { pageX, pageY } = e.nativeEvent;

    // Create an animated heart that will be positioned where the tap occurred
    const newHeart = {
      id: count,
      left: pageX - 30,  // Adjust to center the heart icon
      top: pageY - 30,   // Adjust to center the heart icon
      opacity: new Animated.Value(1),
    };

    // Add the new heart to the array
    setHearts((prev) => [...prev, newHeart]);

    // Start the fade-out animation for the heart
    Animated.timing(newHeart.opacity, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      // Remove heart from the screen after animation
      setHearts((prev) => prev.filter((heart) => heart.id !== newHeart.id));
    });

    // Update count for unique heart ids
    setCount(count + 1);
  };

  return (
    <View style={styles.container}>
      {/* Profile Image and Bio Section at the Top */}
      <View style={styles.topContainer}>
        <Image source={{ uri: image }} style={styles.profileImage} />
        <View style={styles.bioContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.hobbyText}>{hobby}</Text>
          <Text style={styles.heartCountText}>Hearts: {heartCount}</Text>
        </View>
      </View>

      {/* Handle double tap anywhere on the screen (Below bio) */}
      <TouchableWithoutFeedback onPress={handleDoubleTap}>
        <View style={styles.tapArea}>
          {/* Render animated hearts inside this area */}
          {hearts.map((heart) => (
            <Animated.View
              key={heart.id}
              style={[
                styles.heartIcon,
                { left: heart.left, top: heart.top, opacity: heart.opacity },
              ]}
            >
              <Text style={styles.heartText}>❤️</Text>
            </Animated.View>
          ))}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop: 20, // Space for the status bar
  },
  topContainer: {
    alignItems: 'center',
    marginBottom: 20,  // Space between top container and heart animation area
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10, // Space between image and bio
  },
  bioContainer: {
    alignItems: 'center',
    padding: 15,
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
    transform: [{ scale: 1.5 }], // Slight scale effect for the heart icon
  },
  tapArea: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserDetailScreen;