import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";

const createStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];
  const store = configureStore({
    reducer: rootReducer(),
    middleware: middleware,
    devTools: process.env.currentEnv !== "production",
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

export default createStore;
