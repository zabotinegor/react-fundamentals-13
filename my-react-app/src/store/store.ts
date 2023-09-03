import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import authMiddleware from "./middlewares/authMiddleware";
import thunk from "redux-thunk";

const createStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware, authMiddleware, thunk];
  const store = configureStore({
    reducer: rootReducer(),
    middleware: middleware,
    devTools: process.env.currentEnv !== "production",
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

export default createStore;
