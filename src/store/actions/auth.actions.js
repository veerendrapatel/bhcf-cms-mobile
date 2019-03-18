import { authService } from '../../services/index';
import { authConstants } from '../constants';
import { alertActions } from './alert.actions';
import { onSignIn, onSignOut } from '../../helpers/async-storage';
// import {NavigationActions} from 'react-navigation';
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
                        // dispatch(NavigationActions.navigate({routeName: 'Home'}));
                        
                    } else {
                        console.log(res.data);
                        dispatch(failure(res.data));
                        dispatch(alertActions.error(res.data));
                    }
                },
                err => {
                    console.log(err);
                    dispatch(failure(err));
                    dispatch(alertActions.error(err.message));
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
                console.log(res);
                onSignOut();
                dispatch(success());
            },
            err => {
                console.log(err.message);
                dispatch(failure(err.message));
            }
        )
    }
}