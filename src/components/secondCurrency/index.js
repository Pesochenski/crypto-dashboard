import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { secondCurrencyCreator } from "../../store/reducers/stateReducers/secondCurrencyReducer";
import CurrencyState from "../currencyState";
import "./second.scss";

export default function SecondValueChange() {
  const dispatch = useDispatch();
  const [values, setValues] = useState(["USDT", "BNB", "BTC", "TRX"]);
  const [activeItem, setActiveItem] = useState(0);

  const [activeCur, setActiveCur] = useState({
    activeCurName: values[0],
    activeCurNum: 1,
  });

  function deleteItem(item) {
    if (values.length > 1) {
      setValues(values.filter((cur) => cur !== item));
    }
  }
  useEffect(() => {
    dispatch(secondCurrencyCreator(String(values[0])));
  }, []);
  useEffect(() => {
    if (activeCur.activeCurNum > values.length - 1) {
      setActiveCur({ activeCurName: values[0], activeCurNum: 1 });
    }
  }, [values]);
  useEffect(() => {
    dispatch(secondCurrencyCreator(activeCur.activeCurName));
  }, [activeCur]);

  return (
    <div className="value-choice">
      <div className="value-choice__header">
        <CurrencyState />
        <input
          className="value-choice__input"
          type="text"
          placeholder="Add"
          maxLength="5"
          onKeyPress={(e) =>
            e.key === "Enter" && values.length <= 5 && e.target.value.trim()
              ? setValues([...values, e.target.value.toUpperCase()])
              : null
          }
        />
      </div>
      <div className="value-choice__btns">
        {values.map((item, i) => (
          <div
            key={i}
            className={
              activeCur.activeCurNum == i + 1
                ? "value-choice__item value-choice__item_active"
                : "value-choice__item"
            }
            onMouseEnter={() => setActiveItem(i + 1)}
            onMouseLeave={() => setActiveItem(0)}
            onClick={() =>
              setActiveCur({ activeCurName: item, activeCurNum: i + 1 })
            }
          >
            <div className="value-choice__item-name">
              <p
                className={
                  activeItem == i + 1
                    ? "value-choice__item-text value-choice__item-text_hover"
                    : activeCur.activeCurNum == i + 1
                    ? "value-choice__item-text value-choice__item-text_active"
                    : "value-choice__item-text"
                }
              >
                {item}
              </p>
            </div>
            <button
              className="value-choice__item-del"
              onClick={() => deleteItem(item)}
            >
              <svg className="value-choice__svg" viewBox="0 0 34 34">
                <line
                  x1="4"
                  y1="21"
                  x2="14"
                  y2="11"
                  className={
                    activeItem == i + 1
                      ? "value-choice__cross_hover"
                      : activeCur.activeCurNum == i + 1
                      ? "value-choice__cross_active"
                      : "value-choice__cross"
                  }
                />
                <line
                  x1="14"
                  y1="21"
                  x2="4"
                  y2="11"
                  className={
                    activeItem == i + 1
                      ? "value-choice__cross_hover"
                      : activeCur.activeCurNum == i + 1
                      ? "value-choice__cross_active"
                      : "value-choice__cross"
                  }
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
