import {
  GetCourseRequest,
  GetCourseResponse,
  GetCoursesRequest,
} from "./../../types/index";
import axios, { AxiosError } from "axios";
import {
  COURSES_ALL_API_URL,
  COURSES_API_URL,
  COURSES_FILTERED_API_URL,
} from "../../constants/API";
import { Response, GetCoursesResponse } from "../../types";

export function getCourseAPI(
  getCourseRequest: GetCourseRequest
): Promise<Response<GetCourseResponse>> {
  const courseId = getCourseRequest.courseId;

  return axios
    .get(`${COURSES_API_URL}/${courseId}`)
    .then((response) => response)
    .catch((error) => {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        return axiosError.response as Response<any>;
      } else {
        throw axiosError;
      }
    });
}

// export function getCourseAPI(
//   getCourseRequest: GetCourseRequest
// ): Promise<Response<GetCourseResponse>> {
//   const courseId = getCourseRequest.courseId;

//   return axios.get(`${COURSES_API_URL}/${courseId}`);
// }
