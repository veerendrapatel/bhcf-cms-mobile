export const handleResponse = (response) => {
    return response.text().then(text => {
        try {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
        } catch( error ) {
            return Promise.reject(error);
        }

        return data;
    })
}