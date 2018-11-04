import { combineReducers } from "redux";
import photos from "./photosReducer";
import users from "./usersReducer";

export default combineReducers({
  photos,
  users
});
