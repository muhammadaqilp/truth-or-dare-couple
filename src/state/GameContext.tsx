import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { CARDS } from "../data/cards";
import { storage } from "../lib/storage";
import type { Card, Memory, Player } from "../types";

export type Stage =
  | "deck"
  | "flipping"
  | "card"
  | "truth-answer"
  | "handover"
  | "reveal-answers"
  | "dare-action"
  | "deck-empty";

interface GameState {
  player1: Player;
  player2: Player;
  currentTurn: "p1" | "p2";
  usedCardIds: string[];
  currentCard: Card | null;
  stage: Stage;
  answeringAs: "p1" | "p2" | null;
  p1Answer: string;
  p2Answer: string;
}

function otherOf(p: "p1" | "p2"): "p1" | "p2" {
  return p === "p1" ? "p2" : "p1";
}

function pickRandomCard(usedIds: string[]): Card | null {
  const used = new Set(usedIds);
  const available = CARDS.filter((c) => !used.has(c.id));
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
}

const initialState: GameState = {
  player1: { id: "p1", name: "" },
  player2: { id: "p2", name: "" },
  currentTurn: "p1",
  usedCardIds: [],
  currentCard: null,
  stage: "deck",
  answeringAs: null,
  p1Answer: "",
  p2Answer: "",
};

interface GameContextValue {
  state: GameState;
  cardsRemaining: number;
  totalCards: number;
  currentPlayer: Player;
  answeringPlayer: Player | null;
  setPlayers: (p1Name: string, p2Name: string) => void;
  loadSavedPlayers: () => boolean;
  drawCard: () => void;
  finishFlip: () => void;
  startTruthAnswer: () => void;
  submitAnswer: (text: string) => void;
  confirmHandover: () => void;
  completeReveal: () => Memory | null;
  completeDare: (completed: boolean, note?: string) => Memory | null;
  nextTurn: () => void;
  resetDeck: () => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(initialState);

  const setPlayers = useCallback((p1Name: string, p2Name: string) => {
    const player1: Player = { id: "p1", name: p1Name.trim() };
    const player2: Player = { id: "p2", name: p2Name.trim() };
    storage.setPlayers([player1, player2]);
    setState((s) => ({ ...s, player1, player2 }));
  }, []);

  const loadSavedPlayers = useCallback(() => {
    const saved = storage.getPlayers();
    if (saved) {
      setState((s) => ({ ...s, player1: saved[0], player2: saved[1] }));
      return true;
    }
    return false;
  }, []);

  const drawCard = useCallback(() => {
    setState((s) => {
      const card = pickRandomCard(s.usedCardIds);
      if (!card) {
        return { ...s, stage: "deck-empty" };
      }
      return { ...s, currentCard: card, stage: "flipping", answeringAs: s.currentTurn, p1Answer: "", p2Answer: "" };
    });
  }, []);

  const finishFlip = useCallback(() => {
    setState((s) => ({
      ...s,
      stage: "card",
      usedCardIds: s.currentCard ? [...s.usedCardIds, s.currentCard.id] : s.usedCardIds,
    }));
  }, []);

  const startTruthAnswer = useCallback(() => {
    setState((s) => ({ ...s, stage: s.currentCard?.type === "dare" ? "dare-action" : "truth-answer" }));
  }, []);

  const submitAnswer = useCallback((text: string) => {
    setState((s) => {
      const isFirst = s.answeringAs === s.currentTurn;
      if (isFirst) {
        const patch = s.answeringAs === "p1" ? { p1Answer: text } : { p2Answer: text };
        return { ...s, ...patch, stage: "handover", answeringAs: otherOf(s.answeringAs as "p1" | "p2") };
      }
      const patch = s.answeringAs === "p1" ? { p1Answer: text } : { p2Answer: text };
      return { ...s, ...patch, stage: "reveal-answers" };
    });
  }, []);

  const confirmHandover = useCallback(() => {
    setState((s) => ({ ...s, stage: "truth-answer" }));
  }, []);

  const completeReveal = useCallback((): Memory | null => {
    if (!state.currentCard) return null;
    const memory: Memory = {
      id: `mem-${Date.now()}`,
      cardId: state.currentCard.id,
      type: state.currentCard.type,
      category: state.currentCard.category,
      prompt: state.currentCard.content,
      player1Name: state.player1.name,
      player1Answer: state.p1Answer,
      player2Name: state.player2.name,
      player2Answer: state.p2Answer,
      createdAt: new Date().toISOString(),
    };
    storage.addMemory(memory);
    return memory;
  }, [state]);

  const completeDare = useCallback(
    (completed: boolean, note?: string): Memory | null => {
      if (!state.currentCard) return null;
      const memory: Memory = {
        id: `mem-${Date.now()}`,
        cardId: state.currentCard.id,
        type: state.currentCard.type,
        category: state.currentCard.category,
        prompt: state.currentCard.content,
        player1Name: state.player1.name,
        player2Name: state.player2.name,
        dareCompleted: completed,
        note,
        createdAt: new Date().toISOString(),
      };
      storage.addMemory(memory);
      return memory;
    },
    [state],
  );

  const nextTurn = useCallback(() => {
    setState((s) => ({
      ...s,
      currentTurn: otherOf(s.currentTurn),
      currentCard: null,
      stage: s.usedCardIds.length >= CARDS.length ? "deck-empty" : "deck",
      answeringAs: null,
      p1Answer: "",
      p2Answer: "",
    }));
  }, []);

  const resetDeck = useCallback(() => {
    setState((s) => ({
      ...s,
      usedCardIds: [],
      currentCard: null,
      stage: "deck",
      answeringAs: null,
      p1Answer: "",
      p2Answer: "",
    }));
  }, []);

  const currentPlayer = state.currentTurn === "p1" ? state.player1 : state.player2;
  const answeringPlayer = state.answeringAs
    ? state.answeringAs === "p1"
      ? state.player1
      : state.player2
    : null;

  const value = useMemo<GameContextValue>(
    () => ({
      state,
      cardsRemaining: CARDS.length - state.usedCardIds.length,
      totalCards: CARDS.length,
      currentPlayer,
      answeringPlayer,
      setPlayers,
      loadSavedPlayers,
      drawCard,
      finishFlip,
      startTruthAnswer,
      submitAnswer,
      confirmHandover,
      completeReveal,
      completeDare,
      nextTurn,
      resetDeck,
    }),
    [
      state,
      currentPlayer,
      answeringPlayer,
      setPlayers,
      loadSavedPlayers,
      drawCard,
      finishFlip,
      startTruthAnswer,
      submitAnswer,
      confirmHandover,
      completeReveal,
      completeDare,
      nextTurn,
      resetDeck,
    ],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
