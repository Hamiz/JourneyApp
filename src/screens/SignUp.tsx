import React, { useState } from 'react';
import { View, TextInput, Button, Alert, TouchableOpacity, Text } from 'react-native';
import SignUpScreenStyles from './SignUpScreenStyles'

interface SignUpFormProps {}

const SignUpForm: React.FC<SignUpFormProps> = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    // Basic form validation
    if (!username || !email || !password) {
      Alert.alert('Validation Error', 'Please fill in all fields');
      return;
    }
    else if(password != confirmpassword){
      Alert.alert('Password does not match!');
      return;
    }

    try {
      // Make a POST request to the server
      
      const response = await fetch('http://192.168.0.106:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      // Parse the response
      const result = await response.json();

      // Check if the signup was successful
      if (response.ok) {
        console.log('User signed up successfully:', result);
        Alert.alert('Welcome', username)
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        // Handle success, e.g., navigate to the next screen
      } else {
        console.error('Error during signup:', result.error);
        Alert.alert('Signup Error', 'There was an error during signup. Please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      Alert.alert('Network Error', 'Unable to connect to the server. Please try again later.');
    }
  };

  return (
    <View style={SignUpScreenStyles.container}>
      <TextInput
        style={SignUpScreenStyles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={SignUpScreenStyles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={SignUpScreenStyles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={SignUpScreenStyles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmpassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <TouchableOpacity style={SignUpScreenStyles.signUpButton} onPress={handleSignUp}>
        <Text style={SignUpScreenStyles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpForm;