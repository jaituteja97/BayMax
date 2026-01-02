import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'


const Loading = () => {
  return (
    <View>
      <LottieView autoPlay = {true} loop style = {{width : 280,height : 100}} source={require('../../assets/animations/sync.json')}></LottieView>
    </View>
  )
}

export default Loading