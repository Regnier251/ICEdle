import type { GuessResult } from "../types/iceCream";

interface GuessCardProps {
  guess: GuessResult;
}

export const GuessCard: React.FC<GuessCardProps> = ({ guess }) => {
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
    <article className="p-4">
      <div className="grid grid-cols-5 gap-8">
        <div
          className={`flex cursor-pointer items-center justify-center rounded-lg p-3 transition-all duration-200 ${getBackgroundClass(
            guess.matches.name,
          )}`}
        >
          <p className="text-base font-medium">
            {guess.flavor.name || "Desconocido"}
          </p>
        </div>
        <div
          className={`flex cursor-pointer items-center justify-center rounded-lg p-3 transition-all duration-200 ${getBackgroundClass(
            guess.matches.color,
          )}`}
        >
          <p className="text-base font-medium">
            {guess.flavor.color || "Desconocido"}
          </p>
        </div>
        <div
          className={`flex cursor-pointer items-center justify-center rounded-lg p-3 transition-all duration-200 ${getBackgroundClass(
            guess.matches.base,
          )}`}
        >
          <p className="text-base font-medium">
            {guess.flavor.base || "Desconocido"}
          </p>
        </div>
        <div
          className={`flex cursor-pointer items-center justify-center rounded-lg p-3 transition-all duration-200 ${getBackgroundClass(
            guess.matches.country,
          )}`}
        >
          <p className="text-base font-medium">
            {guess.flavor.original_country || "Desconocido"}
          </p>
        </div>

        <div
          className={`flex cursor-pointer items-center justify-center rounded-lg p-3 transition-all duration-200 ${getBackgroundClass(
            guess.matches.year,
          )}`}
        >
          <p className="text-base font-medium">
            {guess.flavor.creation_year || "Desconocido"}
          </p>
        </div>
      </div>
    </article>
  );
};
