import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import GameBoard from "../components/GameBoard";
import GameSelection from "../components/GameSelection";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { GameSelections } from "../interface/interfaces";

const Home: NextPage = () => {
    const newLocal = "viewport";

  const [value, setValue] = useLocalStorage<any>("game", {});
  const [status, setStatus] = useState(false);
  const result = () => {
    if (value.hasOwnProperty("theme")) setStatus(true);
  };

  useEffect(() => {
    result();
  }, []);

  return <>
  <Head>
      <meta name={newLocal} content="width=device-width, initial-scale=1.0" />
      <title>Memory</title>
  </Head>
  {status ? <GameBoard /> : <GameSelection />}</>;
};

export default Home;
