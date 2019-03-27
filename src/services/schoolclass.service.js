import { get, post } from '../helpers/http-services';

const save = (data) => {
    return post(`school/classes`, data);
}

const update = (id, data) => {
    return post(`school/classes/${id}`, data);
}

const getPeopleWithEnrolledStudents = ( classID, query ) => {
    return get(`school/classes/${classID}/all-members-with-enrolled-students?${query}`)
}

const getByType = ( typeID ) => {
    return get(`school/classes/${typeID}/get-by-type`);
}

const enroll = ( classID, person, data ) => {
    return post(`school/classes/${classID}/${person}/enroll`, data);
}


export default schoolClassService = {
    save,
    update,
    enroll,
    getByType,
    getPeopleWithEnrolledStudents
}