// here if you want to user date util
// or any other utils in javascript

import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { ISUSERAUTH } from "../constants/app_constants";

export const navigateToLogin = () => {
     const cookies = new Cookies();
     const navigate = useNavigate;
     if (!cookies.get(ISUSERAUTH)) {
          navigate("/login");
     }
};
