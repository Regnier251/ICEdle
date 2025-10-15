import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useFlavorSearch } from "../hooks/useFlavorSearch";
import type { IceCreamFlavor } from "../types/iceCream";

interface FlavorInputProps {
  onSubmit: (flavor: IceCreamFlavor) => void;
  disabled?: boolean;
}

export const FlavorInput: React.FC<FlavorInputProps> = ({
  onSubmit,
  disabled,
}) => {
  const [query, setQuery] = useState("");
  const { suggestions, isLoading, error } = useFlavorSearch(query);

  const hasSuggestions = useMemo(() => suggestions.length > 0, [suggestions]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const match = suggestions.find(
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
    <form onSubmit={handleSubmit} className="relative w-full">
      <label className="flex flex-col gap-2 text-sm font-semibold text-slate-500">
        Sabor del día
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          disabled={disabled}
          placeholder="Busca por nombre de sabor..."
          className="focus:border-ice-primary w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-base font-medium text-slate-800 shadow-sm transition outline-none focus:ring-1 focus:ring-cyan-900 disabled:cursor-not-allowed disabled:bg-slate-100"
        />
      </label>

      <button
        type="submit"
        disabled={disabled}
        className="from-ice-primary mt-4 w-full rounded-2xl bg-gradient-to-r to-cyan-500 px-4 py-3 text-base font-semibold text-white shadow-lg transition hover:shadow-xl focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:opacity-60"
      >
        {!disabled ? "Adivinar" : "Cargando sabor..."}
      </button>

      {!disabled && (query || isLoading || hasSuggestions || error) && (
        <div className="absolute top-[calc(100%+0.5rem)] right-0 left-0 z-20 max-h-72 overflow-y-auto rounded-2xl border border-slate-200 bg-white/95 shadow-xl backdrop-blur-lg">
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
            suggestions.map((flavor) => (
              <button
                type="button"
                key={flavor.id}
                onClick={() => selectSuggestion(flavor)}
                className="hover:bg-ice-cream/70 focus-visible:outline-ice-primary flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm text-slate-600 transition focus-visible:outline focus-visible:outline-offset-2"
              >
                <div>
                  <p className="font-semibold text-slate-900">{flavor.name}</p>
                  <p className="text-xs text-slate-500">
                    {flavor.original_country || "Origen desconocido"} •{" "}
                    {flavor.creation_year || "Año N/A"}
                  </p>
                </div>
                <span className="bg-ice-primary/15 text-ice-primary inline-flex min-w-max rounded-full px-2.5 py-1 text-xs font-semibold">
                  {flavor.base}
                </span>
              </button>
            ))}
          {error && <p className="px-4 py-3 text-sm text-red-600">{error}</p>}
        </div>
      )}
    </form>
  );
};
