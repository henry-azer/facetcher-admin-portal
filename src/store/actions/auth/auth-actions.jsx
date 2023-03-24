import axios from "axios";
// import delayAdapterEnhancer from "axios-delay";

import {
     LOGIN_REQUEST,
     LOGIN_FAILURE,
     LOGIN_SUCCEEDED,
     CLEAR_LOGIN_DETAILS,
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
               if (response.status === 200) {
                    console.log(response);
                    console.log("cookies added");
                    cookies.set(ISUSERAUTH, "true");
                    cookies.set(
                         ACCESSTOKEN,
                         `${response.data.body.accessToken}`
                    );
               }
          })
          .catch((err) => {
               console.log(err);
               // if (err.response.status == 400) cookies.set(ISUSERAUTH, "false");
          });
     //           .then(function(response) {
     //                if (response.data.status === 200) {
     //                     dispatch({
     //                          type: LOGIN_SUCCEEDED,
     //                          payload: response.data.body,
     //                     });

     //                     if (values.keepLogged) {
     //                          cookies.set("iua_cin", "true");
     //                          cookies.set("at_cin", `${response.data.body.token}`);
     //                          cookies.set(
     //                               "aun_cin",
     //                               `${response.data.body.user.username}`
     //                          );
     //                          cookies.set(
     //                               "aui_cin",
     //                               `${response.data.body.user.id}`
     //                          );
     //                     } else {
     //                          cookies.set("iua_cin", "true", {
     //                               maxAge: "14400",
     //                          });
     //                          cookies.set("at_cin", `${response.data.body.token}`, {
     //                               maxAge: "14400",
     //                          });

     //                          cookies.set(
     //                               "aun_cin",
     //                               `${response.data.body.user.username}`,
     //                               {
     //                                    maxAge: "14400",
     //                               }
     //                          );
     //                          cookies.set(
     //                               "aui_cin",
     //                               `${response.data.body.user.id}`,
     //                               {
     //                                    maxAge: "14400",
     //                               }
     //                          );
     //                     }
     //                } else {
     //                     dispatch({
     //                          type: LOGIN_FAILURE,
     //                          payload: response.data.message,
     //                     });
     //                }
     //           })
     //           .catch(function(error) {
     //                console.log(error);
     //           });
};

export const getCurrentUser = () => (dispatch) => {
     console.log("lol");
     axios.get(`${URL}/auth/current`).then((res) => {
          console.log(res);
          if (res.data.success) {
               console.log(res);
               dispatch({
                    type: LOGIN_SUCCEEDED,
                    payload: res,
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
