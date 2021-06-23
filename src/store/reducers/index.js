import { combineReducers } from "redux";
import { getMainReducer } from "./queryReducers/getMainReducer";
import { sortTimeReducer } from "./sortReducers/sortTimeReducer";

export const rootReducer = combineReducers({
  getMain: getMainReducer,
  sortTime: sortTimeReducer,
});
