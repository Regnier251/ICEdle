import { useMemo, useState } from "react";
import type { GuessResult, IceCreamFlavor } from "../types/iceCream";
import { compareFlavors, generateHints, getNextHintInfo } from "../utils/gameLogic";

type GameStatus = "playing" | "won";

export const useGameLogic = () => {
  const [targetFlavor, setTargetFlavor] = useState<IceCreamFlavor | null>(null);
  const [guesses, setGuesses] = useState<GuessResult[]>([]);
  const [status, setStatus] = useState<GameStatus>("playing");

  const submitGuess = (flavor: IceCreamFlavor) => {
    if (!targetFlavor || status !== "playing") return;

    const matches = compareFlavors(flavor, targetFlavor);
    const guessResult: GuessResult = { flavor, matches };

    setGuesses((prev) => {
      const next = [...prev, guessResult];
      if (matches.name === "correct") {
        setStatus("won");
      }
      return next;
    });
  };

  const availableHints = useMemo(() => {
    if (!targetFlavor) return [];
    return generateHints(targetFlavor, guesses.length);
  }, [targetFlavor, guesses.length]);

  const nextHintInfo = useMemo(() => {
    return getNextHintInfo(guesses.length);
  }, [guesses.length]);

  return {
    targetFlavor,
    setTargetFlavor,
    guesses,
    status,
    submitGuess,
    availableHints,
    nextHintInfo,
  };
};

export type { GameStatus };
