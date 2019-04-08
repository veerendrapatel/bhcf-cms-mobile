import { schoolClassConstants } from '../constants';


const initState = {
    loading: false,
    people: null,
    classes: null,
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
                classes: {
                    ...state.classes,
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
                selected_batch_ID: payload.data.id,
                classes: {
                    ...state.classes,
                    [payload.type] : [
                        ...state.classes[payload.type], payload.data,
                    ]
                }
            }
        case schoolClassConstants.SAVE_FAILURE: 
            return {
                ...state,
                success: false,
                loading: false,
            }
        case schoolClassConstants.UPDATE_MEMBER_COMMIT:
            return {
                ...state,
                success: true,
                loading: false,
                selected_batch_ID: payload.data.id,
                classes: {
                    ...state.classes,
                    [payload.type] : state.classes[payload.type].map(item => {
                        if (item.id === payload.data.id) {
                            return payload.data
                        }
                        return item;
                    })
                }
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
                people: payload.data
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
                people: state.people.map(item => {
                    
                        if (item.id === payload.id) {
                            return {
                                ...item,
                                is_exist: payload.is_exist
                            }
                        }
                        return item;
                    })
            }
        default: 
            return state;
    }
}

export default schoolClassReducer;