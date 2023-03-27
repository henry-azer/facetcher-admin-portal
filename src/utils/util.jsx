// here if you want to user date util
// or any other utils in javascript

import Cookies from "universal-cookie";
import { ACCESSTOKEN } from "../constants/app_constants";

const cookies = new Cookies();

export const navigateToLogin = () => {
     if (!isUserAuthenticated()) {
          window.location.href = "/login";
     }
};

export const isUserAuthenticated = () => {
     return cookies.get(ACCESSTOKEN);
};
