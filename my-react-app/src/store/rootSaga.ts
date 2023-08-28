import { all } from "typed-redux-saga";
import { getCoursesSaga } from "./courses/sagas";
import { getAuthorSaga, getAuthorsSaga } from "./authors/sagas";
import { userSagas } from "./user/sagas";
import { addCourseSaga, getCurrentCourseSaga } from "./course/sagas";

export default function* rootSaga() {
  yield all([
    getCoursesSaga(),
    getCurrentCourseSaga(),
    addCourseSaga(),
    getAuthorsSaga(),
    userSagas(),
    getAuthorSaga(),
  ]);
}
