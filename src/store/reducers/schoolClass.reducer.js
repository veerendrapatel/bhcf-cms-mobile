import { schoolClassConstants } from '../constants';

const initState = {
    loading: false,
    people: null,
    school_classes: null,
    selected_batch_ID: null,
    success: false
}
let payload = null;
const schoolClassReducer = (state = initState, action) => {
    payload = action.payload;
    switch(action.type) {
        case schoolClassConstants.GET_BY_TYPE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case schoolClassConstants.GET_BY_TYPE_SUCCESS: 
            return {
                ...state,
                loading: false,
                school_classes: {
                    ...state.school_classes,
                    [payload.type] : payload.data
                }
            }
        case schoolClassConstants.GET_BY_TYPE_FAILURE: 
            return {
                ...state,
                success: false,
                loading: false,
            }

        case schoolClassConstants.SAVE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case schoolClassConstants.SAVE_SUCCESS: 
            return {
                ...state,
                success: true,
                loading: false,
                // selected_batch_ID: payload.data.id,
                school_classes: {
                    ...state.school_classes,
                    [payload.type] : [
                        ...state.school_classes[payload.type], payload.data,
                    ]
                }
            }
        case schoolClassConstants.SAVE_FAILURE: 
            return {
                ...state,
                success: false,
                loading: false,
            }
        case schoolClassConstants.GET_PEOPLE_WITH_STUDENTS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case schoolClassConstants.GET_PEOPLE_WITH_STUDENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                people: payload.people
            }
            break;
        case schoolClassConstants.GET_PEOPLE_WITH_STUDENTS_FAILURE:
            return {
                ...state,
                loading: false,
            }
        case schoolClassConstants.ENROLL_SUCCESS:
            return {
                ...state,
                people: {
                    ...people,
                    [payload.id]: {
                        ...people[payload.id],
                        is_exist: payload.is_exist
                    }
                }
            }
        default: 
            return state;
    }
}

export default schoolClassReducer;