// Context not currently being used to pass any data
// Will use for game variables later

import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  GameProviderProps,
  GameSelections,
  StoredGameContext,
} from "../interface/interfaces";

const GameContext = createContext({} as StoredGameContext);

export const useGame = () => useContext(GameContext);

export const GameContextProvider = ({ children }: GameProviderProps) => {
  const [value, setValue] = useLocalStorage("game", {});
  const getItems = () => {};

  return (
    <GameContext.Provider
      value={{
        getItems,
      }}>
      {" "}
      {children}
    </GameContext.Provider>
  );
};
