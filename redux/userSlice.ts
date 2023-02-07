import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { Coin, userState } from "../types";

// Define the initial state using that type
const initialState: userState = {
  youSendCoin: {},
  youReceiveCoin: {},
  showCoinsModal: false,
  firstCoinClicked: false,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSendCoin: (state, action: PayloadAction<Coin>) => {
      state.youSendCoin = action.payload;
    },
    setReceiveCoin: (state, action: PayloadAction<Coin>) => {
      state.youReceiveCoin = action.payload;
    },
    setShowCoinsModal: (state) => {
      state.showCoinsModal = !state.showCoinsModal;
    },
    setFirstCoinClicked: (state, action: PayloadAction<boolean>) => {
      state.firstCoinClicked = action.payload;
    },
  },
});

export const {
  setSendCoin,
  setReceiveCoin,
  setShowCoinsModal,
  setFirstCoinClicked,
} = userSlice.actions;

export default userSlice.reducer;
