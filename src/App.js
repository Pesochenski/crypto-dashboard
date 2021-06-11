import axios from "axios";
import React, { useEffect } from "react";
import MainCanvas from "./components/mainCanvas";

export default function App() {
  // useEffect(() => {
  //   gettingTestData();
  // }, []);

  // async function gettingTestData(): Promise<void> {
  //   const res = await axios.get(
  //     "https://api.binance.com/api/v1/klines?symbol=LTCBTC&interval=1d&limit=10"
  //   );
  //   console.log(res);
  // }

  return (
    <main>
      <h1>Dashboard development</h1>
      <MainCanvas />
    </main>
  );
}
