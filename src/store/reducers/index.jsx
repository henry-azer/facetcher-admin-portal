import { combineReducers } from "redux";
import user from "./user-reducer";
import auth from "./auth-reducer";
import submissions from "./submission-reducer";
import logs from "./logs-reducer";
import trials from "./trials-reducer";

const rootReducer = combineReducers({
     auth,
     user,
     submissions,
     logs,
     trials,
});

export default rootReducer;
