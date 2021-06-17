import React, { useEffect, useState } from "react";
import "./canvas.scss";
import axios from "axios";

export default function MainCanvas() {
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    charting(document.getElementById("main-canvas"), data);
  }, [min, data]);
  useEffect(() => {
    gettingTestData();
  }, []);
  useEffect(() => {
    checkForMinAndMax(data);
  }, [data]);

  async function gettingTestData() {
    const res = await axios.get(
      "https://api.binance.com/api/v1/klines?symbol=BTCUSDT&interval=5m&limit=10"
    );
    // console.log(res.data);

    // res.data.forEach((item) => {
    //   console.log(new Date(item[6]));
    // });

    setData(res.data.map((item, i) => [i, item[4]]));
  }

  function checkForMinAndMax(data) {
    const Ydata = [];

    for (const [, y] of data) {
      Ydata.push(y);
    }

    for (let i = 0; i < Ydata.length; i++) {
      let minIndex = i;
      for (let j = i; j < Ydata.length; j++) {
        if (Ydata[j] < Ydata[minIndex]) {
          minIndex = j;
        }
        const stock = Ydata[i];
        Ydata[i] = Ydata[minIndex];
        Ydata[minIndex] = stock;
      }
    }

    setMin(Math.round(Ydata[0]));
    setMax(Math.round(Ydata[Ydata.length - 1]));
  }

  const WIDTH = 600;
  const HEIGHT = 200;
  const PADDING = 40;

  const DPI_WIDTH = WIDTH * 2;
  const DPI_HEIGHT = HEIGHT * 2;

  const VEIW_HEIGHT = DPI_HEIGHT - PADDING * 2;
  const VEIW_WIDTH = DPI_WIDTH;

  const ROWS_COUNT = 5;
  const step = VEIW_HEIGHT / ROWS_COUNT;
  const textStep = (max - min) / ROWS_COUNT;

  const yRatio = VEIW_HEIGHT / (max - min);
  const xRatio = VEIW_WIDTH / data.length;

  function charting(canvas, data) {
    const ctx = canvas.getContext("2d");

    canvas.style.width = WIDTH + "px";
    canvas.style.height = HEIGHT + "px";
    canvas.width = DPI_WIDTH;
    canvas.height = DPI_HEIGHT;

    // checkForMinAndMax(data);

    ctx.beginPath();
    ctx.strokeStyle = "#bbb";
    // ctx.lineWidth = 0.5;

    ctx.font = "normal 20px Helvetica, sans-serif";
    ctx.fillStyle = "#96a2aa";

    for (let i = 1; i <= ROWS_COUNT; i++) {
      const y = step * i;
      const text = max - textStep * i;
      ctx.fillText(text.toFixed(0), 5, y + PADDING - 10);
      ctx.moveTo(0, y + PADDING);
      ctx.lineTo(DPI_WIDTH, y + PADDING);
    }
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "blue";
    for (const [x, y] of data) {
      ctx.lineTo(
        Math.floor(x * xRatio),
        Math.floor(Math.floor(DPI_HEIGHT - PADDING - y * yRatio))
      );
      console.log(
        Math.floor(DPI_HEIGHT - PADDING - y * yRatio),
        max - min,
        min,
        max
      );
    }
    ctx.stroke();
    ctx.closePath();
  }

  return <canvas id="main-canvas" className="main-canvas" />;
}
