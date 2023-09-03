import { takeEvery, call, put } from "typed-redux-saga";
import { actions } from "./reducer";
import { actions as coursesActions } from "../courses/reducer";
import { Action, Response } from "../../types/common";
import { addCourseAPI, deleteCourseAPI, getCourseAPI } from "./requests";
import {
  GetCourseRequest,
  GetCourseResponse,
  AddCourseRequest,
  DeleteCourseRequest,
} from "../../types/courses";

export function* getCourse(action: Action<GetCourseRequest>) {
  try {
    yield put(actions.setCurrentCourseIsLoading(true));

    const response: Response<GetCourseResponse> = yield call(
      getCourseAPI,
      action.payload
    );

    if (response.status === 200) {
      yield put(actions.setCurrentCourse(response));
      yield put(actions.setCurrentCourseIsLoading(false));
      if (action.payload.handleSuccess && response.data?.result) {
        action.payload.handleSuccess(response.data.result);
      }
    } else if (action.payload.handleAPIError) {
      action.payload.handleAPIError(response.status);
    }
  } catch (error) {
    yield put(actions.setCurrentCourseIsLoading(false));
    if (action.payload.handleError) {
      action.payload.handleError(error);
    }
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

export function* deleteCourse(action: Action<DeleteCourseRequest>) {
  try {
    const response: Response<unknown> = yield call(
      deleteCourseAPI,
      action.payload
    );

    if (response.status === 200) {
      yield put(coursesActions.removeCourse(action.payload.courseId));
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

export function* getCourseSaga() {
  yield takeEvery(actions.getCurrentCourse, getCourse);
}

export function* addCourseSaga() {
  yield takeEvery(actions.addCourse, addCourse);
}

export function* deleteCourseSaga() {
  yield takeEvery(actions.deleteCourse, deleteCourse);
}
