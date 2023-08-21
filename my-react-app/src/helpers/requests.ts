import axios from "axios";
import {
  AUTHORS_ADD_API_URL,
  AUTHORS_API_URL,
  COURSES_ADD_API_URL,
  COURSES_ALL_API_URL,
  COURSES_API_URL,
  COURSES_FILTERED_API_URL,
  LOGIN_API_URL,
  REGISTER_API_URL,
} from "../constants/API";

export interface CourseData {
  id: string;
  title: string;
  description: string;
  duration: number;
  authors: string[];
  creationDate: string;
}

export function getCourseDataAPI(
  courseId: string | undefined,
  successCallBack?: (result: CourseData) => void,
  errorCallback?: (error: unknown) => void
) {
  axios
    .get(`${COURSES_API_URL}/${courseId}`)
    .then((response) => {
      if (successCallBack) {
        successCallBack(response.data.result);
      }
    })
    .catch((error) => {
      if (errorCallback) {
        errorCallback(error);
      }
    });
}

export function getAllCoursesAPI(
  successCallback: (courses: CourseData[]) => void,
  errorCallback: (error: unknown) => void
) {
  axios
    .get(COURSES_ALL_API_URL)
    .then((response) => {
      successCallback(response.data.result);
    })
    .catch((error) => {
      errorCallback(error);
    });
}

export function getFilteredCoursesAPI(
  searchTerm: string,
  successCallback: (courses: CourseData[]) => void,
  errorCallback: (error: unknown) => void
) {
  axios
    .get(`${COURSES_FILTERED_API_URL}?title=${searchTerm}`)
    .then((response) => {
      successCallback(response.data.result);
    })
    .catch((error) => {
      errorCallback(error);
    });
}

export interface Course {
  title: string;
  description: string;
  duration: number;
  authors: string[];
}

export async function createCourseAPI(
  courseData: Course,
  token: string,
  successCallback?: () => void,
  errorCallback?: (error: unknown) => void
) {
  try {
    const response = await axios.post(COURSES_ADD_API_URL, courseData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (response.status === 201) {
      if (successCallback) {
        successCallback();
      }
    } else {
      if (errorCallback) {
        errorCallback("Failed to create course");
      }
    }
  } catch (error) {
    if (errorCallback) {
      errorCallback(error);
    }
  }
}

export async function createAuthorAPI(
  authorName: string,
  token: string,
  successCallback?: (authorId: string) => void,
  errorCallback?: (error: unknown) => void
) {
  try {
    const response = await axios.post(
      AUTHORS_ADD_API_URL,
      { name: authorName },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    if (response.data.successful) {
      const authorId = response.data.result.id;
      if (successCallback) {
        successCallback(authorId);
      }
    } else {
      console.error("Failed to create author");
      if (errorCallback) {
        errorCallback("Failed to create author");
      }
    }
  } catch (error) {
    if (errorCallback) {
      errorCallback(error);
    }
  }
}

export async function loginUserAPI(
  email: string,
  password: string,
  successCallback: (data: any) => void,
  errorCallback: (error: unknown) => void
) {
  try {
    const response = await axios.post(LOGIN_API_URL, {
      email,
      password,
    });

    if (response.status === 201) {
      if (successCallback) {
        successCallback(response.data);
      }
    } else {
      errorCallback("Login failed");
    }
  } catch (error) {
    if (errorCallback) {
      errorCallback(error);
    }
  }
}

export async function registerUserAPI(
  name: string,
  email: string,
  password: string,
  successCallback: () => void,
  errorCallback: (error: unknown) => void
) {
  try {
    const response = await axios.post(REGISTER_API_URL, {
      name,
      email,
      password,
    });

    if (response.status === 201) {
      if (successCallback) {
        successCallback();
      }
    } else {
      errorCallback("Registration failed");
    }
  } catch (error) {
    if (errorCallback) {
      errorCallback(error);
    }
  }
}

export interface Author {
  id: string;
  name: string;
}

export async function getAuthorAPI(authorId: string): Promise<Author | null> {
  try {
    const response = await axios.get(`${AUTHORS_API_URL}/${authorId}`);

    if (response.status === 200 && response.data.successful) {
      const authorData = response.data.result;
      return authorData;
    } else {
      return null;
    }
  } catch (error) {
    console.error("An error occurred while fetching author data:", error);
    return null;
  }
}
