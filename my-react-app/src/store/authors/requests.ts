import {
  CreateAuthorRequest,
  CreateAuthorResponse,
  GetAuthorsResponse,
} from "./../../types/index";
import axios, { AxiosError } from "axios";
import { AUTHORS_ADD_API_URL, AUTHORS_ALL_API_URL } from "../../constants/API";
import { Response } from "../../types";

export function getAuthorsAPI(): Promise<Response<GetAuthorsResponse>> {
  return axios.get(AUTHORS_ALL_API_URL);
}

export async function createAuthorAPI(
  createAuthorRequest: CreateAuthorRequest
): Promise<Response<CreateAuthorResponse>> {
  const name = createAuthorRequest.name;

  try {
    return await axios.post(
      AUTHORS_ADD_API_URL,
      { name: name },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: createAuthorRequest.token,
        },
      }
    );
  } catch (error) {
    const axiosError = error as AxiosError;

    return axiosError.response as Response<any>;
  }
}
