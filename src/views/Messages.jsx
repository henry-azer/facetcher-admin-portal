import React, { useEffect, useState } from "react";
import FacetcherDrawer from "../components/drawer/drawer";

import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../store/actions/auth/auth-actions";

import { navigateToLogin } from "../utils/util";
import { MESSAGES } from "../constants/app_constants";
const Messages = () => {
     return (
          <div>
               <FacetcherDrawer route={MESSAGES}>
                    <div className="row h-100 justify-content-center align-items-center gx-2 mt-5 overflowY-scroll"></div>
               </FacetcherDrawer>
          </div>
     );
};
export default Messages;
