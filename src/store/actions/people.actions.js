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
                    dispatch(success(res.people));
                },
                err => {
                    dispatch(failure(err));
                    dispatch(alertActions.error( err.message ));
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
                    dispatch(alertActions.error( err.message ));
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
                dispatch(failure(err.message));
                dispatch(alertActions.error( err.message ));
            }
        )
        
    }
};

const updatePerson = (id, person) => {
    const request = () => { return { type: peopleConstants.UPDATE_REQUEST } }
    const success = (person) => { return { type: peopleConstants.UPDATE_SUCCESS, person } }
    const failure = (error) => { return { type: peopleConstants.UPDATE_FAILURE, error } }

    return (dispatch, getState) => {
        dispatch(request());
        peopleService.updatePerson(id, person).then(
            res => {
                if (res.ok) {
                    // make async call to database
                    console.log(res);
                    dispatch(success(res.data));
                    dispatch(alertActions.success( 'Successfully Saved!' ));
                } else {
                    dispatch(failure(res.data));
                    dispatch(alertActions.error( res.data ));
                }
            },
            err => {
                console.log(err);
                dispatch(failure(err.message));
                dispatch(alertActions.error( err.message ));
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
        dispatch({ type: peopleConstants.FIND_BY_ID, id });
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