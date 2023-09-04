import { takeEvery, call, put } from "typed-redux-saga";
import { actions } from "./reducer";
import { getCoursesAPI } from "./requests";
import { GetCoursesRequest, GetCoursesResponse } from "../../types/courses";
import { Action, Response } from "../../types/common";

export function* getCourses(action: Action<GetCoursesRequest>) {
  try {
    yield put(actions.setCoursesIsLoading(true));

    const response: Response<GetCoursesResponse> = yield call(
      getCoursesAPI,
      action.payload
    );

    if (response.status === 200) {
      yield put(actions.setCourses(response));
      yield put(actions.setCoursesIsLoading(false));
    } else if (action.payload.handleAPIError) {
      action.payload.handleAPIError(response.status);
    }
  } catch (error) {
    yield put(actions.setCoursesIsLoading(false));
    if (action.payload.handleError) {
      action.payload.handleError(error);
    }
  }
}

export function* getCoursesSaga() {
  yield takeEvery(actions.getCourses, getCourses);
}
