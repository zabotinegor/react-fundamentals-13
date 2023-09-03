import axios, { AxiosError } from "axios";
import { COURSES_ADD_API_URL, COURSES_API_URL } from "../../constants/API";
import { Response } from "../../types/common";
import {
  GetCourseRequest,
  GetCourseResponse,
  AddCourseRequest,
  DeleteCourseRequest,
  UpdateCourseRequest,
} from "../../types/courses";

export async function getCourseAPI(
  getCourseRequest: GetCourseRequest
): Promise<Response<GetCourseResponse>> {
  const courseId = getCourseRequest.courseId;

  try {
    return await axios.get(`${COURSES_API_URL}/${courseId}`);
  } catch (error) {
    return (error as AxiosError).response as Response<any>;
  }
}

export async function addCourseAPI(
  addCourseRequest: AddCourseRequest
): Promise<Response<any>> {
  try {
    return await axios.post(COURSES_ADD_API_URL, {
      title: addCourseRequest.title,
      description: addCourseRequest.description,
      duration: addCourseRequest.duration,
      authors: addCourseRequest.authors,
    });
  } catch (error) {
    return (error as AxiosError).response as Response<any>;
  }
}

export async function updateCourseAPI(
  updateCourseRequest: UpdateCourseRequest
): Promise<Response<any>> {
  try {
    const courseId = updateCourseRequest.courseId;

    return await axios.put(`${COURSES_API_URL}/${courseId}`, {
      title: updateCourseRequest.title,
      description: updateCourseRequest.description,
      duration: updateCourseRequest.duration,
      authors: updateCourseRequest.authors,
    });
  } catch (error) {
    return (error as AxiosError).response as Response<any>;
  }
}

export async function deleteCourseAPI(
  deleteCourseRequest: DeleteCourseRequest
): Promise<Response<any>> {
  try {
    const courseId = deleteCourseRequest.courseId;

    return await axios.delete(`${COURSES_API_URL}/${courseId}`);
  } catch (error) {
    return (error as AxiosError).response as Response<any>;
  }
}
