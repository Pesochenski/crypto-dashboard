import React, { useEffect } from "react";
import "./main-btns.scss";
import { useDispatch } from "react-redux";
// import { getMainCreator } from "../../../store/reducers/queryReducers/getMainReducer";
import { limitIntervalCreator } from "../../../store/reducers/stateReducers/LimitIntervalReducer";

export default function MainChartBtns({ btn, activeBtn, setActiveBtn }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      limitIntervalCreator(
        String(activeBtn.activeLimit),
        String(activeBtn.activeInterval)
      )
    );
    // dispatch(getMainCreator(activeBtn.activeLimit, activeBtn.activeInterval));
  }, [activeBtn.activeNum]);

  return (
    <div className="btns">
      {btn.map((item, i) => (
        <button
          className={
            activeBtn.activeNum == i + 1
              ? "btns__btn btns__active-btn"
              : "btns__btn"
          }
          key={i}
          onClick={() => {
            setActiveBtn({
              activeNum: i + 1,
              activeName: item.btnName,
              // activeLineCount: item.lineCount,
              activeTextPadding: item.textPadding,
              activeInterval: item.query.interval,
              activeLimit: item.query.limit,
            });
            // dispatch(getMainCreator(item.query.interval, item.query.limit));
          }}
        >
          {item.btnName}
        </button>
      ))}
    </div>
  );
}
