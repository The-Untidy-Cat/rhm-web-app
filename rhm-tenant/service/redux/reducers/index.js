import { combineReducers } from "redux";
import refreshToken from "./refreshToken"

export default combineReducers({
  refreshToken: refreshToken
});
