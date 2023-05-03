import {
     ADDING_USER,
     ADDING_USER_FAILED,
     CLEAR_REGISTRATION_DETAILS,
     GET_ALL_USERS,
     GET_USER_BY_ID,
     USER_ADDED_SUCCESSFULLY,
} from "../actions/users/users-types";

export default function users_reducer(state = {}, action) {
     switch (action.type) {
          case GET_ALL_USERS:
               return {
                    ...state,
                    allUsers: action.payload,
               };
          case GET_USER_BY_ID:
               return {
                    ...state,
                    userById: action.payload,
               };
          case ADDING_USER:
               return {
                    ...state,
                    addingUser: true,
                    userAddedSuccessfully: false,
                    failedAddingUser: false,
               };
          case USER_ADDED_SUCCESSFULLY:
               return {
                    ...state,
                    addingUser: false,
                    userAddedSuccessfully: true,
                    failedAddingUser: false,
               };
          case ADDING_USER_FAILED:
               return {
                    ...state,
                    addingUser: false,
                    userAddedSuccessfully: false,
                    failedAddingUser: true,
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
