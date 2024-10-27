import { createSlice } from "@reduxjs/toolkit";
import data from "../../_libs/utils/constants/supportedTokens.json";

const initialState = {
  selectedAsset: {
    ...data.tokens[0],
  },
};

const tradeSlice = createSlice({
  name: "trade",
  initialState,
  reducers: {
    setSelectedAsset: (state, action) => {
      state.selectedAsset = { ...action.payload };
    },
  },
});

export const { setSelectedAsset } = tradeSlice.actions;
export default tradeSlice.reducer;
