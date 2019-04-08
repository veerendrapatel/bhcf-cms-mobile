import { peopleConstants } from '../constants';
import { API_URL } from 'react-native-dotenv';
import uuid from 'uuid/v4';


const fetchAll = () => {
    return (dispatch, getState) => {
        const { auth } = getState();
        dispatch({
            type: peopleConstants.GET_ALL_REQUEST, 
            payload: null,
            meta: {
                offline: {
                    effect: {
                        url: `${API_URL}members/all`,
                        headers: {
                            Authorization: `Bearer ${auth.user.api_token}`
                        }
                    },
                    commit: { type: peopleConstants.GET_ALL_COMMIT },
                    rollback: { type: peopleConstants.GET_ALL_ROLLBACK  }
                }
            }
        });
    }

}


const fetchNetwork = (leaderID) => {
    return (dispatch, getState) => {
        const { auth } = getState();
        console.log(auth.user.api_token);
        dispatch({
            type: peopleConstants.GET_MY_NETWORK_REQUEST, 
            payload: null,
            meta: {
                offline: {
                    effect: {
                        url: `${API_URL}members/${leaderID}/network`,
                        headers: {
                            Authorization: `Bearer ${auth.user.api_token}`
                        }
                    },
                    commit: { type: peopleConstants.GET_MY_NETWORK_COMMIT },
                    rollback: { type: peopleConstants.GET_MY_NETWORK_ROLLBACK  }
                }
            }
        });
    }

}


const getOptions = () => {
    return (dispatch, getState) => {
        const { auth } = getState();
        dispatch({
            type: peopleConstants.FETCH_PEOPLE_OPTIONS_REQUEST, 
            payload: null,
            meta: {
                offline: {
                    effect: {
                        url: `${API_URL}members/dropdown-options`,
                        headers: {
                            Authorization: `Bearer ${auth.user.api_token}`
                        }
                    },
                    commit: { type: peopleConstants.FETCH_PEOPLE_OPTIONS_COMMIT },
                    rollback: { type: peopleConstants.FETCH_PEOPLE_OPTIONS_ROLLBACK  }
                }
            }
        });
    }
}

const createPerson = (person) => {
    

    return (dispatch, getState) => {
        const { auth } = getState();
        const uid = uuid();

        dispatch({
            type: peopleConstants.ADD_NEW_MEMBER_REQUEST, 
            payload: {data: Object.assign(person, { avatar: person.new_avatar_url, id: uid })},
            meta: {
                offline: {
                    effect: {
                        url: `${API_URL}members`,
                        json: person,
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${auth.user.api_token}`
                        }
                    },
                    commit: { type: peopleConstants.ADD_NEW_MEMBER_COMMIT, meta: { uid } },
                    rollback: { type: peopleConstants.ADD_NEW_MEMBER_ROLLBACK, meta: { uid }  }
                }
            }
        });
        
    }
};

const updatePerson = (id, person) => {
    return (dispatch, getState) => {
        const { auth } = getState();
        dispatch({
            type: peopleConstants.UPDATE_MEMBER_REQUEST, 
            payload: {data: person},
            meta: {
                offline: {
                    effect: {
                        url: `${API_URL}members`,
                        json: person,
                        method: 'PUT',
                        headers: {
                            Authorization: `Bearer ${auth.user.api_token}`
                        }
                    },
                    commit: { type: peopleConstants.UPDATE_MEMBER_COMMIT, meta: { uid } },
                    rollback: { type: peopleConstants.UPDATE_MEMBER_ROLLBACK, meta: { uid }  }
                }
            }
        });
        
    }
}

const deletePerson = (id) => {
    return (dispatch, getState) => {
        // make async call to database
        dispatch({ type: 'DELETE_PEOPLE', id });
    }
}

const findPeopleById = ( id ) => {
    return (dispatch, getState) => {
        const payload = {
            id: id
        };
        dispatch({ type: peopleConstants.FIND_BY_ID, payload });
    }
}

export const peopleActions = {
    fetchAll,
    findPeopleById,
    createPerson,
    updatePerson,
    deletePerson,
    getOptions,
    fetchNetwork
}