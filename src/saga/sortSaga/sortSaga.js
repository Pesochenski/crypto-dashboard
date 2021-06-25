import "regenerator-runtime/runtime";
import { takeEvery, put } from "redux-saga/effects";
import {
  SORT_TIME,
  sortTimeSuccessCreator,
} from "../../store/reducers/sortReducers/sortTimeReducer";

// const weekDays = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];

function* sortTimeWorker(action) {
  const time = action.payload.array;
  const xArr = action.payload.arrayX;
  const typeForCheck = action.payload.type;

  const WIDTH = 700;
  const X_PADDING = 80;
  const VIEW_WIDTH = WIDTH - X_PADDING * 2;
  const xRatio = Math.round(VIEW_WIDTH / (xArr.length - 2));

  const xAllStep = [];
  const timeForX = [];
  const allTimeForX = [];
  let xIterStep = 4;

  const outputLines = []; // xDoneStep
  const outputX = []; // xDoneTextStep
  const outputTime = []; // time

  for (let i = 0; i < time.length; i++) {
    typeForCheck == "1d"
      ? timeForX.push(time[i].getHours())
      : typeForCheck == "7d"
      ? timeForX.push(time[i].getDay())
      : null;
  }
  for (let i = 0; i < xArr.length; i++) {
    if (timeForX[i] !== timeForX[i + 1]) {
      // xArr[i + 1] ?
      xAllStep.push(xArr[i + 1] * xRatio + X_PADDING);
      // : xAllStep.push(xArr[i] * xRatio + X_PADDING);
      typeForCheck == "1d"
        ? allTimeForX.push(timeForX[i + 1])
        : typeForCheck == "7d"
        ? allTimeForX.push(timeForX[i])
        : null;
    }
  }

  typeForCheck == "7d" ? (xIterStep = 1) : null;
  for (let i = 0; i < xAllStep.length; i += xIterStep) {
    outputLines.push(xAllStep[i]);
    outputX.push(xAllStep[i]);
    outputTime.push(allTimeForX[i]);
  }
  if (typeForCheck == "7d") {
    if (X_PADDING > xAllStep[0] - 55) {
      const excess = outputX.shift();
      // console.log(X_PADDING > xAllStep[0] - 55);
      outputX.unshift(xAllStep[0] + VIEW_WIDTH + X_PADDING / 2);
    }
  }
  console.log(outputLines);

  yield put(sortTimeSuccessCreator({ outputTime, outputX, outputLines }));
}

// function* sortMonthWorker(action) {
// getDate, getMonth exanple; 31 jul.
// }

export function* sortWatcher() {
  yield takeEvery(SORT_TIME, sortTimeWorker);
}
