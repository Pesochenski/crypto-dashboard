import React from "react";
import Header from "./components/header";
import SvgChart from "./components/mainSvg";
import SecondValueChange from "./components/secondCurrency";
import "./App.scss";
// import CurrencyState from "./components/currencyState";
import { FirstCurrencyChange } from "./components/firstCurrency";

export default function App() {
  return (
    <>
      <Header />

      <section className="main-section">
        <FirstCurrencyChange />

        <section className="chart-section">
          <SecondValueChange />
          <SvgChart />
        </section>
      </section>
    </>
  );
}
