import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { firstCurrencyCreator } from "../../store/reducers/stateReducers/firstCurrencyReducer";
import { queryForBtn } from "../../thunk/query/queryForBtn";
import "./first-currency.scss";

export function FirstCurrencyChange() {
  const dispatch = useDispatch();
  const { loaded, first, second, third, fourth } = useSelector(
    (state) => state.getForBtn
  );

  const [firstValues, setFirstValues] = useState([
    "BTC",
    "LTC",
    "ETH",
    "BNB",
    "WIN",
  ]);
  const [renderArr, setRenderArr] = useState([]);
  const [activePag, setActivePag] = useState(0);
  const [hoverCur, setHoverCur] = useState(0);
  const [activeCur, setActiveCur] = useState({
    curName: firstValues[0],
    curNum: 0,
  });
  const [btnPath, setBtnPath] = useState([]);
  const [firstYchart, setFirstYchart] = useState([]);
  const [rendered, setRendered] = ["first, second", "third", "fourth"];
  const [draw, setDraw] = useState(false);

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
  useEffect(() => {
    btnDrawing();
  }, [first.yArr]);

  const HEIGHT = 90;
  const WIDTH = 200;
  const X_PADDING = 22;
  const VIEW_WIDTH = WIDTH - X_PADDING * 2;
  const xRatio = Math.round(VIEW_WIDTH / (first.xArr?.length - 2));

  function collectData(arr) {
    if (arr.length >= 1) {
      dispatch(queryForBtn(arr[0], arr[1], arr[2], arr[3]));
    }
  }

  function renderItems(num) {
    const newRender = [];
    for (let i = num; i < num + 4; i++) {
      if (firstValues[i]) {
        newRender.push(firstValues[i]);
      }
    }
    collectData(newRender);
    setRenderArr(newRender);
    setActivePag(num);
  }

  function deleteAnyItem(item) {
    if (firstValues.length > 3 || (renderArr.length > 3 && activePag === 0)) {
      setFirstValues(firstValues.filter((cur) => cur !== item));
    }
  }

  function addItem(e) {
    if (
      e.key === "Enter" &&
      e.target.value.trim() &&
      !firstValues.includes(e.target.value.toUpperCase())
    ) {
      setFirstValues([...firstValues, e.target.value.toUpperCase()]);

      if (renderArr.length < 4) {
        setRenderArr([...renderArr, e.target.value.toUpperCase()]);
      }
    }
  }

  function btnDrawing() {
    const minYchart = [];
    const maxYchart = [];

    function sorting(data) {
      const yData = [];

      for (const y of data.yArr) {
        yData.push(y);
      }
      for (let i = 0; i < yData.length; i++) {
        let minIndex = i;
        for (let j = i; j < yData.length; j++) {
          if (yData[j] < yData[minIndex]) {
            minIndex = j;
          }
        }
        const stock = yData[i];
        yData[i] = yData[minIndex];
        yData[minIndex] = stock;
      }

      minYchart.push(yData[0]);
      maxYchart.push(yData[yData.length - 1]);
    }

    sorting(first);
    if (second.xArr !== undefined) {
      sorting(second);
    }
    if (third.xArr !== undefined) {
      sorting(third);
    }
    if (fourth.xArr !== undefined) {
      sorting(fourth);
    }

    const yRatio = [];
    for (let i = 0; i < minYchart.length; i++) {
      let num = 0;
      num = HEIGHT / (maxYchart[i] - minYchart[i]);
      yRatio.push(num);
    }

    const initialStroke = [];
    const firstYarr = [];
    const allYArrSorted = [];

    function finalWriting(data, index) {
      let final = "L ";
      const yArrSorted = [];

      const newFirstY =
        HEIGHT - Math.round((data.yArr[0] - minYchart[index]) * yRatio[index]);

      for (let i = 0; i < data.xArr?.length; i++) {
        final +=
          String(data.xArr[i] * xRatio + X_PADDING) +
          " " +
          String(HEIGHT - (data.yArr[i] - minYchart[index]) * yRatio[index]) +
          " ";

        yArrSorted.push(
          String(HEIGHT - (data.yArr[i] - minYchart[index]) * yRatio[index])
        );
      }

      initialStroke.push(final);
      firstYarr.push(newFirstY);
      allYArrSorted.push(yArrSorted);
    }

    finalWriting(first, 0);
    if (second.xArr !== undefined) {
      finalWriting(second, 1);
    }
    if (third.xArr !== undefined) {
      finalWriting(third, 2);
    }
    if (fourth.xArr !== undefined) {
      finalWriting(fourth, 3);
    }

    setBtnPath(initialStroke);
    setFirstYchart(firstYarr);

    const copiedPath = initialStroke[initialStroke.length - 1]?.split(" ");
    const firstPop = copiedPath?.pop();
    const secondPop = copiedPath?.pop();
    if (secondPop === allYArrSorted[allYArrSorted.length - 1][47]) {
      setDraw(true);
    } else {
      setDraw(false);
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
            <div className="currency-choice__chart">
              {!loaded ? (
                <p
                  className={
                    hoverCur === i + 1 ||
                    activeCur.curNum === firstValues.indexOf(item)
                      ? "currency-choice__chart-text currency-choice__chart-text_active"
                      : "currency-choice__chart-text"
                  }
                >
                  Loading...
                </p>
              ) : rendered[i].error ? (
                <p
                  className={
                    hoverCur === i + 1 ||
                    activeCur.curNum === firstValues.indexOf(item)
                      ? "currency-choice__chart-text currency-choice__chart-text_active"
                      : "currency-choice__chart-text"
                  }
                >
                  Error
                </p>
              ) : (
                <svg className="currency-choice__svg">
                  {btnPath && draw ? (
                    <path
                      d={`M ${0 + X_PADDING} ${Math.round(firstYchart[i])} ${
                        btnPath[i]
                      }`}
                      className="currency-choice__path"
                    />
                  ) : null}
                </svg>
              )}
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
              key={i}
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
