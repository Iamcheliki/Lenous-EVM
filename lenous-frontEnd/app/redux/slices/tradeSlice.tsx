import { createSlice } from "@reduxjs/toolkit";
import data from "../../_libs/utils/constants/supportedTokens.json";

const initialState = {
  selectedAsset: {
    ...data.tokens[0],
  },
  prices: {
    btc: 92000,
  },
  balances: {
    usedMargin: 0,
    freeMargin: 0,
    totalBalance: 0,
    totalPnl: 0,
    totalCommision: 0,
  },
};

const tradeSlice = createSlice({
  name: "trade",
  initialState,
  reducers: {
    setSelectedAsset: (state, action) => {
      state.selectedAsset = { ...action.payload };
    },
    setPrices: (state, action) => {
      state.prices = { ...action.payload };
    },
    setBalances: (state, action) => {
      state.balances = { ...action.payload };
    },
  },
});

export const { setSelectedAsset, setPrices, setBalances } = tradeSlice.actions;
export default tradeSlice.reducer;
