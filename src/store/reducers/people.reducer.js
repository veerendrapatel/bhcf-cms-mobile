import { peopleConstants } from '../constants';




const initState = {
    totalSize: null,
    people: null,
    network: null,
    alert: null,
    loading: false
}
let payload = null;
let index = null;
let people = null;
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
                totalSize: payload.totalSize,
                people:[...state.people, payload.people]
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
        
            people = state.people;
            
            if (payload.ok && payload.network) {
                if (people !== null) {
                    
                    payload.network.map(data => {
                               
                        index = people.findIndex(item => item.id === data.id); 
                        
                        if (index === -1) {
                            people.push(data);
                        } else {
                            people.splice(index, 1, data);
                        }
                    })
                } else {
                    people = payload.network;
                }
            }
            return {
                ...state,
                loading: false,
                people: people
            }
        case peopleConstants.GET_MY_NETWORK_ROLLBACK:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case peopleConstants.ADD_NEW_MEMBER_REQUEST:
            // console.log('ADD_NEW_MEMBER_REQUEST');
            return {
                ...state,
                loading: true,
                people: [payload.data, ...state.people]
            }
        case peopleConstants.ADD_NEW_MEMBER_COMMIT:
            index = state.people.findIndex(item => item.id === action.meta.uid);
            state.people[index] = payload.data;
            // console.log('ADD_NEW_MEMBER_COMMIT');
            return {
                ...state,
                loading: false,
                people: state.people
            }
        case peopleConstants.ADD_NEW_MEMBER_ROLLBACK:
            // console.log('ADD_NEW_MEMBER_ROLLBACK');
            index = state.people.findIndex(item => item.id === action.meta.uid);
            return {
                ...state,
                people: [
                     ...state.people.slice(0, index),
                     ...state.people.slice(index + 1),
                ]
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
            
            index = state.people.findIndex(item => item.id === payload.data.id);
            state.people[index] = payload.data;
            return {
                ...state,
                people: state.people,
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
            const person = state.people ? state.people.filter(item => item.id === payload.id) : null;
            return {
                ...state,
                person: person ? person[0] : null
            }
        case peopleConstants.DELETE_MEMBER_REQUEST:
            // console.log('DELETE_MEMBER_REQUEST');
            return {
                ...state
            }
        case peopleConstants.DELETE_MEMBER_COMMIT:
            // console.log(action);
            index = state.people.findIndex(item => item.id === action.meta.id);
            // console.log('DELETE_MEMBER_COMMIT ' + index);
            
            return {
                ...state,
                people: [
                    ...state.people.slice(0, index),
                    ...state.people.slice(index + 1)
                ]
            }
        case peopleConstants.DELETE_MEMBER_ROLLBACK:
            // console.log('DELETE_MEMBER_ROLLBACK', action);
            return {
                ...state
            }
        default:
            return state;
    }
}

export default peopleReducer;