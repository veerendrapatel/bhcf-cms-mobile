import { alertConstants } from '../constants/index';

const initState = {
    type: null,
    message: null
}
const alertReducer = (state = initState, action) => {
    switch(action.type) {
        case alertConstants.SUCCESS:
            return {
                ...state,
                type: 'success',
                message: action.message
            }
        case alertConstants.ERROR:
            return {
                ...state,
                type: 'danger',
                message: action.message
            }
        case alertConstants.CLEAR:
            return {}
        default:
            return state;
    }

}

export default alertReducer;