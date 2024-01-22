import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import COLORS from '../consts/color';

const ReservationScreen = ({ route, navigation }: any) => {
  const place = route.params;
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleReservation = async () => {
    // Basic form validation
    if (!fullName || !email || !phone) {
      Alert.alert('Validation Error', 'Please fill in all fields');
      return;
    }

    try {
      // Make a POST request to the server for reservation
      const response = await fetch('http://192.168.0.106/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
        }),
      });

      const result = await response.json();

      // Check if the reservation was successful
      if (response.ok) {
        console.log('Reservation details:', {
          place,
          fullName,
          email,
          phone,
        });
        Alert.alert('Reservation Success', 'Your reservation was successful!');
        // Add further navigation logic or other actions as needed
        navigation.goBack(); // Navigate back to the details screen or any other screen
      } else {
        console.error('Error during reservation:', result.error);
        Alert.alert('Reservation Error', 'There was an error during reservation. Please try again.');
      }
    } catch (error) {
      console.error('Error during reservation:', error);
      Alert.alert('Network Error', 'Unable to connect to the server. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Reservation Form</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={text => setFullName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={text => setPhone(text)}
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.bookNowBtn} onPress={handleReservation}>
        <Text style={styles.btnText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    height: 50,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  bookNowBtn: {
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReservationScreen;
