import axios from "axios";
import {
  COURSES_ALL_API_URL,
  COURSES_FILTERED_API_URL,
} from "../../constants/API";
import { Response } from "../../types/common";
import { GetCoursesRequest, GetCoursesResponse } from "../../types/courses";

export function getCoursesAPI(
  getCoursesRequest: GetCoursesRequest
): Promise<Response<GetCoursesResponse>> {
  if (getCoursesRequest.searchTerm && getCoursesRequest.searchTerm !== "") {
    const params = {
      title: getCoursesRequest.searchTerm,
    };
    return axios.get(COURSES_FILTERED_API_URL, { params });
  } else {
    return axios.get(COURSES_ALL_API_URL);
  }
}
