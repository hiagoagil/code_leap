import { Reducer } from "redux";
import { UsernameActions } from "../../actions/types";

export const state: string = "";

export const reducer: Reducer<typeof state, UsernameActions> = (currentState = state, action) => {
  if (action.type === "SET_USERNAME") {
    return action.payload;
  }

  return currentState;
};
