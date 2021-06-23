import "regenerator-runtime/runtime";
import { all, call, takeEvery, put } from "redux-saga/effects";
import {
  SORT_MINUTES,
  SORT_HOURS,
  SORT_DAYS,
  sortTimeSuccessCreator,
} from "../../store/reducers/sortReducers/sortTimeReducer";

function* sortHoursWorker(action) {
  const sorted = [];
  const output = [];

  for (let i = 0; i < action.payload.length; i++) {
    sorted.push(action.payload[i].getHours());
  }
  const redacted = sorted.filter((item, i) => sorted.indexOf(item) == i);

  console.log(redacted.length);
  for (let i = 0; i < redacted.length; i += 4) {
    output.push(redacted[i]);
  }
  yield put(sortTimeSuccessCreator(output));
}

function* sortMinutesWorker(action) {}

function* sortDaysWorker(action) {}

export function* sortWatcher() {
  yield takeEvery(SORT_MINUTES, sortMinutesWorker);
  yield takeEvery(SORT_HOURS, sortHoursWorker);
  yield takeEvery(SORT_DAYS, sortDaysWorker);
}
