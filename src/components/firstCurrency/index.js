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

  function deleteAnyItem(item) {
    if (firstValues.length > 3 && renderArr.length > 3) {
      setFirstValues(firstValues.filter((cur) => cur !== item));
      setRenderArr(renderArr.filter((cur) => cur !== item));
    }

    // for (let i = 0; i < renderArr.length; i++) {
    //   for (let j = 0; i < firstValues.length; j++) {
    //     if (renderArr[i] === firstValues[j]) {
    //       setRenderArr([...renderArr, firstValues[j]]);
    //       return;
    //     }
    //   }
    // }
  }

  function addItem(e) {
    if (e.key === "Enter") {
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
          <div key={i} className="currency-choice__item">
            <div className="currency-choice__item-header">
              <p className="currency-choice__item-title">{item}</p>
              <button
                className="currency-choice__item-del"
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
          (i + 1) % 4 === 0 ? ( // если число массива четное то даже при отсутствующих дальше айтемов создается лишняя кнопка
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
