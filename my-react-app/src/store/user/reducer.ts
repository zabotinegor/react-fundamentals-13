import { createSlice } from "@reduxjs/toolkit";
import {
  UserState,
  LoginResponse,
  LoginRequest,
  RegisterRequest,
  LogoutRequest,
  GetUserInfoResponse,
  Role,
} from "../../types/user";
import { Action, Response, Request } from "../../types/common";
import { stringToEnum } from "../../helpers/stringToEnum";
import { TOKEN } from "../../constants/Pages";
export const initialState: UserState = {
  isAuth: false,
  name: "",
  email: "",
  token: "",
  role: null,
  isLoading: false,
};

export const UserReducer = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state: UserState, action: Action<Response<LoginResponse>>) => {
      state.isAuth = true;
      state.name = action.payload.data?.user.name || "";
      state.email = action.payload.data?.user.email || "";
      state.token = action.payload.data?.result || "";

      localStorage.setItem(TOKEN, state.token);
    },
    loginUser: (state: any, action: Action<LoginRequest>) => {
      // Empty body
    },

    registerUser: (state: any, action: Action<RegisterRequest>) => {
      // Empty body
    },

    removeUser: (state: UserState) => {
      state.isAuth = false;
      state.name = "";
      state.email = "";
      state.token = "";
      state.role = null;

      localStorage.removeItem(TOKEN);
    },
    logoutUser: (state: any, action: Action<LogoutRequest>) => {
      // Empty body
    },

    setUserInfo: (
      state: UserState,
      action: Action<Response<GetUserInfoResponse>>
    ) => {
      (state.name = action.payload.data?.result.name || ""),
        (state.email = action.payload.data?.result.email || ""),
        (state.role = action.payload.data?.result.role
          ? stringToEnum(Role, action.payload.data?.result.role) || null
          : null);
    },
    getUserInfo: (state: any, action: Action<Request>) => {
      // Empty body
    },
    setUserInfoIsLoading: (state: UserState, action: Action<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { actions, reducer } = UserReducer;
