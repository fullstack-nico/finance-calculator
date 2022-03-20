import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens
import Dashboard from '../modules/dashboard/Dashboard';

const Stack = createNativeStackNavigator();
export default function NavMain(){
    return(
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="main"
                screenOptions={{headerShown: false}}>
                <Stack.Screen name="main" component={Dashboard} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}
