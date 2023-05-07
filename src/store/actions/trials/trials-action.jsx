import axios from "axios";

import { APIs_URL } from "../../../constants/app_constants";
import {
     GETTING_ALL_TRIALS,
     ALL_TRIALS_FETCHED,
     FAILED_GETTING_TRIALS,
     GETTING_ALL_FAILED_TRIALS,
     FAILED_GETTING_FAILED_TRIALS,
     ALL_FAILED_TRIALS_FETCHED,
     GET_SUCCEEDED_USER_TRIALS_COUNT,
     GET_FAILED_USER_TRIALS_COUNT,
     // GET_SUCCEEDED_CURRENT_TRIALS_COUNT,
     // GET_FAILED_CURRENT_TRIALS_COUNT,
} from "./trials-types";

const URL = APIs_URL.STAGING;

export const getAllTrials = () => (dispatch) => {
     axios.get(`${URL}/user-trial/find-all`)
          .then((res) => {
               console.log(res);
               dispatch({ type: GETTING_ALL_TRIALS });
               if (res.data.success) {
                    console.log(res);
                    dispatch({
                         type: ALL_TRIALS_FETCHED,
                         payload: res.data.body,
                    });
               }
          })
          .catch((err) => {
               console.log(err);
               dispatch({ type: FAILED_GETTING_TRIALS });
          });
};
export const getAllFailedTrials = () => (dispatch) => {
     axios.get(`${URL}/user-trial/find-all-failed`)
          .then((res) => {
               console.log(res);
               dispatch({ type: GETTING_ALL_FAILED_TRIALS });
               if (res.data.success) {
                    console.log(res);
                    dispatch({
                         type: ALL_FAILED_TRIALS_FETCHED,
                         payload: res.data.body,
                    });
               }
          })
          .catch((err) => {
               console.log(err);
               dispatch({ type: FAILED_GETTING_FAILED_TRIALS });
          });
};
// export const getSucceededCurrentTrialsCount = () => (dispatch) => {
//      axios.get(`${URL}/user-trial/current-user/count-succeeded`)
//           .then((res) => {
//                console.log(res);
//                if (res.data.success) {
//                     console.log(res);
//                     dispatch({
//                          type: GET_SUCCEEDED_CURRENT_TRIALS_COUNT,
//                          payload: res.data.body,
//                     });
//                }
//           })
//           .catch((err) => {
//                console.log(err);
//                dispatch({ type: FAILED_GETTING_FAILED_TRIALS });
//           });
// };
// export const getFailedCurrentTrialsCount = () => (dispatch) => {
//      axios.get(`${URL}/user-trial/current-user/count-failed`)
//           .then((res) => {
//                console.log(res);
//                if (res.data.success) {
//                     console.log(res);
//                     dispatch({
//                          type: GET_FAILED_CURRENT_TRIALS_COUNT,
//                          payload: res.data.body,
//                     });
//                }
//           })
//           .catch((err) => {
//                console.log(err);
//                dispatch({ type: FAILED_GETTING_FAILED_TRIALS });
//           });
// };
export const getSucceededUserTrialsCount = (userId) => (dispatch) => {
     axios.get(`${URL}/user-trial/count-succeeded/user/${userId}`)
          .then((res) => {
               console.log(res);
               if (res.data.success) {
                    console.log(res);
                    dispatch({
                         type: GET_SUCCEEDED_USER_TRIALS_COUNT,
                         payload: res.data.body,
                    });
               }
          })
          .catch((err) => {
               console.log(err);
               dispatch({ type: FAILED_GETTING_FAILED_TRIALS });
          });
};
export const getFailedUserTrialsCount = (userId) => (dispatch) => {
     axios.get(`${URL}/user-trial/count-failed/user/${userId}`)
          .then((res) => {
               console.log(res);
               if (res.data.success) {
                    console.log(res);
                    dispatch({
                         type: GET_FAILED_USER_TRIALS_COUNT,
                         payload: res.data.body,
                    });
               }
          })
          .catch((err) => {
               console.log(err);
               dispatch({ type: FAILED_GETTING_FAILED_TRIALS });
          });
};

// export const d = (userId) => (dispatch) => {
//      axios.get(`${URL}/api/user-trial/count-failed/user/${userId}`)
//           .then((res) => {
//                console.log(res);
//                if (res.data.success) {
//                     console.log(res);
//                     dispatch({
//                          type: GET_FAILED_CURRENT_TRIALS_COUNT,
//                          payload: res.data.body,
//                     });
//                }
//           })
//           .catch((err) => {
//                console.log(err);
//                dispatch({ type: FAILED_GETTING_FAILED_TRIALS });
//           });
// };
