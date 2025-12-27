import { View, Text, TextStyle, StyleSheet } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '../../utils/Constant';
import { RFValue } from "react-native-responsive-fontsize";



interface Props {
    variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h7" | "h8" | "h9" | "body";
    fontSize?: number;
    fontFamily?: Fonts;
    style: TextStyle | TextStyle[];
    children?: React.ReactNode;
    numberOfLines?: number,
    onLayOut?: (event: object) => void
}


const CustomText: React.FC<Props> = ({ variant = 'body', fontSize, fontFamily = Fonts.Regular, style, children, numberOfLines, onLayOut, ...props }) => {

    let computedFontsSize;

    switch (variant) {
        case "h1":
            computedFontsSize = RFValue(fontSize || 22);
            break;
        case "h2":
            computedFontsSize = RFValue(fontSize || 20);
            break;

        case "h3":
            computedFontsSize = RFValue(fontSize || 18);
            break;

        case "h4":
            computedFontsSize = RFValue(fontSize || 16);
            break;

        case "h5":
            computedFontsSize = RFValue(fontSize || 14);
            break;

        case "h6":
            computedFontsSize = RFValue(fontSize || 12);
            break;

        case "h7":
            computedFontsSize = RFValue(fontSize || 10);
            break;

        case "h8":
            computedFontsSize = RFValue(fontSize || 10);
            break;

        case "h9":
            computedFontsSize = RFValue(fontSize || 9);
            break;

        case "body":
            computedFontsSize = RFValue(fontSize || 12);
            break;



    }

    return (
        <View>
            <Text numberOfLines={numberOfLines! == undefined ? numberOfLines : undefined} onLayout={onLayOut} style={[styles.text, { fontFamily: fontFamily, fontSize: computedFontsSize, color: Colors.text }, style]} {...props}>{children}</Text>
        </View>
    )
}

export default CustomText

const styles = StyleSheet.create({

    text: {
        textAlign: "left",
    }

})