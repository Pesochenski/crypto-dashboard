import React, { useState, useEffect } from "react";
import "./main-svg.scss";
import { useDispatch, useSelector } from "react-redux";
import { getMainCreator } from "../../store/reducers/queryReducers/getMainReducer";
import { sortTimeCreator } from "../../store/reducers/sortReducers/sortTimeReducer";

export default function SvgChart() {
  const [stroke, setStroke] = useState(null);
  const [firstX, setFirstX] = useState(0);
  const [firstY, setFirstY] = useState(0);
  const [minY, setMinY] = useState(0);
  const [maxY, setMaxY] = useState(0);
  const [yLines, setYLines] = useState([]);
  const [xLines, setXLines] = useState([]);
  const [area, setArea] = useState("");

  const [btn, setBtn] = useState([
    {
      btnName: "1d",
      query: {
        interval: "5m",
        limit: "288",
      },
      lineCount: 6,
      textPadding: -10,
    },
    {
      btnName: "7d",
      query: {
        interval: "2h",
        limit: "84",
      },
      lineCount: 7,
      textPadding: -55,
    },
    {
      btnName: "1m",
      query: {
        interval: "8h",
        limit: "90",
      },
      lineCount: 1,
      textPadding: 30,
    },
    {
      btnName: "3m",
      query: {
        interval: "6h",
        limit: "360",
      },
      lineCount: 1,
      textPadding: -10,
    },
    {
      btnName: "1y",
      query: {
        interval: "1d",
        limit: "366",
      },
      lineCount: 1,
      textPadding: -10,
    },
  ]);
  const [activeBtn, setActiveBtn] = useState([
    {
      activeNum: 1,
      activeName: btn[0].btnName,
      activeLineCount: btn[0].lineCount,
      activeTextPadding: btn[0].textPadding,
      activeInterval: btn[0].query.interval,
      activeLimit: btn[0].query.limit,
    },
  ]);

  const dispatch = useDispatch();
  const { loaded, error, xArr, yArr, time } = useSelector(
    (state) => state.getMain
  );
  const { sortedTime } = useSelector((state) => state.sortTime);

  const HEIGHT = 300;
  const WIDTH = 700;
  const Y_PADDING = 40;
  const X_PADDING = 80;

  const Y_LINE_COUNT = 4;
  const X_LINE_COUNT = activeBtn.activeLineCount;

  const VIEW_HEIGHT = HEIGHT - Y_PADDING * 2;
  const VIEW_WIDTH = WIDTH - X_PADDING * 2; // + X_PADDING / 2

  const xRatio = Math.round(VIEW_WIDTH / (xArr.length - 2));
  const yRatio = VIEW_HEIGHT / (maxY - minY);

  const Y_STEP = VIEW_HEIGHT / Y_LINE_COUNT;
  const TEXT_STEP = (maxY - minY) / Y_LINE_COUNT;

  useEffect(() => {
    const svgInterval = setInterval(() => {
      dispatch(getMainCreator(activeBtn.activeInterval, activeBtn.activeLimit));
    }, 60 * 1000);
    return () => clearInterval(svgInterval);
  }, [xArr]);
  useEffect(() => {
    dispatch(getMainCreator(btn[0].query.interval, btn[0].query.limit));
  }, []);
  useEffect(() => {
    sorting();
  }, [yArr, xArr]);
  useEffect(() => {
    dispatch(sortTimeCreator(time, activeBtn.activeName));
    drawing();
  }, [maxY, minY, time]);

  function sorting() {
    const yData = [];

    for (const y of yArr) {
      yData.push(Math.round(y));
    }

    for (let i = 0; i < yData.length; i++) {
      let minIndex = i;
      for (let j = i; j < yData.length; j++) {
        if (yData[j] < yData[minIndex]) {
          minIndex = j;
        }
      }
      const stock = yData[i];
      yData[i] = yData[minIndex];
      yData[minIndex] = stock;
    }

    setMinY(Math.round(yData[0]));
    setMaxY(Math.round(yData[yData.length - 1]));
  }

  function drawing() {
    let final = "L ";
    const OYlines = [];
    const OXlines = [];

    const xAllStep = [];
    const xDoneStep = [];
    const timeForX = [];
    const allTimeForX = [];
    const doneTimeForX = [];
    let xIterStep = 4;
    const weekDays = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];

    for (let i = 1; i < xArr.length; i++) {
      final +=
        String(Math.round(xArr[i]) * xRatio + X_PADDING) +
        " " +
        String(HEIGHT - Math.round((yArr[i] - minY) * yRatio) - Y_PADDING) +
        " ";
    }

    for (let i = 0; i < time.length; i++) {
      activeBtn.activeName == "1d"
        ? timeForX.push(time[i].getHours())
        : activeBtn.activeName == "7d"
        ? timeForX.push(time[i].getDay())
        : null;
    }
    for (let i = 0; i < xArr.length; i++) {
      if (timeForX[i] !== timeForX[i + 1]) {
        xAllStep.push(xArr[i + 1] * xRatio + X_PADDING);
        activeBtn.activeName == "1d"
          ? allTimeForX.push(timeForX[i + 1])
          : activeBtn.activeName == "7d"
          ? allTimeForX.push(timeForX[i])
          : null;
      }
    }

    activeBtn.activeName == "7d" ? (xIterStep = 1) : null;
    for (let i = 0; i < xAllStep.length; i += xIterStep) {
      xDoneStep.push(xAllStep[i]);
      doneTimeForX.push(allTimeForX[i]);
    }
    if (activeBtn.activeName == "7d") {
      if (X_PADDING > xAllStep[0] + btn[1].textPadding) {
        const excess = xDoneStep.shift();
        xDoneStep.unshift(xAllStep[0] + VIEW_WIDTH + X_PADDING / 2);
        console.log(xDoneStep);
      }
    }
    for (let i = 0; i < Y_LINE_COUNT; i++) {
      const Y_LINE = Y_STEP * i;
      OYlines.push({
        line: Y_LINE + Y_PADDING,
        text: String(Math.round(maxY - TEXT_STEP * i)),
      });
    }
    for (let i = 0; i < X_LINE_COUNT; i++) {
      activeBtn.activeName == "1d"
        ? OXlines.push({
            line: xDoneStep[i],
            text: doneTimeForX[i] + "h.",
          })
        : activeBtn.activeName == "7d"
        ? OXlines.push({
            line: xDoneStep[i],
            text: weekDays[doneTimeForX[i]],
          })
        : null;
    }

    const finalArea =
      final +
      String(Math.round(xArr[xArr.length - 1]) * xRatio + X_PADDING) +
      " " +
      String(HEIGHT - Y_PADDING) +
      " " +
      String(Math.round(xArr[0]) * xRatio + X_PADDING) +
      " " +
      String(HEIGHT - Y_PADDING) +
      " ";

    setXLines(OXlines);
    setArea(finalArea);
    setYLines(OYlines);
    setStroke(final);
    setFirstY(HEIGHT - Math.round((yArr[0] - minY) * yRatio));
  }

  return (
    <div className="main">
      <h2>BTC to USD</h2>

      {error ? <p>Connection error</p> : null}

      <div className="main__btns">
        {btn.map((item, i) => (
          <button
            className={
              activeBtn.activeNum == i + 1
                ? "main__btn main__active-btn"
                : "main__btn"
            }
            key={i}
            onClick={() => {
              setActiveBtn({
                activeNum: i + 1,
                activeName: item.btnName,
                activeLineCount: item.lineCount,
                activeTextPadding: item.textPadding,
                activeInterval: item.query.interval,
                activeLimit: item.query.limit,
              });
              dispatch(getMainCreator(item.query.interval, item.query.limit));
            }}
          >
            {item.btnName}
          </button>
        ))}
      </div>

      <div className="main__svg-chart">
        {!loaded ? (
          <p>Loading...</p>
        ) : (
          <svg className="main__svg">
            <path
              d={`M ${firstX + X_PADDING} ${
                Math.round(firstY) - Y_PADDING
              } ${area}`}
              className="main__area"
            />

            {xLines
              ? xLines.map((item) => (
                  <g key={item.line}>
                    <text
                      x={item.line + activeBtn.activeTextPadding}
                      y={HEIGHT - Y_PADDING / 2.5}
                      className="main__text"
                    >
                      {item.text}
                    </text>
                    <line
                      x1={item.line}
                      y1={HEIGHT - Y_PADDING}
                      x2={item.line}
                      y2={Y_PADDING / 2}
                      className="main__backline"
                    />
                  </g>
                ))
              : null}

            <g>
              {yLines
                ? yLines.map((item) => (
                    <g key={item.line}>
                      <text
                        x={String(X_PADDING / 4)}
                        y={String(item.line + 4)}
                        className="main__text"
                      >
                        {item.text}
                      </text>
                      <line
                        x1={String(X_PADDING)}
                        y1={String(item.line)}
                        x2={String(WIDTH - X_PADDING / 2)}
                        y2={String(item.line)}
                        className="main__backline"
                      />
                    </g>
                  ))
                : null}

              <line
                x1={String(X_PADDING)}
                y1={String(HEIGHT - Y_PADDING)}
                x2={String(WIDTH - X_PADDING / 2)}
                y2={String(HEIGHT - Y_PADDING)}
                className="main__under"
              />
            </g>

            {stroke ? (
              <path
                d={`M ${firstX + X_PADDING} ${
                  Math.round(firstY) - Y_PADDING
                } ${stroke}`}
                className="main__path"
              />
            ) : null}
          </svg>
        )}
      </div>
    </div>
  );
}
