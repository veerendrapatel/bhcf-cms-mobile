import cellGroupService from '../../services/cellgroup.service';
import { alertActions } from '../actions/alert.actions';
import {cellGroupConstants} from '../constants/cellgroup.constants';

const AttendanceForm = ( memberID, year, week ) => {
    const request = () => { return { type: cellGroupConstants.GET_CELLGROUP_ATTENDANCE_REQUEST } }
    const success = ( payload ) => { return { type: cellGroupConstants.GET_CELLGROUP_ATTENDANCE_SUCCESS, payload } }
    const failure = ( error ) => { return { type: cellGroupConstants.GET_CELLGROUP_ATTENDANCE_FAILURE, error } }
    
    return (dispatch, getState) => {
        dispatch(request());
        cellGroupService.AttendanceForm(memberID, year, week)
            .then(
                res => {
                    if (res.ok) {
                        let payload = {
                            year: year,
                            week: week,
                            data:  res.data
                        };
                         dispatch(success( payload ));
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


const saveCellGroupAttendance = ( memberID, year, week, attendance, index ) => {
    const request = () => { return { type: cellGroupConstants.CREATE_CELLGROUP_ATTENDANCE_REQUEST } }
    const success = ( payload ) => { return { type: cellGroupConstants.CREATE_CELLGROUP_ATTENDANCE_SUCCESS, payload } }
    const failure = ( error ) => { return { type: cellGroupConstants.CREATE_CELLGROUP_ATTENDANCE_FAILURE, error } }

    return (dispatch, getState) => {
        dispatch(request());
        cellGroupService.saveCellGroupAttendance( memberID, year, week, attendance )
            .then(
                res => {
                    
                    if (res.ok) {
                        const payload =  {
                            year: year,
                            week: week,
                            index: index, 
                            attendance: res.data
                        };
                        dispatch(success( payload ));
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

const getLeaderAttendancesByYear = ( memberID, year ) =>  {
    const request = () => { return { type: cellGroupConstants.GET_LEADER_ATTENDANCE_BY_YEAR_REQUEST } }
    const success = ( payload ) => { return { type: cellGroupConstants.GET_LEADER_ATTENDANCE_BY_YEAR_SUCCESS, payload } }
    const failure = ( error ) => { return { type: cellGroupConstants.GET_LEADER_ATTENDANCE_BY_YEAR_FAILURE, error } }

    return (dispatch, getState) => {
        dispatch(request());
        cellGroupService.getLeaderAttendancesByYear( memberID, year )
            .then(
                res => {
                    
                    if (res.ok) {
                        const item = { year: year, data: res.data };
                        dispatch(success( item ));
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

export const cellGroupActions = {
    getLeaderAttendancesByYear,
    saveCellGroupAttendance,
    AttendanceForm
}