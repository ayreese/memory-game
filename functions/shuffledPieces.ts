import { GamePiece, GameSelections, Player } from "../interface/interfaces";

// Function used randomize game pieces & add an index
// Index will act as ID to avoid calculating duplicates
export const shuffle = (props: GamePiece[]): GamePiece[] => {
  const deck = new Set<GamePiece>();
  const pieces = [...props];
  for (let i = 0; pieces.length > 0; ) {
    const randomNumber = Math.floor(Math.random() * props.length);
    if (pieces[randomNumber] !== undefined) {
      deck.add({ index: i, ...pieces[randomNumber] });
      i++;
      pieces.splice(randomNumber, 1);
    }
  }
  const newDeck = [...deck];
  return newDeck;
};

// Function used to get keep track of players turn
// Will be used to switch players after failed match
export const playerToCheck = (players: Player[], currentPlayer: Player) => {
  const nextTurn = players?.findIndex(
    (element: Player) => element.player === currentPlayer?.player,
  );
  return nextTurn;
};
// Function returns boolean to see if the current piece matches piece being pushed
// It's used to avoid calculating a point for duplicate pieces
export const isPiece = (prop: GamePiece, inPlay: GamePiece[]) => {
  const found = inPlay.some((item) => item.index == prop.index);
  return found;
};
