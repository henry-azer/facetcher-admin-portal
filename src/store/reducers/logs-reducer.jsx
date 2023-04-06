import {
     ALL_LOGS_FETCHED,
     FAILED_GETTING_LOGS,
     GETTING_ALL_LOGS,
} from "../types";

export default function auth_reducer(state = {}, action) {
     switch (action.type) {
          case GETTING_ALL_LOGS:
               return {
                    ...state,
                    gettingLogs: true,
                    failedGettingLogs: false,
               };

          case ALL_LOGS_FETCHED:
               return {
                    ...state,
                    gettingLogs: false,
                    failedGettingLogs: false,
                    allLogs: action.payload,
               };

          case FAILED_GETTING_LOGS:
               return {
                    ...state,
                    gettingLogs: false,
                    failedGettingLogs: true,
               };
          default:
               return state;
     }
}
