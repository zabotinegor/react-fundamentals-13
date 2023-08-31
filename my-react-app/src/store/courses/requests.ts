import axios, { AxiosError } from "axios";
import {
  COURSES_ALL_API_URL,
  COURSES_FILTERED_API_URL,
} from "../../constants/API";
import { Response } from "../../types/common";
import { GetCoursesRequest, GetCoursesResponse } from "../../types/courses";

export async function getCoursesAPI(
  getCoursesRequest: GetCoursesRequest
): Promise<Response<GetCoursesResponse>> {
  try {
    if (getCoursesRequest.searchTerm && getCoursesRequest.searchTerm !== "") {
      const params = {
        title: getCoursesRequest.searchTerm,
      };
      return await axios.get(COURSES_FILTERED_API_URL, { params });
    } else {
      return await axios.get(COURSES_ALL_API_URL);
    }
  } catch (error) {
    return (error as AxiosError).response as Response<any>;
  }
}
