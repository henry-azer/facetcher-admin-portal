import axios from "axios";
// import delayAdapterEnhancer from "axios-delay";

import {
     LOGIN_REQUEST,
     LOGIN_FAILURE,
     LOGIN_SUCCEEDED,
     CLEAR_LOGIN_DETAILS,
     USER_NOT_ADMIN,
} from "../../types";

import Cookies from "universal-cookie";
import {
     ACCESSTOKEN,
     APIs_URL,
     ISUSERAUTH,
} from "../../../constants/app_constants";

const cookies = new Cookies();

const URL = APIs_URL.STAGING;

// const api = axios.create({
//      adapter: delayAdapterEnhancer(axios.defaults.adapter),
// });

export const authenticateUser = (values) => (dispatch) => {
     dispatch({ type: LOGIN_REQUEST });
     axios.post(`${URL}/auth/log-in`, {
          email: "admin@facetcher.com",
          password: "admin@facetcher",
     })
          .then((response) => {
               console.log(response);
               if (response.data.success) {
                    console.log(response);
                    console.log("cookies added");
                    cookies.set(ISUSERAUTH, "true");
                    cookies.set(
                         ACCESSTOKEN,
                         `${response.data.body.accessToken}`
                    );
                    axios.get(`${URL}/auth/current`).then((res) => {
                         console.log(res);
                         if (res.data.success) {
                              console.log(res);
                              dispatch({
                                   type: LOGIN_SUCCEEDED,
                                   payload: res.data.body,
                              });
                              if (
                                   res.data.body.userRoles[0].role.name !==
                                   "ADMIN"
                              ) {
                                   cookies.remove(ACCESSTOKEN);
                                   cookies.remove(ISUSERAUTH);

                                   dispatch({ type: USER_NOT_ADMIN });
                                   console.log("NOT Admin");
                              }
                         }
                    });
               }
          })
          .catch((err) => {
               console.log(err);
               cookies.set(ISUSERAUTH, "false");
          });
};

export const getCurrentUser = () => (dispatch) => {
     axios.get(`${URL}/auth/current`).then((res) => {
          console.log(res);
          if (res.data.success) {
               console.log(res);
               dispatch({
                    type: LOGIN_SUCCEEDED,
                    payload: res.data.body,
               });
          }
     });
};

export function clearLoginDetails() {
     return {
          type: CLEAR_LOGIN_DETAILS,
          payload: null,
     };
}
