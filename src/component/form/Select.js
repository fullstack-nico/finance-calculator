import React from 'react';
import {Box, Select as Selectt} from 'native-base';
import {Text} from '../typography';
import {theme, themeComponent} from '../../_config/global';

export function Select({title, placeholder=null, onValueChange, children}){
    return(
        <Box margin={1}>
            <Text style={themeComponent.text}>{title}</Text>
            <Selectt
                onValueChange={onValueChange}
                borderRadius={0} backgroundColor={theme.PRIMARY_COLOR_WHITE} borderColor={"black"}
                // accessibilityLabel="Choose Service"
                placeholder={placeholder}>
                { children.map((item)=>{
                    return <Selectt.Item key={item.key} label={item.value} value={item.value} />
                })}
            </Selectt>
        </Box>
    )
}
