import cellGroupService from '../../services/cellgroup.service';
import { alertActions } from '../actions/alert.actions';
import {cellGroupConstants} from '../constants/cellgroup.constants';

const getCellGroupAttendance = ( memberID ) => {
    const request = () => { return { type: cellGroupConstants.GET_CELLGROUP_ATTENDANCE_REQUEST } }
    const success = ( attendance ) => { return { type: cellGroupConstants.GET_CELLGROUP_ATTENDANCE_SUCCESS, attendance } }
    const failure = ( error ) => { return { type: cellGroupConstants.GET_CELLGROUP_ATTENDANCE_FAILURE, error } }
    return (dispatch, getState) => {
        dispatch(request());
        cellGroupService.getCellGroupAttendance(memberID)
            .then(
                res => {
                    if (res.ok) {
                        dispatch(success( res.data ));
                        dispatch(alertActions.success( res.data ));
                    } else {
                        dispatch(failure( res.data ));
                        dispatch(alertActions.error( res.data ));
                    }
                        
                },
                err => {
                    dispatch(failure( err.message ));
                    dispatch(alertActions.error( err.message ));
                }
            )
    }
}


const createCellGroupAttendance = ( memberID, attendance ) => {
    const request = () => { return { type: cellGroupConstants.CREATE_CELLGROUP_ATTENDANCE_REQUEST } }
    const success = ( attendance ) => { return { type: cellGroupConstants.CREATE_CELLGROUP_ATTENDANCE_SUCCESS, attendance } }
    const failure = ( error ) => { return { type: cellGroupConstants.CREATE_CELLGROUP_ATTENDANCE_FAILURE, error } }

    return (dispatch, getState) => {
        dispatch(request());
        cellGroupService.createCellGroupAttendance( memberID, attendance )
            .then(
                res => {
                    if (res.ok) {
                        dispatch(success( res.data ));
                        dispatch(alertActions.success( res.data ));
                    } else {
                        dispatch(failure( res.data ));
                        dispatch(alertActions.error( res.data ));
                    }
                },
                err => {
                    dispatch(failure( err.message ));
                    dispatch(alertActions.error( err.message ));
                }
            )
    }
}

export const cellGroupActions = {
    getCellGroupAttendance,
    createCellGroupAttendance
}