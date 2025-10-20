import type {
  GuessMatches,
  IceCreamFlavor,
  MatchStatus,
} from "../types/iceCream";

export interface Hint {
  id: number;
  unlockAt: number;
  text: string;
  icon: string;
  type: 'flavor' | 'texture' | 'season';
  isUnlocked: boolean;
}

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();

const compareExact = (guess: string, target: string): MatchStatus =>
  normalize(guess) === normalize(target) ? "correct" : "incorrect";

const compareTextPartial = (guess: string, target: string): MatchStatus => {
  if (compareExact(guess, target) === "correct") return "correct";
  const normalizedGuess = normalize(guess);
  const normalizedTarget = normalize(target);
  return normalizedGuess && normalizedTarget.includes(normalizedGuess)
    ? "partial"
    : "incorrect";
};

export const generateHints = (
  flavor: IceCreamFlavor,
  guessCount: number
): Hint[] => {
  const formatIntensity = (intensity: string) => {
    return `${intensity.toLowerCase()} intensidad`;
  };

  const formatTexture = (texture: string) => {
    return `textura ${texture.toLowerCase()}`;
  };

  const hints: Hint[] = [
    {
      id: 1,
      unlockAt: 5,
      type: 'flavor',
      icon: '🌟',
      text: `Este helado tiene un sabor de ${formatIntensity(flavor.flavor_intensity)}.`,
      isUnlocked: guessCount >= 5
    },
    {
      id: 2,
      unlockAt: 11,
      type: 'texture',
      icon: '🍨',
      text: `La textura del helado es ${formatTexture(flavor.texture)}.`,
      isUnlocked: guessCount >= 11
    },
    {
      id: 3,
      unlockAt: 15,
      type: 'season',
      icon: '🗓️',
      text: `Este helado es típico de ${flavor.seasonality.toLowerCase()}.`,
      isUnlocked: guessCount >= 15
    }
  ];

  return hints;
};

export const getNextHintInfo = (guessCount: number): { attemptsUntilNext: number; nextUnlockAt: number | null } => {
  const unlockThresholds = [5, 11, 15];
  const nextThreshold = unlockThresholds.find(threshold => threshold > guessCount);
  
  return {
    attemptsUntilNext: nextThreshold ? nextThreshold - guessCount : 0,
    nextUnlockAt: nextThreshold || null
  };
};

export const compareFlavors = (
  guess: IceCreamFlavor,
  target: IceCreamFlavor,
): GuessMatches => ({
  name: compareExact(guess.name, target.name),
  base: compareExact(guess.base, target.base),
  color: compareTextPartial(guess.color, target.color),
  origin: compareTextPartial(guess.origin, target.origin),
  flavor_intensity: compareExact(guess.flavor_intensity, target.flavor_intensity),
  texture: compareExact(guess.texture, target.texture),
  mix_ins: compareTextPartial(guess.mix_ins, target.mix_ins),
  seasonality: compareExact(guess.seasonality, target.seasonality)
});
