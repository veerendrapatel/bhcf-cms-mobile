import { get, post } from '../helpers/http-services';

const getAll = () => {
    return get(`school/statuses`);
}



export default schoolStatusService = {
    getAll
}