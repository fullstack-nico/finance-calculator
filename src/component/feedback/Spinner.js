import React from "react";
import { ActivityIndicator } from "react-native";

export const Spinner = ({color, size}) => {
    return  (
        <ActivityIndicator
            color={color || 'red'}
            size={size || '15'}
        />
    )
}
