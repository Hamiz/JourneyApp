import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeTouchEvent,
} from 'react-native';
import COLORS from '../consts/color';

interface OnBoardScreenProps {
  navigation: {
    navigate: (screenName: string) => void;
  };
}

const OnBoardScreen: React.FC<OnBoardScreenProps> = ({ navigation }: OnBoardScreenProps) => {
  const handleGetStartedPress = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground style={{ flex: 1 }} source={require('../assets/onboardImage.jpg')}>
        <View style={styles.details}>
          <Text style={{ color: COLORS.white, fontSize: 35, fontWeight: 'bold' }}>
            Discover
          </Text>
          <Text style={{ color: COLORS.white, fontSize: 35, fontWeight: 'bold' }}>
            world with us
          </Text>
          <Text style={{ color: COLORS.white, lineHeight: 25, marginTop: 15 }}>
            Travel is the only thing you buy that makes you richer.
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleGetStartedPress}>
            <View style={styles.btn}>
              <Text style={{ fontWeight: 'bold', color: 'black' }}>Get Started</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  details: {
    height: '50%',
    bottom: 0,
    position: 'absolute',
    paddingHorizontal: 40,
  },
  btn: {
    height: 50,
    width: 120,
    backgroundColor: COLORS.white,
    marginTop: 20,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OnBoardScreen;
