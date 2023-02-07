export type Coin = {
  featured?: boolean;
  hasExternalId?: boolean;
  image?: string;
  isFiat?: boolean;
  isStable?: boolean;
  name?: string;
  supportsFixedRate?: boolean;
  ticker?: string;
};

export type userState = {
  youSendCoin: Coin;
  youReceiveCoin: Coin;
  showCoinsModal: boolean;
  firstCoinClicked: boolean;
};
