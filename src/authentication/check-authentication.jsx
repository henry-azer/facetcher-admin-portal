import React from 'react';
import { Navigate } from 'react-router-dom';

import Cookies from "universal-cookie";

import { IS_USER_AUTHENTICATED } from "../constants/app_constants";

const cookies = new Cookies();

const checkAuthentication = (Component) => {
    return class extends React.Component {
        render() {
            if (isUserAuthenticated() === "true") {
                return <Component {...this.props} />;
            } else {
                return <Navigate to="/login" replace />;
            }
        }
    };
};

export const isUserAuthenticated = () => {
    return cookies.get(IS_USER_AUTHENTICATED);
};

export default checkAuthentication;