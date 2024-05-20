import { AnyAction } from "redux";

export interface Post {
  id: string;
  title: string;
  content: string;
  created_datetime: string;

  username: string;
}
type ActionWithPayload = AnyAction & { payload?: unknown };

export type AppAction<T extends ActionWithPayload> = { type: T["type"]; payload?: T["payload"] };
