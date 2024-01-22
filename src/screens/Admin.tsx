// AdminScreen.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';

const AdminScreen: React.FC = ({navigation}:any) => {

  const handleNavigateToPage1 = () => {
    navigation.navigate('HomeScreen');
  };

  const handleNavigateToPage2 = () => {
    navigation.navigate('Login');
  };

  const handleNavigateToPage3 = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to Admin Screen</Text>
      <View style={{ marginTop: 20 }}>
        <Button title="Go to Page 1" onPress={handleNavigateToPage1} />
      </View>
      <View style={{ marginTop: 10 }}>
        <Button title="Go to Page 2" onPress={handleNavigateToPage2} />
      </View>
      <View style={{ marginTop: 10 }}>
        <Button title="Go to Page 3" onPress={handleNavigateToPage3} />
      </View>
    </View>
  );
};

export default AdminScreen;
