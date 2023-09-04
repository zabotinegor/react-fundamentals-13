import { takeEvery, call, put } from "typed-redux-saga";
import { actions } from "./reducer";
import { createAuthorAPI, getAuthorsAPI } from "./requests";
import { Action, Response } from "../../types/common";
import {
  GetAuthorsResponse,
  CreateAuthorRequest,
  CreateAuthorResponse,
} from "../../types/authors";

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

export function* addAuthor(action: Action<CreateAuthorRequest>) {
  try {
    const response: Response<CreateAuthorResponse> = yield call(
      createAuthorAPI,
      action.payload
    );

    if (response.status === 201) {
      if (action.payload.handleSuccess) {
        action.payload.handleSuccess(response.data?.result || null);
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

export function* getAuthorsSaga() {
  yield takeEvery(actions.getAuthors, getAuthors);
}

export function* getAuthorSaga() {
  yield takeEvery(actions.addAuthor, addAuthor);
}
