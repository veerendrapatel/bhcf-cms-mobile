import peopleService from '../../services/people.service';
import { peopleConstants } from '../constants';
import { alertActions } from '../actions/alert.actions';



const getAll = (currentUserId) => {
    const request = () => { return { type: peopleConstants.GETALL_REQUEST } }
    const success = (people) => { return { type: peopleConstants.GETALL_SUCCESS, people } }
    const failure = (error) => { return { type: peopleConstants.GETALL_FAILURE, error } }

    return (dispatch, getState) => {
        dispatch(request());

        peopleService.getAll( currentUserId )
            .then(
                res => {
                    if (res.ok) {
                        dispatch(success(res.people));
                    } else {
                        dispatch(failure( res.data ));
                        dispatch(alertActions.error( res.data ));
                    }
                },
                err => {
                    const error = typeof err === 'string' ? 'Oops! network error.' : err.message;
                    dispatch(failure( error ));
                    dispatch(alertActions.error( error ));
                }
            )
    }

}


const getOptions = () => {
    return (dispatch, getState) => {
        peopleService.getOptions()
            .then(
                res => {
                    if (res.ok) {
                        dispatch({ type: peopleConstants.FETCH_DROPDOWN_OPTIONS, options: res.data });
                    }
                },
                err => {
                    const error = typeof err === 'string' ? 'Oops! network error.' : err.message;
                    dispatch(failure( error ));
                    dispatch(alertActions.error( error ));
                }
            )
        
    }
}

const createPerson = (person) => {
    const request = () => { return { type: peopleConstants.CREATE_REQUEST } }
    const success = (person) => { return { type: peopleConstants.CREATE_SUCCESS, person } }
    const failure = (error) => { return { type: peopleConstants.CREATE_FAILURE, error } }

    return (dispatch, getState) => {
        dispatch(request());
        
        peopleService.createPerson(person).then(
            res => {
                if (res.ok) {
                    // make async call to database
                    dispatch(success(res.data));
                    dispatch(alertActions.success( 'Successfully Saved!' ));
                } else {
                    dispatch(failure(res.data));
                    dispatch(alertActions.error( res.data ));
                }
            },
            err => {
                const error = typeof err === 'string' ? 'Oops! network error.' : err.message;
                dispatch(failure( error ));
                dispatch(alertActions.error( error ));
            }
        )
        
    }
};

const updatePerson = (id, person) => {
    const request = () => { return { type: peopleConstants.UPDATE_REQUEST } }
    const success = (person) => { return { type: peopleConstants.UPDATE_SUCCESS, person } }
    const failure = (error) => { return { type: peopleConstants.UPDATE_FAILURE, error } }
    return (dispatch, getState) => {
        console.log(person);
        dispatch(request());
        peopleService.updatePerson(id, person).then(
            res => {
                if (res.ok) {
                    dispatch(success(res.data));
                    dispatch(alertActions.success( 'Successfully Saved!' ));
                } else {
                    dispatch(failure(res.data));
                    dispatch(alertActions.error( res.data ));
                }
            },
            err => {
                const error = typeof err === 'string' ? 'Oops! network error.' : err.message;
                dispatch(failure( error ));
                dispatch(alertActions.error( error ));
            }
        )
        
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
    getAll,
    findPeopleById,
    createPerson,
    updatePerson,
    deletePerson,
    getOptions
}