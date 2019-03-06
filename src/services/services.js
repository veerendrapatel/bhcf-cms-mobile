import React, {Component} from 'react';
// import { getCurrentUser } from './auth';

const URI = 'http://127.0.0.1:8000/api/v1/';//process.env.API_URL;
export const AJAX = (
    route, 
    method = 'GET', 
    body = null, 
    callback,
    header = {
        Accept: 'application/json',
        'Content-Type': 'application/json'  
    }) => {
    if (method.toUpperCase() == 'GET') {
        fetch(`${URI}${route}`, {
            method: method,
            headers: header
        })
        .then(res => res.json())
        .then(callback)
        .catch(error => {
            console.error(error);
        });
            
    } else {
        fetch(`${URI}${route}`, {
            method: method,
            headers: header,
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(callback)
        .catch(error => {
            console.error(error);
        });
    }
}
