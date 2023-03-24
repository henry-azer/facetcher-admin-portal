import axios from "axios";
import Cookies from "universal-cookie";
import { APIs_URL } from "../../../constants/app_constants";
import { ALL_SUBMISSION } from "./submission-types";

const URL = APIs_URL.STAGING;

export const getAllSubmissions = () => (dispatch) => {
     axios.get(`${URL}/user-submission/find-all`).then((res) => {
          console.log(res);
          dispatch({ type: ALL_SUBMISSION, payload: res });
     });
};
