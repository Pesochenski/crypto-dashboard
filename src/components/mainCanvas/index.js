import React, { useEffect } from "react";
import "./canvas.scss";

export default function MainCanvas() {
  const WIDTH = 600;
  const HEIGHT = 200;
  const PADDING = 40;

  const DPI_WIDTH = WIDTH * 2;
  const DPI_HEIGHT = HEIGHT * 2;

  const VEIW_HEIGHT = DPI_HEIGHT - PADDING * 2;

  const ROWS_COUNT = 5;
  const step = VEIW_HEIGHT / ROWS_COUNT;

  function charting(canvas, data) {
    const ctx = canvas.getContext("2d");

    canvas.style.width = WIDTH + "px";
    canvas.style.height = HEIGHT + "px";
    canvas.width = DPI_WIDTH;
    canvas.height = DPI_HEIGHT;

    ctx.beginPath();
    ctx.strokeStyle = "#bbb";
    ctx.lineWidth = 0.5;

    ctx.font = "normal 20px Helvetica, sans-serif";
    ctx.fillStyle = "#96a2aa";

    for (let i = 0; i <= ROWS_COUNT; i++) {
      const y = step * i;
      ctx.fillText(String(DPI_HEIGHT - PADDING - y), 0, y + PADDING - 10);
      ctx.moveTo(0, y + PADDING);
      ctx.lineTo(DPI_WIDTH, y + PADDING);
      ctx.stroke();
    }
    ctx.closePath();

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "blue";
    for (const [x, y] of data) {
      ctx.lineTo(x, DPI_HEIGHT - PADDING - y);
      ctx.stroke();
    }
    ctx.closePath;
  }

  useEffect(() => {
    charting(document.getElementById("main-canvas"), [
      [0, 0],
      [200, 100],
      [400, 50],
      [600, 400],
      [800, 300],
    ]);
  }, []);

  return <canvas id="main-canvas" className="main-canvas" />;
}
