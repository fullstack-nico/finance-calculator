import React, {Component} from 'react';
import {
    TextInput,
    Text,
    TouchableNativeFeedback,
    View,
    StyleSheet,
} from 'react-native';

import * as yup from 'yup';

import { useSelector, useDispatch } from 'react-redux'
import { increment, incrementByAmount, resetAmount, changeText } from '../counterSlice'

export default function Counter() {

        // Redux hooks
        const count = useSelector((state) => state.counter.countValue)
        const text = useSelector((state) => state.counter.textValue)
        const dispatch = useDispatch()

        return (
         <View>
             <View style={{alignItems: 'center', justifyContent: 'center'}}>
                 <Text>{count}</Text>
                 <Text>{text}</Text>
                 <TouchableNativeFeedback
                     onPress={()=>dispatch(increment())}>
                     <View style={styles.button}>
                        <Text>Add</Text>
                     </View>
                 </TouchableNativeFeedback>

                 <TouchableNativeFeedback
                     onPress={()=>dispatch(incrementByAmount({
                         add: 5,
                         text: "deez nuts",
                     }))}>
                     <View style={styles.button}>
                         <Text>Add more</Text>
                     </View>
                 </TouchableNativeFeedback>

                 <TextInput
                     value={text}
                    onChangeText={(text)=>dispatch(changeText(text))}
                 />

                 <TouchableNativeFeedback
                     onPress={()=>dispatch(resetAmount())}>
                     <View style={styles.button}>
                         <Text>Reset</Text>
                     </View>
                 </TouchableNativeFeedback>
             </View>
         </View>
        )
}

const styles = StyleSheet.create({
   button:{
    height: 50,
    backgroundColor: 'red',
    width: 300,
   margin:10,
   }
});
