import { getMain } from "../../http/getMain";
import {
  getMainCreator,
  getMainErrorCreator,
  getMainSuccessCreator,
} from "../../store/reducers/queryReducers/getMainReducer";

export function queryMain(first, second, interval, limit) {
  return async (dispatch) => {
    try {
      dispatch(getMainCreator());

      const res = await getMain(first, second, interval, limit);

      const payload = {
        xArr: res.data.map((item, i) => i),
        yArr: res.data.map((item) => Number(item[4])),
        time: res.data.map((item) => new Date(item[6])),
      };

      dispatch(getMainSuccessCreator(payload));
    } catch (err) {
      dispatch(getMainErrorCreator());
    }
  };
}
