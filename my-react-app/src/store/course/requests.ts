import axios, { AxiosError } from "axios";
import { COURSES_ADD_API_URL, COURSES_API_URL } from "../../constants/API";
import { Response } from "../../types/common";
import {
  GetCourseRequest,
  GetCourseResponse,
  AddCourseRequest,
} from "../../types/courses";

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

export async function addCourseAPI(
  addCourseRequest: AddCourseRequest
): Promise<Response<unknown>> {
  try {
    return await axios.post(
      COURSES_ADD_API_URL,
      {
        title: addCourseRequest.title,
        description: addCourseRequest.description,
        duration: addCourseRequest.duration,
        authors: addCourseRequest.authors,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: addCourseRequest.token,
        },
      }
    );
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      return axiosError.response as Response<unknown>;
    } else {
      throw axiosError;
    }
  }
}
