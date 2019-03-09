import React, {Component} from 'react';
import { getCurrentUser } from './auth';

const URI = 'http://127.0.0.1:8000/api/v1/';//process.env.API_URL;
const get = ( route ) => {
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

            fetch(`${URI}${route}`, {
                method: 'GET',
                headers: headers
            })
            .then(res => res.json())
            .then(res => {
                // if (res.ok) {
                    resolve(res);
                // }
                //  else {
                //     reject(new Error(`Unable to retrieve events.\nInvalid response received - (${res.status}).`))
                // }
            })
            .catch(error => {
                reject(error);
            });
        });
    });
}


const post = (route, body) => {
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


            fetch(`${URI}${route}`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            })
            .then(res => res.json())
            .then(res => {
                // if (res.ok) {
                    resolve(res);
                // }
                //  else {
                //     reject(new Error(`Unable to retrieve events.\nInvalid response received - (${res.status}).`))
                // }
            })
            .catch(error => {
                 reject(error);
            });
        });
    });
}

export default HttpService = {
    get, post
}