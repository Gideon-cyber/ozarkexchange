import React from "react";
import Image from "next/image";
import { Coin } from "../../types";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";

type Props = {
  Coins: Coin[];
};

const Coins = ({ Coins }: Props) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-wrap items-start gap-2">
      {Coins.map((coin, index) => (
        <div
          key={coin.ticker.toUpperCase()}
          className="w-full my-[0.3rem] px-[1.5rem] lg:w-[19%]"
          onClick={() => {}}
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
              <span>{coin.ticker.toUpperCase()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Coins;
