import { CourseState } from "../../types";

export const selectCurrentCourse = (state: CourseState) => state.currentCourse;
export const selectIsCurrentCourseLoading = (state: CourseState) =>
  state.isLoading;
