import { Update, createSlice } from "@reduxjs/toolkit";
import {
  CourseState,
  GetCourseResponse,
  GetCourseRequest,
  AddCourseRequest,
  DeleteCourseRequest,
  CoursesState,
  UpdateCourseRequest,
} from "../../types/courses";
import { Action, Response } from "../../types/common";

export const initialState: CourseState = {
  currentCourse: null,
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
      state.currentCourse = action.payload.data?.result || null;
    },
    getCurrentCourse: (state: any, action: Action<GetCourseRequest>) => {
      // Empty body
    },

    setCurrentCourseIsLoading: (
      state: CourseState,
      action: Action<boolean>
    ) => {
      state.isLoading = action.payload;
    },

    addCourse: (state: any, action: Action<AddCourseRequest>) => {
      // Empty body
    },

    deleteCourse: (state: any, action: Action<DeleteCourseRequest>) => {
      // Empty body
    },

    updateCourse: (state: any, action: Action<UpdateCourseRequest>) => {
      // Empty body
    },
  },
});

export const { actions, reducer } = CourseReducer;
