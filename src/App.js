import React from "react";
import "./app.scss";
import Header from "./components/header";
import SvgChart from "./components/mainSvg";
import SecondValueChange from "./components/secondValue";

export default function App() {
  return (
    <>
      <Header />

      <section>
        <SecondValueChange />
        <SvgChart />
      </section>
    </>
  );
}
