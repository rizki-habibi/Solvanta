import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Solvanta — Secure Treasury & Escrow",
  description: "Role-aware treasury and escrow workspace on Solana."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}