import {
     CLEAR_REGISTRATION_DETAILS,
     GET_ALL_USERS,
} from "../actions/users/users-types";

export default function users_reducer(state = {}, action) {
     switch (action.type) {
          case GET_ALL_USERS:
               return {
                    ...state,
                    allUsers: action.payload,
               };
          case CLEAR_REGISTRATION_DETAILS:
               return {
                    ...state,
                    registeredUser: action.payload,
                    registrationError: action.payload,
                    registrationRequest: action.payload,
                    registrationSucceeded: action.payload,
                    registrationErrorOccurred: action.payload,
               };
          default:
               return state;
     }
}
