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
    } else {
      throw new Error();
    }
  } catch (error) {
    yield put(actions.setCoursesIsLoading(false));
  }
}

export function* getCoursesSaga() {
  yield takeEvery(actions.getCourses, getCourses);
}
