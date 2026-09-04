import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { MobileNav } from "@/components/layout/MobileNav";
import { SignOutButton } from "@/components/layout/SignOutButton";
import { getCurrentUser } from "@/lib/supabase/profile";
import { ROLE_HOME } from "@/lib/roles";

export async function SiteHeader({ active }: { active?: "browse" | "advertise" | "how" | "faq" }) {
  const user = await getCurrentUser();
  const dashboardHref = user ? ROLE_HOME[user.role] : null;

  const linkClass = (key: string) =>
    active === key
      ? "relative text-[14px] font-bold text-ink after:absolute after:-bottom-[19px] after:left-0 after:right-0 after:h-[2px] after:bg-ink"
      : "text-[14px] font-medium text-ink-soft hover:text-ink transition-colors";

  return (
    <header className="relative border-b border-line">
      <Container className="flex h-[72px] items-center justify-between gap-3">
        <Link href="/" className="flex flex-none items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-ink">
            <span className="text-[14px] font-extrabold text-white">P</span>
          </span>
          <span className="text-[18px] font-bold tracking-tight text-ink">Perchd</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className={linkClass("browse")}>
            Browse
          </Link>
          <Link href="/advertise" className={linkClass("advertise")}>
            Advertise here
          </Link>
          <Link href="/#how-it-works" className={linkClass("how")}>
            How it works
          </Link>
          <Link href="/faq" className={linkClass("faq")}>
            FAQ
          </Link>
        </nav>

        <div className="flex flex-none items-center gap-2 sm:gap-3.5">
          {user ? (
            <div className="hidden items-center gap-3.5 sm:flex">
              <Link
                href={dashboardHref!}
                className="flex items-center gap-2 text-[13.5px] font-semibold text-ink hover:opacity-80 transition-opacity"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-paper-alt border border-line text-[12px] font-bold">
                  {user.displayName.charAt(0).toUpperCase()}
                </span>
                {user.displayName}
              </Link>
              <span className="h-4 w-px bg-line" />
              <SignOutButton className="text-[13.5px] font-medium text-ink-soft hover:text-ink transition-colors" />
            </div>
          ) : (
            <Link
              href="/sign-in"
              className="hidden text-[13.5px] font-medium text-ink-soft hover:text-ink transition-colors sm:inline"
            >
              Sign in
            </Link>
          )}
          <Link
            href="/sell"
            className="rounded-full bg-ink px-3.5 py-2.5 text-[13px] font-semibold text-white hover:opacity-90 transition-opacity sm:px-[18px] sm:text-[13.5px]"
          >
            List your item
          </Link>
          <MobileNav dashboardHref={dashboardHref} />
        </div>
      </Container>
    </header>
  );
}
