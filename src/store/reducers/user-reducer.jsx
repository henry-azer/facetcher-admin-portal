import {
    GET_USER_BY_ID,
    CLEAR_GET_USER_BY_ID,

    GET_ADMINS_REQUEST,
    GET_ADMINS_SUCCEEDED,
    GET_ADMINS_FAILURE,

    GET_USERS_REQUEST,
    GET_USERS_SUCCEEDED,
    GET_USERS_FAILURE,

    CREATE_USER_REQUEST,
    CREATE_USER_SUCCEEDED,
    CREATE_USER_FAILURE,
    CLEAR_CREATE_USER,

    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCEEDED,
    UPDATE_USER_FAILURE,
    CLEAR_UPDATE_USER,

    TOGGLE_DELETION_USER_REQUEST,
    TOGGLE_DELETION_USER_SUCCEEDED,
    TOGGLE_DELETION_USER_FAILURE,
    CLEAR_TOGGLE_DELETION_USER,

    USER_PROFILE_PICTURE_REQUEST,
    USER_PROFILE_PICTURE_SUCCEEDED,
    USER_PROFILE_PICTURE_ERROR,

} from "../actions/users/users-types";

export default function users_reducer(state = {}, action) {
    switch (action.type) {
        // GET ADMINS
        case GET_ADMINS_REQUEST:
            return { ...state, getAdminsRequest: true };
        case GET_ADMINS_SUCCEEDED:
            return {
                ...state,
                admins: action.payload,
                getAdminsErrorOccurred: false,
                getAdminsRequest: false,
            };
        case GET_ADMINS_FAILURE:
            return {
                ...state,
                getAdminsError: action.payload,
                getAdminsErrorOccurred: true,
                getAdminsRequest: false,
            };

        // GET USERS
        case GET_USERS_REQUEST:
            return { ...state, getUsersRequest: true };
        case GET_USERS_SUCCEEDED:
            return {
                ...state,
                users: action.payload,
                getUsersErrorOccurred: false,
                getUsersRequest: false,
            };
        case GET_USERS_FAILURE:
            return {
                ...state,
                getUsersError: action.payload,
                getUsersErrorOccurred: true,
                getUsersRequest: false,
            };

        // CREATE USER
        case CREATE_USER_REQUEST:
            return { ...state, createUserRequest: true };
        case CREATE_USER_SUCCEEDED:
            return {
                ...state,
                createdUser: action.payload.body,
                createdUserMessage: action.payload.message,
                createUserErrorOccurred: false,
                createUserRequest: false,
            };
        case CREATE_USER_FAILURE:
            return {
                ...state,
                createUserError: action.payload,
                createUserErrorOccurred: true,
                createUserRequest: false,
            };
        case CLEAR_CREATE_USER:
            return {
                ...state,
                createdUser: null,
                createUserError: null,
                createUserRequest: null,
                createdUserMessage: null,
                createUserErrorOccurred: null,
            };

        // UPDATE USER
        case UPDATE_USER_REQUEST:
            return { ...state, updateUserRequest: true };
        case UPDATE_USER_SUCCEEDED:
            return {
                ...state,
                updatedUser: action.payload.body,
                updatedUserMessage: action.payload.message,
                updateUserErrorOccurred: false,
                updateUserRequest: false,
            };
        case UPDATE_USER_FAILURE:
            return {
                ...state,
                updateUserError: action.payload,
                updateUserErrorOccurred: true,
                updateUserRequest: false,
            };
        case CLEAR_UPDATE_USER:
            return {
                ...state,
                updatedUser: null,
                updateUserError: null,
                updateUserRequest: null,
                updatedUserMessage: null,
                updateUserErrorOccurred: null,
            };

        // TOGGLE DELETION USER
        case TOGGLE_DELETION_USER_REQUEST:
            return { ...state, toggleDeletionUserRequest: true };
        case TOGGLE_DELETION_USER_SUCCEEDED:
            return {
                ...state,
                toggledDeletionUser: action.payload.body,
                toggleDeletionUserMessage: action.payload.message,
                toggleDeletionUserErrorOccurred: false,
                toggleDeletionUserRequest: false,
            };
        case TOGGLE_DELETION_USER_FAILURE:
            return {
                ...state,
                toggleDeletionUserError: action.payload,
                toggleDeletionUserErrorOccurred: true,
                toggleDeletionUserRequest: false,
            };
        case CLEAR_TOGGLE_DELETION_USER:
            return {
                ...state,
                toggledDeletionUser: null,
                toggleDeletionUserMessage: null,
                toggleDeletionUserError: null,
                toggleDeletionUserErrorOccurred: null,
                toggleDeletionUserRequest: null,
            };

        // UPDATE USER PROFILE PICTURE
        case USER_PROFILE_PICTURE_REQUEST:
            return { ...state, userProfilePictureRequest: true };
        case USER_PROFILE_PICTURE_SUCCEEDED:
            return {
                ...state,
                userProfilePictureSucceeded: action.payload,
                userProfilePictureRequest: false,
            };
        case USER_PROFILE_PICTURE_ERROR:
            return {
                ...state,
                userProfilePictureError: action.payload,
                userProfilePictureRequest: false,
            };

        case GET_USER_BY_ID:
            return {
                ...state,
                userById: action.payload,
            };
        case CLEAR_GET_USER_BY_ID:
            return {
                ...state,
                userById: null,
            };

        default:
            return state;
    }
}
