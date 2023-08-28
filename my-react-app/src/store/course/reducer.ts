import { createSlice } from "@reduxjs/toolkit";
import {
  Action,
  Response,
  CourseState,
  GetCourseResponse,
  GetCourseRequest,
} from "../../types";

export const initialState: CourseState = {
  currentCourse: undefined,
  isLoading: false,
};

export const CourseReducer = createSlice({
  name: "currentCourse",
  initialState: initialState,
  reducers: {
    setCurrentCourse: (
      state: CourseState,
      action: Action<Response<GetCourseResponse>>
    ) => {
      state.currentCourse = action.payload.data?.result;
    },
    getCurrentCourse: (
      state: CourseState,
      action: Action<GetCourseRequest>
    ) => {
      // Empty body
    },

    setCurrentCourseIsLoading: (
      state: CourseState,
      action: Action<boolean>
    ) => {
      state.isLoading = action.payload;
    },
  },
});

export const { actions, reducer } = CourseReducer;
