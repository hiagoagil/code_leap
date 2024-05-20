import { Reducer } from "redux";
import { PostActions } from "../../actions/types";
import { POSTS_LOCALSTORAGE_KEY } from "../../constants";
import { Post } from "../../types";

export const state: Post[] = [];

export const reducer: Reducer<typeof state, PostActions> = (currentState = state, action) => {
  switch (action.type) {
    case "ADD_POST":
      return [...currentState, action.payload];
    case "REMOVE_POST":
      return currentState.filter(({ id }) => id !== action.payload.id);
    case "LOAD_POSTS":
      const savedPosts = localStorage.getItem(POSTS_LOCALSTORAGE_KEY);

      if (savedPosts) {
        return JSON.parse(savedPosts);
      } else {
        return currentState;
      }

    case "UPDATE_POST":
      let newPosts = [...currentState];
      const idx = newPosts.findIndex(({ id }) => id === action.payload.id);
      newPosts[idx] = {
        ...newPosts[idx],
        ...action.payload,
      };

      return newPosts;
    default:
      return currentState;
  }
};
