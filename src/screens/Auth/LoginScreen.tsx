import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library
import { RootStackParamList } from '../../utils/types';
import { encryptText } from '../../utils/encrypt'; 

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to track password visibility
  const navigation = useNavigation<LoginScreenNavigationProp>(); 

  const checkEmailChange = (text: string) => {
    const encryptedText = encryptText(text);
    setEmail(encryptedText);
  };

  const handleLogin = () => {
    setLoading(true);

    // Simulate login process with a delay
    setTimeout(() => {
      
      //Admin access(since "S" is replaced with "*")
      if (email === '*'){
        setLoading(false);
        navigation.navigate('Home');
      }
      else if ((email === 'hot@mail' || email === 's') && (password === 'pass' || password === '1')) {
        setLoading(false);
        // Navigate to Home screen if credentials match
        navigation.navigate('Home');
      } 
      else {
        setLoading(false);
        alert('Invalid email or password');
      }
    }, 2000);
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Welcome Back!</Text>
    <TextInput
      style={styles.input}
      placeholder="Email"
      value={email}
      onChangeText={checkEmailChange}
      keyboardType="email-address"
    />
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
    
    <TouchableOpacity
      style={styles.button}
      onPress={handleLogin}
      disabled={loading}
    >
      <Text style={styles.buttonText}>
        {loading ? 'Logging in...' : 'Login'}
      </Text>
    </TouchableOpacity>

    <Text style={styles.registerText}>
      Don't have an account? 
      <TouchableOpacity onPress={handleRegisterPress}>
        <Text style={styles.registerLink}> Register</Text>
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  registerLink: {
    color: 'blue',  
    top:7,
  },
  registerText: {
    color: '#ff6347',
    fontSize: 16,
    textAlign: 'center',
    marginTop:10,
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