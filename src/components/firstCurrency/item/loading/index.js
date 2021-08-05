import React from "react";
import "./first-cur-loading.scss";

export default function FirstCurLoading({
  i,
  item,
  firstValues,
  hoverCur,
  activeCur,
}) {
  return (
    <p
      className={
        (hoverCur === i + 1 &&
          activeCur.curNum !== firstValues.indexOf(item)) ||
        activeCur.curNum === firstValues.indexOf(item)
          ? "first-cur__loading first-cur__loading_active"
          : "first-cur__loading"
      }
    >
      Loading...
    </p>
  );
}
