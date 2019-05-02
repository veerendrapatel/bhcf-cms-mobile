import { cellGroupConstants } from '../constants/cellgroup.constants';
const initialState = {
    loading: false,
    items: []
}
let payload = null;
const cellGroupReducer = (state = initialState, action ) => {
    switch( action.type ) {
        case cellGroupConstants.GET_LEADER_ATTENDANCE_BY_YEAR_REQUEST:
            // console.log('GET_LEADER_ATTENDANCE_BY_YEAR_REQUEST');
            return {
                ...state,
                loading: true,
            }
        case cellGroupConstants.GET_LEADER_YEARLY_ATTENDANCES_COMMIT:
        // console.log('GET_LEADER_YEARLY_ATTENDANCES_COMMIT', action);
            payload = action.payload;
            return {
                ...state,
                loading: false,
                items: { [action.meta.year]: payload.data }
            }
        case cellGroupConstants.GET_LEADER_YEARLY_ATTENDANCES_ROLLBACK:
        // console.log('GET_LEADER_YEARLY_ATTENDANCES_ROLLBACK', action);
            return {
                ...state,
                loading: false,
                items: []
            }
        case cellGroupConstants.CREATE_CELLREPORT_REQUEST:
            // console.log('CREATE_CELLREPORT_REQUEST');
            return {
                ...state,
                loading: true
            }
        case cellGroupConstants.CREATE_CELLREPORT_COMMIT:
            
            payload = action.payload;
            // console.log('CREATE_CELLREPORT_COMMIT', payload.data);

            return {
                ...state,
                loading: false,
                items: {
                    ...state.items,
                    [action.meta.year]: { 
                        ...state.items[action.meta.year],
                        [action.meta.week]: {
                            ...state.items[action.meta.year][action.meta.week],
                           attendances: payload.data 
                        }
                    }
                }
            }

        case cellGroupConstants.CREATE_CELLREPORT_ROLLBACK:
            // console.log('CREATE_CELLREPORT_ROLLBACK');
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case cellGroupConstants.SAVE_CELLGROUP_ATTENDANCE_REQUEST:
            payload = action.payload;
            console.log('SAVE_CELLGROUP_ATTENDANCE_REQUEST', payload);
            return {
                ...state,
                // items: {
                //     ...state.items,
                //     [payload.year]: { 
                //         ...state.items[payload.year],
                //         [payload.week]: {
                //             ...state.items[payload.year][payload.week],
                //             attendances: state.items[payload.year][payload.week].attendances.map((item, i) => {
                //                 if (payload.index === i) {
                //                     return {
                //                         ...item,
                //                         attended: payload.attended
                //                     }
                //                 }
                //                 return item;
                //             })
                //         }
                //     }
                // }
            }
        case cellGroupConstants.SAVE_CELLGROUP_ATTENDANCE_COMMIT:
            payload = action.payload;
            console.log('SAVE_CELLGROUP_ATTENDANCE_COMMIT', action);
            const newState = {
                ...state,
                loading: false,
                items: {
                    ...state.items,
                    [action.meta.year]: { 
                        ...state.items[action.meta.year],
                        [action.meta.week]: {
                            ...state.items[action.meta.year][action.meta.week],
                            attendances: state.items[action.meta.year][action.meta.week].attendances.map((item, i) => {
                                if (action.meta.index === i) {
                                    return payload.data
                                }
                                return item;
                            })
                        }
                    }
                }
            };
            return newState;
        case cellGroupConstants.SAVE_CELLGROUP_ATTENDANCE_ROLLBACK:
            console.log('SAVE_CELLGROUP_ATTENDANCE_ROLLBACK', action);
            return {
                ...state,
                // loading: false,
            }
        default:
            return state;
    }
}

export default cellGroupReducer;