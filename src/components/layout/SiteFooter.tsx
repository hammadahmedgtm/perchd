import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[1024px] px-4 py-12 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-[260px]">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-ink">
                <span className="text-[14px] font-extrabold text-white">P</span>
              </span>
              <span className="text-[16px] font-bold tracking-tight">Perchd</span>
            </Link>
            <p className="mt-3.5 text-[12.5px] leading-relaxed text-ink-soft">
              Rent out the stuff you carry. Brands buy the sticker spots; you print them and get
              paid.
            </p>
          </div>

          <FooterColumn
            title="Marketplace"
            links={[
              { label: "Browse", href: "/" },
              { label: "List your item", href: "/sell" },
              { label: "Browse by map", href: "/browse/map" },
              { label: "Advertise here", href: "/advertise" },
            ]}
          />
          <FooterColumn
            title="Company"
            links={[
              { label: "How it works", href: "/#how-it-works" },
              { label: "FAQ", href: "/faq" },
              { label: "Sign in", href: "/sign-in" },
            ]}
          />
          <FooterColumn
            title="Seen at"
            links={[
              { label: "Coffee shops", href: "/" },
              { label: "Gym", href: "/" },
              { label: "Campus", href: "/" },
              { label: "Commute", href: "/" },
              { label: "Video calls", href: "/" },
            ]}
          />
        </div>

        <p className="mt-10 max-w-[560px] text-[11.5px] leading-relaxed text-ink-soft">
          Stickers are paid placements, not endorsements. Perchd is not affiliated with, endorsed
          by, or sponsored by any brand shown on this site.
        </p>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-[12px] text-ink-soft sm:flex-row">
          <span>&copy; {new Date().getFullYear()} Perchd. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-ink">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-ink">
              Privacy
            </Link>
            <a href="mailto:hello@perchd.space" className="hover:text-ink">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <div className="text-[11px] font-bold uppercase tracking-wide text-ink-soft">{title}</div>
      <div className="mt-3.5 flex flex-col gap-2.5">
        {links.map((l) => (
          <Link key={l.label} href={l.href} className="text-[13px] font-medium text-ink hover:text-ink-soft">
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
