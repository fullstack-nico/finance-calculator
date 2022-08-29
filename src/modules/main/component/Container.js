import React from 'react';
import {View, ScrollView} from 'react-native';

export function Container({children}){
    return(
        <View style={{margin: 5}}>
            <ScrollView>
                {children}
            </ScrollView>
        </View>
    )
}
