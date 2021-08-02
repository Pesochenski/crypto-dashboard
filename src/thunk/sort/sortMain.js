import {
  sortTimeCreator,
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

export function sortMain(time, xArr, typeForCheck) {
  return async (dispatch) => {
    dispatch(sortTimeCreator());

    const WIDTH = 700;
    const X_PADDING = 80;
    const VIEW_WIDTH = WIDTH - X_PADDING * 2;
    const xRatio = Math.round(VIEW_WIDTH / (xArr.length - 2));

    const xAllStep = [];
    const timeForX = [];
    const allTimeForX = [];
    let xIterStep = 4;

    const allYear = [];
    const allMonth = [];
    const allHours = [];
    const sortedYear = [];
    const sortedHours = [];
    const outputHours = [];
    const sortedMonth = [];
    const outputYear = [];
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
        : typeForCheck == "1m" || typeForCheck == "3m"
        ? allMonth.push(time[i].getMonth()) &&
          timeForX.push(time[i].getDate()) &&
          allHours.push(time[i].getHours())
        : typeForCheck == "1y"
        ? allMonth.push(time[i].getMonth()) &&
          timeForX.push(time[i].getDate()) &&
          allYear.push(time[i].getFullYear())
        : null;
    }

    for (let i = 0; i < xArr.length - 1; i++) {
      if (timeForX[i] !== timeForX[i + 1]) {
        typeForCheck !== "3m" && typeForCheck !== "1y"
          ? xArr[i + 1]
            ? xAllStep.push(xArr[i + 1] * xRatio + X_PADDING)
            : xAllStep.push(xArr[i] * xRatio + X_PADDING)
          : null;

        typeForCheck == "1d"
          ? allTimeForX.push(timeForX[i + 1])
          : typeForCheck == "7d"
          ? allTimeForX.push(timeForX[i])
          : typeForCheck == "1m"
          ? allTimeForX.push(timeForX[i + 1]) &&
            sortedMonth.push(allMonth[i + 1]) &&
            sortedHours.push(allHours[i + 1])
          : // (allMonth[i + 1] ? sortedMonth.push(allMonth[i + 1]) : null)
            null;

        typeForCheck == "3m" && allMonth[i] !== allMonth[i + 1]
          ? allTimeForX.push(timeForX[i + 1]) &&
            xAllStep.push(xArr[i + 1] * xRatio + X_PADDING) &&
            sortedMonth.push(allMonth[i + 1]) &&
            sortedHours.push(allHours[i + 1])
          : null;

        typeForCheck == "1y" && allYear[i] !== allYear[i + 1]
          ? allTimeForX.push(timeForX[i + 1]) &&
            xAllStep.push(xArr[i + 1] * xRatio + X_PADDING) &&
            sortedMonth.push(allMonth[i + 1]) &&
            sortedYear.push(allYear[i + 1])
          : null;
      }
    }

    if (allTimeForX.length == 6 && typeForCheck == "7d") {
      allTimeForX[allTimeForX.length - 1] < 6
        ? allTimeForX.push(allTimeForX[allTimeForX.length - 1] + 1)
        : allTimeForX[allTimeForX.length - 1] == 6
        ? allTimeForX.push(0)
        : null;
      xAllStep.push(xAllStep[0] - X_PADDING);
    }

    typeForCheck == "7d" || typeForCheck == "3m" || typeForCheck == "1y"
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
        : typeForCheck == "1m" || typeForCheck == "3m"
        ? outputMonth.push(sortedMonth[i]) &&
          outputDate.push(allTimeForX[i]) &&
          outputHours.push(sortedHours[i])
        : typeForCheck == "1y"
        ? outputMonth.push(sortedMonth[i]) &&
          outputDate.push(allTimeForX[i]) &&
          outputYear.push(sortedYear[i])
        : null;
    }

    if (typeForCheck == "7d") {
      if (X_PADDING > xAllStep[0] - 55) {
        const excess = outputX.shift();
        outputX.unshift(xAllStep[0] + VIEW_WIDTH + X_PADDING / 2);
      }

      if (X_PADDING > xAllStep[xAllStep.length - 1] - 55) {
        const excess = outputX.pop();
        outputX.push(
          xAllStep[xAllStep.length - 1] + VIEW_WIDTH + X_PADDING / 2
        );
      }
    }

    if (typeForCheck == "1m" || typeForCheck == "3m") {
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
    } else if (typeForCheck == "1y") {
      for (let i = 0; i < outputDate.length; i++) {
        outputTime.push(
          outputDate[i] + " " + months[outputMonth[i]] + " " + outputYear[i]
        );
      }
    }

    dispatch(sortTimeSuccessCreator({ outputTime, outputX, outputLines }));
  };
}
