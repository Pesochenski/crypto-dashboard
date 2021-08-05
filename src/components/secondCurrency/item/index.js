import React from "react";
import SecondCurItemBtn from "./itemBtn";
import "./second-currency-item.scss";

export default function SecondCurItem({
  i,
  item,
  hoverItem,
  activeCur,
  setHoverItem,
  setActiveCur,
  deleteItem,
}) {
  return (
    <div
      className={
        hoverItem === i + 1 && activeCur.activeCurNum !== i + 1
          ? "second-cur-item second-cur-item_hover"
          : activeCur.activeCurNum === i + 1
          ? "second-cur-item second-cur-item_active"
          : "second-cur-item"
      }
      onMouseEnter={() => setHoverItem(i + 1)}
      onMouseLeave={() => setHoverItem(0)}
      onClick={() => setActiveCur({ activeCurName: item, activeCurNum: i + 1 })}
    >
      <div className="second-cur-item__name">
        <p
          className={
            hoverItem == i + 1 && activeCur.activeCurNum !== i + 1
              ? "second-cur-item__text second-cur-item__text_hover"
              : activeCur.activeCurNum === i + 1
              ? "second-cur-item__text second-cur-item__text_active"
              : "second-cur-item__text"
          }
        >
          {item}
        </p>
      </div>
      <SecondCurItemBtn
        i={i}
        item={item}
        hoverItem={hoverItem}
        activeCur={activeCur}
        deleteItem={deleteItem}
      />
    </div>
  );
}
