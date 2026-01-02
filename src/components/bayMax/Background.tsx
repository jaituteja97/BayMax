import { View, Text, StyleSheet, Image, Animated } from 'react-native'
import React, { FC } from 'react'
import { screenHeight, screenWidth } from '../../utils/Scaling'

import { BlurView } from '@react-native-community/blur'


const Background :FC<{blurOpacity : any}> = ({blurOpacity}) => {
  return (
    <View style = {style.container}>
        <Image style = {style.image} source={(require('../../assets/images/baymax.png'))}></Image>
        <Animated.View style = {[style.imageBlur,{opacity : blurOpacity}]}> 
        <BlurView blurType='ultraThinMaterial' blurAmount={2} style = {style.imageBlur}>
            
        </BlurView>
        </Animated.View>
    </View>
  )
}

export default Background

const style = StyleSheet.create({
    container : {
        flex : 1,
        width : screenWidth,
        height : screenHeight * 1.2,
        position : "absolute",
        zIndex : 1,
        

    },
    image: {
        width : "100%",
        height : "100%",
        resizeMode : "cover",
        bottom : -screenHeight * 0.2,
    },
    imageBlur : {
           position : "absolute",
           top : 0,
           left : 0,
           bottom : 0,
           right : 0,
           height : "100%" 
    },


})