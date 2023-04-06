import axios from "axios";

import { APIs_URL } from "../../../constants/app_constants";
import {
     GETTING_ALL_TRIALS,
     ALL_TRIALS_FETCHED,
     FAILED_GETTING_TRIALS,
     GETTING_ALL_FAILED_TRIALS,
     FAILED_GETTING_FAILED_TRIALS,
     ALL_FAILED_TRIALS_FETCHED,
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
