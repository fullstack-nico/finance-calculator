import React from "react";

import {
    View,
    TextInput,
    Image,
    StyleSheet,
    Text
} from "react-native";

import theme from '../../_config/global/style/theme.style'


// Input
// rounded={true} makes the border rounded
// underline={true} makes the input with underline
// cant be rounded and underlined at the same time
// If there is no title property, the placeholder property must be used
export const Input = ({ title, underline, placeholder, value, onChangeText, editable, children, secureTextEntry, keyboardType, autoFocus, styleInput, styleText, rounded,image, styleContainer, ...otherProps}) => {
    return (
       <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
        <TextInput
            style={styles.input}
            value={ value }
            placeholder={
                placeholder ? placeholder : placeholder
            }
            placeholderTextColor="#54636A"
            onChangeText={ onChangeText }
            editable={ editable }
            secureTextEntry={ secureTextEntry }
            keyboardType={ keyboardType || 'default'}
            autoFocus={ autoFocus || false }
            {...otherProps}
        />
        {children}
       </View>
    );
}

const styles = StyleSheet.create({
    container:{
        margin: theme.MARGIN_SMALL,
    },
    text:{
      marginBottom: 5,
    },
    input:{
        height: 50,
        alignItems:"center",
        flexDirection: "row",
        padding:5,
        /*borderBottomWidth: 1,*/
        borderBottomColor: 'grey',
        backgroundColor: 'white',
        borderWidth:1,
        borderColor: 'black',
        /*margin: styless.abc.margin*/
    },
})
