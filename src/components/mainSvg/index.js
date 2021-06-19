import React, { useState, useEffect } from "react";
import "./main-svg.scss";
import axios from "axios";

export default function SvgChart() {
  const [stroke, setStroke] = useState(null);
  const [xArr, setXArr] = useState([
    0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
  ]);
  const [yArr, setYArr] = useState([
    0, 20000, 30000, 20000, 25000, 40000, 15000, 20400, 19000, 8000,
  ]);
  const [firstX, setFirstX] = useState(0);
  const [firstY, setFirstY] = useState(0);
  const [minY, setMinY] = useState(0);
  const [maxY, setMaxY] = useState(0);

  const HEIGHT = 300;
  const WIDTH = 700;

  const xRatio = WIDTH / (xArr.length - 2);
  const yRatio = HEIGHT / (maxY - minY);

  useEffect(() => {
    sorting();
  }, [yArr]);
  useEffect(() => {
    testing();
  }, [maxY]);

  function sorting() {
    const yData = [];

    for (const y of yArr) {
      yData.push(y);
    }

    for (let i = 0; i < yData.length; i++) {
      let minIndex = i;
      for (let j = i; j < yData.length; j++) {
        if (yData[j] < yData[minIndex]) {
          minIndex = j;
        }
        const stock = yData[i];
        yData[i] = [minIndex];
        yData[minIndex] = stock;
      }
    }

    setMinY(Math.round(yData[0]));
    setMaxY(Math.round(yData[yData.length - 1]));
  }

  function testing() {
    let final = "L ";

    for (let i = 1; i < xArr.length; i++) {
      final +=
        String(Math.round(xArr[i])) + // Math.round(xArr[i] * xRatio)
        " " +
        String(Math.round(HEIGHT - yArr[i] * yRatio)) +
        " ";
    }

    console.log(final);
    console.log(xRatio);
    setStroke(final);
    setFirstX(xArr[0]);
    setFirstY(HEIGHT - yArr[0]);
  }

  return (
    <div className="svg-chart">
      <svg wigth="700" height="300">
        {stroke ? (
          <path
            d={`M ${firstX} ${firstY} ${stroke}`}
            className="svg-chart__path"
          />
        ) : null}
        ;
      </svg>
    </div>
  );
}
