import { useMemo } from 'react';
import { supabase } from '../lib/supabase';

export const useSupabase = () => {
  const client = useMemo(() => supabase, []);
  return client;
};
