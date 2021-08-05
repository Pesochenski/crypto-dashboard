import React from "react";
import "./second-currency-item-btn.scss";

export default function SecondCurItemBtn({
  i,
  item,
  hoverItem,
  activeCur,
  deleteItem,
}) {
  return (
    <button className="second-cur-btn__del" onClick={() => deleteItem(item)}>
      <svg className="second-cur-btn__svg" viewBox="0 0 34 34">
        <line
          x1="4"
          y1="21"
          x2="14"
          y2="11"
          className={
            hoverItem === i + 1 && activeCur.activeCurNum !== i + 1
              ? "second-cur-btn__cross_hover"
              : activeCur.activeCurNum === i + 1
              ? "second-cur-btn__cross_active"
              : "second-cur-btn__cross"
          }
        />
        <line
          x1="14"
          y1="21"
          x2="4"
          y2="11"
          className={
            hoverItem === i + 1 && activeCur.activeCurNum !== i + 1
              ? "second-cur-btn__cross_hover"
              : activeCur.activeCurNum === i + 1
              ? "second-cur-btn__cross_active"
              : "second-cur-btn__cross"
          }
        />
      </svg>
    </button>
  );
}
