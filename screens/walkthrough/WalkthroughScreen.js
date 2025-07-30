import React, { use, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';


const WalkthroughScreen = () => {
  const swiperRef = useRef(null);
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
    const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
 const imageStyle = {
    width: width * 0.6,
    height: isLandscape ? height * 0.4 : height * 0.6,
    resizeMode: 'contain',
    marginBottom: isLandscape ? 10 : -30,
  };

  const slides = [
    {
      title: 'Welcome to Foodie',
      text: 'Discover delicious meals and top-rated restaurants near you.',
      image: require('/Users/iemac/ReactNative/SignUpDemo/assets/images/walkthroughImages/FirstWalkthroughImage.png'),
    },
    {
      title: 'Explore Menus & Deals',
      text: 'Browse menus, find exclusive deals, and order in just a few taps.',
      image: require('/Users/iemac/ReactNative/SignUpDemo/assets/images/walkthroughImages/SecondWalkthroughImage.png'),
    },
    {
      title: 'Order & Enjoy',
      text: 'Get your favorite food delivered hot and fresh to your doorstep.',
      image: require('/Users/iemac/ReactNative/SignUpDemo/assets/images/walkthroughImages/ThirdWalkthroughImage.png'),
    },
  ];

  const handleNext = () => {
    if (swiperRef.current && currentIndex < slides.length - 1) {
      swiperRef.current.scrollBy(1);
    }
  };

  const handlePrev = () => {
    if (swiperRef.current && currentIndex > 0) {
      swiperRef.current.scrollBy(-1);
    }
  };

  const handleStart = () => {
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        loop={false}
        showsPagination={false} // we'll use custom dots
        onIndexChanged={(index) => setCurrentIndex(index)}
        showsButtons={false}
      >
        {slides.map((slide, index) => (
          <View key={index} style={styles.slide}>
            <Image source={slide.image} style={imageStyle} />
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.text}>{slide.text}</Text>
          </View>
        ))}
      </Swiper>

      {/* Bottom navigation with Prev, Dots, Next/Start */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navButton, currentIndex === 0 && { opacity: 0 }]}
          onPress={handlePrev}
          disabled={currentIndex === 0}
        >
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>

        <View style={styles.paginationWrapper}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index && styles.activeDot,
              ]}
            />
          ))}
        </View>

        {currentIndex === slides.length - 1 ? (
          <TouchableOpacity style={styles.navButton} onPress={handleStart}>
            <Text style={styles.navButtonText}>Start</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.navButton} onPress={handleNext}>
            <Text style={styles.navButtonText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  // image: {
  //   width: width * 0.7,
  //   height: isLandscape ? height * 0.2 : height * 0.4,
  //   resizeMode: 'contain',
  //   marginBottom: 30,
  // },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  navButton: {
    padding: 10,
  },
  navButtonText: {
    fontSize: 16,
    color: '#009688',
    fontWeight: 'bold',
  },
  paginationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginLeft: -20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#009688',
    width: 10,
    height: 10,
  },
});

export default WalkthroughScreen;