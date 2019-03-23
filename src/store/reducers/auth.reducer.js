import { authConstants } from '../constants/auth.constants';

const initState = {
    loggingIn:false,
    isLoggedIn: false,
    user: null
}

const authReducer = (state = initState, action) => {
    
    switch(action.type) {
        // case REHYDRATE:
        //     return {
        //         ...state,
        //         isLoggedIn: action.payload.isLoggedIn,
        //         user: action.payload.user
        //     }
        case authConstants.LOGIN_REQUEST:
            return {
                ...state,
                loggingIn: true,
                user: action.user
            };
        case authConstants.SET_CURRENT_USER:
            return {
                ...state,
                loggingIn:false,
                isLoggedIn: true,
                user: action.user
            }
        case authConstants.LOGIN_SUCCESS:
            return {
                ...state,
                loggingIn:false,
                isLoggedIn: true,
                user: action.user
            };
        
        case authConstants.LOGIN_FAILURE:
            return {};
        // case authConstants.LOGOUT_SUCCESS:
        //     return {
        //         loggingIn:false,
        //         isLoggedIn: false,
        //         user: null
        //     }
        default:
            return state;
    }
}


export default authReducer;