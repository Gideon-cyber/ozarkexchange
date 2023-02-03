import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div
      className={`h-screen font-space snap-y snap-mandatory overflow-y-scroll overflow-x-hidden z-0 scroll-smooth lg:scrollbar lg:scrollbar-track-gray-400/20 lg:scrollbar-thumb-purple/80 text-Inter bg-blackPrim`}
    >
      <Head>
        <title>Ozarkexchange</title>
        <meta
          name="description"
          content="DApp for instant Cryptocurrency Exchange"
        />
      </Head>

      <main></main>

      <footer></footer>
    </div>
  );
}
