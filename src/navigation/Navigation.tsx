import { View, Text } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screen/SplashScreen';
import BayMaxScreen from '../screen/BayMaxScreen';
import { navigationRef } from '../utils/NavigationUtils';

const Navigation = () => {

    const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{headerShown : false}}>
        <Stack.Screen name='SplashScreen' component={SplashScreen}></Stack.Screen>
        <Stack.Screen name='BayMaxScreen' component={BayMaxScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation