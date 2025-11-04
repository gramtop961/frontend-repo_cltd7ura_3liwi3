import { useMemo, useState } from "react";
import Header from "./components/Header";
import Filters from "./components/Filters";
import IssueList from "./components/IssueList";

const initialIssues = [
  {
    key: "PROJ-101",
    title: "Cannot submit form in Safari",
    type: "bug",
    status: "in-progress",
    votes: 42,
    description: "Users on Safari 16 report the submit button becomes disabled after filling all fields.",
    labels: ["frontend", "safari"],
    createdAt: "2024-12-05T09:00:00Z",
  },
  {
    key: "PROJ-135",
    title: "Dark mode for the dashboard",
    type: "feature",
    status: "backlog",
    votes: 118,
    description: "Add an optional dark theme with automatic system preference detection.",
    labels: ["ui", "theme"],
    createdAt: "2025-01-12T12:00:00Z",
  },
  {
    key: "PROJ-142",
    title: "Export reports to CSV",
    type: "feature",
    status: "in-progress",
    votes: 67,
    description: "Allow users to export filtered analytics data as CSV for offline analysis.",
    labels: ["reports", "export"],
    createdAt: "2025-02-02T08:30:00Z",
  },
  {
    key: "PROJ-150",
    title: "Login page layout breaks on mobile",
    type: "bug",
    status: "backlog",
    votes: 25,
    description: "Elements overlap on small screens causing the password field to be hidden.",
    labels: ["mobile", "auth"],
    createdAt: "2025-02-20T15:00:00Z",
  },
  {
    key: "PROJ-160",
    title: "Webhooks for status updates",
    type: "feature",
    status: "done",
    votes: 80,
    description: "Send outbound webhooks when issue status changes for better integrations.",
    labels: ["api", "integrations"],
    createdAt: "2025-03-01T10:10:00Z",
  },
];

export default function App() {
  const [issues, setIssues] = useState(initialIssues);
  const [filters, setFilters] = useState({ query: "", type: "all", status: "all", sort: "votes" });

  const filtered = useMemo(() => {
    let list = [...issues];

    // search
    const q = filters.query.trim().toLowerCase();
    if (q) {
      list = list.filter((i) =>
        i.title.toLowerCase().includes(q) ||
        i.key.toLowerCase().includes(q) ||
        (i.labels || []).some((l) => l.toLowerCase().includes(q))
      );
    }

    // type
    if (filters.type !== "all") {
      list = list.filter((i) => i.type === filters.type);
    }

    // status
    if (filters.status !== "all") {
      list = list.filter((i) => i.status === filters.status);
    }

    // sort
    if (filters.sort === "votes") {
      list.sort((a, b) => b.votes - a.votes);
    } else if (filters.sort === "new") {
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (filters.sort === "old") {
      list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    return list;
  }, [issues, filters]);

  const handleUpvote = (key) => {
    setIssues((prev) => prev.map((i) => (i.key === key ? { ...i, votes: i.votes + 1 } : i)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-emerald-50">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <section className="mb-4">
          <div className="mb-3 text-slate-700">
            <h2 className="text-2xl font-semibold tracking-tight">Public Roadmap</h2>
            <p className="text-sm text-slate-500">Search, filter and vote on what matters most. Items sync with Jira.</p>
          </div>
          <Filters onChange={setFilters} />
        </section>
        <section className="space-y-3">
          <IssueList issues={filtered} onUpvote={handleUpvote} />
        </section>
      </main>
      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
        Powered by your feedback. This demo shows a read-only view with local voting.
      </footer>
    </div>
  );
}
