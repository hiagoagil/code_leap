import { AnyAction } from "redux";

export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  author: string;
}
type ActionWithPayload = AnyAction & { payload?: unknown };

export type AppAction<T extends ActionWithPayload> = { type: T["type"]; payload?: T["payload"] };
export type ActionDispatcher<A extends ActionWithPayload, T = AppAction<A>> = (payload?: A["payload"]) => T;
