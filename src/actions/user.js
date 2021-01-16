import {LOGIN, LOGOUT} from "../constants/user";

export const login = (username) => {
    return {
        type: LOGIN,
        username
    };
};

export const logout = () => {
    return {
        type: LOGOUT
    };
};
