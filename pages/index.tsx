import { GetServerSideProps } from "next";
import Head from "next/head";
import Header from "./components/Header";
import Hero from "./components/Hero";
import axios from "axios";
import SelectCoinModal from "./components/SelectCoinModal";
import { useEffect } from "react";
import { Coin } from "../types";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import {
  setReceiveCoin,
  setSendCoin,
  setShowCoinsModal,
} from "../redux/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export async function getData(endpoint: string) {
  const response = await fetch(endpoint);
  const jsonData = await response.json();
  return jsonData;
}

export default function Home({ call, youReceiveDefault, youSendDefault }: any) {
  const dispatch = useAppDispatch();
  const { showCoinsModal, youReceiveCoin, youSendCoin, firstCoinClicked } =
    useAppSelector((state) => state.users);

  useEffect(() => {
    if (JSON.stringify(youReceiveCoin) === "{}") {
      dispatch(setReceiveCoin(youReceiveDefault[0]));
    }

    if (JSON.stringify(youSendCoin) === "{}") {
      dispatch(setSendCoin(youSendDefault[0]));
    }

    if (showCoinsModal) {
      dispatch(setShowCoinsModal());
    }
  }, []);

  return (
    <div
      className={`h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden z-0 scroll-smooth lg:scrollbar-track-blackPrim lg:scrollbar-thumb-blackTert  lg:scrollbar-thumb-rounded-xl lg:scrollbar-thin text-Inter bg-black/95 text-whitePrim`}
    >
      <Head>
        <title>Ozarkexchange</title>
        <meta
          name="description"
          content="DApp for instant Cryptocurrency Exchange"
        />
      </Head>

      <main>
        <Header />
        <Hero />
        {showCoinsModal && <SelectCoinModal FeaturedCoins={call} />}
      </main>

      <footer></footer>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const call = await getData(
    "https://api.changenow.io/v1/currencies?active=true&fixedRate=true"
  );
  const youSendDefault = call.filter(
    (coin: Coin) => coin?.ticker?.toLowerCase() === "btc"
  );
  const youReceiveDefault = call.filter(
    (coin: Coin) => coin?.ticker?.toLowerCase() === "eth"
  );

  return {
    props: {
      call,
      youSendDefault,
      youReceiveDefault,
    }, // will be passed to the page component as props
  };
};
