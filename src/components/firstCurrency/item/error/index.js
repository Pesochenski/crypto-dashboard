import React from "react";
import "./first-cur-error.scss";

export default function FirstCurError({
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
          ? "first-cur__error first-cur__error_active"
          : "first-cur__error"
      }
    >
      Error
    </p>
  );
}
