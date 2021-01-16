import {loadFromLocalStorage} from "../utils/utils";

const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"

const usernameSaved = loadFromLocalStorage("username") || null;

const initialState = {
    username: usernameSaved,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                username: action.username
            };
        }
        case LOGOUT: {
            return {
                ...state,
                username: null,
            };
        }
        default:
            return state;
    }
}
