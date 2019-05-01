import { authConstants } from '../constants/auth.constants';


const initState = {
    loggingIn:false,
    isLoggedIn: false,
    user: null
}

const authReducer = (state = initState, action) => {
    
    switch(action.type) {
        case authConstants.LOGIN_REQUEST:
            return {
                ...state,
                loggingIn: true
            };
        case authConstants.LOGIN_COMMIT:
            return {
                ...state,
                loggingIn:false,
                isLoggedIn: action.payload.ok,
                user: action.payload.ok ? action.payload.data : null
            };
        
        case authConstants.LOGIN_ROLLBACK:
            return {
                ...state,
                loggingIn:false,
            };
        case authConstants.LOGOUT_COMMIT:
            return {
                loggingIn:false,
                isLoggedIn: false,
                user: null
            }
        default:
            return state;
    }
}


export default authReducer;