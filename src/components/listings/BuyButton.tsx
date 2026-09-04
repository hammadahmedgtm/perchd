import Link from "next/link";

export function BuyButton({
  listingId,
  spotId,
  disabled,
  size = "md",
}: {
  listingId: string;
  spotId: string;
  disabled?: boolean;
  size?: "sm" | "md";
}) {
  const classes =
    size === "sm"
      ? "rounded-full bg-ink px-4 py-2 text-[12.5px] font-semibold text-white hover:opacity-90"
      : "inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3.5 text-[15.5px] font-semibold text-white hover:opacity-90 transition-opacity";

  if (disabled) {
    return (
      <button disabled className={`${classes} cursor-not-allowed opacity-40`}>
        Taken
      </button>
    );
  }

  return (
    <Link href={`/listing/${listingId}/buy/${spotId}`} className={classes}>
      Buy
    </Link>
  );
}
