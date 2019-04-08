import { peopleConstants } from '../constants';




const initState = {
    people: null,
    network: null,
    alert: null,
    loading: false
}
let payload = null;
let index = null;
const peopleReducer = (state = initState, action) => {
    payload = action.payload;

    switch(action.type) {
        case peopleConstants.GET_ALL_REQUEST: 
            return {
                ...state,
                loading: true
            }
        case peopleConstants.GET_ALL_COMMIT:
        
            return {
                ...state,
                loading: false,
                people: payload.people
            }
        case peopleConstants.GET_ALL_ROLLBACK:
            return {
                ...state,
                loading: false
            }

        case peopleConstants.GET_MY_NETWORK_REQUEST: 
            
            return {
                ...state,
                loading: true
            }
        case peopleConstants.GET_MY_NETWORK_COMMIT:
            
            return {
                ...state,
                loading: false,
                people: action.payload.ok ? payload.network : state.people
            }
        case peopleConstants.GET_MY_NETWORK_ROLLBACK:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case peopleConstants.GET_MY_NETWORK:
            return {
                ...state,
                network: state.people.filter(item => item.parent_id === payload.memberID),
                loading: false,
            }

        case peopleConstants.ADD_NEW_MEMBER_REQUEST:
            return {
                ...state,
                loading: true,
                people: [...state.people, payload.data]
            }
        case peopleConstants.ADD_NEW_MEMBER_COMMIT:
            return {
                ...state,
                loading: false,
                alert: {
                    type: 'success',
                    message: 'Successfully saved.'
                },
                people: state.people.filter(item => {
                    if (item.id === action.meta.uid) {
                        return payload.data;
                    }
                    return item;
                }),
            }
        case peopleConstants.ADD_NEW_MEMBER_ROLLBACK:
            return {
                ...state
            }
        case peopleConstants.CREATE_FAILURE:
            return {
                ...state,
                loading: false
            }
        case peopleConstants.UPDATE_MEMBER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case peopleConstants.UPDATE_MEMBER_COMMIT:
            index = state.network.findIndex(item => item.id === payload.person.id);  
            return {
                ...state,
                people: state.people.splice(index, 1, payload.data)
            }

        case peopleConstants.UPDATE_MEMBER_ROLLBACK:
            return {
                ...state,
                loading: false
            }

        case peopleConstants.FETCH_PEOPLE_OPTIONS_COMMIT:
            return {
                ...state,
                options: payload.data
            }
        case peopleConstants.FIND_BY_ID: 
            const person = state.people.filter(item => item.id === payload.id);
            return {
                ...state,
                person: person ? person[0] : null
            }
        default:
            return state;
    }
}

export default peopleReducer;