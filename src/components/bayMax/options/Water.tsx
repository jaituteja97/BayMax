import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React from 'react'
import { circleRadius } from '../../../utils/Constant'
import Icon from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize'
import { useWaterStore } from '../../../state/WaterSlice'
import Tts from 'react-native-tts'

const Water = () => {
  const { waterDrinkStamps, addWater } = useWaterStore()

  const totalSegment = 8
  const completedSegment = waterDrinkStamps.length

  const radius = circleRadius / 2 - 6
  const angleStep = 360 / totalSegment

  const handlePress = () => {
    if(completedSegment <totalSegment)
    {
      addWater()
    }
    else
    {
       Tts.speak("You have completed your daily water intake")
    }
  }

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      {/* Segments */}
      {Array.from({ length: totalSegment }).map((_, index) => {
        const rotate = `${index * angleStep}deg`
        const isFilled = index < completedSegment

        return (
          <View
            key={index}
            style={[
              styles.segment,
              {
                backgroundColor: isFilled ? '#00D100' : '#e0e0e0',
                transform: [
                  { rotate },
                  { translateY: -radius }
                ]
              }
            ]}
          />
        )
      })}

      {/* Center Icon */}
      <Icon name="water" size={RFValue(32)} color="#1ca3ec" />
    </TouchableOpacity>
  )
}

export default Water


const styles = StyleSheet.create({
  container: {
    height: circleRadius,
    width: circleRadius,
    borderRadius: circleRadius,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },

  segment: {
    position: 'absolute',
    width: 4,
    height: 10,
    borderRadius: 6,
  },
})
