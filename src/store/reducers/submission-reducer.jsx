import {
     GETTING_ALL_SUBMISSIONS,
     ALL_SUBMISSIONS_FETCHED,
     FAILED_GETTING_SUBMISSIONS,
     GETTING_ALL_USER_SUBMISSIONS,
     ALL_USER_SUBMISSIONS_FETCHED,
     FAILED_GETTING_USER_SUBMISSIONS,
     CURRENT_SUBMISSIONS_FETCHED,
} from "../types";

export default function auth_reducer(state = {}, action) {
     switch (action.type) {
          case GETTING_ALL_SUBMISSIONS:
               return {
                    ...state,
                    gettingAllSubmissions: true,
                    failedGettingAllSubmissions: false,
               };
          case ALL_SUBMISSIONS_FETCHED:
               return {
                    ...state,
                    gettingAllSubmissions: false,
                    failedGettingAllSubmissions: false,
                    allSubmissions: action.payload,
                    allSubmissionsLength: action.payload.length,
               };
          case CURRENT_SUBMISSIONS_FETCHED:
               return {
                    ...state,
                    gettingAllSubmissions: false,
                    failedGettingAllSubmissions: false,
                    allCurrentSubmissions: action.payload,
               };
          case ALL_USER_SUBMISSIONS_FETCHED:
               return {
                    ...state,
                    gettingAllSubmissions: false,
                    failedGettingAllSubmissions: false,
                    allSubmissionsById: action.payload,
               };
          case FAILED_GETTING_SUBMISSIONS:
               return {
                    ...state,
                    gettingAllSubmissions: true,
                    failedGettingAllSubmissions: false,
               };
          case GETTING_ALL_USER_SUBMISSIONS:
               return {
                    ...state,
                    gettingAllUserSubmissions: true,
                    failedGettingAllUserSubmissions: false,
               };
          case ALL_USER_SUBMISSIONS_FETCHED:
               return {
                    ...state,
                    gettingAllUserSubmissions: false,
                    failedGettingAllUserSubmissions: false,
                    allUserSubmissions: action.payload,
                    allUserSubmissionsLength: action.payload.length,
               };
          case FAILED_GETTING_USER_SUBMISSIONS:
               return {
                    ...state,
                    gettingAllUserSubmissions: true,
                    failedGettingAllUserSubmissions: false,
               };
          default:
               return state;
     }
}
