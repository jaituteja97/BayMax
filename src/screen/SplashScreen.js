
import { View, Text, StyleSheet, Animated, Image } from 'react-native'
import React from 'react'
import { Colors, Fonts, lightColors } from '../utils/Constant'
import { screenHeight, screenWidth } from '../utils/Scaling'
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../components/global/CustomText';
import LottieView from 'lottie-react-native';


const bottomColor  = [...lightColors].reverse();

const SplashScreen = () => {
  return (
    <View style={style.container}>
      <Animated.View style={style.imageContainer}>
        <Image source={require('../assets/images/launch.png')} style={style.img}></Image>
      </Animated.View>

     <Animated.View style={style.gradianContainer}>
        <LinearGradient colors={bottomColor} style={style.gradiant}>
            <View style = {style.textContainer}>
                <CustomText fontSize={34} fontFamily={Fonts.Theme}>BayMax!</CustomText>  
                <LottieView  autoPlay= {true} loop source={require('../assets/animations/sync.json')} style = {{height: 100,width : 280}}></LottieView>
                <CustomText fontFamily= {Fonts.Medium}>Synchorinizing best configuration for you .....</CustomText>  
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
    paddingTop :20,
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
  textContainer : {
      backgroundColor : "#ffff",
      width : "100%",
      flex : 1,
      alignItems : "center",
      justifyContent : "center",
      borderRadius : 20,
      padding : 20,
      shadowOffset : {width : 1,height : 1},
      shadowOpacity : 1,
      shadowRadius : 2,
      shadowColor : Colors.border,
  }

})

export default SplashScreen