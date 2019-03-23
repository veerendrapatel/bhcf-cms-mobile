import { postNoToken } from '../helpers/http-services';

const logout = () => {
    return postNoToken(`logout`);

}

const login = (username, password) => {
    return postNoToken(`login`, { username, password });
}

export const authService  = {
    login,
    logout
}