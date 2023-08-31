import { createSlice } from "@reduxjs/toolkit";
import {
  UserState,
  LoginResponse,
  LoginRequest,
  RegisterRequest,
  LogoutRequest,
  UserMeResponse,
} from "../../types/user";
import { Action, Response } from "../../types/common";

export const initialState: UserState = {
  isAuth: false,
  name: "",
  email: "",
  token: "",
  role: null,
};

export const UserReducer = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loginResponse: (
      state: UserState,
      action: Action<Response<LoginResponse>>
    ) => {
      state.isAuth = true;
      state.name = action.payload.data?.user.name || "";
      state.email = action.payload.data?.user.email || "";
      state.token = action.payload.data?.result || "";
    },
    loginRequest: (state: any, action: Action<LoginRequest>) => {
      // Empty body
    },

    registerRequest: (state: any, action: Action<RegisterRequest>) => {
      // Empty body
    },

    logoutResponse: (state: UserState, action: Action<any>) => {
      state.isAuth = false;
      state.name = "";
      state.email = "";
      state.token = "";
    },
    logoutRequest: (state: any, action: Action<LogoutRequest>) => {
      // Empty body
    },

    userMeResponse: (
      state: UserState,
      action: Action<Response<UserMeResponse>>
    ) => {
      (state.name = action.payload.data?.result.name || ""),
        (state.email = action.payload.data?.result.email || ""),
        (state.role = action.payload.data?.result.role || null);
    },
    userMeRequest: (state: any, action: Action<any>) => {
      // Empty body
    },
  },
});

export const { actions, reducer } = UserReducer;
