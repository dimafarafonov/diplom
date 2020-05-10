import { combineReducers } from "redux";
import home from "../screens/home/reducer.js";
import map from "../screens/map/reducer.js";
import auth from "../reducers/auth.js"
import comments from "../screens/location_profile/reducer";
import location_create from "../screens/location_create/reducer.js";

export default combineReducers({
  home,
  map,
  auth,
  location_create
});
