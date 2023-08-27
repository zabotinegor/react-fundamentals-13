import { takeEvery, call, put } from "typed-redux-saga";
import { actions } from "./reducer";
import { getAuthorsAPI } from "./requests";
import { Response, GetAuthorsResponse } from "../../types";

export function* getAuthors() {
  try {
    yield put(actions.setAuthorsIsLoading(true));

    const response: Response<GetAuthorsResponse> = yield call(getAuthorsAPI);

    if (response.status === 200) {
      yield put(actions.setAuthors(response));
      yield put(actions.setAuthorsIsLoading(false));
    } else {
      throw new Error();
    }
  } catch (error) {
    yield put(actions.setAuthorsIsLoading(false));
  }
}

export function* getAuthorsSaga() {
  yield takeEvery(actions.getAuthors, getAuthors);
}
