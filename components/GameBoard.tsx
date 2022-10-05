import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/GameBoard.module.scss";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { GamePiece, GameSelections, Player } from "../interface/interfaces";
import { isPiece, playerToCheck } from "../functions/shuffledPieces";
import Results from "./Results";

const GameBoard = () => {
  const [value, setValue] = useLocalStorage<GameSelections>("game", {});
  const [theme, setTheme] = useState<boolean>(value.theme!);
  const [turn, setTurn] = useState<number>(value.turn!);
  const [grid, setGrid] = useState<GamePiece[]>(value.grid!);
  const [inPlay, setInPlay] = useState<GamePiece[]>(value.inPlay!);
  const [played, setPlayed] = useState<any[]>(value.played!);
  const [players, setPlayers] = useState<any[]>(value.players!);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(players![turn]);
  const [gameOver, setGameOver] = useState(false);

  const endGame = () => {
    if (grid.length === played.length) {
      setGameOver(true);
    }
  };

  const newGame = () => {
    setValue({});
    window.location.reload();
  };

  const restart = () => {
    setValue(value);
    window.location.reload();
  };

  const tally = () => {
    if (inPlay?.length > 1) {
      if (inPlay![0].num === inPlay![1].num) {
        setPlayers((current) => {
          return current.map((item) => {
            if (item.player === currentPlayer.player) {
              console.log("ITEM AND CURRENT", item, currentPlayer);
              return { ...item, score: item.score! + 1 };
            } else return item;
          });
        });
        setPlayed([...played, ...inPlay]);
        setInPlay([]);
        // Persist data through refresh
        // setValue((current) => {
        //   return {
        //     ...current,
        //     theme,
        //     players: [...players],
        //     grid,
        //     inPlay,
        //     played: [...played],
        //     turn,
        //   };
        // });
      } else {
        console.log(players);
        setTimeout(() => {
          setInPlay((current) => {
            return [];
          });
          const nextPlayer = playerToCheck(players, currentPlayer);
          const last = players.length - 1;
          if (nextPlayer === last) {
            setTurn(0);
            setCurrentPlayer(players[turn]);
          } else {
            setTurn((current) => current + 1);
            setCurrentPlayer(players[turn]);
          }
        }, 500);
      }
    }
  };

  const round = (prop: GamePiece) => {
    // const check returns boolean to see if the current piece matches piece being pushed
    const checkInPlay = isPiece(prop, inPlay!);
    const checkPlayed = isPiece(prop, played);
    if (checkInPlay || checkPlayed) {
    } else {
      setInPlay((current) => {
        return [...current, prop];
      });
    }
  };

  useEffect(() => {
    tally();
    setCurrentPlayer(players[turn]);
  }, [[...inPlay]]);

  useEffect(() => {
    endGame();
  }, [[...played]]);

  return (
    <div className={styles.container}>
      {gameOver && (
        <Results players={players} newGame={newGame} restart={restart} />
      )}
      <div className={styles.optionSection}>
        <div className={styles.title}>Memory</div>
        <div className={styles.selectButtons}>
          <button onClick={() => restart()}>Restart</button>
          <button onClick={() => newGame()}>New Game</button>
        </div>
      </div>
      <div className={grid?.length! < 36 ? styles.fourByFour : styles.sixBySix}>
        {grid?.map((btn: GamePiece) => {
          const pieceInPlay = inPlay!.some((item) => item === btn);
          const piecePlayed = played!.some((item) => item === btn);
          if (theme) {
            return (
              <button
                className={
                  inPlay!.some((item) => item === btn)
                    ? styles.inPlay
                    : "" || played!.some((item) => item === btn)
                    ? styles.played
                    : ""
                }
                key={btn.index}
                onClick={() => {
                  console.log(players), round(btn);
                }}>
                {inPlay!.some((item) => item === btn) && (
                  <img src={btn.icon} alt="" />
                )}
                {(inPlay!.some((item) => item === btn) && (
                  <img src={btn.icon} alt="" />
                )) ||
                  (played!.some((item) => item === btn) && (
                    <img src={btn.icon} alt="" />
                  ))}
              </button>
            );
          } else {
            return (
              <button
                key={btn.index}
                className={
                  inPlay!.some((item) => item === btn)
                    ? styles.inPlay
                    : "" || played!.some((item) => item === btn)
                    ? styles.played
                    : ""
                }
                onClick={() => {
                  round(btn);
                }}>
                {(pieceInPlay && btn.num) || (piecePlayed && btn.num)}
              </button>
            );
          }
        })}
      </div>
      <div className={styles.players}>
        {players?.map((player) => {
          return (
            <div
              key={player.player}
              className={
                player === currentPlayer ? styles.currentPlayer : styles.player
              }>
              <div className={styles.desktop}>
                <p>Player {player.player}</p>
                <p>{player.score}</p>
              </div>
              <div className={styles.mobile}>
                <p>P {player.player}</p>
              </div>
              {player === currentPlayer && (
                <p className={styles.currentTurn}>current turn</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameBoard;
