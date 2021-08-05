import React from "react";
import "./first-cur-item.scss";

import FirstCurLoading from "./loading";
import FirstCurError from "./error";
import FirstCurChart from "./chart";

export default function FirstCurItem({
  i,
  item,
  firstYchart,
  X_PADDING,
  draw,
  btnPath,
  loaded,
  firstValues,
  hoverCur,
  activeCur,
  setHoverCur,
  setActiveCur,
  deleteAnyItem,
}) {
  return (
    <div
      key={i}
      className={
        hoverCur === i + 1 && activeCur.curNum !== firstValues.indexOf(item)
          ? "first-cur__item first-cur__item_hover"
          : activeCur.curNum === firstValues.indexOf(item)
          ? "first-cur__item_active first-cur__item"
          : "first-cur__item"
      }
      onMouseEnter={() => setHoverCur(i + 1)}
      onMouseLeave={() => setHoverCur(0)}
      onClick={() =>
        setActiveCur({ curName: item, curNum: firstValues.indexOf(item) })
      }
    >
      <div className="first-cur__item-header">
        <p
          className={
            hoverCur === i + 1 && activeCur.curNum !== firstValues.indexOf(item)
              ? "first-cur__item-title first-cur__item-title_hover"
              : activeCur.curNum === firstValues.indexOf(item)
              ? "first-cur__item-title_active first-cur__item-title"
              : "first-cur__item-title"
          }
        >
          {item}
        </p>
        {firstValues.length > 3 ? (
          <button
            className={
              hoverCur === i + 1 &&
              activeCur.curNum !== firstValues.indexOf(item)
                ? "first-cur__item-del first-cur__item-del_hover"
                : activeCur.curNum === firstValues.indexOf(item)
                ? "first-cur__item-del_active first-cur__item-del"
                : "first-cur__item-del"
            }
            onClick={() => deleteAnyItem(item)}
          >
            Delete
          </button>
        ) : null}
      </div>
      <div className="first-cur__chart">
        {!loaded ? (
          <FirstCurLoading
            i={i}
            item={item}
            firstValues={firstValues}
            hoverCur={hoverCur}
            activeCur={activeCur}
          />
        ) : btnPath[i] === "0" ? (
          <FirstCurError
            i={i}
            item={item}
            firstValues={firstValues}
            hoverCur={hoverCur}
            activeCur={activeCur}
          />
        ) : (
          <FirstCurChart
            i={i}
            btnPath={btnPath}
            draw={draw}
            X_PADDING={X_PADDING}
            firstYchart={firstYchart}
          />
        )}
      </div>
    </div>
  );
}
