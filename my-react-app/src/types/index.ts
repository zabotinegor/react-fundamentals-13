export interface Action<T> {
  type: string;
  payload: T;
}

export interface Response<T> {
  status: number;
  data?: T;
}

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

export interface GetCoursesRequest {
  searchTerm: string | null;
}

export interface GetCoursesResponse {
  result: Course[] | null;
}

export interface State {
  courses: CoursesState;
}
