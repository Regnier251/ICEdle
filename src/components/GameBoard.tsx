import { useCallback, useEffect, useMemo, useState } from "react";
import { useGameLogic } from "../hooks/useGameLogic";
import { useSupabase } from "../hooks/useSupabase";
import type { IceCreamFlavor } from "../types/iceCream";
// import { DailyStats } from './DailyStats';
import { FlavorInput } from "./FlavorInput";
import { GuessCard } from "./GuessCard";
import { HintsSection } from "./HintsSection";

export const GameBoard: React.FC = () => {
  const supabase = useSupabase();
  const { targetFlavor, setTargetFlavor, guesses, status, submitGuess } =
    useGameLogic();
  const [isLoadingFlavor, setIsLoadingFlavor] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchDailyFlavor = useCallback(async () => {
    setIsLoadingFlavor(true);
    setFetchError(null);
    const { data, error } = await supabase
      .from("ice_cream_flavors")
      .select("id, name, base, color, original_country, creation_year")
      .limit(1)
      .maybeSingle();

    if (error) {
      setFetchError("No pudimos cargar el sabor del día.");
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
    <div className="mx-auto w-3/4 max-w-6xl px-4 py-6 sm:px-6 lg:px-10">
      <div className="flex flex-col gap-12">
        <header className="flex flex-col items-center gap-4 text-center">
          <div className="space-y-3">
            <div className="flex w-full justify-center">
              <img
                src="/public/image/ICEdle_title.png"
                alt="ICEdle Logo"
                className="mx-auto h-32 w-auto cursor-pointer object-contain transition-all duration-200 hover:scale-110 sm:h-40"
              />
            </div>
            <p className="mx-auto max-w-3xl text-sm text-slate-600 sm:text-base">
              Adivina el sabor de helado del día comparando sus atributos contra
              nuestra colección global. Cada intento revela pistas codificadas
              por color para acercarte al sabor correcto.
            </p>
          </div>
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
        </header>
        <section>
          <HintsSection targetFlavor={targetFlavor} guessCount={totalGuesses} />
        </section>
        <section className="grid gap-10 lg:grid-cols-[1.7fr,1fr]">
          <div className="relative">
            <div className="sticky top-4 z-50 mb-6">
              <div className="rounded-3xl border border-white/60 bg-white/95 p-6 shadow-xl backdrop-blur-md">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                      Realiza un intento
                    </h2>
                    <p className="text-sm text-slate-600">
                      Explora todas las combinaciones que necesites.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-100 px-4 py-2 text-center text-xs font-semibold tracking-widest text-slate-600 uppercase">
                    Intentos realizados{" "}
                    <span className="bg-ice-primary/15 text-ice-primary ml-2 rounded-full px-2 py-1 text-sm font-bold">
                      {totalGuesses}
                    </span>
                  </div>
                </div>
                {/* Input component */}
                <div className="mt-6">
                  <FlavorInput
                    onSubmit={handleGuess}
                    disabled={
                      isLoadingFlavor || !targetFlavor || status === "won"
                    }
                  />
                </div>

                {fetchError && (
                  <p className="bg-ice-incorrect/10 text-ice-incorrect mt-4 rounded-2xl px-4 py-3 text-sm">
                    {fetchError}
                  </p>
                )}
                {status === "won" && (
                  <p className="bg-ice-correct/10 text-ice-correct mt-4 rounded-2xl px-4 py-3 text-sm font-semibold">
                    ¡Felicidades! Adivinaste el sabor del día.
                  </p>
                )}
              </div>
            </div>

            {/* Headers de atributos */}
            <div className="mb-6 grid grid-cols-5 gap-4 text-center">
              <div className="transaction-all cursor-pointer rounded-xl bg-white/80 p-3 shadow-sm backdrop-blur duration-200 hover:scale-110">
                <span className="text-sm font-semibold tracking-wider text-slate-600 uppercase">
                  Nombre
                </span>
              </div>
              <div className="transaction-all cursor-pointer rounded-xl bg-white/80 p-3 shadow-sm backdrop-blur duration-200 hover:scale-110">
                <span className="text-sm font-semibold tracking-wider text-slate-600 uppercase">
                  Color
                </span>
              </div>
              <div className="transaction-all cursor-pointer rounded-xl bg-white/80 p-3 shadow-sm backdrop-blur duration-200 hover:scale-110">
                <span className="text-sm font-semibold tracking-wider text-slate-600 uppercase">
                  Base
                </span>
              </div>
              <div className="transaction-all cursor-pointer rounded-xl bg-white/80 p-3 shadow-sm backdrop-blur duration-200 hover:scale-110">
                <span className="text-sm font-semibold tracking-wider text-slate-600 uppercase">
                  Origen
                </span>
              </div>
              <div className="transaction-all cursor-pointer rounded-xl bg-white/80 p-3 shadow-sm backdrop-blur duration-200 hover:scale-110">
                <span className="text-sm font-semibold tracking-wider text-slate-600 uppercase">
                  Año
                </span>
              </div>
            </div>

            {/* Historial de intentos */}
            <div className="relative flex flex-col-reverse gap-4">
              {guesses.length === 0 && (
                <p className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-6 text-center text-sm text-slate-500">
                  Aún no registras intentos. Usa la búsqueda para seleccionar un
                  sabor y comenzar.
                </p>
              )}
              {guesses.map((guess, index) => (
                <div
                  key={`${guess.flavor.id}-${index}`}
                  className=""
                  style={{
                    transform: `translateY(${(guesses.length - index - 1) * -4}px)`,
                    zIndex: guesses.length - index,
                  }}
                >
                  <GuessCard guess={guess} />
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            {/* <DailyStats />
            <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-lg backdrop-blur">
              <h3 className="text-lg font-semibold text-slate-900">Consejos rápidos</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>🎯 Busca primero sabores clásicos para calibrar los atributos.</li>
                <li>🌎 Observa el país de origen para descubrir pistas culturales.</li>
                <li>🕰️ Las décadas ayudan a aproximar recetas tradicionales o modernas.</li>
              </ul>
            </div> */}
          </aside>
        </section>
      </div>
    </div>
  );
};
