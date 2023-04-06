import {
     GETTING_ALL_TRIALS,
     ALL_TRIALS_FETCHED,
     FAILED_GETTING_TRIALS,
     GETTING_ALL_FAILED_TRIALS,
     ALL_FAILED_TRIALS_FETCHED,
     FAILED_GETTING_FAILED_TRIALS,
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
          case ALL_FAILED_TRIALS_FETCHED:
               return {
                    ...state,
                    gettingAllFailedTrials: false,
                    failedGettingAllFailedTrials: false,
                    allFailedTrials: action.payload,
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
