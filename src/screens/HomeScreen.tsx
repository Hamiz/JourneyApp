import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/color';



const { width } = Dimensions.get('screen');

interface Trip {
  id: number;
  name: string;
  cname: string;
  image: string;
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
      const response = await fetch('http://192.168.0.106:3000/trips');

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);

      setTrips(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      // Handle error
    }
  };



  const categoryIcons = [
    <Image source={require('./icons/plane.png')} style={{ width: 25, height: 25, }} />,
    <Image source={require('./icons/uumbrella.webp')} style={{ width: 35, height: 35, }} />,
    <Image source={require('./icons/arrow.jpg')} style={{ width: 25, height: 25, }} />,
    <Image source={require('./icons/location.png')} style={{ width: 25, height: 25, }} />,
  ];
  const ListCategories = () => {
    return (
      <View style={style.categoryContainer}>
        {categoryIcons.map((icon, index) => (
          <View key={index} style={style.iconContainer}>
            {icon}
          </View>
        ))}
      </View>
    );
  };

  const renderItem1 = ({ item }: { item: Trip }) => {


    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('DetailsScreen', item)}>
        <ImageBackground style={style.cardImage} source={require('../assets/location1.jpg')}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 10,
            }}>
            {item.name}
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="item" size={20} color={COLORS.white} />
              <Text style={{ marginLeft: 5, color: COLORS.white }}>
                {item.cname}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="star" size={20} color={COLORS.white} />
              <Text style={{ marginLeft: 5, color: COLORS.white }}>{item.price}</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const renderItem2 = ({ item }: { item: Trip }) => {

    return (
      <ImageBackground style={style.rmCardImage} source={require('../assets/location1.jpg')}>
        <Text
          style={{
            color: COLORS.white,
            fontSize: 22,
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          {item.name}
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              {/* <Icon name="item" size={22} color={COLORS.white} /> */}
              <Text style={{ color: COLORS.white, marginLeft: 5 }}>
                {item.cname}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              {/* <Icon name="star" size={22} color={COLORS.white} /> */}
              <Text style={{ color: COLORS.white, marginLeft: 5 }}>{item.price}</Text>
            </View>
          </View>
          <Text style={{ color: COLORS.white, fontSize: 13 }}>
            {item.about}
          </Text>
        </View>
      </ImageBackground>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar translucent={false} backgroundColor={COLORS.primary} />
      <View style={style.header}>
        {/* <Icon name="sort" size={28} color={COLORS.white} /> */}
        {/* <Icon name="notifications-none" size={28} color={COLORS.white} /> */}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: COLORS.primary,
            height: 120,
            paddingHorizontal: 20,
          }}>
          <View style={{ flex: 1 }}>
            <Text style={style.headerTitle}>Welcome !</Text>
            <Text style={style.headerTitle}></Text>
            <View>
              <Text>
                <Text style={style.headerTitle}>Explore the</Text>
                <Text style={style.headerTitle}>beautiful places</Text>
              </Text>
            </View>
          </View>
        </View>
        <ListCategories />
        <Text style={style.sectionTitle}>Places</Text>
        <View>
          <FlatList
            contentContainerStyle={{ paddingLeft: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={trips}
            renderItem={renderItem1}
          />
          <Text style={style.sectionTitle}>Recommended</Text>
          <FlatList
            snapToInterval={width - 20}
            contentContainerStyle={{ paddingLeft: 20, paddingBottom: 20 }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={trips}
            renderItem={renderItem2}
          />
          <Text style={style.sectionTitle}>More New Places to Visit!</Text>
          <FlatList
            contentContainerStyle={{ paddingLeft: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={trips}
            renderItem={renderItem1}
          />
          <Text style={style.sectionTitle}></Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 23,
  },
  inputContainer: {
    height: 60,
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    position: 'absolute',
    top: 90,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 12,
  },
  categoryContainer: {
    marginTop: 60,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black'
  },
  cardImage: {
    height: 220,
    width: width / 2,
    marginRight: 20,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,
  },
  rmCardImage: {
    width: width - 40,
    height: 200,
    marginRight: 20,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
  },
});
export default HomeScreen;
