import React from "react";
import Image from "next/image";
import { Coin } from "../../types";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import {
  setReceiveCoin,
  setSendCoin,
  setShowCoinsModal,
} from "../../redux/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  Coins: Coin[];
};

const Coins = ({ Coins }: Props) => {
  const dispatch = useAppDispatch();
  const { firstCoinClicked, youReceiveCoin, youSendCoin } = useAppSelector(
    (state) => state.users
  );
  return (
    <div className="flex flex-wrap items-start gap-2">
      {Coins.map((coin, index) => (
        <div
          key={coin?.ticker?.toUpperCase()}
          className="w-full my-[0.3rem] px-[1.5rem] lg:w-[19%] cursor-pointer hover:bg-primYellow hover:rounded-[4px] hover:text-blackPrim"
          onClick={() => {
            if (firstCoinClicked) {
              if (JSON.stringify(coin) === JSON.stringify(youReceiveCoin)) {
                toast.warn("You have already chosen this as coin to receive");
              } else {
                dispatch(setSendCoin(coin));
                dispatch(setShowCoinsModal());
              }
            } else {
              if (JSON.stringify(coin) === JSON.stringify(youSendCoin)) {
                toast.warn("You have already chosen this as coin to send");
              } else {
                dispatch(setReceiveCoin(coin));
                dispatch(setShowCoinsModal());
              }
            }
          }}
        >
          <div className="items-center flex py-[0.25rem]">
            {/*Coin image*/}
            <div
              className={`w-[2.5rem] relative h-[2.5rem] mr-[0.5rem] ${
                !coin.image && "border rounded-full"
              }`}
            >
              {coin.image ? (
                <Image src={coin.image} alt="coin image" fill sizes="50vw" />
              ) : (
                ""
              )}
            </div>
            {/* Coin text */}
            <div className="flex items-start flex-col font-Titillium">
              <span>{coin.name}</span>
              <span>{coin?.ticker?.toUpperCase()}</span>
            </div>
          </div>
        </div>
      ))}
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Coins;
