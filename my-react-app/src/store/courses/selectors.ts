import { State } from "../../types";

export const selectCourses = (state: State) => state.courses.courses;
export const selectIsCoursesLoading = (state: State) => state.courses.isLoading;
