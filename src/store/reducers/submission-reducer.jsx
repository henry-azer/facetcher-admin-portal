import { ALL_SUBMISSION } from "../types";

export default function auth_reducer(state = {}, action) {
     switch (action.type) {
          case ALL_SUBMISSION:
               return {
                    ...state,
                    allTrials: action.payload,
               };
          default:
               return state;
     }
}
