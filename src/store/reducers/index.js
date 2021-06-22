import { combineReducers } from "redux";
import { getMainReducer } from "./getMainReducer";

export const rootReducer = combineReducers({ getMain: getMainReducer });
