import axios from "axios";

export const getMain = (interval, limit) =>
  axios.get(
    `https://api.binance.com/api/v1/klines?symbol=BTCUSDT&interval=${interval}&limit=${limit}` // 1m 60 and 15m 96
  );
