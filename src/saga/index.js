import { all } from "redux-saga/effects";
import { getMainWatcher } from "./getMainSaga";

export function* rootWatcher() {
  yield all([getMainWatcher()]);
}
