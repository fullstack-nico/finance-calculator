import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key, value, description) => {
    try {
        await AsyncStorage.setItem(key, value)
        return true;
    } catch (e) {
        alert("Error when saving data " + description)
        return false
    }
}

export const loadData = async (key, description) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if(value !== null) return {success: true, value};
        return {success: false, value: "The key " + key + " contains no value, it is null"}
    } catch(e) {
        alert("Error when reading data " + description)
        return {success: false, value: "Error when reading data " + description}
    }
}
