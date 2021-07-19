import React from "react";
import Header from "./components/header";
import SvgChart from "./components/mainSvg";
import SecondValueChange from "./components/secondCurrency";
import "./App.scss";
import CurrencyState from "./components/currencyState";

export default function App() {
  return (
    <>
      <Header />

      <CurrencyState />
      <section className="main-section">
        <SecondValueChange />
        <SvgChart />
      </section>
    </>
  );
}
