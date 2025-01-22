// UserDetailScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the types for the navigation and route params
type RootStackParamList = {
  Home: undefined;
  UserDetail: { name: string; hobby: string; image: string };
};

type UserDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UserDetail'>;
type UserDetailScreenRouteProp = RouteProp<RootStackParamList, 'UserDetail'>;

interface UserDetailScreenProps {
  navigation: UserDetailScreenNavigationProp;
  route: UserDetailScreenRouteProp;
}

const UserDetailScreen: React.FC<UserDetailScreenProps> = ({ route }) => {
  const { name, hobby, image } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.profileImage} />
      <View style={styles.bioContainer}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.hobbyText}>{hobby}</Text>
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
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  bioContainer: {
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
});

export default UserDetailScreen;