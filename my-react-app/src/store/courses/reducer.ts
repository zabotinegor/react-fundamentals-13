import { createSlice } from "@reduxjs/toolkit";
import {
  Action,
  Response,
  CoursesState,
  GetCoursesResponse,
  GetCoursesRequest,
} from "../../types";

export const initialState: CoursesState = {
  courses: [],
  isLoading: false,
};

export const CoursesReducer = createSlice({
  name: "courses",
  initialState: () => initialState,
  reducers: {
    setCourses: (
      state: CoursesState,
      action: Action<Response<GetCoursesResponse>>
    ) => {
      state.courses = action.payload.data?.result || [];
    },
    getCourses: (state: CoursesState, action: Action<GetCoursesRequest>) => {
      // Empty body
    },

    setCoursesIsLoading: (state: CoursesState, action: Action<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { actions, reducer } = CoursesReducer;
