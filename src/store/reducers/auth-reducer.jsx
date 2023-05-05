import {
     LOGIN_REQUEST,
     LOGIN_FAILURE,
     LOGIN_SUCCEEDED,
     CLEAR_LOGIN_DETAILS,
     PROFILE_PIC_ADDED_SUCCESSFULLY,
} from "../types";

export default function auth_reducer(state = {}, action) {
     switch (action.type) {
          // LOGIN
          case LOGIN_REQUEST:
               return { ...state, loginRequest: true };
          case LOGIN_SUCCEEDED:
               return {
                    ...state,
                    authenticatedUser: action.payload,
                    isUserAuthenticated: true,
                    loginRequest: false,
               };
          case LOGIN_FAILURE:
               return {
                    ...state,
                    loginError: action.payload,
                    isUserAuthenticated: false,
                    loginErrorOccurred: true,
                    loginRequest: false,
               };
          case CLEAR_LOGIN_DETAILS:
               return {
                    ...state,
                    loginError: action.payload,
                    isUserAuthenticated: null,
                    loginErrorOccurred: null,
                    loginRequest: null,
               };
          case PROFILE_PIC_ADDED_SUCCESSFULLY:
               return {
                    ...state,
                    newProfilePicture: action.payload,
               };

          default:
               return state;
     }
}
