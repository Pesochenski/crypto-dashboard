import React, { useState, useEffect } from "react";
import "./main-svg.scss";
import axios from "axios";

export default function SvgChart() {
  const [stroke, setStroke] = useState(null);
  const [xArr, setXArr] = useState([]);
  const [yArr, setYArr] = useState([]);
  const [firstX, setFirstX] = useState(0);
  const [firstY, setFirstY] = useState(0);
  const [minY, setMinY] = useState(0);
  const [maxY, setMaxY] = useState(0);
  const [yLines, setYLines] = useState([]);

  const HEIGHT = 300;
  const WIDTH = 700;
  const Y_PADDING = 50;
  const X_PADDING = 50;

  const LINE_COUNT = 4;

  const VIEW_HEIGHT = HEIGHT - Y_PADDING * 2;
  const VIEW_WIDTH = WIDTH - X_PADDING * 2;

  const xRatio = Math.round(VIEW_WIDTH / (xArr.length - 2));
  const yRatio = VIEW_HEIGHT / (maxY - minY);

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
  }, [maxY, minY]);

  async function fetchData() {
    const res = await axios.get(
      "https://api.binance.com/api/v1/klines?symbol=BTCUSDT&interval=1d&limit=120"
    );

    setXArr(res.data.map((item, i) => i));
    setYArr(res.data.map((item) => Number(item[4])));
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
        const stock = yData[i];
        yData[i] = yData[minIndex];
        yData[minIndex] = stock;
      }
    }

    setMinY(Math.round(yData[0]));
    setMaxY(Math.round(yData[yData.length - 1]));
  }

  function drawing() {
    let final = "L ";
    const lines = [];
    let Y_LINE = VIEW_HEIGHT + Y_PADDING;

    for (let i = 1; i < yArr.length; i++) {
      final +=
        String(Math.round(xArr[i]) * xRatio + X_PADDING) +
        " " +
        String(HEIGHT - Math.round((yArr[i] - minY) * yRatio) - Y_PADDING) +
        " ";
    }

    for (let i = 0; i < LINE_COUNT; i++) {
      Y_LINE = Y_LINE - Y_PADDING;
      lines.push(Y_LINE);
    }

    console.log(lines);
    // console.log(xRatio);
    // console.log(final);
    setYLines(lines);
    setStroke(final);
    setFirstY(HEIGHT - Math.round((yArr[0] - minY) * yRatio));
  }

  return (
    <div className="svg-chart">
      <svg className="svg-chart__svg">
        <g>
          {yLines
            ? yLines.map((item) => (
                <line
                  key={item}
                  x1={String(X_PADDING)}
                  y1={String(item)}
                  x2={String(WIDTH - X_PADDING)}
                  y2={String(item)}
                  stroke="gray"
                  strokeDasharray="2 4"
                />
              ))
            : null}

          <line
            x1={String(X_PADDING)}
            y1={String(HEIGHT - Y_PADDING)}
            x2={String(WIDTH - X_PADDING)}
            y2={String(HEIGHT - Y_PADDING)}
            stroke="black"
          />
        </g>

        <g>
          {stroke ? (
            <path
              d={`M ${firstX + X_PADDING} ${
                Math.round(firstY) - Y_PADDING
              } ${stroke}`}
              className="svg-chart__path"
            />
          ) : null}
          ;
        </g>
      </svg>
    </div>
  );
}
