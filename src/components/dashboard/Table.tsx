import type { ReactNode } from "react";

export function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <table className="w-full border-collapse px-5">
      <thead>
        <tr>
          {head.map((h) => (
            <th
              key={h}
              className="border-b border-line px-5 pb-2.5 pt-4 text-left text-[11px] font-bold uppercase tracking-wide text-ink-soft"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td
                key={j}
                className={`px-5 py-3 text-[13.5px] ${i < rows.length - 1 ? "border-b border-line" : ""}`}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
