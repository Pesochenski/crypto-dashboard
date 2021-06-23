import { all } from "redux-saga/effects";
import { getMainWatcher } from "./querySaga/getMainSaga";
import { sortWatcher } from "./sortSaga/sortSaga";

export function* rootWatcher() {
  yield all([getMainWatcher(), sortWatcher()]);
}
