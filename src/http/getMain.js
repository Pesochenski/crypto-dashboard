import axios from "axios";

export default function getMain() {
  axios.get(
    "https://api.binance.com/api/v1/klines?symbol=BTCUSDT&interval=15m&limit=96"
  );
}
