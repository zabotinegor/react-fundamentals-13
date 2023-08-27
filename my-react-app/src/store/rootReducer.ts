import { combineReducers } from "redux";
import { CoursesReducer } from "./courses/reducer";
import { AuthorsReducer } from "./authors/reducer";

export const rootReducer = () =>
  combineReducers({
    courses: CoursesReducer.reducer,
    authors: AuthorsReducer.reducer,
  });
