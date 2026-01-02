import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { FC } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import Icon from 'react-native-vector-icons/Ionicons'


const Padometer:FC<{onCross : () => void}> = ({onCross}) => {
  return (
     <View style={style.container}>
            <TouchableOpacity style={style.cross} onPress={onCross}>
                <Icon name="close-circle" color="red" size={RFValue(20)} />
            </TouchableOpacity>

            <View style={style.logoContainer}>
                <Image
                    style={style.logo}
                    source={require('../../assets/images/logo_short.png')}
                />
            </View>
    

        </View>
  )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingVertical: 10,
        justifyContent: "center",
        alignSelf: "center",
        elevation: 10,
        width: "90%",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.9,
        shadowRadius: 16,
        shadowColor: "#000",
        borderRadius: 10,
    },
    logoContainer: {
        justifyContent: "center",
        alignItems: "center",
    },

    logo: {
        width: 50,
        height: 40,
        alignContent: 'center',
        marginVertical: 10,
    },

    cross: {
        position: "absolute",
        right: 10,
        top: 10,
    }
})



export default Padometer