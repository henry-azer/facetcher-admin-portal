import axios from "axios";

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

} from "../../types";

import { APIs_URL } from "../../../constants/app_constants";

const URL = APIs_URL.STAGING;

export const getAdmins = () => (dispatch) => {
    dispatch({ type: GET_ADMINS_REQUEST });
    axios
        .get(`${URL}/user/find-all`)
        .then((response) => {
            if (response.data.success) {
                const admins = response.data.body.filter((user) => {
                    const userRoles = user.userRoles;
                    if (userRoles && userRoles.length > 0) {
                        for (const userRole of userRoles) {
                            const role = userRole.role;
                            if (role && role.name === "ADMIN") {
                                return true;
                            }
                        }
                    }
                    return false;
                });
                dispatch({
                    type: GET_ADMINS_SUCCEEDED,
                    payload: admins,
                });
            }
        })
        .catch((error) => {
            dispatch({
                type: GET_ADMINS_FAILURE,
                payload: error.response.data.message,
            });
        });
};

export const getUsers = () => (dispatch) => {
    dispatch({ type: GET_USERS_REQUEST });
    axios
        .get(`${URL}/user/find-all`)
        .then((response) => {
            if (response.data.success) {
                const users = response.data.body.filter((user) => {
                    const userRoles = user.userRoles;
                    if (userRoles && userRoles.length > 0) {
                        for (const userRole of userRoles) {
                            const role = userRole.role;
                            if (role && role.name === "USER") {
                                return true;
                            }
                        }
                    }
                    return false;
                });
                dispatch({
                    type: GET_USERS_SUCCEEDED,
                    payload: users,
                });
            }
        })
        .catch((error) => {
            dispatch({
                type: GET_USERS_FAILURE,
                payload: error.response.data.message,
            });
        });
};

export const getUserById = (userId) => (dispatch) => {
    axios.get(`${URL}/user/find-by-id/${userId}`).then((res) => {
        if (res.data.success)
            dispatch({
                type: GET_USER_BY_ID,
                payload: res.data.body,
            });
    });
};

export const createUser = (user, roleID) => (dispatch) => {
    dispatch({ type: CREATE_USER_REQUEST });
    axios.post(`${URL}/user`, user)
        .then((response1) => {
            if (response1.data.success) {
                axios.post(`${URL}/user-role/assign`, {
                    userId: response1.data.body.id,
                    roleId: roleID,
                }).then((response2) => {
                    if (response2.data.success) {
                        dispatch({
                            type: CREATE_USER_SUCCEEDED,
                            payload: response1.data,
                        });
                    }
                })
                    .catch((error) => {
                        dispatch({
                            type: CREATE_USER_FAILURE,
                            payload: error.response.data.message,
                        });
                    });
            }
        })
        .catch((error) => {
            dispatch({
                type: CREATE_USER_FAILURE,
                payload: error.response.data.message,
            });
        });
};

export const updateUser = (user) => async (dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST });
    axios.put(`${URL}/user`, user)
        .then((response) => {

            if (response.data.success) {
                dispatch({
                    type: UPDATE_USER_SUCCEEDED,
                    payload: response.data,
                });
            }
        })
        .catch((error) => {
            dispatch({
                type: UPDATE_USER_FAILURE,
                payload: error.response.data.message,
            });
        });
};

export const toggleUserAccountDeletion = (userId) => (dispatch) => {
    dispatch({ type: TOGGLE_DELETION_USER_REQUEST });
    axios
        .put(`${URL}/user/${userId}/toggle-deletion`)
        .then((response) => {
            if (response.data.success) {
                dispatch({
                    type: TOGGLE_DELETION_USER_SUCCEEDED,
                    payload: response.data,
                });
            }
        })
        .catch((error) => {
            dispatch({
                type: TOGGLE_DELETION_USER_FAILURE,
                payload: error.response.data.message,
            });
        });
};

export const uploadUserProfilePicture = (photo) => async (dispatch) => {
    dispatch({ type: USER_PROFILE_PICTURE_REQUEST });
    const formData = new FormData();
    formData.append("photo", photo);
    axios
        .post(`${URL}/user/profile-picture`, formData)
        .then((response) => {
            if (response.data.success) {
                dispatch({
                    type: USER_PROFILE_PICTURE_SUCCEEDED,
                    payload: response.data.body,
                });
            }
        })
        .catch((error) => {
            dispatch({
                type: USER_PROFILE_PICTURE_ERROR,
                payload: error.response.data.message,
            });
        });
};

export function clearGetUserById() {
    return {
        type: CLEAR_GET_USER_BY_ID,
        payload: null,
    };
};

export function clearCreateUser() {
    return {
        type: CLEAR_CREATE_USER,
        payload: null,
    };
};

export function clearUpdateUser() {
    return {
        type: CLEAR_UPDATE_USER,
        payload: null,
    };
};

export function clearToggleUserAccountDeletion() {
    return {
        type: CLEAR_TOGGLE_DELETION_USER,
        payload: null,
    };
};