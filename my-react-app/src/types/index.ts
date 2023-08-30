import { AuthorsState } from "./authors";
import { CourseState, CoursesState } from "./courses";
import { UserState } from "./user";

export interface State {
  user: UserState;
  courses: CoursesState;
  authors: AuthorsState;
  course: CourseState;
}
