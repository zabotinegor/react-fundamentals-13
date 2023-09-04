import { Request } from "../common";

export interface User {
  name: string;
  email: string;
}

export interface UserState extends User {
  isAuth: boolean;
  token: string;
  role: Role | null;
  isLoading: boolean;
}

export interface LoginRequest extends Request {
  loginData: {
    email: string;
    password: string;
  };
  handleSuccess: () => void;
}

export interface LoginResponse {
  result: string;
  user: User;
}

export interface RegisterRequest extends User, Request {
  password: string;
  handleSuccess: () => void;
}

export interface LogoutRequest extends Request {
  handleSuccess: () => void;
}

export interface GetUserInfoResponse {
  result: {
    name: string;
    email: string;
    role: string;
  };
}

export enum Role {
  user = "user",
  admin = "admin",
}
