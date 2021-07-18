import React, { useState } from "react";
import "./second.scss";

export default function SecondValueChange() {
  const [values, setValues] = useState(["USD", "BTC", "ETH", "LTC"]);

  return (
    <div className="value-choice">
      <input className="value-choice__input" type="text" placeholder="Add" />
      <div className="value-choice__btns">
        {values.map((item, i) => (
          <button key={i} className="value-choice__item">
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
