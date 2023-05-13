import axios from "axios";
import { APIs_URL } from "../../../constants/app_constants";

import {
    ADDING_USER,
    ADDING_USER_FAILED,
    CLEAR_REGISTRATION_DETAILS,
    GET_ALL_USERS,
    GET_USER_BY_ID,
    USER_ADDED_SUCCESSFULLY,

    USER_PROFILE_PICTURE_REQUEST,
    USER_PROFILE_PICTURE_SUCCEEDED,
    USER_PROFILE_PICTURE_ERROR,
} from "../../types";

const URL = APIs_URL.STAGING;

export const getAllUsers = () => (dispatch) => {
    axios.get(`${URL}/user/find-all`).then((res) => {
        console.log(res);
        if (res.data.success)
            dispatch({
                type: GET_ALL_USERS,
                payload: res.data.body.filter((obj) => {
                    return (
                        obj.markedAsDeleted === false && obj.userRoles[0]
                        // obj.userRoles[0].role.name !== "ADMIN"
                    );
                }),
            });
    });
};
export const getUserById = (userId) => (dispatch) => {
    axios.get(`${URL}/user/find-by-id/${userId}`).then((res) => {
        console.log(res);
        if (res.data.success)
            dispatch({
                type: GET_USER_BY_ID,
                payload: res.data.body,
            });
    });
};
export const addUser = (user, roleID, gender) => (dispatch) => {
    dispatch({ type: ADDING_USER });

    axios
        .post(`${URL}/user`, user)
        .then((res) => {
            if (res.data.success) {
                axios.post(`${URL}/user-role/assign`, {
                    userId: res.data.body.id,
                    roleId: roleID,
                });
                dispatch({
                    type: USER_ADDED_SUCCESSFULLY,
                });
                console.log("user added successfully");
                // console.log(res);
            }
        })
        .catch((err) => {
            dispatch({
                type: ADDING_USER_FAILED,
            });
            console.log("failed add user");
            console.log(err);
        });
};

export const deleteUser = (userID) => () => {
    axios.put(`${URL}/user/${userID}/toggle-deletion`).then((res) => {
        console.log(res);
        console.log("User deleted successfully");
    });
};

export const getGenders = () => () => {
    axios.get(`${URL}/user/find-all-genders`).then((res) => {});
};
// });
// };
// export const addUserRole = (roleID) => () => {
//      axios.put(`${URL}/role/${roleID}/toggle-deletion`).then((res) => {
//           console.log(res.data.body);
//           if (res.data.success)
//                axios.put(`${URL}/role`, res.data.body).then((response) => {
//                     console.log(response);
//                     // if (res.data.success) return res.data.body;
//                });
//      });
// };

export const uploadUserProfilePicture = (photo) => async (dispatch) => {
    dispatch({ type: USER_PROFILE_PICTURE_REQUEST });
    const formData = new FormData();
    formData.append("photo", photo);
    axios
        .post(`${URL}/user/profile-picture`, formData)
        .then((response) => {
            if (response.data.status === 200) {
                dispatch({
                    type: USER_PROFILE_PICTURE_SUCCEEDED,
                    payload: response.data.body,
                });
            } else {
                dispatch({
                    type: USER_PROFILE_PICTURE_ERROR,
                    payload: response.data.message,
                });
            }
        })
        .catch((error) => {
            console.log(error);
        });
};

export function clearRegistrationDetails() {
    return {
        type: CLEAR_REGISTRATION_DETAILS,
        payload: null,
    };
}
