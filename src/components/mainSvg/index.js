import React, { useState, useEffect } from "react";
import "./main-svg.scss";
import axios from "axios";

export default function SvgChart() {
  const [stroke, setStroke] = useState(null);
  const [xArr, setXArr] = useState([]);
  const [yArr, setYArr] = useState([]);
  const [time, setTime] = useState([]);
  const [firstX, setFirstX] = useState(0);
  const [firstY, setFirstY] = useState(0);
  const [minY, setMinY] = useState(0);
  const [maxY, setMaxY] = useState(0);
  const [yLines, setYLines] = useState([]);
  const [xLines, setXLines] = useState([]);
  const [area, setArea] = useState("");

  const HEIGHT = 300;
  const WIDTH = 700;
  const Y_PADDING = 40;
  const X_PADDING = 80;

  const Y_LINE_COUNT = 4;
  const X_LINE_COUNT = 5;

  const VIEW_HEIGHT = HEIGHT - Y_PADDING * 2;
  const VIEW_WIDTH = WIDTH - X_PADDING * 2;

  const xRatio = Math.round(VIEW_WIDTH / (xArr.length - 2));
  const yRatio = VIEW_HEIGHT / (maxY - minY);

  const Y_STEP = VIEW_HEIGHT / Y_LINE_COUNT;
  const X_STEP = VIEW_WIDTH / X_LINE_COUNT;
  const TEXT_STEP = (maxY - minY) / Y_LINE_COUNT;

  useEffect(() => {
    const svgInterval = setInterval(() => {
      fetchData();
    }, 60 * 60 * 1000);
    return () => clearInterval(svgInterval);
  }, [xArr]);
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    sorting();
  }, [yArr, xArr]);
  useEffect(() => {
    drawing();
  }, [maxY, minY, time]);
  useEffect(() => {
    sortHours();
  }, [stroke]);

  async function fetchData() {
    const res = await axios.get(
      "https://api.binance.com/api/v1/klines?symbol=BTCUSDT&interval=15m&limit=96"
    );

    setXArr(res.data.map((item, i) => i));
    setYArr(res.data.map((item) => Number(item[4])));
    setTime(res.data.map((item) => new Date(item[6])));
  }

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
    const lines = [];
    const OXlines = [];

    for (let i = 1; i < yArr.length; i++) {
      final +=
        String(Math.round(xArr[i]) * xRatio + X_PADDING) +
        " " +
        String(HEIGHT - Math.round((yArr[i] - minY) * yRatio) - Y_PADDING) +
        " ";
    }

    for (let i = 0; i < Y_LINE_COUNT; i++) {
      const Y_LINE = Y_STEP * i;
      lines.push({
        line: Y_LINE + Y_PADDING,
        text: String(Math.round(maxY - TEXT_STEP * i)),
      });
    }

    for (let i = 0; i < X_LINE_COUNT + 1; i++) {
      const X_LINE = X_STEP * i;
      OXlines.push({ line: X_LINE + X_PADDING, text: String(time[i] + "h.") });
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
    setYLines(lines);
    setStroke(final);
    setFirstY(HEIGHT - Math.round((yArr[0] - minY) * yRatio));
  }

  function sortHours() {
    let sorted = [];
    const redacted = [];

    for (let i = 0; i < time.length; i++) {
      sorted.push(time[i].getHours());
    }
    sorted = sorted.filter((item, i) => sorted.indexOf(item) == i);

    for (let i = 0; i < sorted.length; i += 4) {
      redacted.push(sorted[i]);
    }

    // console.log(sorted);
    // console.log(redacted);
    redacted ? setTime(redacted) : null;
  }

  return (
    <div className="svg-chart">
      <svg className="svg-chart__svg">
        <path
          d={`M ${firstX + X_PADDING} ${
            Math.round(firstY) - Y_PADDING
          } ${area}`}
          className="svg-chart__area"
        />

        {xLines.map((item) => (
          <g key={item.line}>
            <text
              x={item.line - 10}
              y={HEIGHT - Y_PADDING / 2.5}
              className="svg-chart__text"
            >
              {item.text}
            </text>
            <line
              x1={item.line}
              y1={HEIGHT - Y_PADDING}
              x2={item.line}
              y2={Y_PADDING / 2}
              className="svg-chart__backline"
            />
          </g>
        ))}

        <g>
          {yLines
            ? yLines.map((item) => (
                <g key={item.line}>
                  <text
                    x={String(X_PADDING / 4)}
                    y={String(item.line + 4)}
                    className="svg-chart__text"
                  >
                    {item.text}
                  </text>
                  <line
                    x1={String(X_PADDING)}
                    y1={String(item.line)}
                    x2={String(WIDTH - X_PADDING / 2)}
                    y2={String(item.line)}
                    className="svg-chart__backline"
                  />
                </g>
              ))
            : null}

          <line
            x1={String(X_PADDING)}
            y1={String(HEIGHT - Y_PADDING)}
            x2={String(WIDTH - X_PADDING / 2)}
            y2={String(HEIGHT - Y_PADDING)}
            stroke="black"
          />
        </g>

        {stroke ? (
          <path
            d={`M ${firstX + X_PADDING} ${
              Math.round(firstY) - Y_PADDING
            } ${stroke}`}
            className="svg-chart__path"
          />
        ) : null}
      </svg>
    </div>
  );
}
