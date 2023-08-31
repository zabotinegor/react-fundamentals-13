import { createSlice } from "@reduxjs/toolkit";
import {
  CoursesState,
  GetCoursesRequest,
  GetCoursesResponse,
} from "../../types/courses";
import { Action, Response } from "../../types/common";

export const initialState: CoursesState = {
  courses: [],
  isLoading: false,
};

export const CoursesReducer = createSlice({
  name: "courses",
  initialState: initialState,
  reducers: {
    setCourses: (
      state: CoursesState,
      action: Action<Response<GetCoursesResponse>>
    ) => {
      state.courses = action.payload.data?.result || [];
    },
    getCourses: (state: any, action: Action<GetCoursesRequest>) => {
      // Empty body
    },

    setCoursesIsLoading: (state: CoursesState, action: Action<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { actions, reducer } = CoursesReducer;
