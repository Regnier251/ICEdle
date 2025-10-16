import type { GuessResult } from "../types/iceCream";

interface GuessCardProps {
  guess: GuessResult;
  index: number;
}

export const GuessCard: React.FC<GuessCardProps> = ({ guess}) => {
  const getBackgroundClass = (result: "correct" | "partial" | "incorrect") => {
    switch (result) {
      case "correct":
        return "bg-green-500 text-white hover:shadow-lg hover:shadow-green-400/30 hover:-translate-y-0.5";
      case "partial":
        return "bg-yellow-500 text-slate-900 hover:shadow-lg hover:shadow-yellow-400/30 hover:-translate-y-0.5";
      case "incorrect":
        return "bg-red-500 text-white hover:shadow-lg hover:shadow-red-400/30 hover:-translate-y-0.5";
      default:
        return "bg-slate-50/80 text-slate-900 hover:shadow-lg hover:shadow-slate-400 hover:-translate-y-0.5";
    }
  };

  return (
    <article>
      <div className="grid grid-cols-8 gap-6 min-w-5xl">
        {[
          { match: guess.matches.name, value: guess.flavor.name, delay: 0 },
          { match: guess.matches.base, value: guess.flavor.base, delay: 4 },
          { match: guess.matches.color, value: guess.flavor.color, delay: 8 },
          { match: guess.matches.origin, value: guess.flavor.origin, delay: 12 },
          { match: guess.matches.flavor_intensity, value: guess.flavor.flavor_intensity, delay: 16 },
          { match: guess.matches.texture, value: guess.flavor.texture, delay: 20 },
          { match: guess.matches.mix_ins, value: guess.flavor.mix_ins, delay: 24 },
          { match: guess.matches.seasonality, value: guess.flavor.seasonality, delay: 28 }
        ].map((item, idx) => (
          <div
            key={idx}
            style={{ animationDelay: `${item.delay * 0.1}s` }}
            className={`h-24 animate-flip flex cursor-pointer items-center justify-center rounded-lg px-4 transition-all duration-200 ${getBackgroundClass(
              item.match
            )}`}
          >
            <p className="text-base font-medium">
              {item.value || "—"}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
};
