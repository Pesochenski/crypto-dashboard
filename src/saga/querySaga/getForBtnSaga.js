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
    const res = yield call(getMain, action.payload.first, "USDT", "1h", "24");

    const payload = {
      xArr: res.data.map((item, i) => i),
      yArr: res.data.map((item) => Number(item[4])),
    };

    yield put(getForBtnSuccessCreator(payload));
  } catch (err) {
    yield put(getForBtnErrorCreator());
  }
}

export function* getForBtnWatcher() {
  yield takeEvery(GET_FORBTN, getForBtnWorker);
}
