import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AMC Professionals - Construction Cleaning",
  description: "Construction cleaning that wins bids.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
