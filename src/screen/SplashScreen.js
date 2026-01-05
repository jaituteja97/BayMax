
import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import { Colors, Fonts, lightColors } from '../utils/Constant'
import { screenHeight, screenWidth } from '../utils/Scaling'
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../components/global/CustomText';
import LottieView from 'lottie-react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import Tts from 'react-native-tts';
import { initilizeListner } from '../utils/listners';
import { navigate, resetAndNavigate } from '../utils/NavigationUtils';
import { stopTtsSafely } from '../utils/tt';


const bottomColor = [...lightColors].reverse();

const SplashScreen = () => {

  const bayMaxAnimation = useSharedValue(screenHeight * 0.8)
  const messageContainerAnimation = useSharedValue(screenHeight * 0.8)

const launchAnimation = () => {
  messageContainerAnimation.value = 0;

  setTimeout(() => {
    bayMaxAnimation.value = 0;
    Tts.speak('Hello World! I am Baymax');
  }, 2000);

  setTimeout(() => {
    // 🔴 STOP TTS BEFORE NAVIGATION
    stopTtsSafely();
    resetAndNavigate('BayMaxScreen');
  }, 5000);
};


  const animationsImageStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withTiming(bayMaxAnimation.value, { duration: 1200 }) }]
    }
  })
  const messageContainerAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withTiming(messageContainerAnimation.value, { duration: 1200 }) }]
    }
  })
  useEffect(() => {
    initilizeListner();
    launchAnimation();

    return () => {
      // 🔴 CRITICAL FOR ANDROID
      Tts.stop();
      Tts.shutdown();
    };
  }, []);





  return (
    <View style={style.container}>
      <Animated.View style={[style.imageContainer, animationsImageStyle]}>
        <Image source={require('../assets/images/launch.png')} style={style.img}></Image>
      </Animated.View>

      <Animated.View style={[style.gradianContainer, messageContainerAnimationStyle]}>
        <LinearGradient colors={bottomColor} style={style.gradiant}>
          <View style={style.textContainer}>
            <CustomText fontSize={34} fontFamily={Fonts.Theme}>BayMax!</CustomText>
            <LottieView autoPlay={true} loop source={require('../assets/animations/sync.json')} style={{ height: 100, width: 280 }}></LottieView>
            <CustomText fontFamily={Fonts.Medium}>Synchorinizing best configuration for you .....</CustomText>
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  )
}

const style = StyleSheet.create({

  gradianContainer: {
    height: "35%",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },

  gradiant: {
    paddingTop: 20,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: screenWidth - 20,
    height: screenHeight * 0.5
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  textContainer: {
    backgroundColor: "#ffff",
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 20,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowColor: Colors.border,
  }

})

export default SplashScreen