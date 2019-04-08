import { get, post } from '../helpers/http-services';

const getAll = () => {
    return get(`members/all`);
}

const getNetwork = (currentUserId) => {
    return get(`members/${currentUserId}/network`);
}

const createPerson = (person) => {
    return post(`members`, person)
}

const updatePerson = (id, person) => {
    return post(`members/${id}`, person)
}

const getOptions = () => {
    return get(`members/dropdown-options`)
}

export default peopleService = {
    getAll,
    getNetwork,
    updatePerson,
    createPerson,
    getOptions
}