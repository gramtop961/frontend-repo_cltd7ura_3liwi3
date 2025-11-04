import IssueCard from "./IssueCard";

export default function IssueList({ issues, onUpvote }) {
  if (!issues.length) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 p-10 text-center text-slate-500">
        No issues match your filters.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-4">
      {issues.map((issue) => (
        <IssueCard key={issue.key} issue={issue} onUpvote={onUpvote} />
      ))}
    </div>
  );
}
