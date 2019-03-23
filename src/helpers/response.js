import { onSignOut } from './async-storage/';


export const handleResponse = (response) => {
    return response.text().then(text => {
        try {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if (response.status === 401) {
                   onSignOut();
                }

                
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
        } catch( error ) {
            return Promise.reject(error);
        }

        return data;
    })
}