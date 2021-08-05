import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { secondCurrencyCreator } from "../../store/reducers/stateReducers/secondCurrencyReducer";
import CurrencyState from "../currencyState";
import "./second-currency.scss";
import SecondCurItem from "./item";

export default function SecondValueChange() {
  const dispatch = useDispatch();
  const [values, setValues] = useState(["USDT", "BNB", "BTC", "TRX", "BUSD"]);
  const [hoverItem, setHoverItem] = useState(0);
  const [inputCur, setInputCur] = useState("");

  const [activeCur, setActiveCur] = useState({
    activeCurName: values[0],
    activeCurNum: 1,
  });

  function addItem(e) {
    if (
      e.key === "Enter" &&
      values.length <= 5 &&
      inputCur.trim() &&
      !values.includes(inputCur.toUpperCase())
    ) {
      setValues([...values, inputCur.toUpperCase()]);
      setInputCur("");
    }
  }
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
          value={inputCur}
          className="value-choice__input"
          type="text"
          placeholder="Add"
          maxLength="5"
          onKeyPress={(e) => addItem(e)}
          onChange={(e) => setInputCur(e.target.value)}
        />
      </div>
      <div className="value-choice__btns">
        {values.map((item, i) => (
          <SecondCurItem
            key={i}
            i={i}
            item={item}
            hoverItem={hoverItem}
            activeCur={activeCur}
            setHoverItem={setHoverItem}
            setActiveCur={setActiveCur}
            deleteItem={deleteItem}
          />
        ))}
      </div>
    </div>
  );
}
