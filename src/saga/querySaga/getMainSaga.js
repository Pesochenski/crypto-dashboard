import "regenerator-runtime/runtime";
import { put, takeEvery, call } from "redux-saga/effects";
import { getMain } from "../../http/getMain";
import {
  getMainErrorCreator,
  getMainSuccessCreator,
  GET_MAIN,
} from "../../store/reducers/queryReducers/getMainReducer";

function* getMainWorker(action) {
  try {
    const res = yield call(
      getMain,
      action.payload.first,
      action.payload.second,
      action.payload.interval,
      action.payload.limit
    );
    console.log(res.data);

    const payload = yield call(
      () =>
        new Promise((resolve) =>
          resolve({
            xArr: res.data.map((item, i) => i),
            yArr: res.data.map((item) => Number(item[4])),
            time: res.data.map((item) => new Date(item[6])),
          })
        )
    );

    yield put(getMainSuccessCreator(payload));
  } catch (e) {
    yield put(getMainErrorCreator());
  }
}

export function* getMainWatcher() {
  yield takeEvery(GET_MAIN, getMainWorker);
}
