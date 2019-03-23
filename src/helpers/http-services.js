import React, {Component} from 'react';
import { API_URL } from 'react-native-dotenv';
import { onSignOut, getCurrentUser } from './async-storage';




export const get = ( route ) => {
    return new Promise((resolve, reject) => {
        let headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json'  
        }
        
        getCurrentUser().then(res => {
            if (res) {
                const currentUser = JSON.parse(res)
                headers['Authorization'] = `Bearer ${currentUser.api_token}`;
            }
            fetch(`${API_URL}${route}`, {
                method: 'GET',
                headers: headers
            })
            .then(
                res => {
                    return res.text().then(text => {
                        const data = text && JSON.parse(text);
                        if (!res.ok) {
                            if (res.status === 401) {
                                onSignOut();
                            }

                            const error = (data && data.message) || res.statusText;
                            return reject(error);
                        }
                        
                        return data;
                    })
                }
            )
            .then(res => {
                resolve(res);
            })
            .catch(error => {
                reject(error);
            });
        });
    });
}

export const postNoToken = ( route, body ) => {
    return new Promise((resolve, reject) => {
        let headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json'  
        }
            
        fetch(`${API_URL}${route}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        })
        .then(
            res => {
                return res.text().then(text => {
                    const data = text && JSON.parse(text);
                    if (!res.ok) {
                        if (res.status === 401) {
                            onSignOut();
                        }

                        const error = (data && data.message) || res.statusText;
                        return reject(error);
                    }

                    return data;
                })
            }
        )
        .then(res => {
            resolve(res);
        })
        .catch(error => {
                reject(error);
        });
    });
}


export const post = (route, body) => {
    return new Promise((resolve, reject) => {
        let headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json'  
        }
        
        getCurrentUser().then(res => {
            if (res) {
                const currentUser = JSON.parse(res)
                headers['Authorization'] = `Bearer ${currentUser.api_token}`;
            }
            
            fetch(`${API_URL}${route}`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            })
            .then(
                res => {
                    return res.text().then(text => {
                        const data = text && JSON.parse(text);
                        if (!res.ok) {
                            if (res.status === 401) {
                                onSignOut();
                            }

                            const error = (data && data.message) || res.statusText;
                            return reject(error);
                        }

                        return data;
                    })
                }
            )
            .then(res => {
                resolve(res);
            })
            .catch(error => {
                 reject(error);
            });
        });
    });
}