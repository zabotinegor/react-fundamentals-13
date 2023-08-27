import { all } from "typed-redux-saga";
import { getCoursesSaga } from "./courses/sagas";

export default function* rootSaga() {
  yield all([getCoursesSaga()]);
}
