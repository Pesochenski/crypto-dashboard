import React, { useState, useEffect } from "react";
import "./main-btns.scss";
import { useDispatch } from "react-redux";
// import { getMainCreator } from "../../../store/reducers/queryReducers/getMainReducer";
import { limitIntervalCreator } from "../../../store/reducers/stateReducers/LimitIntervalReducer";

export default function MainChartBtns({ btn, activeBtn, setActiveBtn }) {
  const dispatch = useDispatch();
  const [hoverBtn, setHoverBtn] = useState(0);

  useEffect(() => {
    dispatch(
      limitIntervalCreator(
        String(activeBtn.activeLimit),
        String(activeBtn.activeInterval)
      )
    );
  }, [activeBtn.activeNum]);

  return (
    <div className="btns">
      {btn.map((item, i) => (
        <button
          className={
            hoverBtn === i + 1 && activeBtn.activeNum !== i + 1
              ? "btns__btn btns__btn_hover"
              : activeBtn.activeNum === i + 1
              ? "btns__btn btns__btn_active"
              : "btns__btn"
          }
          key={i}
          onClick={() => {
            setActiveBtn({
              activeNum: i + 1,
              activeName: item.btnName,
              activeTextPadding: item.textPadding,
              activeInterval: item.query.interval,
              activeLimit: item.query.limit,
            });
          }}
          onMouseEnter={() => setHoverBtn(i + 1)}
          onMouseLeave={() => setHoverBtn(0)}
        >
          {item.btnName}
        </button>
      ))}
    </div>
  );
}
