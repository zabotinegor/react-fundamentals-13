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
  currentCourse: Course | undefined;
  isLoading: boolean;
}

export interface GetCourseRequest {
  courseId: string | undefined;
}

export interface GetCourseResponse {
  result: Course | undefined;
}

export interface GetCoursesRequest {
  searchTerm: string | null;
}

export interface GetCoursesResponse {
  result: Course[] | null;
}

export interface AddCourseRequest {
  token: string;
  title: string;
  description: string;
  duration: number;
  authors: string[];
  handleSuccess: () => void;
  handleAPIError: (code: number) => void | null;
  handleError: (error: unknown) => void | null;
}
