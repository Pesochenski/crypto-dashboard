import "regenerator-runtime/runtime";
import { put, call, takeEvery } from "redux-saga/effects";
import { getMain } from "../../http/getMain";
import {
  getForBtnErrorCreator,
  getForBtnSuccessCreator,
  GET_FORBTN,
} from "../../store/reducers/queryReducers/getForBtnReducer";

function* getForBtnWorker(action) {
  try {
    const res1 = yield call(getMain, action.payload.first, "USDT", "30m", "48");
    const res2 = yield call(
      getMain,
      action.payload.second,
      "USDT",
      "30m",
      "48"
    );
    const res3 = yield call(getMain, action.payload.third, "USDT", "30m", "48");
    const res4 = yield call(
      getMain,
      action.payload.fourth,
      "USDT",
      "30m",
      "48"
    );

    const payload = {
      first: {
        xArr: res1.data.map((item, i) => i),
        yArr: res1.data.map((item) => Number(item[4])),
      },
      second: {
        xArr: res2.data.map((item, i) => i),
        yArr: res2.data.map((item) => Number(item[4])),
      },
      third: {
        xArr: res3.data.map((item, i) => i),
        yArr: res3.data.map((item) => Number(item[4])),
      },
      fourth: {
        xArr: res4.data.map((item, i) => i),
        yArr: res4.data.map((item) => Number(item[4])),
      },
    };

    yield put(getForBtnSuccessCreator(payload));
  } catch (err) {
    yield put(getForBtnErrorCreator());
  }
}

export function* getForBtnWatcher() {
  yield takeEvery(GET_FORBTN, getForBtnWorker);
}
