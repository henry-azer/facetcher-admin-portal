import axios from "axios";

import { APIs_URL } from "../../../constants/app_constants";
import {
     ALL_LOGS_FETCHED,
     FAILED_GETTING_LOGS,
     GETTING_ALL_LOGS,
} from "./logs-types";

const URL = APIs_URL.STAGING;

export const getAllLogs = () => (dispatch) => {
     axios.get(`${URL}/user-log/find-all`)
          .then((res) => {
               dispatch({ type: GETTING_ALL_LOGS });
               if (res.data.success) {
                    console.log(res);
                    dispatch({
                         type: ALL_LOGS_FETCHED,
                         payload: res.data.body.sort(
                              (objA, objB) =>
                                   Number(new Date(objB.creationDate)) -
                                   Number(new Date(objA.creationDate))
                         ),
                    });
               }
          })
          .catch((err) => {
               console.log(err);
               dispatch({ type: FAILED_GETTING_LOGS });
          });
};
