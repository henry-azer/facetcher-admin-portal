import {
     GET_USERS_MESSAGES_REQUEST,
     GET_USERS_MESSAGES_SUCCEEDED,
     GET_USERS_MESSAGES_FAILURE,
} from "../types";

export default function user_messages_reducer(state = {}, action) {
     switch (action.type) {
          // GET USERS Messages
          case GET_USERS_MESSAGES_REQUEST:
               return { ...state, getUsersMessagesRequest: true };
          case GET_USERS_MESSAGES_SUCCEEDED:
               return {
                    ...state,
                    usersMessages: action.payload,
                    getUsersMessagesErrorOccurred: false,
                    getUsersMessagesRequest: false,
               };
          case GET_USERS_MESSAGES_FAILURE:
               return {
                    ...state,
                    getUsersMessagesError: action.payload,
                    getUsersMessagesErrorOccurred: true,
                    getUsersMessagesRequest: false,
               };

          default:
               return state;
     }
}
