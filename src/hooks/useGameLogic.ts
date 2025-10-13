import { useState } from 'react';
import type { GuessResult, IceCreamFlavor } from '../types/iceCream';
import { compareFlavors } from '../utils/gameLogic';

type GameStatus = 'playing' | 'won';

export const useGameLogic = () => {
  const [targetFlavor, setTargetFlavor] = useState<IceCreamFlavor | null>(null);
  const [guesses, setGuesses] = useState<GuessResult[]>([]);
  const [status, setStatus] = useState<GameStatus>('playing');

  const resetGame = (flavor: IceCreamFlavor | null) => {
    setTargetFlavor(flavor);
    setGuesses([]);
    setStatus('playing');
  };

  const submitGuess = (flavor: IceCreamFlavor) => {
    if (!targetFlavor || status !== 'playing') return;

    const matches = compareFlavors(flavor, targetFlavor);
    const guessResult: GuessResult = { flavor, matches };

    setGuesses((prev) => {
      const next = [...prev, guessResult];
      if (matches.name === 'correct') {
        setStatus('won');
      }
      return next;
    });
  };

  return {
    targetFlavor,
    setTargetFlavor,
    guesses,
    status,
    submitGuess,
    resetGame,
  };
};

export type { GameStatus };
