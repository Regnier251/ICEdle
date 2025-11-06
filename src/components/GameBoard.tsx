import { useCallback, useEffect, useMemo, useState } from "react";
import { useGameLogic } from "../hooks/useGameLogic";
import { useSupabase } from "../hooks/useSupabase";
import type { IceCreamFlavor } from "../types/iceCream";
import { DAILY_FLAVOR_KEY, DAY_IN_MS } from "../utils/constants";
import { FlavorInput } from "./FlavorInput";
import { GuessCard } from "./GuessCard";
import { HintsSection } from "./HintsSection";

export const GameBoard: React.FC = () => {
  const supabase = useSupabase();
  const { targetFlavor, setTargetFlavor, guesses, status, submitGuess } =
    useGameLogic();
  const [isLoadingFlavor, setIsLoadingFlavor] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const usedFlavorIds = useMemo(
    () => guesses.map((guess) => guess.flavor.id),
    [guesses],
  );

  const fetchDailyFlavor = useCallback(async () => {
    setIsLoadingFlavor(true);
    setFetchError(null);

    const selectFields =
      "id, name, base, color, origin, flavor_intensity, texture, mix_ins, seasonality";

    let storedFlavorId: number | null = null;
    if (typeof window !== "undefined") {
      try {
        const storedValue = window.localStorage.getItem(DAILY_FLAVOR_KEY);
        if (storedValue) {
          const { flavorId, timestamp } = JSON.parse(storedValue) as {
            flavorId: number;
            timestamp: number;
          };
          if (Date.now() - timestamp < DAY_IN_MS) {
            storedFlavorId = flavorId;
          } else {
            window.localStorage.removeItem(DAILY_FLAVOR_KEY);
          }
        }
      } catch (storageError) {
        console.error("Failed to read stored daily flavor", storageError);
        window.localStorage.removeItem(DAILY_FLAVOR_KEY);
      }
    }

    let selectedFlavor: IceCreamFlavor | null = null;
    let encounteredError = false;

    if (storedFlavorId) {
      const { data, error } = await supabase
        .from("ice_cream_flavors")
        .select(selectFields)
        .eq("id", storedFlavorId)
        .maybeSingle();

      if (data) {
        selectedFlavor = data as IceCreamFlavor;
      } else {
        encounteredError = Boolean(error);
        if (typeof window !== "undefined") {
          window.localStorage.removeItem(DAILY_FLAVOR_KEY);
        }
      }
    }

    if (!selectedFlavor) {
      // RPC supabase function
      const { data, error } = await supabase
        .rpc('get_random_ice_cream')
        .select(selectFields)
        .maybeSingle();

      if (error) {
        console.error('Error fetching random ice cream via RPC:', error);
        encounteredError = true;
      } else if (data) {
        selectedFlavor = data as IceCreamFlavor;
        if (typeof window !== "undefined") {
          window.localStorage.setItem(
            DAILY_FLAVOR_KEY,
            JSON.stringify({
              flavorId: selectedFlavor.id,
              timestamp: Date.now(),
            }),
          );
        }
      } else {
        encounteredError = true;
      }
    }

    if (!selectedFlavor || encounteredError) {
      setFetchError("No pudimos cargar el sabor del día.");
      setTargetFlavor(null);
    } else {
      setTargetFlavor(selectedFlavor);
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

  const headers = [
    "Name",
    "Base",
    "Color",
    "Origin",
    "Intensity",
    "Texture",
    "Mix-ins",
    "Season",
  ];

  const headerClass =
    "h-12 flex items-center justify-center transition-all cursor-pointer rounded-xl bg-white/80 px-4 shadow-sm backdrop-blur duration-200 hover:scale-110";
  const textClass =
    "text-sm font-semibold tracking-wider uppercase";

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:w-3/4 lg:px-10">
      <div className="flex flex-col gap-12">
        <header className="flex flex-col items-center gap-4 text-center">
          <div className="space-y-3">
            <div className="flex w-full justify-center">
              <img
                src="/image/ICEdle_title.png"
                alt="ICEdle Logo"
                className="mx-auto h-32 w-auto cursor-pointer object-contain transition-all duration-200 hover:scale-110 sm:h-40"
              />
            </div>
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
                  <div className="hidden sm:block">
                  </div>
                  <div className="rounded-2xl bg-slate-100 px-4 text-center text-xs font-semibold tracking-widest text-slate-600 uppercase">
                    Intentos realizados{" "}
                    <span className="ml-2 rounded-full px-2 py-1 text-sm font-bold">
                      {totalGuesses}
                    </span>
                  </div>
                </div>
                {/* Input component */}
                  <FlavorInput
                    onSubmit={handleGuess}
                    usedFlavorIds={usedFlavorIds}
                    disabled={
                      isLoadingFlavor || !targetFlavor || status === "won"
                    }
                  />
                {fetchError && (
                  <p className="mt-4 rounded-2xl px-4 py-3 text-sm">
                    {fetchError}
                  </p>
                )}
                {status === "won" && (
                  <p className="mt-4 rounded-2xl px-4 py-3 text-sm font-semibold text-center">
                    ¡Felicidades! Adivinaste el sabor del día.
                  </p>
                )}
              </div>
            </div>

            {/* Headers e historial con desplazamiento horizontal */}
            <div className="overflow-x-auto">
              <div className="min-w-[38rem] md:min-w-[48rem] lg:min-w-[56rem]">
                <div className="mb-6 grid grid-cols-8 gap-6">
                  {headers.map((title) => (
                    <div key={title} className={headerClass}>
                      <span className={textClass}>{title}</span>
                    </div>
                  ))}
                </div>

                <div className="relative flex flex-col-reverse gap-4 pb-2">
                  {guesses.map((guess, index) => (
                    <div
                      key={`${guess.flavor.id}-${index}`}
                      className=""
                      style={{
                        transform: `translateY(${(guesses.length - index - 1) * -4}px)`,
                        zIndex: guesses.length - index,
                      }}
                    >
                      <GuessCard
                        guess={guess}
                        index={guesses.length - index - 1}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
