import { combineReducers } from "redux";
import widgets from "./widgets";
import ui from "./ui";
import user from "./user";
import results from "./results";

export default combineReducers({
  ui,
  widgets,
  user,
  results
});
