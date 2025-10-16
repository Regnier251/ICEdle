export interface IceCreamFlavor {
  id: number;
  name: string;
  base: string;
  color: string;
  origin: string;
  flavor_intensity: string;
  texture: string;
  mix_ins: string;
  seasonality: string;
}

export type MatchStatus = "correct" | "partial" | "incorrect";

export interface GuessMatches {
  name: MatchStatus;
  base: MatchStatus;
  color: MatchStatus;
  origin: MatchStatus;
  flavor_intensity: MatchStatus;
  texture: MatchStatus;
  mix_ins: MatchStatus;
  seasonality: MatchStatus;
}

export interface GuessResult {
  flavor: IceCreamFlavor;
  matches: GuessMatches;
}
