import axios from "axios";

export const getMain = (first, second, interval, limit) => {
  // try {
  return axios.get(
    `https://api.binance.com/api/v1/klines?symbol=${first}${second}&interval=${interval}&limit=${limit}`
  );
  //   .then((response) => {
  //     if (response.status >= 400) {
  //       return response.data.error;
  //     }
  //     return response;
  //   })
  //   .catch((err) => {
  //     return err;
  //   });
  // } catch (err) {
  //   if (err) {
  //     return err;
  //   }
  // }

  // fetch(
  //  `https://api.binance.com/api/v1/klines?symbol=${first}${second}&interval=${interval}&limit=${limit}`
  // )
  //  .then((res) => {
  //    return res.json();
  //  })
  //  .catch((err) => {
  //    if (err) {
  //      return err;
  //    }
  //  });
};
