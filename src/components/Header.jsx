import { Rocket, Settings, User } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-indigo-600 text-white">
            <Rocket size={18} />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-900">Customer Portal</h1>
            <p className="text-xs text-slate-500">Vote on bugs and feature requests</p>
          </div>
        </div>
        <nav className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50">
            <Settings size={16} />
            Settings
          </button>
          <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50">
            <User size={18} />
          </button>
        </nav>
      </div>
    </header>
  );
}
