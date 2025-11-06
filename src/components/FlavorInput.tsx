import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useFlavorSearch } from "../hooks/useFlavorSearch";
import type { IceCreamFlavor } from "../types/iceCream";

interface FlavorInputProps {
  onSubmit: (flavor: IceCreamFlavor) => void;
  disabled?: boolean;
  usedFlavorIds?: number[];
}

export const FlavorInput: React.FC<FlavorInputProps> = ({
  onSubmit,
  disabled,
  usedFlavorIds,
}) => {
  const getSafeText = (value: string | null | undefined, fallback: string) =>
    value && value.trim() ? value : fallback;

  const [query, setQuery] = useState("");
  const { suggestions, isLoading, error } = useFlavorSearch(query);

  // Filter out repeated flavors by ID
  const filteredSuggestions = useMemo(() => {
    if (!usedFlavorIds?.length) return suggestions;
    const usedIds = new Set(usedFlavorIds);
    return suggestions.filter((flavor) => !usedIds.has(flavor.id));
  }, [suggestions, usedFlavorIds]);

  const hasSuggestions = useMemo(
    () => filteredSuggestions.length > 0,
    [filteredSuggestions],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const match = filteredSuggestions.find(
      (flavor) => flavor.name.toLowerCase() === query.trim().toLowerCase(),
    );
    if (match) {
      onSubmit(match);
      setQuery("");
    }
  };

  const selectSuggestion = (flavor: IceCreamFlavor) => {
    onSubmit(flavor);
    setQuery("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-4 md:flex-row md:items-start"
    >
      <div className="relative w-full md:flex-1">
        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-500">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            disabled={disabled}
            placeholder="Busca por nombre de sabor..."
            autoComplete="off"
            className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-base font-medium text-slate-800 shadow-sm transition outline-none focus:ring-1 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:bg-slate-100"
          />
        </label>

        {!disabled && (query || isLoading || hasSuggestions || error) && (
          <div className="absolute top-[calc(100%+0.5rem)] left-0 right-0 z-20 max-h-72 overflow-y-auto rounded-2xl border border-slate-200 bg-white/95 shadow-xl backdrop-blur-lg">
            {isLoading && (
              <p className="px-4 py-3 text-sm text-slate-500">
                Buscando sabores...
              </p>
            )}
            {!isLoading && !hasSuggestions && query && (
              <p className="px-4 py-3 text-sm text-slate-500">
                No encontramos coincidencias.
              </p>
            )}
            {!isLoading &&
              hasSuggestions &&
              filteredSuggestions.map((flavor) => {
                const originText = getSafeText(flavor.origin, "Desconocido");
                return (
                  <button
                    type="button"
                    key={flavor.id}
                    onClick={() => selectSuggestion(flavor)}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm text-slate-600 transition focus-visible:outline focus-visible:outline-offset-2"
                  >
                    <div>
                      <p className="font-semibold text-slate-900">
                        {flavor.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {flavor.color} • {originText}
                      </p>
                      {/* <p className="text-xs text-slate-400">{mixInsText}</p> */}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="inline-flex min-w-max rounded-full px-2.5 py-1 text-xs font-semibold">
                        {flavor.base}
                      </span>
                      <span className="text-xs text-slate-500">
                        {flavor.flavor_intensity}
                      </span>
                    </div>
                  </button>
                );
              })}
            {error && <p className="px-4 py-3 text-sm text-red-600">{error}</p>}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="w-full rounded-2xl bg-gradient-to-r to-cyan-500 px-4 py-3 text-base font-semibold text-white shadow-lg transition hover:shadow-xl focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:opacity-60 md:w-auto md:min-w-[160px] md:self-stretch"
      >
        {!disabled ? "Adivinar" : "Cargando sabor..."}
      </button>
    </form>
  );
};
