import { AsyncStorage } from 'react-native'

const URI = 'http://127.0.0.1:8000/api/v1/';

export const CURRENT_USER_KEY = 'current-user';

export const onSignIn = (value) => AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(value))

export const onSignOut = () => AsyncStorage.removeItem(CURRENT_USER_KEY);

export const isSignedIn = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(CURRENT_USER_KEY)
            .then(res => {
                if (res !== null) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch(err => reject(err))
    })
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(CURRENT_USER_KEY)
            .then(res => {
                if (res !== null) {
                    resolve(res);
                } else {
                    resolve(false);
                }
            })
            .catch(err => reject(err))
    })
}


export const signIn = async(username, password) => {
        let response = await fetch(`${URI}login`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'username': username,
                    'password': password
                })
            }).then(res => res.json())
            .then(responseJSON => {
                return responseJSON
            });
        console.log(response.success);

        return response;
    }
