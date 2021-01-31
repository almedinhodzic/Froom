import { combineReducers } from "redux";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";

// Root reducer for store design.
export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  forumPosts: postReducer,
});
