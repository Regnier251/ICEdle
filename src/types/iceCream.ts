export type IceCreamBase = 'Leche' | 'Agua' | 'Crema' | 'Leche o Agua';

export interface IceCreamFlavor {
  id: number;
  name: string;
  base: IceCreamBase;
  color: string;
  original_country: string;
  creation_year: string;
}

export type MatchStatus = 'correct' | 'partial' | 'incorrect';

export interface GuessMatches {
  name: MatchStatus;
  base: MatchStatus;
  color: MatchStatus;
  country: MatchStatus;
  year: MatchStatus;
}

export interface GuessResult {
  flavor: IceCreamFlavor;
  matches: GuessMatches;
}
