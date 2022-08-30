import React from 'react';
import {View, ScrollView} from 'react-native';
import {theme} from '../../../_config/global';

export function Container({children}){
    return(
        <View style={{margin: theme.MARGIN_MEDIUM, marginTop: theme.MARGIN_SMALL}}>
            <ScrollView>
                {children}
            </ScrollView>
        </View>
    )
}
