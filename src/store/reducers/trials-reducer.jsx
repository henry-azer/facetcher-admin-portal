import {
     GETTING_ALL_TRIALS,
     ALL_TRIALS_FETCHED,
     FAILED_GETTING_TRIALS,
     GETTING_ALL_FAILED_TRIALS,
     ALL_FAILED_TRIALS_FETCHED,
     FAILED_GETTING_FAILED_TRIALS,
     // GET_FAILED_CURRENT_TRIALS_COUNT,
     // GET_SUCCEEDED_CURRENT_TRIALS_COUNT,
     GET_FAILED_USER_TRIALS_COUNT,
     GET_SUCCEEDED_USER_TRIALS_COUNT,
     GET_TRIALS_BY_SUBMISSION_ID,
} from "../types";

export default function auth_reducer(state = {}, action) {
     switch (action.type) {
          case GETTING_ALL_TRIALS:
               return {
                    ...state,
                    gettingAllTrials: true,
                    failedGettingAllTrials: false,
               };
          case ALL_TRIALS_FETCHED:
               return {
                    ...state,
                    gettingAllTrials: false,
                    failedGettingAllTrials: false,
                    allTrials: action.payload,
               };
          case FAILED_GETTING_TRIALS:
               return {
                    ...state,
                    gettingAllTrials: true,
                    failedGettingAllTrials: false,
               };
          case GETTING_ALL_FAILED_TRIALS:
               return {
                    ...state,
                    gettingAllFailedTrials: true,
                    failedGettingAllFailedTrials: false,
               };
          case GET_SUCCEEDED_USER_TRIALS_COUNT:
               return {
                    ...state,
                    gettingAllFailedTrials: true,
                    failedGettingAllFailedTrials: false,
                    succeededUserCount: action.payload,
               };
          case GET_FAILED_USER_TRIALS_COUNT:
               return {
                    ...state,
                    gettingAllFailedTrials: true,
                    failedGettingAllFailedTrials: false,
                    failedUserCount: action.payload,
               };
          case ALL_FAILED_TRIALS_FETCHED:
               return {
                    ...state,
                    gettingAllFailedTrials: false,
                    failedGettingAllFailedTrials: false,
                    allFailedTrials: action.payload,
               };
          case GET_TRIALS_BY_SUBMISSION_ID:
               return {
                    ...state,
                    gettingAllFailedTrials: false,
                    failedGettingAllFailedTrials: false,
                    trialsBySubmissionId: action.payload,
               };
          case FAILED_GETTING_FAILED_TRIALS:
               return {
                    ...state,
                    gettingAllFailedTrials: true,
                    failedGettingAllFailedTrials: false,
               };
          default:
               return state;
     }
}
