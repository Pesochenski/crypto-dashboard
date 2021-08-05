import React from "react";
import "./first-cur-chart.scss";

export default function FirstCurChart({
  i,
  btnPath,
  draw,
  X_PADDING,
  firstYchart,
}) {
  return (
    <svg className="first-cur__svg">
      {btnPath[i] !== "0" && draw ? (
        <path
          d={`M ${0 + X_PADDING} ${Math.round(firstYchart[i])} ${btnPath[i]}`}
          className="first-cur__path"
        />
      ) : null}
    </svg>
  );
}
