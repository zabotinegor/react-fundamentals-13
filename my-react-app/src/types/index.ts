export interface Action<T> {
  type: string;
  payload: T;
}

export interface Response<T> {
  status: number;
  data?: T;
}

// Courses types

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

// Authors types

export interface Author {
  id: string;
  name: string;
}

export interface AuthorsState {
  authors: Author[];
  isLoading: boolean;
}

export interface GetAuthorsResponse {
  result: Author[] | null;
}

// User types

export interface User {
  name: string;
  email: string;
}

export interface UserState extends User {
  isAuth: boolean;
  token: string;
}

export interface LoginRequest {
  loginData: {
    email: string;
    password: string;
  };
  handleSuccess: (token: string) => void;
  handleAPIError: (code: number) => void | null;
  handleError: (error: unknown) => void | null;
}

export interface LoginResponse {
  result: string;
  user: User;
}
// Common state

export interface State {
  user: UserState;
  courses: CoursesState;
  authors: AuthorsState;
}
