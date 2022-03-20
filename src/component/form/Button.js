import React from 'react';
import {StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import {Text} from '../typography';
import theme from '../../_config/global/style/theme.style';

export function Button({unstyled= false, title,onPress,color, style, rounded=false}) {
    if(unstyled === true){
        return(
            <Pressable
                style={[
                    {margin: theme.MARGIN_SMALL},
                    style,
                ]}
                onPress={onPress}>
                <Text>{title}</Text>
            </Pressable>
        )
    }
    return (
        <TouchableOpacity
            style={[
                styles.button,
                rounded && styles.radius,
                style,
            ]}
            onPress={onPress} >
            <Text>{title}</Text>
        </TouchableOpacity>

    );
}
export const styles = StyleSheet.create({
    button:{
        backgroundColor: theme.PRIMARY_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.PADDING_MEDIUM,
        /*width: '100%',*/
        borderRadius: theme.BORDER_RADIUS_SMALL
    },
    text: {
        color: 'black',
        fontSize: 18,
        textTransform: 'capitalize',
        /*fontWeight:'bold'*/
    },
})
