import { get, post } from '../helpers/http-services';

const AttendanceForm = ( memberID, year, week ) => {
    console.log(`members/${memberID}/attendance/cellgroup/${year}/${week}`);
    return get(`members/${memberID}/attendance/cellgroup/${year}/${week}`);

}

const saveCellGroupAttendance = ( memberID, year, week, attendance ) => {
    return post(`members/${memberID}/attendance/cellgroup/${year}/${week}`, attendance);
}

const getLeaderAttendancesByYear = ( memberID, year ) => {
    console.log(`members/${memberID}/attendance/cellgroup/${year}`);
    return get(`members/${memberID}/attendance/cellgroup/${year}`);
}

export default cellGroupService = {
    getLeaderAttendancesByYear,
    saveCellGroupAttendance,
    AttendanceForm
}