import { takeEvery, call, put } from "typed-redux-saga";
import { actions } from "./reducer";
import {
  Action,
  Response,
  GetCourseRequest,
  GetCourseResponse,
} from "../../types";
import { getCourseAPI } from "./requests";

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

export function* getCurrentCourseSaga() {
  yield takeEvery(actions.getCurrentCourse, getCurrentCourse);
}
