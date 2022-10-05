import { ReactNode } from "react";

export interface GamePiece {
  index?: number;
  num: number;
  icon: any;
}

export interface GamePieces {
  items: GamePiece[];
}

export type FormValues = {
  theme: string;
  players: number;
  grid: string;
};

export type GameProviderProps = {
  children: ReactNode;
};

export type StoredGameContext = {
  getItems: (product: any) => void;
};

export interface GameSelections {
  theme?: boolean;
  players?: Player[];
  grid?: GamePiece[];
  inPlay?: GamePiece[];
  played?: GamePiece[];
  turn?: number;
}

export interface Player {
  player: number;
  score: number;
}

export interface ResultProps {
  players: Player[];
  newGame: () => void;
  restart: () => void;
}
