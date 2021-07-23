import React, { useState } from "react";
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

  function renderItems(num) {
    const newRender = [];
    for (let i = num; i < num + 4; i++) {
      if (firstValues[i]) {
        newRender.push(firstValues[i]);
      }
    }
    setRenderArr(newRender);
  }

  return (
    <div className="currency-choice">
      <input type="text" placeholder="Add" />
      <div className="currency-choice__values">
        {renderArr.map((item, i) => (
          <div key={i} className="currency-choice__item">
            <p className="currency-choice__title">{item}</p>
          </div>
        ))}
      </div>
      <div className="currency-choice__btns">
        <button
          className="currency-choice__btn"
          onClick={() => renderItems(0)}
        />
        {firstValues.map((item, i) =>
          (i + 1) % 4 === 0 ? (
            <button
              className="currency-choice__btn"
              onClick={() => renderItems(i + 1)}
            />
          ) : null
        )}
      </div>
    </div>
  );
}
