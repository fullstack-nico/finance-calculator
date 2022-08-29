import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import Login from '../modules/authentication/screen/Login'
import Register from '../modules/authentication/screen/Register'

const Stack = createNativeStackNavigator();
export default function NavAuthentication(){
    return(
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="login"
                screenOptions={{headerShown: false}}>
                <Stack.Screen name="login" component={Login} />
                <Stack.Screen name="register" component={Register} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
