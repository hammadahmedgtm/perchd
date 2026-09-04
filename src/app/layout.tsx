import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Perchd — Ad space on the stuff you already carry",
  description:
    "Perchd is a marketplace for sticker ad space on laptops, water bottles, phone cases, backpacks, bikes, and cars.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
