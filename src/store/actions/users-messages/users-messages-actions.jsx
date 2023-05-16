import axios from "axios";

import { APIs_URL } from "../../../constants/app_constants";
import {
     GET_USERS_MESSAGES_REQUEST,
     GET_USERS_MESSAGES_SUCCEEDED,
     GET_USERS_MESSAGES_FAILURE,
} from "./users-messages-types";

const URL = APIs_URL.STAGING;

export const getUsersMessages = () => (dispatch) => {
     dispatch({ type: GET_USERS_MESSAGES_REQUEST });
     axios
          .get(`${URL}/user-message/find-all`)
          .then((response) => {
               if (response.data.success) {
                    const usersMessages = response.data.body.sort(
                         (objA, objB) =>
                              Number(new Date(objB.creationDate)) -
                              Number(new Date(objA.creationDate))
                    );
                    dispatch({
                         type: GET_USERS_MESSAGES_SUCCEEDED,
                         payload: usersMessages,
                    });
               }
          })
          .catch((error) => {
               dispatch({
                    type: GET_USERS_MESSAGES_FAILURE,
                    payload: error.response.data.message,
               });
          });
};
