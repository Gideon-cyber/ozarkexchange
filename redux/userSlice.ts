import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { Coin, userState } from "../types";

// Define the initial state using that type
const initialState: userState = {
  youSendCoin: {
    ticker: "btc",
    name: "Bitcoin",
    image: "https://content-api.changenow.io/uploads/btc_d8db07f87d.svg",
    hasExternalId: false,
    isFiat: false,
    featured: true,
    isStable: false,
    supportsFixedRate: true,
  },
  youReceiveCoin: {
    ticker: "eth",
    name: "Ethereum",
    image: "https://content-api.changenow.io/uploads/eth_f4ebb54ec0.svg",
    hasExternalId: false,
    isFiat: false,
    featured: true,
    isStable: false,
    supportsFixedRate: true,
  },
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
  },
});

export const { setSendCoin, setReceiveCoin } = userSlice.actions;

export default userSlice.reducer;
