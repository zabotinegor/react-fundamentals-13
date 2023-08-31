import { TOKEN } from "../../constants/Pages";
import { State } from "../../types";
import { Role, User } from "../../types/user";

export const selectUser = (state: State): User => state.user;
export const selectIsAuthenticated = (state: State): boolean =>
  state.user.isAuth;
export const selectUserToken = (state: State): string => state.user.token;
export const selectRole = (state: State): Role | null => state.user.role;
export const selectStorageToken = (): string | null =>
  localStorage.getItem(TOKEN);
