import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnBoardScreen from './src/screens/OnBoardScreen';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import SignUpForm from './src/screens/SignUp';
import Login from './src/screens/Login';
import AdminScreen from './src/screens/Admin';
import ReservationScreen from './src/screens/ReservationScreen';


const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='HomeScreen'>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUpForm} />
        <Stack.Screen name="Admin" component={AdminScreen} />
        <Stack.Screen name="ReservationScreen" component={ReservationScreen} />
        <Stack.Screen name="OnBoardScreen" component={OnBoardScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
