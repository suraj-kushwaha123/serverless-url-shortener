import Sidebar from "./Sidebar";

export default function AppShell({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#050508] text-white">
      {/* Ambient background glow for Dashboard */}
      <div className="pointer-events-none fixed left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-cyan-900/20 blur-[150px]" />
      
      <Sidebar />

      <main className="flex-1 overflow-x-hidden overflow-y-auto pb-28 lg:pb-0 relative z-10">
        {children}
      </main>
    </div>
  );
}