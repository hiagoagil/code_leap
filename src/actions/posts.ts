import { ActionDispatcher } from "../types";
import { PostActions } from "./types";

export const loadPosts: ActionDispatcher<PostActions> = () => ({
  type: "LOAD_POSTS",
});

export const addPost: ActionDispatcher<PostActions> = (payload) => ({
  type: "ADD_POST",
  payload,
});
export const deletePost: ActionDispatcher<PostActions> = (payload) => ({
  type: "REMOVE_POST",
  payload,
});
export const updatePost: ActionDispatcher<PostActions> = (payload) => ({
  type: "UPDATE_POST",
  payload,
});
