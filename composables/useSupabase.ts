import { createClient } from '@supabase/supabase-js'
// import { useRuntimeConfig } from '#imports'

export const useSupabase = () => {
  const supabase = useSupabaseClient();
  return { supabase }
}