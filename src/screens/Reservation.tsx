// ReservationScreen.tsx

import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Button, TextInput as PaperInput, useTheme } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const ReservationScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const { colors } = useTheme();

  const handleReservation = () => {
    // Perform actions with reservation data
    console.log('Reservation Details:', { name, email, phone, date, time, guests });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (selectedDate) => {
    hideDatePicker();
    setDate(selectedDate.toISOString().split('T')[0]);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (selectedTime) => {
    hideTimePicker();
    setTime(selectedTime.toLocaleTimeString().split(' ')[0]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.title, { color: colors.primary }]}>Make a Reservation</Text>

      <PaperInput
        label="Your Name"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
      />

      <PaperInput
        label="Your Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        style={styles.input}
      />

      <PaperInput
        label="Your Phone Number"
        value={phone}
        onChangeText={(text) => setPhone(text)}
        keyboardType="phone-pad"
        style={styles.input}
      />

      <Button onPress={showDatePicker} style={styles.input}>
        {date ? `Selected Date: ${date}` : 'Select Date'}
      </Button>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />

      <PaperInput
        label="Time"
        value={time}
        onChangeText={(text) => setTime(text)}
        style={styles.input}
      />
      <Button onPress={showTimePicker} style={styles.input}>
        {time ? `Selected Time: ${time}` : 'Select Time'}
      </Button>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />

      <PaperInput
        label="Number of Guests"
        value={guests}
        onChangeText={(text) => setGuests(text)}
        keyboardType="numeric"
        style={styles.input}
      />

      <Button mode="contained" onPress={handleReservation} style={styles.button}>
        Confirm Reservation
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
    padding: 10,
  },
});

export default ReservationScreen;
