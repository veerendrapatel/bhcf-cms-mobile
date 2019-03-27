import schoolStatusService  from '../../services/schoolstatus.service';
import { schoolStatusConstants } from '../constants';
import { alertActions } from '../actions/alert.actions';



const getAll = (currentUserId) => {
    const request = () => { return { type: schoolStatusConstants.GETALL_REQUEST } }
    const success = (payload) => { return { type: schoolStatusConstants.GETALL_SUCCESS, payload } }
    const failure = (error) => { return { type: schoolStatusConstants.GETALL_FAILURE, error } }

    return (dispatch, getState) => {
        dispatch(request());

        schoolStatusService.getAll()
            .then(
                res => {
                    if (res.ok) {
                        dispatch(success(res.data));
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


export const schoolStatusActions = {
    getAll
}