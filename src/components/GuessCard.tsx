import type { GuessResult } from "../types/iceCream";

interface GuessCardProps {
  guess: GuessResult;
  index: number;
}

export const GuessCard: React.FC<GuessCardProps> = ({ guess}) => {
  const getBackgroundClass = (result: "correct" | "partial" | "incorrect") => {
    switch (result) {
      case "correct":
        return "bg-green-500 hover:shadow-green-400/30";
      case "partial":
        return "bg-yellow-500 hover:shadow-yellow-400/30";
      case "incorrect":
        return "bg-red-500  hover:shadow-red-400/30 ";
      default:
        return "bg-slate-50/80  hover:shadow-slate-400 ";
    }
  };

  return (
    <article>
      <div className="grid min-w-[38rem] md:min-w-[48rem] lg:min-w-[56rem] grid-cols-8 gap-6">
        {[
          { match: guess.matches.name, value: guess.flavor.name, delay: 0 },
          { match: guess.matches.base, value: guess.flavor.base, delay: 4 },
          { match: guess.matches.color, value: guess.flavor.color, delay: 8 },
          {
            match: guess.matches.origin,
            value: guess.flavor.origin,
            delay: 12,
            fallback: "Desconocido",
          },
          {
            match: guess.matches.flavor_intensity,
            value: guess.flavor.flavor_intensity,
            delay: 16,
          },
          { match: guess.matches.texture, value: guess.flavor.texture, delay: 20 },
          {
            match: guess.matches.mix_ins,
            value: guess.flavor.mix_ins,
            delay: 24,
            fallback: "Sin añadidos",
          },
          {
            match: guess.matches.seasonality,
            value: guess.flavor.seasonality,
            delay: 28,
          },
        ].map((item, idx) => {
          const rawValue = item.value ?? "";
          const displayValue =
            rawValue && rawValue.trim()
              ? rawValue
              : item.fallback ?? "—";

          return (
            <div
              key={idx}
              style={{ animationDelay: `${item.delay * 0.1}s` }}
              // all cards
              className={`h-24 animate-flip flex cursor-pointer items-center justify-center rounded-lg px-4 transition-all duration-200 border border-black hover:shadow-lg hover:-translate-y-0.5 text-white ${getBackgroundClass(
                item.match
              )}`}
            >
              <p className="text-base font-medium tracking-wider text-center">
                {displayValue}
              </p>
            </div>
          );
        })}
      </div>
    </article>
  );
};
