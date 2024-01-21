import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

interface LoginFormProps {}

const Login: React.FC<LoginFormProps> = ({navigation}:any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    // Basic form validation
    if (!username || !password) {
      Alert.alert('Validation Error', 'Please fill in all fields');
      return;
    }

    try {
      // Make a POST request to the server
      
      const response = await fetch('http://192.168.0.106:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      // Parse the response
      const result = await response.json();

      // Check if the signup was successful
      if (response.ok) {
        console.log('User signed up successfully:', result);
        Alert.alert('Welcome', username);
        navigation.navigate('HomeScreen');
        setUsername('');
        setPassword('');
        // Handle success, e.g., navigate to the next screen
      } else {
        console.error('Error during Login:', result.error);
        Alert.alert('Login Error', 'There was an error during Login. Please try again.');
      }
    } catch (error) {
      console.error('Error during Login:', error);
      Alert.alert('Network Error', 'Unable to connect to the server. Please try again later.');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title='SignUp' onPress={()=> navigation.navigate('SignUp')} />
    </View>
  );
};

export default Login;
