import { getCurrentUser } from './async-storage';

export const authHeader = () => {
    return getCurrentUser()
        .then(
            res => {
                const currentUser = JSON.parse(res);
                if (currentUser && currentUser.api_token) {
                    return {  'Authorization' : `Bearer ${currentUser.api_token}` }
                } else {
                    return {}
                }
            }
        )
}