import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { IceCreamFlavor } from '../types/iceCream';

interface UseFlavorSearchResult {
  suggestions: IceCreamFlavor[];
  isLoading: boolean;
  error: string | null;
}

export const useFlavorSearch = (query: string): UseFlavorSearchResult => {
  const [suggestions, setSuggestions] = useState<IceCreamFlavor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      setError(null);
      return;
    }

    const controller = new AbortController();
    const delay = setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      const { data, error: supabaseError } = await supabase
        .from('ice_cream_flavors')
        .select('id, name, base, color, original_country, creation_year')
        .ilike('name', `%${query}%`)
        .limit(10);

      if (!controller.signal.aborted) {
        if (supabaseError) {
          setError('No se pudieron obtener los sabores.');
          setSuggestions([]);
        } else if (data) {
          setSuggestions(data);
        }
        setIsLoading(false);
      }
    }, 250);

    return () => {
      controller.abort();
      clearTimeout(delay);
    };
  }, [query]);

  return { suggestions, isLoading, error };
};
