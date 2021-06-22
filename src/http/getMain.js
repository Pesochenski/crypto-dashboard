import axios from "axios";

export const getMain = () =>
  axios.get(
    "https://api.binance.com/api/v1/klines?symbol=BTCUSDT&interval=15m&limit=96"
  );
