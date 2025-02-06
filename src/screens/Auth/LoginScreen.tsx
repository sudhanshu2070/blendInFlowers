import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library
import RNBiometrics from 'react-native-biometrics'; // Import biometrics library
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../utils/types';
import { encryptText } from '../../utils/encrypt';
import { users } from '../../utils/data/users';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [displayEmail, setDisplayEmail] = useState(''); // Display value with encryption
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to track password visibility
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const dispatch = useDispatch();

  const handleTextChange = (text: string) => {
    setEmail(text); // Update the actual email value
    const displayText = encryptText(text); // Encrypting the email
    setDisplayEmail(displayText); // Update the display value
  };

  const handleLogin = async () => {
    setLoading(true);

    // Simulate login process with a delay
    setTimeout(async () => {
      // Find the user with matching email and password
      const matchedUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (matchedUser) {
        setLoading(false);
        await AsyncStorage.setItem('userId', matchedUser._id);
        dispatch(login({ userId: matchedUser._id, profileData: matchedUser }));
        navigation.navigate('Home'); // Navigate to Home screen
      } else {
        setLoading(false);
        Alert.alert('Invalid email or password');
      }
    }, 2000);
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  // Biometric Authentication Handler
  const handleBiometricLogin = async () => {
    try {
      const rnBiometrics = new RNBiometrics();
      const isSensorAvailable = await rnBiometrics.isSensorAvailable();

      if (isSensorAvailable.available) {
        const authResult = await rnBiometrics.simplePrompt({
          promptMessage: 'Authenticate with your fingerprint',
        });

        if (authResult.success) {
          // Fetch the stored userId from AsyncStorage
          const storedUserId = await AsyncStorage.getItem('userId');

          if (storedUserId) {
            const matchedUser = users.find((user) => user._id === storedUserId);

            if (matchedUser) {
              dispatch(login({ userId: matchedUser._id, profileData: matchedUser }));
              navigation.navigate('Home'); // Navigate to Home screen
            } else {
              Alert.alert('No user found for biometric login.');
            }
          } else {
            Alert.alert('No user logged in previously.');
          }
        } else {
          Alert.alert('Biometric authentication failed.');
        }
      } else {
        Alert.alert('Biometric authentication is not available on this device.');
      }
    } catch (error) {
      console.error('Error during biometric authentication:', error);
      Alert.alert('An error occurred during biometric authentication.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={displayEmail}
        onChangeText={handleTextChange}
        keyboardType="email-address"
      />

      {/* Password Input */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible} // If isPasswordVisible is true, the password is visible
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)} // Toggle password visibility
        >
          <Icon name={isPasswordVisible ? 'eye-slash' : 'eye'} size={20} color="#aaa" />
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>

      {/* Biometric Login Button */}
      <TouchableOpacity
        style={[styles.button, styles.biometricButton]}
        onPress={handleBiometricLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Login with Fingerprint</Text>
      </TouchableOpacity>

      {/* Register Link */}
      <Text style={styles.registerText}>
        Don't have an account?{' '}
        <TouchableOpacity onPress={handleRegisterPress}>
          <Text style={styles.registerLink}>Register</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#ff6347',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    marginBottom: 10,
  },
  biometricButton: {
    backgroundColor: '#B6FFFA', // color for biometric login
  },
  buttonText: {
    color: '#191825',
    fontSize: 18,
    fontWeight: '600',
  },
  registerLink: {
    color: 'blue',
    top: 7,
  },
  registerText: {
    color: '#ff6347',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
});

export default LoginScreen;