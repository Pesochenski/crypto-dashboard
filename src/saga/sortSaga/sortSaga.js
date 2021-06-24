import "regenerator-runtime/runtime";
import { takeEvery, put } from "redux-saga/effects";
import {
  SORT_TIME,
  sortTimeSuccessCreator,
} from "../../store/reducers/sortReducers/sortTimeReducer";

const weekDays = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];

function* sortTimeWorker(action) {
  const sorted = [];
  const output = [];
  const typeForCheck = action.payload.type;
  let iterStep = 10;
  let iter = 0;

  for (let i = 0; i < action.payload.array.length; i++) {
    if (typeForCheck == "1h") {
      sorted.push(action.payload.array[i].getMinutes());
    } else if (typeForCheck == "1d") {
      sorted.push(action.payload.array[i].getHours());
    } else if (typeForCheck == "7d") {
      sorted.push(action.payload.array[i].getDay());
    }
  }
  const redacted = sorted.filter((item, i) => sorted.indexOf(item) == i);

  if (redacted.length == 24) {
    iterStep = 4;
  } else if (redacted.length == 7) {
    iterStep = 1;
    iter = 1;
  }

  console.log(redacted);
  for (let i = iter; i < redacted.length; i += iterStep) {
    if (typeForCheck.split("").includes("h")) {
      output.push(String(redacted[i] + "m."));
    } else if (typeForCheck == "1d") {
      output.push(String(redacted[i] + "h."));
    } else if (typeForCheck == "7d") {
      output.push(String(weekDays[redacted[i]]));
    }
  }
  console.log(redacted);
  console.log(output);

  yield put(sortTimeSuccessCreator(output));
}

// function* sortMonthWorker(action) {
// getDate, getMonth exanple; 31 jul.
// }

export function* sortWatcher() {
  yield takeEvery(SORT_TIME, sortTimeWorker);
}
