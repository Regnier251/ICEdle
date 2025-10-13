import type { GuessMatches, IceCreamFlavor, MatchStatus } from '../types/iceCream';

const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();

const compareExact = (guess: string, target: string): MatchStatus =>
  normalize(guess) === normalize(target) ? 'correct' : 'incorrect';

const compareTextPartial = (guess: string, target: string): MatchStatus => {
  if (compareExact(guess, target) === 'correct') return 'correct';
  const normalizedGuess = normalize(guess);
  const normalizedTarget = normalize(target);
  return normalizedGuess && normalizedTarget.includes(normalizedGuess) ? 'partial' : 'incorrect';
};

const compareYear = (guessYear: string, targetYear: string): MatchStatus => {
  if (!guessYear || !targetYear) return 'incorrect';
  if (compareExact(guessYear, targetYear) === 'correct') return 'correct';

  const guessNum = parseInt(guessYear, 10);
  const targetNum = parseInt(targetYear, 10);

  if (Number.isNaN(guessNum) || Number.isNaN(targetNum)) {
    return compareTextPartial(guessYear, targetYear);
  }

  const guessDecade = Math.floor(guessNum / 10) * 10;
  const targetDecade = Math.floor(targetNum / 10) * 10;
  return Math.abs(guessDecade - targetDecade) <= 10 ? 'partial' : 'incorrect';
};

export const compareFlavors = (guess: IceCreamFlavor, target: IceCreamFlavor): GuessMatches => ({
  name: compareExact(guess.name, target.name),
  base: guess.base === target.base ? 'correct' : 'incorrect',
  color: compareTextPartial(guess.color, target.color),
  country: compareTextPartial(guess.original_country, target.original_country),
  year: compareYear(guess.creation_year, target.creation_year),
});
