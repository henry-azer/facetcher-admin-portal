import {
     GET_LOGS_REQUEST,
     GET_LOGS_SUCCEEDED,
     GET_LOGS_FAILURE,
} from "../types";

export default function user_logs_reducer(state = {}, action) {
     switch (action.type) {
          // GET USERS LOGS
          case GET_LOGS_REQUEST:
               return { ...state, getUsersLogsRequest: true };
          case GET_LOGS_SUCCEEDED:
               return {
                    ...state,
                    usersLogs: action.payload,
                    getUsersLogsErrorOccurred: false,
                    getUsersLogsRequest: false,
               };
          case GET_LOGS_FAILURE:
               return {
                    ...state,
                    getUsersLogsError: action.payload,
                    getUsersLogsErrorOccurred: true,
                    getUsersLogsRequest: false,
               };

          default:
               return state;
     }
}
