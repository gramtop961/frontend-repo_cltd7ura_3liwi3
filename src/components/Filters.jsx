import { useState, useEffect } from "react";
import { Filter, Search } from "lucide-react";

export default function Filters({ onChange }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("votes");

  useEffect(() => {
    onChange({ query, type, status, sort });
  }, [query, type, status, sort, onChange]);

  return (
    <div className="flex w-full flex-col gap-3 rounded-lg border border-slate-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center gap-2">
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, key, or label"
            className="w-full rounded-md border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-700">
          <Filter size={16} className="text-slate-500" />
          Filters
        </div>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none"
        >
          <option value="all">All types</option>
          <option value="bug">Bugs</option>
          <option value="feature">Features</option>
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none"
        >
          <option value="all">All status</option>
          <option value="backlog">Backlog</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none"
        >
          <option value="votes">Most voted</option>
          <option value="new">Newest</option>
          <option value="old">Oldest</option>
        </select>
      </div>
    </div>
  );
}
