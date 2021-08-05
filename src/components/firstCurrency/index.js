import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { firstCurrencyCreator } from "../../store/reducers/stateReducers/firstCurrencyReducer";
import { queryForBtn } from "../../thunk/query/queryForBtn";
import "./first-currency.scss";

import FirstCurItem from "./item";

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
  const [draw, setDraw] = useState(false);
  const [inputVal, setInputVal] = useState("");

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
      inputVal.trim() &&
      !firstValues.includes(inputVal.toUpperCase())
    ) {
      setFirstValues([...firstValues, inputVal.toUpperCase()]);

      if (renderArr.length < 4) {
        setRenderArr([...renderArr, inputVal.toUpperCase()]);
      }
      setInputVal("");
    }
  }

  function btnDrawing() {
    const minYchart = [];
    const maxYchart = [];
    const persents = [];

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
    function calculatePersents(data) {
      const persent =
        (Math.abs(data.yArr[data.yArr.length - 1] - data.yArr[0]) /
          data.yArr[data.yArr.length - 1]) *
        100;
      persents.push(persent.toFixed(2));
    }

    if (!first.error) {
      sorting(first);
      calculatePersents(first);
    } else {
      minYchart.push(0);
      maxYchart.push(0);
      // persents.push(0);
    }
    if (!second.error) {
      sorting(second);
      calculatePersents(second);
    } else {
      minYchart.push(0);
      maxYchart.push(0);
      // persents.push(0);
    }
    if (!third.error) {
      sorting(third);
      calculatePersents(third);
    } else {
      minYchart.push(0);
      maxYchart.push(0);
      // persents.push(0);
    }
    if (!fourth.error) {
      sorting(fourth);
      calculatePersents(fourth);
    } else {
      minYchart.push(0);
      maxYchart.push(0);
      // persents.push(0);
    }

    // console.log(persents);

    const yRatio = [];
    for (let i = 0; i < minYchart.length; i++) {
      let num = 0;
      if (minYchart === 0) {
        yRatio.push(0);
      }
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

    if (!first.error) {
      finalWriting(first, 0);
    } else {
      initialStroke.push("0");
      firstYarr.push(0);
    }
    if (!second.error) {
      finalWriting(second, 1);
    } else {
      initialStroke.push("0");
      firstYarr.push(0);
    }
    if (!third.error) {
      finalWriting(third, 2);
    } else {
      initialStroke.push("0");
      firstYarr.push(0);
    }
    if (!fourth.error) {
      finalWriting(fourth, 3);
    } else {
      initialStroke.push("0");
      firstYarr.push(0);
    }

    // console.log(initialStroke, firstYarr);

    setBtnPath(initialStroke);
    setFirstYchart(firstYarr);

    let copiedPath = [];
    for (let i = 0; i < initialStroke.length; i++) {
      if (initialStroke[i] !== "0") {
        copiedPath = initialStroke[i]?.split(" ");
      }
    }
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
        value={inputVal}
        type="text"
        placeholder="Add"
        maxLength="5"
        className="currency-choice__input"
        onKeyPress={(e) => addItem(e)}
        onChange={(e) => setInputVal(e.target.value)}
      />
      <div className="currency-choice__values">
        {renderArr.map((item, i) => (
          <FirstCurItem
            key={i}
            i={i}
            item={item}
            firstYchart={firstYchart}
            X_PADDING={X_PADDING}
            draw={draw}
            btnPath={btnPath}
            loaded={loaded}
            firstValues={firstValues}
            hoverCur={hoverCur}
            activeCur={activeCur}
            setActiveCur={setActiveCur}
            setHoverCur={setHoverCur}
            deleteAnyItem={deleteAnyItem}
          />
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
