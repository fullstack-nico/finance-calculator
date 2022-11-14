import React from 'react';
import {StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import {Text} from '../typography';
import {theme} from '../../_config/global';

export function Button({unstyled= false, title,onPress,color, style, rounded=false, selected=false, unselected=false}) {
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
                selected && styles.selected,
                unselected && styles.unselected,
                style,
            ]}
            onPress={onPress} >
            <Text>{title}</Text>
        </TouchableOpacity>

    );
}
const styles = StyleSheet.create({
    button:{
        backgroundColor: theme.PRIMARY_COLOR_TWO,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.PADDING_MEDIUM,
        margin: theme.MARGIN_SMALL,
        /*width: '100%',*/
        borderRadius: theme.BORDER_RADIUS_SMALL,
        borderColor:  theme.PRIMARY_COLOR_ONE,
        borderWidth: 1,
    },
    text: {
        color: 'black',
        fontSize: 18,
        textTransform: 'capitalize',
        /*fontWeight:'bold'*/
    },
    selected:{
        backgroundColor: theme.PRIMARY_COLOR_WHITE, borderWidth: 3, borderColor: theme.PRIMARY_COLOR_TWO
    },
    unselected:{
        backgroundColor: theme.PRIMARY_COLOR_WHITE
    }

})
