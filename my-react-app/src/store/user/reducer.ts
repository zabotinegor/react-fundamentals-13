import { createSlice } from "@reduxjs/toolkit";
import { Action } from "../interfaces";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  Response,
  UserState,
} from "../../types";
import { stat } from "fs";

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

    registerResponse: (state: UserState, action: Action<any>) => {
      // Empty body
    },
    registerRequest: (state: UserState, action: Action<RegisterRequest>) => {
      // Empty body
    },
  },
});

export const { actions, reducer } = UserReducer;
