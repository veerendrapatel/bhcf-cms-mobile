import { cellGroupConstants } from '../constants/cellgroup.constants';
const initialState = {
    loading: false,
    attendance: null
}
const cellGroupReducer = (state = initialState, action ) => {
    switch( action.type ) {
        case cellGroupConstants.GET_CELLGROUP_ATTENDANCE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case cellGroupConstants.CREATE_CELLGROUP_ATTENDANCE_SUCCESS:
            return {
                ...state,
                attendaces: action.attendance
            }
        case cellGroupConstants.CREATE_CELLGROUP_ATTENDANCE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case cellGroupConstants.CREATE_CELLGROUP_ATTENDANCE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case cellGroupConstants.CREATE_CELLGROUP_ATTENDANCE_SUCCESS:
            return {
                ...state,
                attendaces: [...state.attendaces, action.attendace]
            }
        case cellGroupConstants.CREATE_CELLGROUP_ATTENDANCE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default cellGroupReducer;