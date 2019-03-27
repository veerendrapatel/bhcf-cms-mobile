import { peopleConstants } from '../constants';


const initState = {
    people: null,
    network: null,
    error: null,
    loading: false
}
let payload = null;
const peopleReducer = (state = initState, action) => {
    payload = action.payload;

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
                people: payload.people
            }
        case peopleConstants.GETALL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case peopleConstants.GETNETWORK_REQUEST: 
            return {
                ...state,
                loading: true
            }
        case peopleConstants.GETNETWORK_SUCCESS:
            return {
                ...state,
                loading: false,
                network: payload.network
            }
        case peopleConstants.GETNETWORK_FAILURE:
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
                network: [...payload.network, payload.person]
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
        
            const index = state.network.findIndex(item => item.id === payload.person.id);  
            return {
                ...state,
                // optional 2nd arg in callback is the array index
                network: state.network.map((item, i) => {
                if (i === index) {
                    return payload.person
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
                options: payload.options
            }
        case peopleConstants.FIND_BY_ID: 
            const person = state.network.filter(item => item.id === payload.id);
            return {
                ...state,
                person: person ? person[0] : null
            }
        default:
            return state;
    }
}

export default peopleReducer;