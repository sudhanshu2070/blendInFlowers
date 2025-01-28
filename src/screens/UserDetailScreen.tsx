import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Dimensions, Easing } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../utils/types';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

type UserDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UserDetail'>;
type UserDetailScreenRouteProp = RouteProp<RootStackParamList, 'UserDetail'>;

interface UserDetailScreenProps {
  navigation: UserDetailScreenNavigationProp;
  route: UserDetailScreenRouteProp;
}
// Get the screen dimensions to place the heart in the center
const { width, height } = Dimensions.get('window');

const UserDetailScreen: React.FC<UserDetailScreenProps> = ({ route }) => {
  // Access route params (name, hobby, image)
  const { name, hobby, image } = route.params;

  // State to track heart count
  const [heartCount, setHeartCount] = useState(0);

  // Animated value for heart animation
  const heartAnim = useRef(new Animated.Value(0)).current;


  // Function to handle double tap
  const handleDoubleTap = () => {
    setHeartCount((prev) => prev + 1);
    Animated.timing(heartAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.elastic(1.5),
    }).start(() => {
      heartAnim.setValue(0);
    });
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
      <TouchableOpacity onPress={handleDoubleTap} style={styles.tapArea}>
        <Animated.View
          style={[
            styles.heartIcon,
            {
              transform: [
                { scale: heartAnim.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1.5] }) },
                { translateY: heartAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -50] }) },
              ],
            },
          ]}
        >
          <Icon name="heart" size={48} color="red" />
        </Animated.View>
      </TouchableOpacity>
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
    marginBottom: 20, // Space between top container and heart animation area
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
    width: 490,
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
  heartIcon: {
    position: 'absolute',
    top: height / 2 - 30,
    left: width / 2 - 30,
    opacity: 0.8,
  },
  tapArea: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserDetailScreen;