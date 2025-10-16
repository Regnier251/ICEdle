import { useMemo, useState } from "react";
import type { IceCreamFlavor } from "../types/iceCream";

interface HintsSectionProps {
  targetFlavor: IceCreamFlavor | null;
  guessCount: number;
}

export const HintsSection: React.FC<HintsSectionProps> = ({
  targetFlavor,
  guessCount,
}) => {
  const [revealedHints, setRevealedHints] = useState<number[]>([]);

  const hints = useMemo(() => {
    if (!targetFlavor) return [];

    return [
      {
        id: 1,
        unlockAt: 5,
        text: `Este helado tiene un sabor de ${targetFlavor.flavor_intensity.toLowerCase()}.`,
        icon: '🌟',
        type: 'flavor',
        isRevealed: revealedHints.includes(1)
      },
      {
        id: 2,
        unlockAt: 11,
        text: `La textura del helado es ${targetFlavor.texture.toLowerCase()}.`,
        icon: '🍨',
        type: 'texture',
        isRevealed: revealedHints.includes(2)
      },
      {
        id: 3,
        unlockAt: 15,
        text: `Este helado es típico de ${targetFlavor.seasonality.toLowerCase()}.`,
        icon: '🗓️',
        type: 'season',
        isRevealed: revealedHints.includes(3)
      },
    ];
  }, [targetFlavor, revealedHints]);

  const handleRevealHint = (hintId: number) => {
    if (!revealedHints.includes(hintId)) {
      setRevealedHints((prev) => [...prev, hintId]);
    }
  };

  if (!targetFlavor) return null;

  return (
    <div className="flex justify-center">
      <div className="rounded-2xl border border-white/60 bg-white/80 p-4 backdrop-blur">
        <h2 className="mb-3 text-lg font-semibold text-slate-900 text-center">
          Pistas Disponibles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {hints.map((hint) => (
            <div
              key={hint.id}
              onClick={() => guessCount >= hint.unlockAt && !hint.isRevealed && handleRevealHint(hint.id)}
              className={`rounded-xl border p-4 transition-all duration-300 ${
                guessCount >= hint.unlockAt
                  ? hint.isRevealed
                    ? "border-cyan-500 bg-white cursor-default"
                    : "border-cyan-500 bg-white/90 cursor-pointer hover:bg-white"
                  : "border-slate-200 bg-slate-50 cursor-not-allowed"
              }`}
            >
              {guessCount >= hint.unlockAt ? (
                <div className={`space-y-2 ${!hint.isRevealed && 'filter blur-sm hover:blur-none transition-all duration-300'}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-xl" role="img" aria-label={hint.type}>
                      {hint.icon}
                    </span>
                    <span className="text-sm font-medium text-slate-500">
                      {hint.type === 'flavor' ? 'Sabor' : hint.type === 'texture' ? 'Textura' : 'Temporada'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700">
                    {hint.text}
                  </p>
                  {!hint.isRevealed && (
                    <p className="text-xs text-cyan-600 text-center mt-2">
                      Click para revelar
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 opacity-50">
                    <span className="text-xl">🔒</span>
                    <span className="text-sm font-medium text-slate-500">Bloqueado</span>
                  </div>
                  <p className="text-sm text-slate-400">
                    Se desbloquea después de {hint.unlockAt} intentos
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-slate-500">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 shadow-sm ring-1 ring-white/60">
              <span className="h-2 w-2 rounded-full bg-green-500" />{" "}
              Coincidencia exacta
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 shadow-sm ring-1 ring-white/60">
              <span className="h-2 w-2 rounded-full bg-yellow-500" />{" "}
              Coincidencia parcial
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 shadow-sm ring-1 ring-white/60">
              <span className="h-2 w-2 rounded-full bg-red-500" /> Sin
              coincidencia
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
