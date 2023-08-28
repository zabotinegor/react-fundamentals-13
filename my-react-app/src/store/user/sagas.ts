import { takeEvery, call, put } from "redux-saga/effects";
import { actions } from "./reducer";
import {
  Action,
  Response,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  LogoutRequest,
} from "../../types";
import { loginUserAPI, logoutUserAPI, registerUserAPI } from "./requests";

export function* loginUser(action: Action<LoginRequest>) {
  try {
    const response: Response<LoginResponse> = yield call(
      loginUserAPI,
      action.payload
    );

    if (response.status === 201) {
      yield put(actions.loginResponse(response));

      action.payload.handleSuccess(response.data?.result || "");
    } else if (action.payload.handleAPIError !== null) {
      action.payload.handleAPIError(response.status);
    }
  } catch (error) {
    if (action.payload.handleError !== null) {
      action.payload.handleError(error);
    }
  }
}

export function* registerUser(action: Action<RegisterRequest>) {
  try {
    const response: Response<LoginResponse> = yield call(
      registerUserAPI,
      action.payload
    );

    if (response.status === 201) {
      action.payload.handleSuccess();
    } else if (action.payload.handleAPIError !== null) {
      action.payload.handleAPIError(response.status);
    }
  } catch (error) {
    if (action.payload.handleError !== null) {
      action.payload.handleError(error);
    }
  }
}

export function* logoutUser(action: Action<LogoutRequest>) {
  try {
    const response: Response<LoginResponse> = yield call(
      logoutUserAPI,
      action.payload
    );

    if (response.status === 200) {
      action.payload.handleSuccess();
    } else if (action.payload.handleAPIError !== null) {
      action.payload.handleAPIError(response.status);
    }
  } catch (error) {
    if (action.payload.handleError !== null) {
      action.payload.handleError(error);
    }
  }
}

export function* userSagas() {
  yield takeEvery(actions.loginRequest, loginUser);
  yield takeEvery(actions.registerRequest, registerUser);
  yield takeEvery(actions.logoutRequest, logoutUser);
}
