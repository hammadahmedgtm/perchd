import { createClient } from "@/lib/supabase/server";
import type { UserRole } from "@/lib/types";

export type CurrentUser = {
  id: string;
  email: string | null;
  role: UserRole;
  displayName: string;
};

/**
 * Reads the signed-in user + their profile role, server-side. Returns null
 * when nobody's signed in, or when Supabase isn't configured at all (so
 * callers can fall back to the mock-data preview experience). Server-only —
 * pulls in next/headers, so never import this from a "use client" file.
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return null;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, display_name")
    .eq("id", user.id)
    .single();

  return {
    id: user.id,
    email: user.email ?? null,
    role: (profile?.role as UserRole | undefined) ?? "seller",
    displayName: profile?.display_name ?? user.email?.split("@")[0] ?? "You",
  };
}
