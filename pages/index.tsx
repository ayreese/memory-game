import type { NextPage } from "next";
import { useEffect, useState } from "react";
import GameBoard from "../components/GameBoard";
import GameSelection from "../components/GameSelection";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { GameSelections } from "../interface/interfaces";

const Home: NextPage = () => {
  const [value, setValue] = useLocalStorage<any>("game", {});
  const [status, setStatus] = useState(false);
  const result = () => {
    if (value.hasOwnProperty("theme")) setStatus(true);
  };

  useEffect(() => {
    result();
  }, []);

  return <>{status ? <GameBoard /> : <GameSelection />}</>;
};

export default Home;
