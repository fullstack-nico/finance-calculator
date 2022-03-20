import React from 'react';
import { Text} from 'react-native';


export function FormInputErrorMsg({error,visible=false}) {
    if(!error || !visible ) return null; // faster than returning <></>
    return (
        <Text style={{color: 'red'}}>
            {error}
        </Text>
    );
}

