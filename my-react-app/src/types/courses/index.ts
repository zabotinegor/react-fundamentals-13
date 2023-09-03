import { Request } from "../common";

export interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
}

export interface CoursesState {
  courses: Course[];
  isLoading: boolean;
}

export interface CourseState {
  currentCourse: Course | null;
  isLoading: boolean;
}

export interface GetCourseRequest extends Request {
  courseId: string | undefined;
}

export interface GetCourseResponse {
  result: Course | undefined;
}

export interface GetCoursesRequest extends Request {
  searchTerm: string | null;
}

export interface GetCoursesResponse {
  result: Course[] | null;
}

export interface AddCourseRequest extends Request {
  title: string;
  description: string;
  duration: number;
  authors: string[];
  handleSuccess: () => void;
}
