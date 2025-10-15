import { useMemo } from "react";
import type { IceCreamFlavor } from "../types/iceCream";

interface HintsSectionProps {
  targetFlavor: IceCreamFlavor | null;
  guessCount: number;
}

export const HintsSection: React.FC<HintsSectionProps> = ({
  targetFlavor,
  guessCount,
}) => {
  const hints = useMemo(() => {
    if (!targetFlavor) return [];

    return [
      {
        id: 1,
        unlockAt: 5,
        text: `Este helado es típico de la región de ${targetFlavor.original_country}.`,
      },
      {
        id: 2,
        unlockAt: 11,
        text: `Este sabor fue creado alrededor del ${targetFlavor.creation_year}.`,
      },
      {
        id: 3,
        unlockAt: 15,
        text: `La base principal de este helado es ${targetFlavor.base.toLowerCase()}.`,
      },
    ];
  }, [targetFlavor]);

  if (!targetFlavor) return null;

  return (
    <div className="flex justify-center">
      <div className="rounded-2xl border border-white/60 bg-white/80 p-4 backdrop-blur">
        <h2 className="mb-3 text-lg font-semibold text-slate-900">
          Pistas Disponibles
        </h2>
        <div className="space-y-2">
          {hints.map((hint) => (
            <div
              key={hint.id}
              className={`rounded-xl border p-3 transition-all duration-300 ${
                guessCount >= hint.unlockAt
                  ? "border-ice-primary/30 bg-white"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              {guessCount >= hint.unlockAt ? (
                <p className="text-sm text-slate-700">{hint.text}</p>
              ) : (
                <p className="text-sm text-slate-400">
                  Se desbloquea después de {hint.unlockAt} intentos
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
