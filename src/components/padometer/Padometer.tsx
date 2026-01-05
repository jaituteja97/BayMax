import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { FC } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import Icon from 'react-native-vector-icons/Ionicons'
import { usePedometerStore } from '../../state/PadoMeterStorage'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

const Padometer: FC<{ onCross: () => void }> = ({ onCross }) => {
  const { stepCount, dailyGoal } = usePedometerStore()

  const progress =
    dailyGoal > 0 ? Math.min(stepCount / dailyGoal, 1) : 0
  const progressPercent = Math.round(progress * 100)

  return (
    <View style={style.container}>
      {/* Close button */}
      <TouchableOpacity style={style.cross} onPress={onCross}>
        <Icon name="close-circle" color="red" size={RFValue(22)} />
      </TouchableOpacity>

      {/* Logo */}
      <Image
        style={style.logo}
        source={require('../../assets/images/logo_short.png')}
      />

      {/* Circular Progress */}
      <AnimatedCircularProgress
        size={220}
        width={18}
        fill={progressPercent}
        tintColor="#A7B3C8"
        backgroundColor="#EEF1F6"
        rotation={0}
        lineCap="round"
      >
        {() => (
          <View style={style.centerContent}>
            <Text style={style.stepCount}>
              {stepCount}/{dailyGoal}
            </Text>
            <Text style={style.stepsLabel}>Steps</Text>
          </View>
        )}
      </AnimatedCircularProgress>

      {/* Helper text */}
      <Text style={style.helperText}>
        Start walking, counter will update automatically.
      </Text>
    </View>
  )
}


const style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 24,
    alignItems: 'center',
    width: '90%',
    borderRadius: 14,
    elevation: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
  },

  cross: {
    position: 'absolute',
    right: 12,
    top: 12,
  },

  logo: {
    width: 36,
    height: 36,
    marginBottom: 12,
  },

  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  stepCount: {
    fontSize: RFValue(18),
    fontWeight: '700',
    color: '#A8B36A', // soft green like screenshot
  },

  stepsLabel: {
    fontSize: RFValue(14),
    fontWeight: '500',
    color: '#333',
    marginTop: 4,
  },

  helperText: {
    marginTop: 14,
    fontSize: RFValue(11),
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
})


export default Padometer
