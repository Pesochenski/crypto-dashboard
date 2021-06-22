import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./reducers/index";
import createSagaMiddleware from "redux-saga";
import { rootWatcher } from "../saga/index";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootWatcher);
