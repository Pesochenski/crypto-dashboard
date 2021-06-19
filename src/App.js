import React from "react";
import MainCanvas from "./components/mainCanvas";
import "./app.scss";
import SvgChart from "./components/mainSvg";

export default function App() {
  return (
    <main>
      <h1>Dashboard development</h1>
      <MainCanvas />

      <SvgChart />
    </main>
  );
}
