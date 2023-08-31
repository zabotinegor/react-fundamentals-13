export interface User {
  name: string;
  email: string;
}

export interface UserState extends User {
  isAuth: boolean;
  token: string;
  role: Role | null;
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

export interface RegisterRequest extends User {
  password: string;
  handleSuccess: () => void;
  handleAPIError: (code: number) => void | null;
  handleError: (error: unknown) => void | null;
}

export interface LogoutRequest {
  handleSuccess: () => void;
  handleAPIError: (code: number) => void | null;
  handleError: (error: unknown) => void | null;
}

export interface UserMeResponse {
  result: {
    name: string;
    email: string;
    role: Role;
  };
}

export enum Role {
  user,
  admin,
}
