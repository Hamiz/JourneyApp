import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnBoardScreen from './src/screens/OnBoardScreen';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import LoginScreen from './src/screens/Login';
import ReservationScreen from './src/screens/Reservation';

// Define the type for the navigation parameters
type RootStackParamList = {
  Login: undefined;
  OnBoardScreen: undefined;
  HomeScreen: undefined;
  DetailsScreen: undefined;
  ReservationScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='HomeScreen'>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="OnBoardScreen" component={OnBoardScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen name="ReservationScreen" component={ReservationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
