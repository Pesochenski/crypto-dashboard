import { getMain } from "../../http/getMain";
import {
  getForBtnCreator,
  getForBtnSuccessCreator,
} from "../../store/reducers/queryReducers/getForBtnReducer";

export function queryForBtn(first, second, third, fourth) {
  return async (dispatch) => {
    const secondCurrency = "USDT";
    const interval = "30m";
    const limit = 48;

    dispatch(getForBtnCreator());

    const res0 = await getMain(first, secondCurrency, interval, limit);
    const res1 = second
      ? await getMain(second, secondCurrency, interval, limit)
      : null;
    const res2 = third
      ? await getMain(third, secondCurrency, interval, limit)
      : null;
    const res3 = fourth
      ? await getMain(fourth, secondCurrency, interval, limit)
      : null;

    const responses = [res0, res1, res2, res3];
    const payload = [];
    for (let i = 0; i < responses.length; i++) {
      if (
        String(responses[i]) !== "Error: Network Error" &&
        responses[i] !== null
      ) {
        payload.push({
          error: false,
          xArr: responses[i]?.data?.map((item, index) => index),
          yArr: responses[i]?.data?.map((item) => Number(item[4])),
        });
      } else if (responses[i] !== null) {
        payload.push({
          error: true,
          xArr: responses[i]?.data?.map((item, index) => index),
          yArr: responses[i]?.data?.map((item) => Number(item[4])),
        });
      }
    }

    // console.log(responses);
    // console.log(payload);

    dispatch(getForBtnSuccessCreator(payload));
  };
}
