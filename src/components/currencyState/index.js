import React from "react";
import { useSelector } from "react-redux";
import "./state.scss";

export default function CurrencyState() {
  const { first } = useSelector((state) => state.firstCurrency);
  const { second } = useSelector((state) => state.secondCurrency);
  return (
    <div className="state-shown">
      <p className="state-shown__text">
        {first} / {second}
      </p>
    </div>
  );
}
