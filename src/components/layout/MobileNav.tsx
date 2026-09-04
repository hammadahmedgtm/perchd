"use client";

import Link from "next/link";
import { useState } from "react";
import { SignOutButton } from "@/components/layout/SignOutButton";

export function MobileNav({
  dashboardHref,
}: {
  dashboardHref: string | null;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-line"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-4 w-4">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {open && (
        <div className="absolute inset-x-0 top-[72px] z-20 border-b border-line bg-paper px-4 py-4 shadow-[0_12px_24px_-16px_rgba(0,0,0,.2)]">
          <nav className="flex flex-col gap-1">
            <Link onClick={() => setOpen(false)} href="/" className="rounded-lg px-3 py-2.5 text-[14px] font-semibold text-ink hover:bg-paper-alt">
              Browse
            </Link>
            <Link onClick={() => setOpen(false)} href="/advertise" className="rounded-lg px-3 py-2.5 text-[14px] font-semibold text-ink hover:bg-paper-alt">
              Advertise here
            </Link>
            <Link onClick={() => setOpen(false)} href="/#how-it-works" className="rounded-lg px-3 py-2.5 text-[14px] font-semibold text-ink hover:bg-paper-alt">
              How it works
            </Link>
            <Link onClick={() => setOpen(false)} href="/faq" className="rounded-lg px-3 py-2.5 text-[14px] font-semibold text-ink hover:bg-paper-alt">
              FAQ
            </Link>
            <div className="my-2 h-px bg-line" />
            {dashboardHref ? (
              <>
                <Link onClick={() => setOpen(false)} href={dashboardHref} className="rounded-lg px-3 py-2.5 text-[14px] font-semibold text-ink hover:bg-paper-alt">
                  My dashboard
                </Link>
                <SignOutButton className="rounded-lg px-3 py-2.5 text-left text-[14px] font-semibold text-ink-soft hover:bg-paper-alt" />
              </>
            ) : (
              <Link onClick={() => setOpen(false)} href="/sign-in" className="rounded-lg px-3 py-2.5 text-[14px] font-semibold text-ink hover:bg-paper-alt">
                Sign in
              </Link>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
