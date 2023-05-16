import { combineReducers } from "redux";
import auth from "./auth-reducer";
import user from "./user-reducer";
import logs from "./users-logs-reducer";
import messages from "./users-messages-reducer";
import trials from "./trials-reducer";
import submissions from "./submission-reducer";

const rootReducer = combineReducers({
     auth,
     user,
     logs,
     trials,
     messages,
     submissions,
});

export default rootReducer;
