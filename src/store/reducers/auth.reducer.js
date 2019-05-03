import { authConstants } from '../constants/auth.constants';


const initState = {
    loggingIn:false,
    isLoggedIn: false,
    user: null
}

const authReducer = (state = initState, action) => {
    
    switch(action.type) {
        case authConstants.LOGIN_REQUEST:
            // console.log('LOGIN_REQUEST');
            return {
                ...state,
                loggingIn: true
            };
        case authConstants.LOGIN_COMMIT:
            console.log('LOGIN_COMMIT', action);
            return {
                ...state,
                loggingIn:false,
                isLoggedIn: action.payload.ok,
                user: action.payload.ok ? action.payload.data : null
            };
        
        case authConstants.LOGIN_ROLLBACK:
            // console.log('LOGIN_ROLLBACK', action);
            return {
                ...state,
                loggingIn:false,
            };
        case authConstants.LOGOUT_REQUEST:
            // console.log('LOGOUT_REQUEST');
            return {
                ...state,
                loggingIn:false,
                isLoggedIn: false,
                user: null
            };
        case authConstants.LOGOUT_COMMIT:
            // console.log('LOGOUT_COMMIT', action);
            return {
                loggingIn:false,
                isLoggedIn: false,
                user: null
            }
        case authConstants.LOGOUT_ROLLBACK:
            // console.log('LOGOUT_ROLLBACK', action);
            return {
                ...state,
            };
        default:
            return state;
    }
}


export default authReducer;