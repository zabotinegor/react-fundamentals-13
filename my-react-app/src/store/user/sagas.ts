import { takeEvery, call, put } from "redux-saga/effects";
import { actions } from "./reducer";
import {
  loginUserAPI,
  logoutUserAPI,
  registerUserAPI,
  userMeAPI,
} from "./requests";
import { Action, Response } from "../../types/common";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  LogoutRequest,
  UserMeRequest,
  UserMeResponse,
} from "../../types/user";

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

export function* userMe(action: Action<UserMeRequest>) {
  try {
    const response: Response<UserMeResponse> = yield call(
      userMeAPI,
      action.payload
    );

    if (response.status === 200) {
      yield put(actions.userMeResponse(response));
    } else {
      throw Error();
    }
  } catch (error) {
    // ignore
  }
}

export function* userSagas() {
  yield takeEvery(actions.loginRequest, loginUser);
  yield takeEvery(actions.registerRequest, registerUser);
  yield takeEvery(actions.logoutRequest, logoutUser);
  yield takeEvery(actions.userMeRequest, userMe);
}
