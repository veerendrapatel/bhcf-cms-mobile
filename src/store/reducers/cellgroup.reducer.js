import { cellGroupConstants } from '../constants/cellgroup.constants';

const initialState = {
    loading: false,
    items: []
}
let payload = null;
const cellGroupReducer = (state = initialState, action ) => {
    switch( action.type ) {
        case cellGroupConstants.GET_LEADER_ATTENDANCE_BY_YEAR_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case cellGroupConstants.GET_LEADER_ATTENDANCE_BY_YEAR_SUCCESS:
            payload = action.payload;
            // return {
            //     loading: false,
            //     items: []
            // }
            return {
                ...state,
                loading: false,
                items: { [payload.year]: payload.data }
            }
        case cellGroupConstants.GET_LEADER_ATTENDANCE_BY_YEAR_FAILURE:
            return {
                ...state,
                loading: false,
                items: []
            }
        case cellGroupConstants.GET_CELLGROUP_ATTENDANCE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case cellGroupConstants.GET_CELLGROUP_ATTENDANCE_SUCCESS:
            payload = action.payload;
            return {
                ...state,
                loading: false,
                items: {
                    ...state.items,
                    [payload.year]: { 
                        ...state.items[payload.year],
                        [payload.week]: {
                            ...state.items[payload.year][payload.week],
                           attendances: payload.data 
                        }
                    }
                }
            }

        case cellGroupConstants.GET_CELLGROUP_ATTENDANCE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case cellGroupConstants.CREATE_CELLGROUP_ATTENDANCE_REQUEST:
            return {
                ...state,
                // loading: true
            }
        case cellGroupConstants.CREATE_CELLGROUP_ATTENDANCE_SUCCESS:
            payload = action.payload;
            const newState = {
                ...state,
                loading: false,
                items: {
                    ...state.items,
                    [payload.year]: { 
                        ...state.items[payload.year],
                        [payload.week]: {
                            ...state.items[payload.year][payload.week],
                        //    attendances: {
                        //        ...state.items[payload.year][payload.week]['attendances'], 
                        //         [payload.index]: payload.attendance
                        //    }
                            attendances: state.items[payload.year][payload.week].attendances.map((item, i) => {
                                if (payload.index === i) {
                                    return payload.attendance
                                }
                                return item;
                            })
                        }
                    }
                }
            };
            return newState;
        case cellGroupConstants.CREATE_CELLGROUP_ATTENDANCE_FAILURE:
            return {
                ...state,
                // loading: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default cellGroupReducer;