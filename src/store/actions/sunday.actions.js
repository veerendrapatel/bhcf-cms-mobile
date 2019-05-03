import {sundayConstants} from '../constants/sunday.constants';
import { API_URL } from 'react-native-dotenv';



const AttendanceForm = ( memberID, year, week ) => {
    return (dispatch, getState) => {
        const { auth } = getState();
        dispatch({
            type: sundayConstants.CREATE_SUNDAYREPORT_REQUEST, 
            payload: null,
            meta: {
                offline: {
                    effect: {
                        url: `${API_URL}members/${memberID}/sundayreport/${year}/${week}`,
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${auth.user.api_token}`
                        }
                    },
                    commit: { type: sundayConstants.CREATE_SUNDAYREPORT_COMMIT, meta: { year, week }},
                    rollback: { type: sundayConstants.CREATE_SUNDAYREPORT_ROLLBACK, meta: { year, week } }
                }
            }
        });
    }
}


const saveAttendance = ( memberID, year, week, attendance, index ) => {
    return (dispatch, getState) => {
        const { auth } = getState();
        const meta =  { year, week, index };
        // console.log(`${API_URL}members/${memberID}/sundayreport/${year}/${week}`);
        // console.log(`Bearer ${auth.user.api_token}`);
        // console.log(attendance);
        dispatch({
            type: sundayConstants.SAVE_SUNDAY_ATTENDANCE_REQUEST, 
            payload: {
                week, 
                year,
                attendance, 
                index
            },
            meta: {
                offline: {
                    effect: {
                        url: `${API_URL}members/${memberID}/sundayreport/${year}/${week}`,
                        method: 'POST',
                        json: attendance,
                        headers: {
                            Authorization: `Bearer ${auth.user.api_token}`
                        }
                    },
                    commit: { type: sundayConstants.SAVE_SUNDAY_ATTENDANCE_COMMIT, meta: meta},
                    rollback: { type: sundayConstants.SAVE_SUNDAY_ATTENDANCE_ROLLBACK, meta: meta }
                }
            }
        });

    }
}

const getLeaderAttendancesByYear = ( memberID, year ) =>  {
    return (dispatch, getState) => {
        const { auth } = getState();
        dispatch({
            type: sundayConstants.GET_LEADER_ATTENDANCE_BY_YEAR_REQUEST, 
            payload: null,
            meta: {
                offline: {
                    effect: {
                        url: `${API_URL}members/${memberID}/sundayreport/${year}`,
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${auth.user.api_token}`
                        }
                    },
                    commit: { type: sundayConstants.GET_LEADER_YEARLY_ATTENDANCES_COMMIT, meta: { year }},
                    rollback: { type: sundayConstants.GET_LEADER_YEARLY_ATTENDANCES_ROLLBACK, meta: { year } }
                }
            }
        });
    }
}

export const sundayCelebrationActions = {
    getLeaderAttendancesByYear,
    saveAttendance,
    AttendanceForm
}