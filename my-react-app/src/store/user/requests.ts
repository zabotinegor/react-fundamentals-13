import axios, { AxiosError } from "axios";
import {
  LOGIN_API_URL,
  LOGOUT_API_URL,
  REGISTER_API_URL,
  USERS_ME_API_URL,
} from "../../constants/API";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  GetUserInfoResponse,
} from "../../types/user";
import { Response } from "../../types/common";

export async function loginUserAPI(
  loginRequest: LoginRequest
): Promise<Response<LoginResponse>> {
  try {
    return await axios.post(LOGIN_API_URL, {
      email: loginRequest.loginData.email,
      password: loginRequest.loginData.password,
    });
  } catch (error) {
    return (error as AxiosError).response as Response<any>;
  }
}

export async function registerUserAPI(
  registerRequest: RegisterRequest
): Promise<Response<any>> {
  try {
    return await axios.post(REGISTER_API_URL, {
      name: registerRequest.name,
      email: registerRequest.email,
      password: registerRequest.password,
    });
  } catch (error) {
    return (error as AxiosError).response as Response<any>;
  }
}

export async function logoutUserAPI(): Promise<Response<any>> {
  try {
    return await axios.delete(LOGOUT_API_URL);
  } catch (error) {
    return (error as AxiosError).response as Response<any>;
  }
}

export async function userMeAPI(): Promise<Response<GetUserInfoResponse>> {
  try {
    return await axios.get(USERS_ME_API_URL);
  } catch (error) {
    return (error as AxiosError).response as Response<any>;
  }
}
