import axios, { AxiosError } from "axios";
import { AUTHORS_ADD_API_URL, AUTHORS_ALL_API_URL } from "../../constants/API";
import { Response } from "../../types/common";
import {
  GetAuthorsResponse,
  CreateAuthorRequest,
  CreateAuthorResponse,
} from "../../types/authors";

export async function getAuthorsAPI(): Promise<Response<GetAuthorsResponse>> {
  try {
    return await axios.get(AUTHORS_ALL_API_URL);
  } catch (error) {
    return (error as AxiosError).response as Response<any>;
  }
}

export async function createAuthorAPI(
  createAuthorRequest: CreateAuthorRequest
): Promise<Response<CreateAuthorResponse>> {
  const name = createAuthorRequest.name;

  try {
    return await axios.post(AUTHORS_ADD_API_URL, { name: name });
  } catch (error) {
    return (error as AxiosError).response as Response<any>;
  }
}
