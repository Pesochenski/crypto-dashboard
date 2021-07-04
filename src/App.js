import React from "react";
import "./app.scss";
import Header from "./components/header";
import SvgChart from "./components/mainSvg";

export default function App() {
  return (
    <main>
      <Header />

      <SvgChart />
    </main>
  );
}
