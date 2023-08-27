import { all } from "typed-redux-saga";
import { getCoursesSaga } from "./courses/sagas";
import { getAuthorsSaga } from "./authors/sagas";
import { userSagas } from "./user/sagas";

export default function* rootSaga() {
  yield all([getCoursesSaga(), getAuthorsSaga(), userSagas()]);
}
