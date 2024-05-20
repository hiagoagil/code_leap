import { combineReducers } from "redux";
import * as posts from "./posts";
import * as username from "./username";

export const rootReducer = combineReducers({
  posts: posts.reducer,
  username: username.reducer,
});

export const initialState = {
  posts: posts.state,
  username: username.state,
};
