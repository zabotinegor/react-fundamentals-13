import { takeEvery, call, put } from "redux-saga/effects";
import { actions } from "./reducer";
import {
  loginUserAPI,
  logoutUserAPI,
  registerUserAPI,
  userMeAPI,
} from "./requests";
import { Action, Request, Response } from "../../types/common";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  LogoutRequest,
  GetUserInfoResponse,
} from "../../types/user";

export function* loginUser(action: Action<LoginRequest>) {
  try {
    const response: Response<LoginResponse> = yield call(
      loginUserAPI,
      action.payload
    );

    if (response.status === 201) {
      yield put(actions.setUser(response));
      action.payload.handleSuccess();
    } else if (action.payload.handleAPIError) {
      action.payload.handleAPIError(response.status);
    }
  } catch (error) {
    if (action.payload.handleError) {
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
    } else if (action.payload.handleAPIError) {
      action.payload.handleAPIError(response.status);
    }
  } catch (error) {
    if (action.payload.handleError) {
      action.payload.handleError(error);
    }
  }
}

export function* logoutUser(action: Action<LogoutRequest>) {
  try {
    const response: Response<any> = yield call(logoutUserAPI);

    if (response.status === 200) {
      yield put(actions.removeUser());
      action.payload.handleSuccess();
    } else if (action.payload.handleAPIError) {
      yield put(actions.removeUser());
      action.payload.handleAPIError(response.status);
    }
  } catch (error) {
    if (action.payload.handleError) {
      yield put(actions.removeUser());
      action.payload.handleError(error);
    }
  }
}

export function* getUserInfo(action: Action<Request>) {
  try {
    const response: Response<GetUserInfoResponse> = yield call(userMeAPI);

    if (response.status === 200) {
      yield put(actions.setUserInfo(response));
    } else if (action.payload.handleAPIError) {
      action.payload.handleAPIError(response.status);
    }
  } catch (error) {
    if (action.payload.handleError) {
      action.payload.handleError(error);
    }
  }
}

export function* userSagas() {
  yield takeEvery(actions.loginUser, loginUser);
  yield takeEvery(actions.registerUser, registerUser);
  yield takeEvery(actions.logoutUser, logoutUser);
  yield takeEvery(actions.getUserInfo, getUserInfo);
}
