import { useCallback, useEffect, useMemo, useState } from 'react';
import { useGameLogic } from '../hooks/useGameLogic';
import { useSupabase } from '../hooks/useSupabase';
import type { IceCreamFlavor } from '../types/iceCream';
import { DailyStats } from './DailyStats';
import { FlavorInput } from './FlavorInput';
import { GuessCard } from './GuessCard';

export const GameBoard: React.FC = () => {
  const supabase = useSupabase();
  const { targetFlavor, setTargetFlavor, guesses, status, submitGuess } = useGameLogic();
  const [isLoadingFlavor, setIsLoadingFlavor] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchDailyFlavor = useCallback(async () => {
    setIsLoadingFlavor(true);
    setFetchError(null);
    const { data, error } = await supabase
      .from('ice_cream_flavors')
      .select('id, name, base, color, original_country, creation_year')
      .limit(1)
      .maybeSingle();

    if (error) {
      setFetchError('No pudimos cargar el sabor del día.');
      setTargetFlavor(null);
    } else if (data) {
      setTargetFlavor(data as IceCreamFlavor);
    } else {
      setTargetFlavor(null);
    }
    setIsLoadingFlavor(false);
  }, [supabase, setTargetFlavor]);

  useEffect(() => {
    void fetchDailyFlavor();
  }, [fetchDailyFlavor]);

  const totalGuesses = useMemo(() => guesses.length, [guesses.length]);

  const handleGuess = (flavor: IceCreamFlavor) => {
    submitGuess(flavor);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-10">
      <div className="flex flex-col gap-12">
        <header className="flex flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-ice-primary/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-ice-primary">
            Desafío Diario
          </span>
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">ICEdle</h1>
            <p className="mx-auto max-w-3xl text-sm text-slate-600 sm:text-base">
              Adivina el sabor de helado del día comparando sus atributos contra nuestra colección
              global. Cada intento revela pistas codificadas por color para acercarte al sabor
              correcto.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-slate-500">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 shadow-sm ring-1 ring-white/60">
              <span className="h-2 w-2 rounded-full bg-ice-correct" /> Coincidencia exacta
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 shadow-sm ring-1 ring-white/60">
              <span className="h-2 w-2 rounded-full bg-ice-partial" /> Coincidencia parcial
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 shadow-sm ring-1 ring-white/60">
              <span className="h-2 w-2 rounded-full bg-ice-incorrect" /> Sin coincidencia
            </span>
          </div>
        </header>

        <section className="grid gap-10 lg:grid-cols-[1.7fr,1fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                    Realiza un intento
                  </h2>
                  <p className="text-sm text-slate-600">
                    Tienes intentos ilimitados para descubrir el sabor oculto; explora todas las
                    combinaciones que necesites.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-100 px-4 py-2 text-center text-xs font-semibold uppercase tracking-widest text-slate-600">
                  Intentos realizados{' '}
                  <span className="ml-2 rounded-full bg-ice-primary/15 px-2 py-1 text-sm font-bold text-ice-primary">
                    {totalGuesses}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <FlavorInput
                  onSubmit={handleGuess}
                  disabled={isLoadingFlavor || !targetFlavor || status === 'won'}
                />
              </div>

              {fetchError && (
                <p className="mt-4 rounded-2xl bg-ice-incorrect/10 px-4 py-3 text-sm text-ice-incorrect">
                  {fetchError}
                </p>
              )}
              {status === 'won' && (
                <p className="mt-4 rounded-2xl bg-ice-correct/10 px-4 py-3 text-sm font-semibold text-ice-correct">
                  ¡Felicidades! Adivinaste el sabor del día.
                </p>
              )}
              {status !== 'won' && (
                <p className="mt-4 text-xs font-medium uppercase tracking-[0.3em] text-slate-400">
                  Sigue intentando, no hay límite de intentos.
                </p>
              )}

              <div className="mt-6 grid gap-3 rounded-2xl bg-slate-50/80 p-4 text-sm text-slate-600 sm:grid-cols-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ice-correct/15 text-ice-correct">
                    🟩
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">Exacto</p>
                    <p>El atributo coincide al 100% con el sabor objetivo.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ice-partial/20 text-ice-partial">
                    🟨
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">Cerca</p>
                    <p>Una característica relacionada o una década similar.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ice-incorrect/10 text-ice-incorrect">
                    🟥
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">Sin coincidencia</p>
                    <p>No existe relación aparente con el sabor objetivo.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {guesses.length === 0 && (
                <p className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-6 text-center text-sm text-slate-500">
                  Aún no registras intentos. Usa la búsqueda para seleccionar un sabor y comenzar.
                </p>
              )}
              {guesses.map((guess, index) => (
                <GuessCard key={`${guess.flavor.id}-${index}`} guess={guess} index={index} />
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <DailyStats />
            <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-lg backdrop-blur">
              <h3 className="text-lg font-semibold text-slate-900">Consejos rápidos</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>🎯 Busca primero sabores clásicos para calibrar los atributos.</li>
                <li>🌎 Observa el país de origen para descubrir pistas culturales.</li>
                <li>🕰️ Las décadas ayudan a aproximar recetas tradicionales o modernas.</li>
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
};
