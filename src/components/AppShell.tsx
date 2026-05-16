"use client";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-base">
      {/* Red ambient glow — top-left */}
      <div
        className="pointer-events-none fixed top-0 left-0 w-96 h-96 opacity-20"
        style={{
          background: "radial-gradient(ellipse at 0% 0%, rgba(210,0,45,0.5) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative z-10">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
