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
     GET_SUBMISSION_BY_ID,
     CLEAR_SUBMISSION_BY_ID,
     CLEAR_GET_ALL_USER_SUBMISSIONS_BY_ID,
} from "./submission-types";

const URL = APIs_URL.STAGING;

export const getAllSubmissions = () => (dispatch) => {
     dispatch({ type: GETTING_ALL_SUBMISSIONS });

     axios.get(`${URL}/user-submission/find-all`).then((res) => {
          if (res.data.success) {
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

export const getAllUserSubmissionsById = (userId) => (dispatch) => {
     dispatch({ type: GETTING_ALL_USER_SUBMISSIONS });
     axios.get(`${URL}/user-submission/find-all-by-user-id/${userId}`)
          .then((res) => {
               if (res.data.success) {
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

export const getSubmissionById = (userSubmissionId) => (dispatch) => {
     dispatch({ type: GETTING_ALL_USER_SUBMISSIONS });

     axios.get(`${URL}/user-submission/find-by-id/${userSubmissionId}`)
          .then((res) => {
               if (res.data.success) {
                    dispatch({
                         type: GET_SUBMISSION_BY_ID,
                         payload: res.data.body,
                    });
               }
          })
          .catch(() => dispatch({ type: FAILED_GETTING_USER_SUBMISSIONS }));
};

export function clearSubmissionById() {
     return {
          type: CLEAR_SUBMISSION_BY_ID,
          payload: null,
     };
}

export function clearGetAllUserSubmissionsById() {
     return {
          type: CLEAR_GET_ALL_USER_SUBMISSIONS_BY_ID,
          payload: null,
     };
}