import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import { circleRadius } from '../../../utils/Constant';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { RFValue } from 'react-native-responsive-fontsize';

const Options: FC<{
  item: any;
  onPress: (type: string) => void;
}> = ({ item, onPress }) => {

    let iconName;
    let iconColor = '#fff';
    switch (item) {
        case 'meditation':
            iconName = 'nature-people'
            iconColor = '#2DEC72'
            break;
        case 'pedometer':
            iconName = 'directions-run'
            iconColor = '#2D7BA4'
            break;
        case 'health':
            iconName = 'health-and-safety'
            iconColor = 'green'
            break;
        case 'happiness':
            iconName = 'emoji-emotions'
            iconColor = '#FB26FF'
            break;
        default:
            iconName = 'local-fire-department'
            iconColor = '#FFBC66'
            break;
    }

  return (
    <TouchableOpacity onPress={() => {
      onPress(item)
    }} style = {style.container}>
      <Icon name= {iconName} color={iconColor} size={RFValue(32)}></Icon>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  
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

})

export default Options;
