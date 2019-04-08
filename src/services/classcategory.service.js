import { get, post } from '../helpers/http-services';

const getAll = () => {
    return get(`class/categories`);
}



export default classCategoryService = {
    getAll
}