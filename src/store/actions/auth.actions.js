import { authConstants } from '../constants';
import { API_URL } from 'react-native-dotenv';

export const signIn = (username, password) => {
    return (dispatch, getState) => {
        console.log(`${API_URL}login`);
        console.log(username, password);
        dispatch({
            type: authConstants.LOGIN_REQUEST, 
            payload: null,
            meta: {
                offline: {
                    effect: {
                        url: `${API_URL}login`,
                        json: {
                            username, 
                            password
                        },
                        method: 'POST',
                    },
                    commit: { type: authConstants.LOGIN_COMMIT },
                    rollback: { type: authConstants.LOGIN_ROLLBACK  }
                }
            }
        });
    }

    
};

export const signOut = () => {
    return (dispatch, getState) => {
        console.log(`${API_URL}logout`);
        dispatch({
            type: authConstants.LOGOUT_REQUEST, 
            payload: null,
            meta: {
                offline: {
                    effect: {
                        url: `${API_URL}logout`,
                        method: 'POST',
                    },
                    commit: { type: authConstants.LOGOUT_COMMIT },
                    rollback: { type: authConstants.LOGOUT_ROLLBACK  }
                }
            }
        });
    }
}