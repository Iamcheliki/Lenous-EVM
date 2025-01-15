import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tradeReducer from "./slices/tradeSlice";
import lpReducer from "./slices/lpSlice";

const reducers = combineReducers({
  trade: tradeReducer,
  lp: lpReducer,
});

const store = configureStore({
  reducer: reducers,
});

export default store;
