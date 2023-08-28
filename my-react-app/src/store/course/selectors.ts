import { State } from "../../types";

export const selectCurrentCourse = (state: State) =>
  state.currentCourse?.currentCourse;
export const selectIsCurrentCourseLoading = (state: State) =>
  state.currentCourse.isLoading;
