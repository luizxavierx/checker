import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/AppShell";

export const metadata: Metadata = {
  title: "XH Panel | Telegram Intelligence",
  description: "XavierHub Telegram Data Panel",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="bg-base text-primary antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
