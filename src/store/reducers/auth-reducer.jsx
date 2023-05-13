import {
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    LOGIN_SUCCEEDED,
    GET_CURRENT_USER_REQUEST,
    GET_CURRENT_USER_SUCCEEDED,
    GET_CURRENT_USER_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCEEDED,
    LOGOUT_FAILURE,
} from "../types";

export default function auth_reducer(state = {}, action) {
    switch (action.type) {
        // GET CURRENT USER
        case GET_CURRENT_USER_REQUEST:
            return { ...state, getCurrentUserRequest: true };
        case GET_CURRENT_USER_SUCCEEDED:
            return {
                ...state,
                currentUser: action.payload,
                getCurrentUserErrorOccurred: false,
                getCurrentUserRequest: false,
            };
        case GET_CURRENT_USER_FAILURE:
            return {
                ...state,
                getCurrentUserError: action.payload,
                getCurrentUserErrorOccurred: true,
                getCurrentUserRequest: false,
            };

        // LOGIN
        case LOGIN_REQUEST:
            return { ...state, loginRequest: true };
        case LOGIN_SUCCEEDED:
            return {
                ...state,
                authenticatedUser: action.payload,
                isUserAuthenticated: true,
                loginErrorOccurred: false,
                loginRequest: false,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                loginError: action.payload,
                isUserAuthenticated: false,
                loginErrorOccurred: true,
                loginRequest: false,
            };

        // LOGOUT
        case LOGOUT_REQUEST:
            return { ...state, logoutRequest: true };
        case LOGOUT_SUCCEEDED:
            return {
                ...state,
                authenticatedUser: null,
                isUserAuthenticated: false,
                logoutErrorOccurred: false,
                logoutRequest: false,
            };
        case LOGOUT_FAILURE:
            return {
                ...state,
                loginError: action.payload,
                isUserAuthenticated: false,
                logoutErrorOccurred: true,
                logoutRequest: false,
            };

        default:
            return state;
    }
}
