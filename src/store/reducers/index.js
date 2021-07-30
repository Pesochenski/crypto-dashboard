import { combineReducers } from "redux";
import { getForBtnReducer } from "./queryReducers/getForBtnReducer";
import { getMainReducer } from "./queryReducers/getMainReducer";
import { sortTimeReducer } from "./sortReducers/sortTimeReducer";
import { firstCurrencyReducer } from "./stateReducers/firstCurrencyReducer";
import { limitIntervalReducer } from "./stateReducers/LimitIntervalReducer";
import { secondCurrencyReducer } from "./stateReducers/secondCurrencyReducer";

export const rootReducer = combineReducers({
  getMain: getMainReducer,
  getForBtn: getForBtnReducer,
  sortTime: sortTimeReducer,
  firstCurrency: firstCurrencyReducer,
  secondCurrency: secondCurrencyReducer,
  limitInterval: limitIntervalReducer,
});
