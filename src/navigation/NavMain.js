import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import Dashboard from '../modules/main/screen/Dashboard'
import History from '../modules/main/screen/History';

const Stack = createNativeStackNavigator();
export default function NavMain(){
    return(
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="main"
                screenOptions={{headerShown: false}}>
                <Stack.Screen name="main" component={HomeTabs} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const Tab = createBottomTabNavigator();

function HomeTabs(){
    return(
        <Tab.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName="history">
            <Tab.Screen name="main" component={Dashboard} />
            <Tab.Screen name="history" component={History} />
        </Tab.Navigator>
    )
}
