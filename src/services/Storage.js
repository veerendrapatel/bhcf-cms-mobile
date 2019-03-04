import { AsyncStorage } from 'react-native'

export default {
    async saveItem(key, value) {
        try {
            value = JSON.stringify(value);
            await AsyncStorage.setItem(key, value);
        } catch(e) {
            console.log(e);
        }
    },

    async getItem(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                return JSON.parse(value)
            }
        } catch(e) {
            console.log(e);
        }
        return false;
    },

    async removeItem(key) {
        try {
            await AsyncStorage.removeItem(key);
        } catch(e) {
            console.log(e);
        }
    }
}