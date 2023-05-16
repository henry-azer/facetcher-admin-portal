import axios from "axios";

import { APIs_URL } from "../../../constants/app_constants";
import {
     GET_LOGS_REQUEST,
     GET_LOGS_SUCCEEDED,
     GET_LOGS_FAILURE,
} from "./users-logs-types";

const URL = APIs_URL.STAGING;

export const getUsersLogs = () => (dispatch) => {
     dispatch({ type: GET_LOGS_REQUEST });
     axios
          .get(`${URL}/user-log/find-all`)
          .then((response) => {
               if (response.data.success) {
                    const usersLogs = response.data.body.sort(
                         (objA, objB) =>
                              Number(new Date(objB.creationDate)) -
                              Number(new Date(objA.creationDate))
                    );
                    dispatch({
                         type: GET_LOGS_SUCCEEDED,
                         payload: usersLogs,
                    });
               }
          })
          .catch((error) => {
               dispatch({
                    type: GET_LOGS_FAILURE,
                    payload: error.response.data.message,
               });
          });
};
