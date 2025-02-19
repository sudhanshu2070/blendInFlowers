import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Dimensions, Easing } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../utils/types';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

type UserDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UserDetail'>;
type UserDetailScreenRouteProp = RouteProp<RootStackParamList, 'UserDetail'>;

interface UserDetailScreenProps {
  navigation: UserDetailScreenNavigationProp;
  route: UserDetailScreenRouteProp;
}

const UserDetailScreen: React.FC<UserDetailScreenProps> = ({ route }) => {
 
  const navigation = useNavigation<UserDetailScreenNavigationProp>(); // Initialize navigation

  // Access route params (name, hobby, image)
  const { name, hobby, image } = route.params;

  // State to track heart count
  const [heartCount, setHeartCount] = useState(0);

  // State to control the visibility of the heart
  const [heartVisible, setHeartVisible] = useState(false);

  // Animated value for heart animation
  const heartAnim = useRef(new Animated.Value(0)).current;

  // State to handle the double-tap detection
  const lastTap = useRef(Date.now());

  // Function to handle double tap
  const handleDoubleTap = () => {

    const now = Date.now();
    const timeDifference = now - lastTap.current;

    if (timeDifference < 300) { // 300ms threshold for double tap

      setHeartCount((prev) => prev + 1);

      // Show the heart and animate it
      setHeartVisible(true);

      Animated.timing(heartAnim, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
        easing: Easing.elastic(1.5),
      }).start(() => {
        heartAnim.setValue(0);
        
        // setHeartVisible(false);
        setHeartVisible(false);
      });
    }
    // Update last tap time
    lastTap.current = now;
  };

  // Function to navigate to ChatScreen

  const handleMessagePress = () => {
    console.log('Message Pressed');
    navigation.navigate('UserChatScreen'); // Navigate to ChatScreen
  };

  return (
    <View style={styles.container}>

      {/* Profile Image and Bio Section at the Top */}
      <View style={styles.topContainer}>
        <Image source={{ uri: image }} style={styles.profileImage} />
      </View>

      <View style={styles.bioContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.nameText}>{name}</Text>

          <View style={styles.heartAndMessageContainer}>

          {/* Message Icon */}
          <TouchableOpacity 
            onPress={handleMessagePress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // Increase touchable area
            style={{ backgroundColor: 'rgba(255, 0, 0, 0.3)', padding: 10 }} // Temporary background color
>
          <Icon name="comment" size={50} color="#333" style={styles.messageIcon} />
          </TouchableOpacity>
          {/* Heart Count */}
          <Text style={styles.heartCountText}>&hearts;: {heartCount}</Text>
          </View>

        </View>
        <View style={styles.hobbyContainer}>
          <Text style={styles.hobbyText}>{hobby}</Text>
          <TouchableOpacity onPress={handleDoubleTap} style={styles.tapArea} />
        </View>
          {heartVisible && (
            <Animated.View
              style={[
                styles.heartIcon,
                {
                  opacity: heartAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }),

                  transform: [
                    { scale: heartAnim.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1.5] }) },
                    { translateY: heartAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -50] }) },
                  ],
                },
              ]}
            >
              <Icon name="heart" size={48} color="red" />
            </Animated.View>
          )}
      </View>

      {/* Handle double tap anywhere on the screen (Below bio) */}
      {/* <TouchableOpacity onPress={handleDoubleTap} style={styles.tapArea} /> */}
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
    justifyContent: 'center',
    width: '100%',
    height: '20%', 
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20, // Space between image and bio
  },
  bioContainer: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    width: '97%',
    height: '79%', 
    position: 'relative',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  nameText: {
    fontSize: 24,
    // fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Stardom-Regular', 
    // fontFamily: 'Comico-Regular', 
  },
  
  heartAndMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageIcon: {
    marginRight: 10, // Space between the message icon and heart count
    zIndex: 1, // Bring the icon to the front
  },
  heartCountText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  hobbyContainer: {
    flex: 1,
    position: 'relative',
  },
  hobbyText: {
    color: '#555',
    fontSize: 18,
    fontFamily: 'Playwrite',
    textAlign: 'left',
    marginBottom: 10,
  },
  heartIcon: {
    position: 'absolute',
    top: '50%', // Center vertically
    left: '50%', // Center horizontally
    transform: [{ translateX: -24 }, { translateY: -24 }], 
  },
  tapArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0, // Ensure it stays behind other components
  },
});

export default UserDetailScreen;