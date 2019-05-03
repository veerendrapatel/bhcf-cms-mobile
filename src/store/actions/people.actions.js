import { peopleConstants } from '../constants';
import { API_URL } from 'react-native-dotenv';
import uuid from 'uuid/v4';


const fetchAll = (query = '') => {
    return (dispatch, getState) => {
        const { auth } = getState();
        dispatch({
            type: peopleConstants.GET_ALL_REQUEST, 
            payload: null,
            meta: {
                offline: {
                    effect: {
                        url: `${API_URL}members/all?${query}`,
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
        console.log(`${API_URL}members/${leaderID}/network`);
        console.log(`Bearer ${auth.user.api_token}`);
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
                        url: `${API_URL}members/${id}`,
                        json: person,
                        method: 'PUT',
                        headers: {
                            Authorization: `Bearer ${auth.user.api_token}`
                        }
                    },
                    commit: { type: peopleConstants.UPDATE_MEMBER_COMMIT},
                    rollback: { type: peopleConstants.UPDATE_MEMBER_ROLLBACK  }
                }
            }
        });
        
    }
}

const deletePerson = (id) => {
    return (dispatch, getState) => {
        const { auth } = getState();
        // console.log(`${API_URL}members/${id}`);
        // console.log(`Bearer ${auth.user.api_token}`);

        dispatch({
            type: peopleConstants.DELETE_MEMBER_REQUEST, 
            payload: {data: id},
            meta: {
                offline: {
                    effect: {
                        url: `${API_URL}members/${id}`,
                        method: 'DELETE',
                        headers: {
                            Authorization: `Bearer ${auth.user.api_token}`
                        }
                    },
                    commit: { type: peopleConstants.DELETE_MEMBER_COMMIT, meta: { id }},
                    rollback: { type: peopleConstants.DELETE_MEMBER_ROLLBACK, meta: { id }  }
                }
            }
        });
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