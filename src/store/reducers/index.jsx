import { combineReducers } from "redux";
import user from "./user-reducer";
import auth from "./auth-reducer";
import submissions from "./submission-reducer";

const rootReducer = combineReducers({
     auth,
     user,
     submissions,
});

export default rootReducer;
