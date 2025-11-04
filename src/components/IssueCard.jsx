import { Bug, Lightbulb, ThumbsUp, Tag, Clock, CheckCircle } from "lucide-react";

function StatusBadge({ status }) {
  const map = {
    backlog: "bg-slate-100 text-slate-700",
    "in-progress": "bg-amber-100 text-amber-800",
    done: "bg-emerald-100 text-emerald-700",
  };
  const label = {
    backlog: "Backlog",
    "in-progress": "In Progress",
    done: "Done",
  }[status];
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${map[status]}`}>
      <CheckCircle size={14} className="mr-1 opacity-70" />
      {label}
    </span>
  );
}

export default function IssueCard({ issue, onUpvote }) {
  const isBug = issue.type === "bug";
  return (
    <div className="group rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className={`mt-0.5 flex h-9 w-9 items-center justify-center rounded-md ${isBug ? "bg-rose-600" : "bg-indigo-600"} text-white`}>
            {isBug ? <Bug size={18} /> : <Lightbulb size={18} />}
          </div>
          <div>
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <h3 className="text-base font-semibold text-slate-900">{issue.title}</h3>
              <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600">{issue.key}</span>
              <StatusBadge status={issue.status} />
            </div>
            <p className="mb-2 line-clamp-2 text-sm text-slate-600">{issue.description}</p>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <div className="inline-flex items-center gap-1"><Clock size={14} /> {new Date(issue.createdAt).toLocaleDateString()}</div>
              {issue.labels?.map((l) => (
                <span key={l} className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-1.5 py-0.5 text-slate-600">
                  <Tag size={12} /> {l}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={() => onUpvote(issue.key)}
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-sm font-medium text-slate-800 shadow-sm transition hover:border-indigo-300 hover:text-indigo-700 hover:shadow"
          >
            <ThumbsUp size={16} />
            {issue.votes}
          </button>
          <span className="text-[10px] uppercase tracking-wide text-slate-400">Votes</span>
        </div>
      </div>
    </div>
  );
}
