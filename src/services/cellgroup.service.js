import { get, post } from '../helpers/http-services';

const getCellGroupAttendance = ( memberID ) => {
    return get(`members/${memberID}/attendance/cellgroup`)

}

const createCellGroupAttendance = ( memberID, attendance ) => {
    return post(`members/${memberID}/attendance/cellgroup`, attendance);
}

export default cellGroupService = {
    getCellGroupAttendance,
    createCellGroupAttendance
}