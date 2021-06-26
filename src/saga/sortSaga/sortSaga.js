import "regenerator-runtime/runtime";
import { takeEvery, put } from "redux-saga/effects";
import {
  SORT_TIME,
  sortTimeSuccessCreator,
} from "../../store/reducers/sortReducers/sortTimeReducer";

const weekDays = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
const months = [
  "Jan.",
  "Feb.",
  "Mar.",
  "Apr.",
  "May",
  "Jun.",
  "Jul.",
  "Aug.",
  "Sep.",
  "Oct.",
  "Nov.",
  "Dec.",
];

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

  const allMonth = [];
  const allHours = [];
  const sortedHours = [];
  const outputHours = [];
  const sortedMonth = [];
  const outputMonth = [];
  const outputDate = [];

  const outputLines = []; // xDoneStep
  const outputX = []; // xDoneTextStep
  const outputTime = []; // time

  for (let i = 0; i < time.length; i++) {
    typeForCheck == "1d"
      ? timeForX.push(time[i].getHours())
      : typeForCheck == "7d"
      ? timeForX.push(time[i].getDay())
      : typeForCheck == "1m"
      ? allMonth.push(time[i].getMonth()) &&
        timeForX.push(time[i].getDate()) &&
        allHours.push(time[i].getHours())
      : null;
  }

  for (let i = 0; i < xArr.length - 1; i++) {
    if (timeForX[i] !== timeForX[i + 1]) {
      xArr[i + 1]
        ? xAllStep.push(xArr[i + 1] * xRatio + X_PADDING)
        : xAllStep.push(xArr[i] * xRatio + X_PADDING);
      typeForCheck == "1d"
        ? allTimeForX.push(timeForX[i + 1])
        : typeForCheck == "7d"
        ? allTimeForX.push(timeForX[i])
        : typeForCheck == "1m"
        ? allTimeForX.push(timeForX[i]) &&
          sortedMonth.push(allMonth[i + 1]) &&
          sortedHours.push(allHours[i])
        : // (allMonth[i + 1] ? sortedMonth.push(allMonth[i + 1]) : null)
          null;
    }
  }

  if (allTimeForX.length == 6 && typeForCheck == "7d") {
    allTimeForX.push(allTimeForX.length);
    xAllStep.push(xAllStep[0] - X_PADDING);
  }

  typeForCheck == "7d"
    ? (xIterStep = 1)
    : typeForCheck == "1m"
    ? (xIterStep = 5)
    : null;

  for (let i = 0; i < allTimeForX.length; i += xIterStep) {
    outputX.push(xAllStep[i]);
    outputLines.push(xAllStep[i]);

    typeForCheck == "1d"
      ? outputTime.push(allTimeForX[i])
      : typeForCheck == "7d"
      ? outputTime.push(weekDays[allTimeForX[i]])
      : typeForCheck == "1m"
      ? outputMonth.push(sortedMonth[i]) &&
        outputDate.push(allTimeForX[i]) &&
        outputHours.push(sortedHours[i])
      : null;
  }

  if (typeForCheck == "7d") {
    if (X_PADDING > xAllStep[0] - 55) {
      const excess = outputX.shift();
      outputX.unshift(xAllStep[0] + VIEW_WIDTH + X_PADDING / 2);
    }

    if (X_PADDING > xAllStep[xAllStep.length - 1] - 55) {
      const excess = outputX.pop();
      outputX.push(xAllStep[xAllStep.length - 1] + VIEW_WIDTH + X_PADDING / 2);
    }
  }

  if (typeForCheck == "1m") {
    for (let i = 0; i < outputDate.length; i++) {
      outputTime.push(
        outputDate[i] +
          " " +
          months[outputMonth[i]] +
          " " +
          outputHours[i] +
          "h."
      );
    }
  }
  console.log(outputTime, outputX, outputLines);

  yield put(sortTimeSuccessCreator({ outputTime, outputX, outputLines }));
}

export function* sortWatcher() {
  yield takeEvery(SORT_TIME, sortTimeWorker);
}
