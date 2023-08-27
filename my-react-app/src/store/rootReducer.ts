import { combineReducers } from "redux";
import { CoursesReducer } from "./courses/reducer";

export const rootReducer = () =>
  combineReducers({
    courses: CoursesReducer.reducer,
  });
