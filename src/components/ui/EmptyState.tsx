import Link from "next/link";
import type { ReactNode } from "react";

type Action = { label: string; href: string } | { label: string; onClick: () => void };

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: Action;
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-line px-6 py-16 text-center">
      {icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-paper-alt text-ink-soft">
          {icon}
        </div>
      )}
      <div className="text-[15px] font-bold text-ink">{title}</div>
      {description && (
        <p className="mx-auto mt-1.5 max-w-[360px] text-[13px] leading-relaxed text-ink-soft">
          {description}
        </p>
      )}
      {action &&
        ("href" in action ? (
          <Link
            href={action.href}
            className="mt-5 rounded-full bg-ink px-5 py-2.5 text-[13px] font-semibold text-white hover:opacity-90"
          >
            {action.label}
          </Link>
        ) : (
          <button
            onClick={action.onClick}
            className="mt-5 rounded-full bg-ink px-5 py-2.5 text-[13px] font-semibold text-white hover:opacity-90"
          >
            {action.label}
          </button>
        ))}
    </div>
  );
}
