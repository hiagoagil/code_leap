import { ActionDispatcher } from "../types";
import { UsernameActions } from "./types";

export const setUser: ActionDispatcher<UsernameActions> = (payload: string) => {
  return {
    type: "SET_USERNAME",
    payload,
  };
};
