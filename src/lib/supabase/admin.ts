import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

let client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (!env.supabase.enabled) return null;

  if (!client) {
    client = createClient(
      env.supabase.url!,
      env.supabase.serviceRoleKey!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
  }

  return client;
}
