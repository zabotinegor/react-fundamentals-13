import { State, User } from "../../types";

export const selectUser = (state: State): User => state.user;
export const selectIsAuthenticated = (state: State): boolean =>
  state.user.isAuth;
export const selectUserToken = (state: State): string => state.user.token;
