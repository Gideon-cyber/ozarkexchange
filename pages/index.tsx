import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "./components/Header";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <div
      className={`h-screen font-space snap-y snap-mandatory overflow-y-scroll overflow-x-hidden z-0 scroll-smooth lg:scrollbar-track-blackPrim lg:scrollbar-thumb-blackTert  lg:scrollbar-thumb-rounded-xl lg:scrollbar-thin text-Inter bg-black/95 text-whitePrim`}
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
      </main>

      <footer></footer>
    </div>
  );
}
