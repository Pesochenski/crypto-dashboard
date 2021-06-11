import React, { useEffect, useState } from "react";
import "./canvas.scss";

export default function MainCanvas() {
  const [min, setMin] = useState();
  const [max, setMax] = useState();

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

    setMin(Ydata[0]);
    setMax(Ydata[Ydata.length - 1]);
    // return [Ydata[0], Ydata[Ydata.length - 1]];
  }

  const data = [
    [0, 0],
    [200, 200],
    [400, 100],
    [600, 400],
    [800, 300],
  ];

  const WIDTH = 600;
  const HEIGHT = 200;
  const PADDING = 40;

  const DPI_WIDTH = WIDTH * 2;
  const DPI_HEIGHT = HEIGHT * 2;

  const VEIW_HEIGHT = DPI_HEIGHT - PADDING * 2;

  const ROWS_COUNT = 5;
  const step = VEIW_HEIGHT / ROWS_COUNT;
  const textStep = (max - min) / ROWS_COUNT;

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
      ctx.fillText(text, 5, y + PADDING - 10);
      ctx.moveTo(0, y + PADDING);
      ctx.lineTo(DPI_WIDTH, y + PADDING);
    }
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "blue";
    for (const [x, y] of data) {
      ctx.lineTo(x, DPI_HEIGHT - PADDING - y);
    }
    ctx.stroke();
    ctx.closePath();
  }

  useEffect(() => {
    checkForMinAndMax(data);
  }, []);

  useEffect(() => {
    charting(document.getElementById("main-canvas"), data);
  }, [min]);

  return <canvas id="main-canvas" className="main-canvas" />;
}
