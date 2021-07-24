import React, { useState, useEffect } from "react";
import "./first-currency.scss";

export function FirstCurrencyChange() {
  const [firstValues, setFirstValues] = useState([
    "BTC",
    "LTC",
    "ETH",
    "BNB",
    "ADA",
  ]);
  const [renderArr, setRenderArr] = useState([]);
  const [activePag, setActivePag] = useState(0);

  useEffect(() => {
    renderItems(0);
  }, []);
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

  return (
    <section className="currency-choice">
      <input
        type="text"
        placeholder="Add"
        maxLength="5"
        className="currency-choice__input"
        onKeyPress={(e) =>
          e.key === "Enter"
            ? setFirstValues([...firstValues, e.target.value.toUpperCase()])
            : null
        }
      />
      <div className="currency-choice__values">
        {renderArr.map((item, i) => (
          <div key={i} className="currency-choice__item">
            <p className="currency-choice__title">{item}</p>
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
          (i + 1) % 4 === 0 ? (
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
