import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/color';


interface Trip {
  place_id: number;
  name: string;
  images: string;
  price: number;
  about: string;
}

const HomeScreen = ({ navigation }: any) => {
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Replace this with your API endpoint or data fetching logic
      const response = await fetch('http:192.168.0.106:3000/trips');
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setTrips(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      // Handle error
    }
  };
  console.log(trips);

  const renderItem = ({ item }: { item: Trip }) => {

    return(

    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('DetailsScreen', item)}>
      <View style={styles.card}>
        <Image source={require('../assets/location1.jpg')} style={styles.cardImage} />
        <View style={styles.cardDetails}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardPrice}>{`$${item.price}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
    )
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={false} backgroundColor={COLORS.primary} />
      <FlatList
        data={trips}
        keyExtractor={(item, index) => (item.place_id ? item.place_id.toString() : index.toString())}

        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.light,
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  cardDetails: {
    marginLeft: 10,
    flex: 1,
    justifyContent: 'center',
    color: 'black'
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'
  },
  cardPrice: {
    fontSize: 16,
    color: 'black',
  },
});

export default HomeScreen;
