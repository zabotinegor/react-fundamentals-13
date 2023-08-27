import { LoginRequest } from "./../../types/index";
import axios, { AxiosError } from "axios";
import { Response, LoginResponse } from "../../types";
import { LOGIN_API_URL } from "../../constants/API";

export async function loginUserAPI(
  loginRequest: LoginRequest
): Promise<Response<LoginResponse>> {
  try {
    return await axios.post(LOGIN_API_URL, {
      email: loginRequest.loginData.email,
      password: loginRequest.loginData.password,
    });
  } catch (error) {
    const axiosError = error as AxiosError;

    return axiosError.response as Response<LoginResponse>;
  }
}
