import axios from "axios";
import { APIs_URL } from "../../../constants/app_constants";
import {
     GETTING_ALL_SUBMISSIONS,
     ALL_SUBMISSIONS_FETCHED,
     GETTING_ALL_USER_SUBMISSIONS,
     FAILED_GETTING_SUBMISSIONS,
     ALL_USER_SUBMISSIONS_FETCHED,
     FAILED_GETTING_USER_SUBMISSIONS,
     CURRENT_SUBMISSIONS_FETCHED,
} from "./submission-types";

const URL = APIs_URL.STAGING;

export const getAllSubmissions = () => (dispatch) => {
     dispatch({ type: GETTING_ALL_SUBMISSIONS });

     axios.get(`${URL}/user-submission/find-all`).then((res) => {
          if (res.data.success) {
               console.log(res.data.body);
               dispatch({
                    type: ALL_SUBMISSIONS_FETCHED,
                    payload: res.data.body.sort(
                         (objA, objB) =>
                              Number(new Date(objB.creationDate)) -
                              Number(new Date(objA.creationDate))
                    ),
               });
          } else dispatch({ type: FAILED_GETTING_SUBMISSIONS });
     });
};

export const getCurrentUserSubmissions = () => (dispatch) => {
     dispatch({ type: GETTING_ALL_SUBMISSIONS });

     axios.get(`${URL}/user-submission/current-user/find-all`).then((res) => {
          if (res.data.success) {
               console.log(res.data.body);
               dispatch({
                    type: CURRENT_SUBMISSIONS_FETCHED,
                    payload: res.data.body.sort(
                         (objA, objB) =>
                              Number(new Date(objB.creationDate)) -
                              Number(new Date(objA.creationDate))
                    ),
               });
          } else dispatch({ type: FAILED_GETTING_SUBMISSIONS });
     });
};

export const getAllUsersSubmissionsById = (userId) => (dispatch) => {
     dispatch({ type: GETTING_ALL_USER_SUBMISSIONS });

     axios.get(`${URL}/user-submission/find-all-by-user-id/${userId}`)
          .then((res) => {
               if (res.data.success) {
                    console.log(res.data.body);
                    dispatch({
                         type: ALL_USER_SUBMISSIONS_FETCHED,
                         payload: res.data.body.sort(
                              (objA, objB) =>
                                   Number(new Date(objB.creationDate)) -
                                   Number(new Date(objA.creationDate))
                         ),
                    });
               }
          })
          .catch(() => dispatch({ type: FAILED_GETTING_USER_SUBMISSIONS }));
};
