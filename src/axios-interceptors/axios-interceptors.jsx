import axios from "axios";
import { ACCESSTOKEN } from "../constants/app_constants";
import Cookies from "universal-cookie";
import { navigateToLogin } from "../utils/util";

const cookies = new Cookies();

axios.interceptors.request.use((config) => {
     const token = cookies.get(ACCESSTOKEN);
     if (token && token !== "undefined")
          config.headers.Authorization = `Bearer ${token}`;
     return config;
});

axios.interceptors.response.use(
     (response) => {
          // handle success
          return response;
     },
     (error) => {
          // handle error
          if (error.response.status === 401) {
               // redirect to login page
               navigateToLogin();
          }
          return Promise.reject(error);
     }
);

// instance.interceptors.request.use(
//      function(config) {
//           // do something before request is sent
//           return config;
//      },
//      function(error) {
//           // do something with request error
//           return Promise.reject(error);
//      }
// );

// instance.interceptors.response.use(
//      function(response) {
//           // do something with response data
//           return response;
//      },
//      function(error) {
//           // do something with response error
//           return Promise.reject(error);
//      }
// );

// export default instance;
