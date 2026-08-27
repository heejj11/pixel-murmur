import { createClient } from '@supabase/supabase-js'
import {
  hasSupabaseConfig,
  supabasePublishableKey,
  supabaseUrl,
} from './supabaseConfig'

export { hasSupabaseConfig } from './supabaseConfig'

export const supabase = hasSupabaseConfig
  ? createClient(supabaseUrl, supabasePublishableKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  })
  : null
