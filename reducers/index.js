import { combineReducers } from "redux";
import home from "../screens/home/reducer.js";
import map from "../screens/map/reducer.js";
import auth from "../reducers/auth.js"


export default combineReducers({
  home,
  map,
  auth
});
