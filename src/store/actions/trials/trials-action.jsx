import axios from "axios";

import { APIs_URL } from "../../../constants/app_constants";
import {
     GETTING_ALL_TRIALS,
     ALL_TRIALS_FETCHED,
     FAILED_GETTING_TRIALS,
     GETTING_ALL_FAILED_TRIALS,
     FAILED_GETTING_FAILED_TRIALS,
     ALL_FAILED_TRIALS_FETCHED,
     GET_TRIALS_BY_SUBMISSION_ID,
     CLEAR_GET_TRIALS_BY_SUBMISSION_ID,
     GET_TRIAL_BY_ID_REQUEST,
     GET_TRIAL_BY_ID_SUCCEEDED,
     GET_TRIAL_BY_ID_FAILURE,
     CLEAR_GET_TRIAL_BY_ID,
     
     GET_FAILED_USER_TRIALS_COUNT,
     CLEAR_GET_FAILED_USER_TRIALS_COUNT,
     
     GET_SUCCEEDED_USER_TRIALS_COUNT,
     CLEAR_GET_SUCCEEDED_USER_TRIALS_COUNT,
} from "./trials-types";

const URL = APIs_URL.STAGING;

export const getTrialById = (trialId) => (dispatch) => {
     dispatch({ type: GET_TRIAL_BY_ID_REQUEST });
     axios
     .get(`${URL}/user-trial/find-by-id/${trialId}`)
         .then((response) => {
             if (response.data.success) {
                 dispatch({
                     type: GET_TRIAL_BY_ID_SUCCEEDED,
                     payload: response.data.body,
                 });
             }
         })
         .catch((error) => {
             dispatch({
                 type: GET_TRIAL_BY_ID_FAILURE,
                 payload: error.response.data.message,
             });
         });
 };
 

export const getAllTrials = () => (dispatch) => {
     axios.get(`${URL}/user-trial/find-all`)
          .then((res) => {
               dispatch({ type: GETTING_ALL_TRIALS });
               if (res.data.success) {
                    dispatch({
                         type: ALL_TRIALS_FETCHED,
                         payload: res.data.body,
                    });
               }
          })
          .catch(() => {
               dispatch({ type: FAILED_GETTING_TRIALS });
          });
};

export const getAllFailedTrials = () => (dispatch) => {
     axios.get(`${URL}/user-trial/find-all-failed`)
          .then((res) => {
               dispatch({ type: GETTING_ALL_FAILED_TRIALS });
               if (res.data.success) {
                    dispatch({
                         type: ALL_FAILED_TRIALS_FETCHED,
                         payload: res.data.body,
                    });
               }
          })
          .catch(() => {
               dispatch({ type: FAILED_GETTING_FAILED_TRIALS });
          });
};

export const getSucceededUserTrialsCount = (userId) => (dispatch) => {
     axios.get(`${URL}/user-trial/count-succeeded/user/${userId}`).then(
          (res) => {
               if (res.data.success) {
                    dispatch({
                         type: GET_SUCCEEDED_USER_TRIALS_COUNT,
                         payload: res.data.body,
                    });
               }
          }
     );
};

export const getFailedUserTrialsCount = (userId) => (dispatch) => {
     axios.get(`${URL}/user-trial/count-failed/user/${userId}`)
          .then((res) => {
               if (res.data.success) {
                    dispatch({
                         type: GET_FAILED_USER_TRIALS_COUNT,
                         payload: res.data.body,
                    });
               }
          })
          .catch(() => {
               dispatch({ type: FAILED_GETTING_FAILED_TRIALS });
          });
};

export const trialsBySubmissionId = (submissionId) => (dispatch) => {
     axios.get(
          `${URL}/user-trial/find-all-by-submission-id/${submissionId}`
     ).then((res) => {
          if (res.data.success) {
               dispatch({
                    type: GET_TRIALS_BY_SUBMISSION_ID,
                    payload: res.data.body.sort(
                         (objA, objB) =>
                              Number(new Date(objB.creationDate)) -
                              Number(new Date(objA.creationDate))
                    ),
               });
          }
     });
};

export function clearTrialById() {
     return {
          type: CLEAR_GET_TRIAL_BY_ID,
          payload: null,
     };
}

export function clearTrialsBySubmissionId() {
     return {
          type: CLEAR_GET_TRIALS_BY_SUBMISSION_ID,
          payload: null,
     };
}

export function clearGetFailedUserTrialsCount() {
     return {
          type: CLEAR_GET_FAILED_USER_TRIALS_COUNT,
          payload: null,
     };
}

export function clearGetSucceededUserTrialsCount() {
     return {
          type: CLEAR_GET_SUCCEEDED_USER_TRIALS_COUNT,
          payload: null,
     };
}