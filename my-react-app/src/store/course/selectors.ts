import { State } from "../../types";

export const selectCurrentCourse = (state: State) => state.course.currentCourse;
export const selectIsCurrentCourseLoading = (state: State) =>
  state.course.isLoading;
