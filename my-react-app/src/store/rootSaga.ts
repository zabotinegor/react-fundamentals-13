import { all } from "typed-redux-saga";
import { getCoursesSaga } from "./courses/sagas";
import { getAuthorSaga, getAuthorsSaga } from "./authors/sagas";
import { userSagas } from "./user/sagas";
import {
  getCourseSaga,
  addCourseSaga,
  deleteCourseSaga,
  updateCourseSaga,
} from "./course/sagas";

export default function* rootSaga() {
  yield all([
    getCoursesSaga(),
    getCourseSaga(),
    addCourseSaga(),
    deleteCourseSaga(),
    updateCourseSaga(),
    getAuthorsSaga(),
    userSagas(),
    getAuthorSaga(),
  ]);
}
