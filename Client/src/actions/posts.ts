import axios from "axios";
import { Post } from "../types";

function handleError(e) {
  console.dir(e);
  if (e.response?.data?.message) {
    return window.alert(e.response.data.message);
  }
  return window.alert("Ocorreu um erro no servidor");
}
axios.defaults.baseURL = "https://dev.codeleap.co.uk/careers";
axios.defaults.headers["Content-type"] = "application/json";
axios.defaults.headers["Accept"] = "application/json";

export const loadPosts = async () => {
  try {
    const { data } = await axios.get("/");

    return {
      type: "LOAD_POSTS",
      payload: data.results,
    };
  } catch (e) {
    handleError(e);
  }
};

export const addPost = async (payload: Partial<Post>) => {
  try {
    const { data } = await axios.post("/", payload);
    return {
      type: "ADD_POST",
      payload: data,
    };
  } catch (e) {
    handleError(e);
  }
};
export const deletePost = async (payload: Partial<Post>) => {
  try {
    await axios.delete(`/${payload.id}/`);
    return {
      type: "REMOVE_POST",
      payload,
    };
  } catch (e) {
    handleError(e);
  }
};
export const updatePost = async (payload: Partial<Post>) => {
  try {
    const { title, content } = payload;
    const { data } = await axios.patch(`/${payload.id}/`, { title, content });
    return {
      type: "UPDATE_POST",
      payload: data,
    };
  } catch (e) {
    handleError(e);
  }
};
