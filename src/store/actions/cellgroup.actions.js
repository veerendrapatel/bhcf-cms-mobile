import cellGroupService from '../../services/cellgroup.service';
import { alertActions } from '../actions/alert.actions';
import {cellGroupConstants} from '../constants/cellgroup.constants';
import { API_URL } from 'react-native-dotenv';



const AttendanceForm = ( memberID, year, week ) => {
    return (dispatch, getState) => {
        const { auth } = getState();
        dispatch({
            type: cellGroupConstants.CREATE_CELLREPORT_REQUEST, 
            payload: null,
            meta: {
                offline: {
                    effect: {
                        url: `${API_URL}members/${memberID}/cellreport/${year}/${week}`,
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${auth.user.api_token}`
                        }
                    },
                    commit: { type: cellGroupConstants.CREATE_CELLREPORT_COMMIT, meta: { year, week }},
                    rollback: { type: cellGroupConstants.CREATE_CELLREPORT_ROLLBACK, meta: { year, week } }
                }
            }
        });
    }
}


const saveAttendance = ( memberID, year, week, attendance, index ) => {
    return (dispatch, getState) => {
        const { auth } = getState();
        const meta =  { year, week, index };
        dispatch({
            type: cellGroupConstants.SAVE_CELLGROUP_ATTENDANCE_REQUEST, 
            payload: {
                week, 
                year,
                attendance, 
                index
            },
            meta: {
                offline: {
                    effect: {
                        url: `${API_URL}members/${memberID}/cellreport/${year}/${week}`,
                        method: 'POST',
                        json: attendance,
                        headers: {
                            Authorization: `Bearer ${auth.user.api_token}`
                        }
                    },
                    commit: { type: cellGroupConstants.SAVE_CELLGROUP_ATTENDANCE_COMMIT, meta: meta},
                    rollback: { type: cellGroupConstants.SAVE_CELLGROUP_ATTENDANCE_ROLLBACK, meta: meta }
                }
            }
        });

    }
}

const getLeaderAttendancesByYear = ( memberID, year ) =>  {
    return (dispatch, getState) => {
        const { auth } = getState();
        dispatch({
            type: cellGroupConstants.GET_LEADER_ATTENDANCE_BY_YEAR_REQUEST, 
            payload: null,
            meta: {
                offline: {
                    effect: {
                        url: `${API_URL}members/${memberID}/cellreport/${year}`,
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${auth.user.api_token}`
                        }
                    },
                    commit: { type: cellGroupConstants.GET_LEADER_YEARLY_ATTENDANCES_COMMIT, meta: { year }},
                    rollback: { type: cellGroupConstants.GET_LEADER_YEARLY_ATTENDANCES_ROLLBACK, meta: { year } }
                }
            }
        });
    }
}

export const cellGroupActions = {
    getLeaderAttendancesByYear,
    saveAttendance,
    AttendanceForm
}