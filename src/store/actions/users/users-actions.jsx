import axios from "axios";
import { APIs_URL } from "../../../constants/app_constants";

import { CLEAR_REGISTRATION_DETAILS, GET_ALL_USERS } from "../../types";

const URL = APIs_URL.STAGING;

export const getAllUsers = () => (dispatch) => {
     axios.get(`${URL}/user/find-all`).then((res) => {
          console.log(res);
          if (res.data.success)
               dispatch({
                    type: GET_ALL_USERS,
                    payload: res.data.body,
               });
     });
};

export function clearRegistrationDetails() {
     return {
          type: CLEAR_REGISTRATION_DETAILS,
          payload: null,
     };
}
