import {
     GETTING_ALL_TRIALS,
     ALL_TRIALS_FETCHED,
     FAILED_GETTING_TRIALS,
     GETTING_ALL_FAILED_TRIALS,
     ALL_FAILED_TRIALS_FETCHED,
     FAILED_GETTING_FAILED_TRIALS,
     GET_TRIALS_BY_SUBMISSION_ID,
     CLEAR_GET_TRIALS_BY_SUBMISSION_ID,
     GET_TRIAL_BY_ID_REQUEST,
     GET_TRIAL_BY_ID_SUCCEEDED,
     GET_TRIAL_BY_ID_FAILURE,
     CLEAR_GET_TRIAL_BY_ID,

     GET_FAILED_USER_TRIALS_COUNT,
     CLEAR_GET_FAILED_USER_TRIALS_COUNT,

     GET_SUCCEEDED_USER_TRIALS_COUNT,
     CLEAR_GET_SUCCEEDED_USER_TRIALS_COUNT,
} from "../types";

export default function trials_reducer(state = {}, action) {
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
          case CLEAR_GET_TRIALS_BY_SUBMISSION_ID:
               return {
                    ...state,
                    trialsBySubmissionId: null,
               };

          case GET_SUCCEEDED_USER_TRIALS_COUNT:
               return {
                    ...state,
                    gettingAllFailedTrials: true,
                    failedGettingAllFailedTrials: false,
                    succeededUserCount: action.payload,
               };
          case CLEAR_GET_SUCCEEDED_USER_TRIALS_COUNT:
               return {
                    ...state,
                    succeededUserCount: null,
                    gettingAllFailedTrials: null,
                    failedGettingAllFailedTrials: null,
               };

          case GET_FAILED_USER_TRIALS_COUNT:
               return {
                    ...state,
                    gettingAllFailedTrials: true,
                    failedGettingAllFailedTrials: false,
                    failedUserCount: action.payload,
               };
          case CLEAR_GET_FAILED_USER_TRIALS_COUNT:
               return {
                    ...state,
                    failedUserCount: null,
                    gettingAllFailedTrials: null,
                    failedGettingAllFailedTrials: null,
               };

          // GET TRIAL BY ID
          case GET_TRIAL_BY_ID_REQUEST:
               return { ...state, getTrialRequest: true };
          case GET_TRIAL_BY_ID_SUCCEEDED:
               return {
                    ...state,
                    trial: action.payload,
                    getTrialErrorOccurred: false,
                    getTrialRequest: false,
               };
          case GET_TRIAL_BY_ID_FAILURE:
               return {
                    ...state,
                    getTrialError: action.payload,
                    getTrialErrorOccurred: true,
                    getTrialRequest: false,
               };
          case CLEAR_GET_TRIAL_BY_ID:
               return {
                    ...state,
                    trial: null,
                    getTrialError: null,
                    getTrialRequest: null,
                    getTrialErrorOccurred: null,
               };

          default:
               return state;
     }
}
