import { createSlice } from "@reduxjs/toolkit";
import { Action } from "../interfaces";
import { Response, AuthorsState, GetAuthorsResponse } from "../../types";

export const initialState: AuthorsState = {
  authors: [],
  isLoading: false,
};

export const AuthorsReducer = createSlice({
  name: "authors",
  initialState: initialState,
  reducers: {
    setAuthors: (
      state: AuthorsState,
      action: Action<Response<GetAuthorsResponse>>
    ) => {
      state.authors = action.payload.data?.result || [];
    },
    getAuthors: (state: AuthorsState) => {
      // Empty body
    },

    setAuthorsIsLoading: (state: AuthorsState, action: Action<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { actions, reducer } = AuthorsReducer;
