import { peopleConstants } from '../constants';


const initState = {
    items: null,
    error: null,
    loading: false
}
const peopleReducer = (state = initState, action) => {
    switch(action.type) {
        case peopleConstants.GETALL_REQUEST: 
            return {
                ...state,
                loading: true
            }
        case peopleConstants.GETALL_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.people
            }
        case peopleConstants.GETALL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case peopleConstants.CREATE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case peopleConstants.CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                items: [...state.items, action.person]
            }
        case peopleConstants.CREATE_FAILURE:
            return {
                ...state,
                loading: false
            }
        case peopleConstants.UPDATE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case peopleConstants.UPDATE_SUCCESS:
        
            const index = state.items.findIndex(item => item.id === action.person.id);  
            return {
                ...state,
                // optional 2nd arg in callback is the array index
                items: state.items.map((item, i) => {
                if (i === index) {
                    return action.person
                }

                return item
                })
            }

        case peopleConstants.UPDATE_FAILURE:
            return {
                ...state,
                loading: false
            }

        case peopleConstants.FETCH_DROPDOWN_OPTIONS:
            return {
                ...state,
                options: action.options
            }
        case peopleConstants.FIND_BY_ID: 
            return {
                ...state,
                person: state.items.filter(item => item.id === action.id)
            }
        default:
            return state;
    }
}

export default peopleReducer;