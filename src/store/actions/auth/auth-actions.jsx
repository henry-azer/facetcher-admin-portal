import axios from "axios";

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
} from "../../types";

import Cookies from "universal-cookie";
import {
    APIs_URL,
    ACCESS_TOKEN,
    IS_USER_AUTHENTICATED,
} from "../../../constants/app_constants";

const cookies = new Cookies();

const URL = APIs_URL.STAGING;

export const getCurrentUser = () => (dispatch) => {
    dispatch({ type: GET_CURRENT_USER_REQUEST });
    axios
        .get(`${URL}/auth/current`)
        .then((response) => {
            if (response.data.success) {
                dispatch({
                    type: GET_CURRENT_USER_SUCCEEDED,
                    payload: response.data.body,
                });
            }
        })
        .catch((error) => {
            dispatch({
                type: GET_CURRENT_USER_FAILURE,
                payload: error.response.data.message,
            });
        });
};

export const authenticateUser = (user) => (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    axios
        .post(`${URL}/auth/log-in`, {
            email: user.email,
            password: user.password,
        })
        .then((response1) => {
            if (response1.data.success) {
                cookies.set(ACCESS_TOKEN, `${response1.data.body.accessToken}`);
                axios.get(`${URL}/auth/current`).then((response2) => {
                    if (response2.data.success) {
                        const userRoles = response2.data.body.userRoles;
                        if (userRoles && userRoles.length > 0) {
                            let isAdmin = false;
                            for (const userRole of userRoles) {
                                const role = userRole.role;
                                if (role && role.name === "ADMIN") {
                                    isAdmin = true;
                                    break;
                                }
                            }
                            if (isAdmin) {
                                if (response2.data.body.markedAsDeleted) {
                                    cookies.set(IS_USER_AUTHENTICATED, "false"); 
                                    cookies.set(ACCESS_TOKEN, ACCESS_TOKEN);
                                    dispatch({
                                        type: LOGIN_FAILURE,
                                        payload: "This account has been deactivated, Please contact the administrator.",
                                    });
                                } else {
                                    cookies.set(IS_USER_AUTHENTICATED, "true");
                                    cookies.set(
                                        ACCESS_TOKEN,
                                        `${response1.data.body.accessToken}`
                                    );
                                    dispatch({
                                        type: LOGIN_SUCCEEDED,
                                        payload: response2.data.body,
                                    });
                                }
                            } else {
                                cookies.set(IS_USER_AUTHENTICATED, "false");
                                cookies.set(ACCESS_TOKEN, ACCESS_TOKEN);
                                dispatch({
                                    type: LOGIN_FAILURE,
                                    payload: "Access denied, Please contact the administrator.",
                                });
                            }
                        } else {
                            cookies.set(IS_USER_AUTHENTICATED, "false");
                            cookies.set(ACCESS_TOKEN, ACCESS_TOKEN);
                            dispatch({
                                type: LOGIN_FAILURE,
                                payload: "Access denied, Please contact the administrator.",
                            });
                        }
                    }
                });
            }
        })
        .catch((error) => {
            cookies.set(IS_USER_AUTHENTICATED, "false");
            dispatch({
                type: LOGIN_FAILURE,
                payload: error.response.data.message,
            });
        });
};

export const logoutUser = () => (dispatch) => {
    dispatch({ type: LOGOUT_REQUEST });
    axios
        .get(`${URL}/auth/log-out`)
        .then((response) => {
            if (response.data.success) {
                cookies.remove(ACCESS_TOKEN);
                cookies.set(IS_USER_AUTHENTICATED, "false");
                dispatch({
                    type: LOGOUT_SUCCEEDED,
                    payload: response.data.body,
                });
                window.location.reload();
            }
        })
        .catch((error) => {
            dispatch({
                type: LOGOUT_FAILURE,
                payload: error.response.data.message,
            });
        });
};