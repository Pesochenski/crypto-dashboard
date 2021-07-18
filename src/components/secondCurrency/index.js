import React, { useState, useEffect } from "react";
import "./second.scss";

export default function SecondValueChange() {
  const [values, setValues] = useState(["USD", "BTC", "ETH", "LTC"]);
  const [activeItem, setActiveItem] = useState(0);
  useEffect(() => {
    console.log(activeItem);
  }, [activeItem]);

  return (
    <div className="value-choice">
      <input className="value-choice__input" type="text" placeholder="Add" />
      <div className="value-choice__btns">
        {values.map((item, i) => (
          <div
            key={i}
            className="value-choice__item"
            onMouseEnter={() => setActiveItem(i + 1)}
            onMouseLeave={() => setActiveItem(0)}
          >
            <div className="value-choice__item-name">
              <p
                className={
                  activeItem == i + 1
                    ? "value-choice__item-text value-choice__item-text_hover"
                    : "value-choice__item-text"
                }
              >
                {item}
              </p>
            </div>
            <button className="value-choice__item-del">
              <svg className="value-choice__svg" viewBox="0 0 34 34">
                <line
                  x1="4"
                  y1="22"
                  x2="14"
                  y2="12"
                  className={
                    activeItem == i + 1
                      ? "value-choice__cross_hover"
                      : "value-choice__cross"
                  }
                />
                <line
                  x1="14"
                  y1="22"
                  x2="4"
                  y2="12"
                  className={
                    activeItem == i + 1
                      ? "value-choice__cross_hover"
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
