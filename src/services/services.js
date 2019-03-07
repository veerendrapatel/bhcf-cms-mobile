import React, {Component} from 'react';
// import { getCurrentUser } from './auth';

const URI = 'http://127.0.0.1:8000/api/v1/';//process.env.API_URL;
export const AJAX = (
    route, 
    method = 'GET', 
    body = null,
    header = {
        Accept: 'application/json',
        'Content-Type': 'application/json'  
    }) => {

    return new Promise((resolve, reject) => {
        if (method.toUpperCase() == 'GET') {
            fetch(`${URI}${route}`, {
                method: method,
                headers: header
            })
            .then(res => res.json())
            .then(res => {
                resolve(res);
            })
            .catch(error => {
                 reject(error);
            });
                
        } else {
            fetch(`${URI}${route}`, {
                method: method,
                headers: header,
                body: JSON.stringify(body)
            })
            .then(res => res.json())
            .then(res => {
                resolve(res);
            })
            .catch(error => {
                 reject(error);
            });
        }
    })
}
