import { all } from "typed-redux-saga";
import { getCoursesSaga } from "./courses/sagas";
import { getAuthorsSaga } from "./authors/sagas";
import { userSagas } from "./user/sagas";
import { getCurrentCourseSaga } from "./course/sagas";

export default function* rootSaga() {
  yield all([
    getCoursesSaga(),
    getCurrentCourseSaga(),
    getAuthorsSaga(),
    userSagas(),
  ]);
}
