"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ROLE_HOME } from "@/lib/roles";
import type { UserRole } from "@/lib/types";

export function SignInForm({ nextPath }: { nextPath: string | null }) {
  const router = useRouter();
  const [mode, setMode] = useState<"sign_in" | "sign_up">("sign_in");
  const [role, setRole] = useState<Exclude<UserRole, "admin">>("seller");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const configured =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!configured) {
      setError(
        "Sign-in isn't connected in this preview — set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable it."
      );
      return;
    }

    setLoading(true);
    const supabase = createClient();

    if (mode === "sign_up") {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { role } },
      });
      setLoading(false);
      if (authError) {
        setError(authError.message);
        return;
      }
      if (!data.session) {
        setError("Check your email to confirm your account before signing in.");
        return;
      }
      router.push(nextPath ?? ROLE_HOME[role]);
      router.refresh();
      return;
    }

    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setLoading(false);
      setError(authError.message);
      return;
    }

    // The role picked in the sign-up form only applies at sign-up — for an
    // existing user we look up their actual role instead of assuming one.
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();
    setLoading(false);

    const home = ROLE_HOME[(profile?.role as UserRole | undefined) ?? "seller"];
    router.push(nextPath ?? home);
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-[400px] px-6 py-16">
      <h1 className="text-center text-[26px] font-bold">
        {mode === "sign_in" ? "Sign in" : "Create your account"}
      </h1>
      <p className="mt-1.5 text-center text-[13.5px] text-ink-soft">
        {mode === "sign_in" ? "Welcome back." : "Sellers list items, brands buy spots."}
      </p>

      {mode === "sign_up" && (
        <div className="mt-6 flex rounded-full border border-line p-[3px]">
          {(["seller", "brand"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`flex-1 rounded-full py-2 text-[13px] font-semibold capitalize ${
                role === r ? "bg-ink text-white" : "text-ink-soft"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3.5">
        <div>
          <label className="text-[12.5px] font-bold text-ink-soft">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-[10px] border border-line px-3.5 py-2.5 text-[13.5px] outline-none focus:border-ink"
          />
        </div>
        <div>
          <label className="text-[12.5px] font-bold text-ink-soft">Password</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 w-full rounded-[10px] border border-line px-3.5 py-2.5 text-[13.5px] outline-none focus:border-ink"
          />
        </div>

        {error && <p className="text-[12.5px] text-[#b3261e]">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-1.5 rounded-full bg-ink py-3 text-[14px] font-semibold text-white hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Please wait…" : mode === "sign_in" ? "Sign in" : "Create account"}
        </button>
      </form>

      <p className="mt-5 text-center text-[13px] text-ink-soft">
        {mode === "sign_in" ? "New to Perchd?" : "Already have an account?"}{" "}
        <button
          onClick={() => setMode(mode === "sign_in" ? "sign_up" : "sign_in")}
          className="font-semibold text-ink hover:underline"
        >
          {mode === "sign_in" ? "Create an account" : "Sign in"}
        </button>
      </p>
    </div>
  );
}
