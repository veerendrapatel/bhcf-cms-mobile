import { authService } from '../../services/index';
import { authConstants } from '../constants';
import { alertActions } from './alert.actions';
import { onSignIn, onSignOut } from '../../helpers/async-storage';

export const signIn = (username, password) => {
    const request = (user) => { return { type: authConstants.LOGIN_REQUEST, user } }
    const success = (user) => { return { type: authConstants.LOGIN_SUCCESS, user, isLoggedIn: true } }
    const failure = (error) => { return { type: authConstants.LOGIN_FAILURE, error } }

    return (dispatch, getState) => {
        dispatch(request({ username }));
        authService.login(username, password)
            .then(
                res => {

                    if (res.ok) {
                        onSignIn(res.data);
                        dispatch(success(res.data));
                        
                    } else {
                        dispatch(failure(res.data));
                        dispatch(alertActions.error(res.data));
                    }
                },
                err => {
                    const error = typeof err === 'string' ? 'Oops! network error.' : err.message;
                    dispatch(failure( error ));
                    dispatch(alertActions.error( error ));
                }
            )
    }

    
};

export const signOut = () => {
    
    const request = () => { return { type: authConstants.LOGOUT_REQUEST } }
    const success = () => { return { type: authConstants.LOGOUT_SUCCESS }}
    const failure = (error) => { return { type: authConstants.LOGOUT_FAILURE, error } }
    return (dispatch, getState) => {
        
        
        authService.logout().then(
            res => {
                onSignOut();
                dispatch(success());
            },
            err => {
                const error = typeof err === 'string' ? 'Oops! network error.' : err.message;
                    dispatch(failure( error ));
                    dispatch(alertActions.error( error ));
            }
        )
    }
}