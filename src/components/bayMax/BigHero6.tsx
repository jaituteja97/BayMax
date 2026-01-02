import { View, Text, StyleSheet, Animated, SafeAreaView } from 'react-native'
import React, { FC, useEffect, useRef } from 'react'
import { screenWidth, screenHeight } from '../../utils/Scaling'
import { bigHero6Data } from '../../utils/data'
import Water from './options/Water'
import Options from './options/Options'

const ITEM_SIZE = 48
const RADIUS = screenWidth * 0.3

const BigHero6: FC<{ onPress: (type: string) => void }> = ({ onPress }) => {
  const animatedValues = useRef(
    [...Array(6)].map(() => new Animated.Value(0))
  ).current

  useEffect(() => {
    Animated.stagger(
      120,
      animatedValues.map(value =>
        Animated.timing(value, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        })
      )
    ).start()
  }, [])

  return (
   <View style={styles.container}>
        {bigHero6Data.slice(0, 6).map((item, index) => {
          const angle = (index / 6) * Math.PI * 2

          const x = RADIUS * Math.cos(angle)
          const y = RADIUS * Math.sin(angle)

          const translateX = animatedValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0, x],
          })

          const translateY = animatedValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0, y],
          })

          return (
            <Animated.View
              key={index}
              style={[
                styles.item,
                {
                  transform: [
                    { translateX },
                    { translateY },
                  ],
                },
              ]}
            >
              {item == "water" && <View><Water></Water></View>}
             {item != "water" && <Options item={item} onPress={onPress}></Options>}
           
            </Animated.View>
          )
        })}
      </View>
  )
}

export default BigHero6

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  item: {
    position: 'absolute',
    // width: ITEM_SIZE,
    // height: ITEM_SIZE,
    // borderRadius: ITEM_SIZE / 2,
    // backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: '#fff',
    fontWeight: '600',
  },
})
