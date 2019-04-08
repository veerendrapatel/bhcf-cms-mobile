import classCategoryService  from '../../services/classcategory.service';
import { classCategoryConstants } from '../constants';
import { alertActions } from './alert.actions';



const getAll = (currentUserId) => {
    const request = () => { return { type: classCategoryConstants.GET_ALL_REQUEST } }
    const success = (payload) => { return { type: classCategoryConstants.GET_ALL_COMMIT, payload } }
    const failure = (error) => { return { type: classCategoryConstants.GET_ALL_ROLLBACK, error } }

    return (dispatch, getState) => {
        dispatch(request());

        classCategoryService.getAll()
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