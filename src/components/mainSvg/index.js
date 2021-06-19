import React, { useState, useEffect } from "react";
import "./main-svg.scss";
import axios from "axios";

export default function SvgChart() {
  const [stroke, setStroke] = useState(null);
  const [xArr, setXArr] = useState([
    // 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
  ]);
  const [yArr, setYArr] = useState([
    // 0, 20000, 30000, 20000, 25000, 40000, 15000, 20400, 19000, 8000,
  ]);
  const [firstX, setFirstX] = useState(0);
  const [firstY, setFirstY] = useState(0);
  const [minY, setMinY] = useState(0);
  const [maxY, setMaxY] = useState(0);

  const HEIGHT = 300;
  const WIDTH = 700;

  const xRatio = Math.round(WIDTH / (xArr.length - 2));
  const yRatio = HEIGHT / (maxY - minY);

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
    testing();
  }, [maxY, minY]);

  async function fetchData() {
    const res = await axios.get(
      "https://api.binance.com/api/v1/klines?symbol=BTCUSDT&interval=1d&limit=24"
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

  function testing() {
    let final = "L ";

    for (let i = 1; i < yArr.length; i++) {
      final +=
        String(Math.round(xArr[i]) * xRatio) + // Math.round(xArr[i] * xRatio)
        " " +
        String(HEIGHT - Math.round((yArr[i] - minY) * yRatio)) +
        " ";
    }

    console.log(xRatio);
    console.log(final);
    setStroke(final);
    setFirstY(HEIGHT - Math.round((yArr[0] - minY) * yRatio));
  }

  return (
    <div className="svg-chart">
      <svg className="svg-chart__svg">
        {stroke ? (
          <path
            d={`M ${firstX} ${Math.round(firstY)} ${stroke}`}
            className="svg-chart__path"
          />
        ) : null}
        ;
      </svg>
    </div>
  );
}
