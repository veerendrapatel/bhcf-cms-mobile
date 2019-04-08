import { get, post } from '../helpers/http-services';

const save = (data) => {
    return post(`classes`, data);
}

const update = (id, data) => {
    return post(`classes/${id}`, data);
}

const getPeopleWithEnrolledStudents = ( classID, query ) => {
    return get(`classes/${classID}/all-members-with-enrolled-students?${query}`)
}

const getByType = ( typeID ) => {
    return get(`classes/${typeID}/get-by-type`);
}

const enroll = ( classID, person, data ) => {
    return post(`classes/${classID}/${person}/enroll`, data);
}


export default schoolClassService = {
    save,
    update,
    enroll,
    getByType,
    getPeopleWithEnrolledStudents
}