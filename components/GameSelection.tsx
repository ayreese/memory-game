import Head from "next/head";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { GamePiece, GameSelections, Player } from "../interface/interfaces";
import { shuffle } from "../functions/shuffledPieces";
import { FourByFour, SixBySix } from "../functions/memoryPieces";

const GameSelection = () => {
  const [theme, setTheme] = useState<boolean>();
  const [players, setPlayers] = useState<Player[]>([]);
  const [grid, setGrid] = useState<GamePiece[]>();
  const [start, setStart] = useState(false);
  const [inPlay, setInPlay] = useState<GamePiece[]>([]);
  const [played, setPlayed] = useState<any[]>([]);
  const [turn, setTurn] = useState<number>(0);

  const [value, setValue] = useLocalStorage<GameSelections>("game", {});

  const startGame = () => {
    if (theme !== undefined && grid !== undefined && players.length > 0) {
      setValue((current) => {
        return {
          ...current,
          theme,
          players: [...players],
          grid,
          inPlay,
          played,
          turn,
        };
      });
      window.location.reload();
    }
  };

  // Func used to enable the start button
  // Disabling the button prevents loading game with missing data
  const verify = () => {
    if (theme !== undefined && grid !== undefined && players.length > 0) {
      setStart(true);
    }
  };
  // Checks verify as variables are being set
  useEffect(() => {
    verify();
  }, [theme, players, grid]);

  return (
    <div className="game-selection-container">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className="title">
            memory
        </div>
      <div className="card">
        <div className="selectionSection">
          <div>
            <p>Select Theme</p>
          </div>
          <div className="buttons">
            <button
              onClick={() => setTheme(true)}
              className={theme ? "selectedBtn" : ""}>
              Icons
            </button>
            <button
              onClick={() => setTheme(false)}
              className={theme === false ? "selectedBtn" : ""}>
              Numbers
            </button>
          </div>
        </div>
        <div className="selectionSection">
          <div>
            <p>Number of Players</p>
          </div>
          <div className="buttons">
            <button
              onClick={() => setPlayers([{ player: 1, score: 0 }])}
              className={players?.length === 1 ? "selectedBtn" : ""}>
              1
            </button>
            <button
              onClick={() =>
                setPlayers([
                  { player: 1, score: 0 },
                  { player: 2, score: 0 },
                ])
              }
              className={players?.length === 2 ? "selectedBtn" : ""}>
              2
            </button>
            <button
              onClick={() =>
                setPlayers([
                  { player: 1, score: 0 },
                  { player: 2, score: 0 },
                  { player: 3, score: 0 },
                ])
              }
              className={players?.length === 3 ? "selectedBtn" : ""}>
              3
            </button>
            <button
              onClick={() =>
                setPlayers([
                  { player: 1, score: 0 },
                  { player: 2, score: 0 },
                  { player: 3, score: 0 },
                  { player: 4, score: 0 },
                ])
              }
              className={players?.length === 4 ? "selectedBtn" : ""}>
              4
            </button>
          </div>
        </div>
        <div className="selectionSection">
          <div>
            <p>Grid Size</p>
          </div>
          <div className="buttons">
            <button
              onClick={() => setGrid(shuffle(FourByFour))}
              className={grid?.length === 16 ? "selectedBtn" : ""}>
              4x4
            </button>
            <button
              onClick={() => setGrid(shuffle(SixBySix))}
              className={grid?.length === 36 ? "selectedBtn" : ""}>
              6x6
            </button>
          </div>
        </div>
        <div className="selectionSection">
          <div className="buttons">
            <button
              onClick={() => startGame()}
              className={start === true ? "startBtn" : ""}>
              Start Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSelection;
