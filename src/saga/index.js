import { all } from "redux-saga/effects";
import { getForBtnWatcher } from "./querySaga/getForBtnSaga";
import { getMainWatcher } from "./querySaga/getMainSaga";
import { sortWatcher } from "./sortSaga/sortSaga";

export function* rootWatcher() {
  yield all([getMainWatcher(), getForBtnWatcher(), sortWatcher()]);
}
