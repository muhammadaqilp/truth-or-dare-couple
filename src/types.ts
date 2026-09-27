export type CardType = "truth" | "dare";

export type TruthCategory =
  | "fun"
  | "love"
  | "curious"
  | "deep"
  | "private"
  | "future"
  | "bold";

export type DareCategory =
  | "romantic"
  | "funny"
  | "acting"
  | "photo"
  | "confession"
  | "together"
  | "guess"
  | "flirty";

export type CardCategory = TruthCategory | DareCategory;

export interface Card {
  id: string;
  type: CardType;
  category: CardCategory;
  content: string;
  skippable?: boolean;
}

export interface Player {
  id: "p1" | "p2";
  name: string;
}

export interface Memory {
  id: string;
  cardId: string;
  type: CardType;
  category: CardCategory;
  prompt: string;
  player1Name: string;
  player1Answer?: string;
  player2Name: string;
  player2Answer?: string;
  dareCompleted?: boolean;
  note?: string;
  photoUri?: string;
  createdAt: string;
}

export type GameStatus = "not-started" | "playing" | "deck-empty";

export interface AppSettings {
  sound: boolean;
  haptics: boolean;
  reducedMotion: boolean;
}
