import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Use any icon set you like
import { RootStackParamList } from '../utils/types';

const HomeScreen = () => {
  const navigation = useNavigation();
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

  const navigateTo = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My App!</Text>
      <View style={styles.iconContainer}>
        {/* Add Note Icon */}
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => navigateTo('AddNote')}
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
          onPress={() => navigateTo('Calendar')}
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
          onPress={() => navigateTo('ImageEditor')}
          activeOpacity={0.7}
        >
          <Animated.View style={[styles.iconWrapper, { transform: [{ scale: scaleValue }] }]}>
            <Icon name="image-edit" size={40} color="#FF0266" />
            <Text style={styles.iconText}>Image Editor</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  iconWrapper: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  iconText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
});

export default HomeScreen;