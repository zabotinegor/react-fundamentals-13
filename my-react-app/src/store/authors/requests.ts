import { GetAuthorsResponse } from "./../../types/index";
import axios from "axios";
import { AUTHORS_ALL_API_URL } from "../../constants/API";
import { Response } from "../../types";

export function getAuthorsAPI(): Promise<Response<GetAuthorsResponse>> {
  return axios.get(AUTHORS_ALL_API_URL);
}
