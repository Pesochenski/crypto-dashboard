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
  let redacted = [];
  const typeForCheck = action.payload.type;
  let iterStep = 10;
  const iter = 0; // let

  for (let i = 0; i < action.payload.array.length; i++) {
    if (typeForCheck == "1d") {
      sorted.push(action.payload.array[i].getHours());
    } else if (typeForCheck == "7d") {
      sorted.push(action.payload.array[i].getDay());
    }
  }

  typeForCheck == "7d"
    ? (redacted = sorted.filter((item, i) => sorted.indexOf(item) == i)) // reverse for hours
    : (redacted = sorted
        .reverse()
        .filter((item, i) => sorted.indexOf(item) == i)
        .reverse());

  if (redacted.length == 24) {
    iterStep = 4;
    // iter = 1;
  } else if (redacted.length == 7) {
    iterStep = 1;
    // iter = 1;
  }

  for (let i = iter; i < redacted.length; i += iterStep) {
    if (typeForCheck == "1d") {
      output.push(String(redacted[i] + "h."));
    } else if (typeForCheck == "7d") {
      output.push(String(weekDays[redacted[i]]));
    }
  }

  // typeForCheck == "1d"
  //   ? output.push(String(redacted[redacted.length - 1] + "h.")) // String(redacted[redacted.length - 1] + "h.")
  //   : typeForCheck == "7d"
  //   ? output.push("") // String(weekDays[redacted[0]])
  //   : null;

  yield put(sortTimeSuccessCreator(output));
}

// function* sortMonthWorker(action) {
// getDate, getMonth exanple; 31 jul.
// }

export function* sortWatcher() {
  yield takeEvery(SORT_TIME, sortTimeWorker);
}
