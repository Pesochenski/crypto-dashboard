import axios from "axios";

export const getMain = (first, second, interval, limit) =>
  axios.get(
    `https://api.binance.com/api/v1/klines?symbol=${first}${second}&interval=${interval}&limit=${limit}`
  );
