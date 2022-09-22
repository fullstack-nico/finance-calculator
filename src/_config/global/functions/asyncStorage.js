import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key, value, description) => {
    try {
        await AsyncStorage.setItem(key, value)
        return {success: true, value: "The key " + key + " is succesfully saved"}
    } catch (e) {
        // console.log("Error when saving data " + description)
        return {success: false, value: "The key " + key + " is unsuccesfully saved"}
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

export const removeDataAll = async () => {
    try {
        await AsyncStorage.clear()
        return {success: true, value: "All key " + " is succesfully cleared"}
    } catch(e) {
        // clear error
        return  {success: false, value: "logout, remove all data error " + e}
    }
}
