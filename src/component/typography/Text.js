import React from 'react';
import{
    Text as Textt
} from 'react-native';
import {theme} from '../../_config/global';

export const Text = ({style, children}) => {
    return(
        <Textt style={[{fontSize: theme.FONT_SIZE_LARGE}, style]}>{children}</Textt>
    )
}
