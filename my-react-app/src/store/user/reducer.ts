import { createSlice } from "@reduxjs/toolkit";
import { Action } from "../interfaces";
import {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  RegisterRequest,
  Response,
  UserState,
} from "../../types";

export const initialState: UserState = {
  isAuth: false,
  name: "",
  email: "",
  token: "",
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
    loginRequest: (state: UserState, action: Action<LoginRequest>) => {
      // Empty body
    },

    registerRequest: (state: UserState, action: Action<RegisterRequest>) => {
      // Empty body
    },

    logoutResponse: (state: UserState, action: Action<any>) => {
      state.isAuth = false;
      state.name = "";
      state.email = "";
      state.token = "";
    },
    logoutRequest: (state: UserState, action: Action<LogoutRequest>) => {
      // Empty body
    },
  },
});

export const { actions, reducer } = UserReducer;
