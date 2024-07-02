import { combineReducers } from "redux";
import authReducer from "./authReducers";
import userReducer from "./userReducers";

export default combineReducers({
  auth: authReducer,
  users: userReducer,
});
