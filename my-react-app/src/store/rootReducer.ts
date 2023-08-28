import { combineReducers } from "redux";
import { CoursesReducer } from "./courses/reducer";
import { AuthorsReducer } from "./authors/reducer";
import { UserReducer } from "./user/reducer";
import { CourseReducer } from "./course/reducer";

export const rootReducer = () =>
  combineReducers({
    courses: CoursesReducer.reducer,
    course: CourseReducer.reducer,
    authors: AuthorsReducer.reducer,
    user: UserReducer.reducer,
  });
