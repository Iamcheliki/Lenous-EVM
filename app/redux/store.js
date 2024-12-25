import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tradeReducer from "./slices/tradeSlice";

const reducers = combineReducers({
  trade: tradeReducer,
});

const store = configureStore({
  reducer: reducers,
});

export default store;
