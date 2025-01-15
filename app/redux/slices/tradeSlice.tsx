import { createSlice } from "@reduxjs/toolkit";
import data from "../../_libs/utils/constants/supportedTokens.json";

interface State {
  selectedAsset: any;
  prices: {
    btc: number;
  };
  balances: {
    usedMargin: number;
    freeMargin: number;
    totalBalance: number;
    totalPnl: number;
    totalCommision: number;
  };

  userOrders: any[];
  userPositions: any[];
}

const initialState: State = {
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

  userOrders: [],
  userPositions: [],
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
    setUserOrders: (state, action) => {
      state.userOrders = [...action.payload];
    },
    setUserPositions: (state, action) => {
      state.userPositions = [...action.payload];
    },
  },
});

export const {
  setSelectedAsset,
  setPrices,
  setBalances,
  setUserOrders,
  setUserPositions,
} = tradeSlice.actions;
export default tradeSlice.reducer;
