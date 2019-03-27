import schoolClassService  from '../../services/schoolclass.service';
import { schoolClassConstants } from '../constants/schoolclass.constants';
import { alertActions } from './alert.actions';



const save = (data) => {
    const request = () => { return { type: schoolClassConstants.SAVE_REQUEST } }
    const success = (payload) => { return { type: schoolClassConstants.SAVE_SUCCESS, payload } }
    const failure = (error) => { return { type: schoolClassConstants.SAVE_FAILURE, error } }

    return (dispatch, getState) => {
        dispatch(request());
        schoolClassService.save(data)
            .then(
                res => {
                    if (res.ok) {
                        const payload = {
                            type: data.school_type,
                            data: res.data
                        }
                        dispatch(success(payload));
                        dispatch(alertActions.success( 'Successfully saved.' ));
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

const update = (id, data) => {
    const request = () => { return { type: schoolClassConstants.SAVE_REQUEST } }
    const success = (payload) => { return { type: schoolClassConstants.SAVE_SUCCESS, payload } }
    const failure = (error) => { return { type: schoolClassConstants.SAVE_FAILURE, error } }
    console.log(id, data);
    return (dispatch, getState) => {
        dispatch(request());
        schoolClassService.save(id, data)
            .then(
                res => {
                    if (res.ok) {
                        const payload = {
                            type: data.school_type,
                            data: res.data
                        }
                        dispatch(success(payload));
                        dispatch(alertActions.success( 'Successfully saved.' ));
                    } else {
                        dispatch(failure( res.data ));
                        dispatch(alertActions.error( res.data ));
                    }
                },
                err => {
                    console.log(err);
                    const error = typeof err === 'string' ? 'Oops! network error.' : err.message;
                    dispatch(failure( error ));
                    dispatch(alertActions.error( error ));
                }
            )
    }

}



const getPeopleWithEnrolledStudents = ( class_ID, query ) => {
    const request = () => { return { type: schoolClassConstants.GET_PEOPLE_WITH_STUDENTS_REQUEST } }
    const success = (payload) => { return { type: schoolClassConstants.GET_PEOPLE_WITH_STUDENTS_SUCCESS, payload } }
    const failure = (error) => { return { type: schoolClassConstants.GET_PEOPLE_WITH_STUDENTS_FAILURE, error } }

    return (dispatch, getState) => {
        dispatch(request());

        schoolClassService.getPeopleWithEnrolledStudents(class_ID, query)
            .then(
                res => {
                    if (res.ok) {
                        const payload = {
                            data: res.data
                        }
                        dispatch(success(payload));
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

const getByType = ( typeID ) => {
    const request = () => { return { type: schoolClassConstants.GET_BY_TYPE_REQUEST } }
    const success = (payload) => { return { type: schoolClassConstants.GET_BY_TYPE_SUCCESS, payload } }
    const failure = (error) => { return { type: schoolClassConstants.GET_BY_TYPE_FAILURE, error } }

    return (dispatch, getState) => {
        dispatch(request());

        schoolClassService.getByType(typeID)
            .then(
                res => {
                    if (res.ok) {
                        const payload = {
                            type: typeID,
                            data: res.data
                        }
                        dispatch(success(payload));
                    } else {
                        dispatch(failure( res.data ));
                        dispatch(alertActions.error( res.data ));
                    }
                },
                err => {
                    console.log(err);
                    const error = typeof err === 'string' ? 'Oops! network error.' : err.message;
                    dispatch(failure( error ));
                    dispatch(alertActions.error( error ));
                }
            )
    }
}



const enroll = (classID, personID, data) => {
    const request = () => { return { type: schoolClassConstants.GETALL_REQUEST } }
    const success = (payload) => { return { type: schoolClassConstants.GETALL_SUCCESS, payload } }
    const failure = (error) => { return { type: schoolClassConstants.GETALL_FAILURE, error } }

    return (dispatch, getState) => {
        dispatch(request());

        schoolClassService.enroll(classID, personID, data)
            .then(
                res => {
                    if (res.ok) {
                        const payload = {
                            id: personID
                        }
                        dispatch(success(payload));
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


export const schoolClassActions = {
    save,
    update,
    enroll,
    getByType,
    getPeopleWithEnrolledStudents
}