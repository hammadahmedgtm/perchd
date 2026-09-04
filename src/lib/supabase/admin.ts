import { createClient } from "@supabase/supabase-js";

/**
 * Service-role client for privileged server-only writes (webhooks, cron) —
 * bypasses RLS, so never import this from anything reachable by the
 * browser. Returns null when the service role key isn't configured, so
 * callers can no-op gracefully in this preview.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
