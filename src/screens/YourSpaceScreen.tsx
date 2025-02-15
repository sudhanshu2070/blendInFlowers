import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Use any icon set you like
import { RootStackParamList } from '../utils/types';

const YourSpaceScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const scaleValue = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  // Type-safe navigation function
  const navigateToScreen = (screenName: keyof RootStackParamList) => {
    if (
      screenName === 'NotesScreen' ||
      screenName === 'Calendar' ||
      screenName === 'ImageEditor' ||
      screenName === 'AIChatScreen'
    ) {
      navigation.navigate(screenName);
    } else {
      console.warn(`Navigation to ${screenName} is not allowed.`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {/* Add Note Icon */}
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => navigateToScreen('NotesScreen')}
          activeOpacity={0.7}
        >
          <Animated.View style={[styles.iconWrapper, { transform: [{ scale: scaleValue }] }]}>
            <Icon name="notebook" size={40} color="#6200ee" />
            <Text style={styles.iconText}>Add Note</Text>
          </Animated.View>
        </TouchableOpacity>

        {/* Calendar App Icon */}
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => navigateToScreen('Calendar')}
          activeOpacity={0.7}
        >
          <Animated.View style={[styles.iconWrapper, { transform: [{ scale: scaleValue }] }]}>
            <Icon name="calendar" size={40} color="#03DAC6" />
            <Text style={styles.iconText}>Calendar</Text>
          </Animated.View>
        </TouchableOpacity>

        {/* Image Editor Icon */}
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => navigateToScreen('ImageEditor')}
          activeOpacity={0.7}
        >
          <Animated.View style={[styles.iconWrapper, { transform: [{ scale: scaleValue }] }]}>
            <Icon name="image-edit" size={40} color="#FF0266" />
            <Text style={styles.iconText}>Image Editor</Text>
          </Animated.View>
        </TouchableOpacity>

        {/* AI Chat Bot Icon */}
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => navigateToScreen('AIChatScreen')}
          activeOpacity={0.7}
        >
          <Animated.View style={[styles.iconWrapper, { transform: [{ scale: scaleValue }] }]}>
            <Icon name="robot" size={40} color="#FFC107" />
            <Text style={styles.iconText}>Eazy A</Text>
          </Animated.View>
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
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  iconWrapper: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  iconText: {
    marginTop: 4,
    fontSize: 10,
    color: '#555',
    fontFamily: 'Comico-Regular',
  },
});

export default YourSpaceScreen;