import axios from "axios";

export const getMain = (interval, limit) =>
  axios.get(
    `https://api.binance.com/api/v1/klines?symbol=BTCUSDT&interval=${interval}&limit=${limit}`
  );
