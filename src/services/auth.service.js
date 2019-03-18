import { get, post } from '../helpers/http-services';

const logout = () => {
    return post(`logout`);

}

const login = (username, password) => {
    return post(`login`, { username, password });
}

export const authService  = {
    login,
    logout
}