import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setFirstCoinClicked, setShowCoinsModal } from "../../redux/userSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

type Props = {};

const Hero = ({}: Props) => {
  const dispatch = useAppDispatch();
  const {
    youReceiveCoin: receiveCoin,
    youSendCoin: sendCoin,
    showCoinsModal,
    firstCoinClicked,
  } = useAppSelector((state) => state.users);
  const [text, count] = useTypewriter({
    words: [
      "The fastest, Lowest fees",
      "The simplest and fastest",
      "User friendly",
    ],
    loop: true,
    delaySpeed: 2000,
  });
  const [selected, setSelected] = useState(0);
  const nav = ["FIXED RATE", "FLOATING RATE"];

  const minimumExchangeAmount = () => {
    const config = {
      method: "get",
      url: `https://api.changenow.io/v1/min-amount/${sendCoin.ticker}_${receiveCoin.ticker}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
      headers: {},
    };

    axios(config)
      .then((response: any) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const exchangeRange = () => {
    const config = {
      method: "get",
      url: `https://api.changenow.io/v1/exchange-range/${sendCoin.ticker}_${receiveCoin.ticker}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
      headers: {},
    };

    axios(config)
      .then((response: any) => {
        console.log(response.data);
        toast.warn(
          `Min is ${response.data.minAmount} ${
            !firstCoinClicked
              ? receiveCoin.ticker?.toUpperCase()
              : sendCoin.ticker?.toUpperCase()
          } and Max is ${response.data.maxAmount === null && "infinite"} ${
            !firstCoinClicked
              ? receiveCoin.ticker?.toUpperCase()
              : sendCoin.ticker?.toUpperCase()
          }`
        );
        // console.log(JSON.stringify(response.data));
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  useEffect(() => {
    minimumExchangeAmount();
    exchangeRange();
  }, [receiveCoin, sendCoin]);

  return (
    <div className="max-w-7xl md:h-screen mx-auto w-full pt-[3rem] bg-hero-pattern bg-center bg-no-repeat">
      <div className="flex items-center flex-col gap-5 md:gap-0 justify-between md:flex-row">
        {/*Left*/}
        <div className="w-full px-4 md:px-0 md:w-[50%]">
          <div className="text-[50px] font-b-600 mb-4 font-Titillium">
            <h1>
              <span>{text}</span>
              <Cursor />
            </h1>

            <h1>Crypto Exchange</h1>
          </div>
          <span className="text-[18px] text-nearWhite block md:mb-[0.5rem]">
            Exchange Bitcoin and 50+ altcoins in a fast, simple and secure way
            with Ozarkexchange !
          </span>
          <div className="flex items-center flex-col w-full md:flex-row gap-4 mt-[3rem]">
            <Link
              href=""
              className="flex items-center justify-center gap-3 text-[32px] rounded-[8px] border border-blackTert bg-blackSec px-[2rem] py-[0.5rem] w-full md:w-auto text-primYellow"
            >
              <Icon icon="bxl:discord-alt" />
              <span className="text-[24px]">DISCORD</span>
            </Link>
            <Link
              href=""
              className="flex items-center justify-center gap-2 text-[32px] rounded-[8px] border border-blackTert bg-blackSec px-[2rem] py-[0.5rem] w-full md:w-auto text-primYellow"
            >
              <Icon icon="bxl:telegram" />
              <span className="text-[24px]">TELEGRAM</span>
            </Link>
          </div>
        </div>
        {/* Right */}
        <div className="w-full px-4 md:w-[50%] flex items-center justify-center">
          <div className="border border-blackTert bg-blackPrim rounded-[4px] w-full md:transform md:scale-90 p-4">
            <div className="flex items-center mb-4">
              {nav.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-center gap-2 p-4 text-[20px] md:text-[18px] md:w-[50%] hover:cursor-pointer ${
                    selected === index &&
                    "border border-blackTert rounded-[4px]"
                  }`}
                  onClick={() => setSelected(index)}
                >
                  <Icon icon="bx:lock-alt" />
                  <span className="text-[14px] md:text-[18px]">{item}</span>
                </div>
              ))}
            </div>
            {/*First input*/}
            <div className="flex items-center md:justify-between w-full text-[12px] border border-blackTert bg-blackSoft rounded-[4px] px-[1.5rem] py-[0.5rem] mb-[0.5rem]">
              <div className="flex items-start flex-col gap-1 w-[50%] md:w-auto">
                <span className="font-b-500 font-Titillium text-[#999999] pb-[0.125rem]">
                  YOU SEND
                </span>
                <input
                  type="text"
                  className="outline-none text-[20px] border-transparent bg-transparent text-whitePrim"
                  value="0.1"
                  onChange={() => {}}
                />
                <span className="font-b-500 font-Titillium text-[#999999] pb-[0.125rem]">
                  ≈ $2345.13
                </span>
              </div>
              <div
                className="flex items-center justify-center font-b-500 font-Titillium cursor-pointer text-[21px] border-l border-l-blackTert h-[88px] pl-[1.2rem] py-[0.5rem] w-[50%] md:w-auto "
                onClick={() => {
                  dispatch(setShowCoinsModal());
                  dispatch(setFirstCoinClicked(true));
                }}
              >
                <div className="w-[2rem] mr-[0.5rem]">
                  <Image
                    src={sendCoin?.image || ""}
                    alt="image"
                    width={32}
                    height={32}
                    className=""
                  />
                </div>
                <span className="text-[#999999]">
                  {sendCoin?.ticker?.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="flex items-end justify-end cursor-pointer ">
              <div className="border border-blackTert rounded-[8px] bg-blackSec text-[24px] p-[0.25rem]">
                <Icon icon="bx:git-compare" />
              </div>
            </div>

            {/*Second input*/}
            <div className="flex items-center justify-between w-full text-[12px] border border-blackTert bg-blackSoft rounded-[4px] px-[1.5rem] py-[0.5rem] my-[0.5rem]">
              <div className="flex items-start flex-col gap-1 w-[50%] md:w-auto">
                <span className="font-b-500 font-Titillium text-[#999999] pb-[0.125rem]">
                  YOU RECEIVE
                </span>
                <input
                  type="text"
                  className="outline-none text-[20px] border-transparent bg-transparent text-whitePrim"
                  value="1.3933669"
                  onChange={() => {}}
                />
                <span className="font-b-500 font-Titillium text-[#999999] pb-[0.125rem]">
                  ≈ $2316.07
                </span>
              </div>
              <div
                className="flex items-center justify-center font-b-500 font-Titillium cursor-pointer text-[21px] border-l border-l-blackTert h-[88px] pl-[1.2rem] py-[0.5rem] w-[50%] md:w-auto"
                onClick={() => {
                  dispatch(setShowCoinsModal());
                  dispatch(setFirstCoinClicked(false));
                }}
              >
                <div className="w-[2rem] mr-[0.5rem]">
                  <Image
                    src={receiveCoin?.image || ""}
                    alt="image"
                    width={32}
                    height={32}
                    className=""
                  />
                </div>
                <span className="text-[#999999]">
                  {receiveCoin?.ticker?.toUpperCase()}
                </span>
              </div>
            </div>

            {/*Third Input*/}
            <div className="my-4 border border-blackTert rounded-[4px] text-[12px] py-[0.5rem] px-[1.5rem]">
              <div className="w-full">
                <span className="font-b-500 pb-[0.125rem] block text-[#999999]">
                  Enter your ETH address
                </span>
                <input
                  type="text"
                  className="outline-none text-[20px] border-transparent bg-transparent text-whitePrim"
                  placeholder="ETH address"
                  onChange={() => {}}
                />
              </div>
            </div>

            <button className="border border-blackTert bg-blackSoft rounded-[4px] text-[24px] cursor-pointer mt-4 px-[1.5rem] py-[1.5rem] w-full">
              Exchange now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
