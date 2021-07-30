import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { firstCurrencyCreator } from "../../store/reducers/stateReducers/firstCurrencyReducer";
import "./first-currency.scss";

export function FirstCurrencyChange() {
  const dispatch = useDispatch();
  const [firstValues, setFirstValues] = useState([
    "BTC",
    "LTC",
    "ETH",
    "BNB",
    "ADA",
  ]);
  const [renderArr, setRenderArr] = useState([]);
  const [activePag, setActivePag] = useState(0);
  const [hoverCur, setHoverCur] = useState(0);
  const [activeCur, setActiveCur] = useState({
    curName: firstValues[0],
    curNum: 0,
  });

  useEffect(() => {
    renderItems(0);
    dispatch(firstCurrencyCreator(String(firstValues[0])));
  }, []);
  useEffect(() => {
    renderItems(activePag);

    if (!firstValues.includes(activeCur.curName)) {
      setActiveCur({ curName: firstValues[0], curNum: 0 });
    }

    if (renderArr.length === 1 && activePag !== 0) {
      // some react strange jokes... (=== 1)
      renderItems(firstValues.length - 4);
    }
  }, [firstValues]);

  useEffect(() => {
    dispatch(firstCurrencyCreator(activeCur.curName));
  }, [activeCur]);

  function renderItems(num) {
    const newRender = [];
    for (let i = num; i < num + 4; i++) {
      if (firstValues[i]) {
        newRender.push(firstValues[i]);
      }
    }
    setRenderArr(newRender);
    setActivePag(num);
  }

  function deleteAnyItem(item) {
    if (firstValues.length > 3 || (renderArr.length > 3 && activePag === 0)) {
      setFirstValues(firstValues.filter((cur) => cur !== item));
    }
  }

  function addItem(e) {
    if (e.key === "Enter" && e.target.value.trim()) {
      setFirstValues([...firstValues, e.target.value.toUpperCase()]);

      if (renderArr.length < 4) {
        setRenderArr([...renderArr, e.target.value.toUpperCase()]);
      }
    }
  }

  return (
    <section className="currency-choice">
      <input
        type="text"
        placeholder="Add"
        maxLength="5"
        className="currency-choice__input"
        onKeyPress={(e) => addItem(e)}
      />
      <div className="currency-choice__values">
        {renderArr.map((item, i) => (
          <div
            key={i}
            className={
              hoverCur === i + 1
                ? "currency-choice__item currency-choice__item_hover"
                : activeCur.curNum === firstValues.indexOf(item)
                ? "currency-choice__item_active currency-choice__item"
                : "currency-choice__item"
            }
            onMouseEnter={() => setHoverCur(i + 1)}
            onMouseLeave={() => setHoverCur(0)}
            onClick={() =>
              setActiveCur({ curName: item, curNum: firstValues.indexOf(item) })
            }
          >
            <div className="currency-choice__item-header">
              <p
                className={
                  hoverCur === i + 1
                    ? "currency-choice__item-title currency-choice__item-title_hover"
                    : activeCur.curNum === firstValues.indexOf(item)
                    ? "currency-choice__item-title_active currency-choice__item-title"
                    : "currency-choice__item-title"
                }
              >
                {item}
              </p>
              <button
                className={
                  hoverCur === i + 1
                    ? "currency-choice__item-del currency-choice__item-del_hover"
                    : activeCur.curNum === firstValues.indexOf(item)
                    ? "currency-choice__item-del_active currency-choice__item-del"
                    : "currency-choice__item-del"
                }
                onClick={() => deleteAnyItem(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="currency-choice__btns">
        <button
          className={
            activePag === 0
              ? "currency-choice__btn_active currency-choice__btn"
              : "currency-choice__btn"
          }
          onClick={() => renderItems(0)}
        />
        {firstValues.map((item, i) =>
          (i + 1) % 4 === 0 &&
          firstValues.length > firstValues.indexOf(item) + 1 ? (
            <button
              className={
                activePag === i + 1
                  ? "currency-choice__btn_active currency-choice__btn"
                  : "currency-choice__btn"
              }
              onClick={() => renderItems(i + 1)}
            />
          ) : null
        )}
      </div>
    </section>
  );
}
