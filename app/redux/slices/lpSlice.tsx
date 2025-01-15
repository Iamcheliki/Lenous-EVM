import { createSlice } from "@reduxjs/toolkit";

interface State {
  depositAmount: number;
  tokenAmount: number;
}

const initialState: State = {
  depositAmount: 0,
  tokenAmount: 0,
};

const lpSlice = createSlice({
  name: "lp",
  initialState,
  reducers: {
    setDepositAmount: (state, action) => {
      state.depositAmount = action.payload;
    },
    setTokenAmount: (state, action) => {
      state.tokenAmount = action.payload;
    },
  },
});

export const { setDepositAmount, setTokenAmount } = lpSlice.actions;
export default lpSlice.reducer;
