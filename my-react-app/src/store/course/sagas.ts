import { takeEvery, call, put } from "typed-redux-saga";
import { actions } from "./reducer";
import { Action, Response } from "../../types/common";
import { addCourseAPI, getCourseAPI } from "./requests";
import {
  GetCourseRequest,
  GetCourseResponse,
  AddCourseRequest,
} from "../../types/courses";

export function* getCurrentCourse(action: Action<GetCourseRequest>) {
  try {
    yield put(actions.setCurrentCourseIsLoading(true));

    const response: Response<GetCourseResponse> = yield call(
      getCourseAPI,
      action.payload
    );

    if (response.status === 200) {
      yield put(actions.setCurrentCourse(response));
      yield put(actions.setCurrentCourseIsLoading(false));
    } else {
      throw new Error();
    }
  } catch (error) {
    yield put(actions.setCurrentCourseIsLoading(false));
  }
}

export function* addCourse(action: Action<AddCourseRequest>) {
  try {
    const response: Response<unknown> = yield call(
      addCourseAPI,
      action.payload
    );

    if (response.status === 201) {
      if (action.payload.handleSuccess) {
        action.payload.handleSuccess();
      }
    } else if (action.payload.handleAPIError) {
      action.payload.handleAPIError(response.status);
    }
  } catch (error) {
    if (action.payload.handleError) {
      action.payload.handleError(error);
    }
  }
}

export function* getCurrentCourseSaga() {
  yield takeEvery(actions.getCurrentCourse, getCurrentCourse);
}

export function* addCourseSaga() {
  yield takeEvery(actions.addCourse, addCourse);
}
