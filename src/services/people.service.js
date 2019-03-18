import { get, post } from '../helpers/http-services';

const getAll = (currentUserId) => {
    return get(`members/${currentUserId}/people`);
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
    updatePerson,
    createPerson,
    getOptions
}