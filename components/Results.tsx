import React from "react";
import { Player, ResultProps } from "../interface/interfaces";
import styles from "../styles/Results.module.scss";

const Results = ({ players, newGame, restart }: ResultProps) => {
  players.sort((a: Player, b: Player) => {
    return b.score - a.score;
  });
  const results = players.slice(1);
  const tie = (element: Player) => element.score === players[0].score;
  const test = (prop: Player) => {
    if (prop.score === players[0].score) {
      return true;
    } else return false;
  };
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.winner}>
          <div>
            <p>
              {results.some(tie)
                ? "Its a Tie!!!"
                : `Player ${players[0].player} wins!`}
            </p>
          </div>
        </div>
        <div className={styles.tagLine}>
          <div>
            <p>Game over! Here are the results...</p>
          </div>
        </div>
        {players.map((player) => {
          return (
            <div
              key={player.player}
              className={
                test(player) ? styles.winnerHighLight : styles.playerResult
              }>
              <p>
                <span className={styles.winnerResults}>
                  Player {player.player}
                </span>
              </p>
              <p>{player.score} pairs</p>
            </div>
          );
        })}
        <div className={styles.buttons}>
          <button onClick={() => restart()}>Reset</button>
          <button onClick={() => newGame()}>New Game</button>
        </div>
      </div>
    </div>
  );
};

export default Results;
