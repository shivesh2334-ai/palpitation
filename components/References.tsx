"use client";
import { FURTHER_READING, UPDATES } from "@/lib/knowledge";

const STATUS: Record<string, string> = {
  Read: "bg-emerald-100 text-emerald-800",
  "Seen in search results": "bg-sky-100 text-sky-800",
  "From clinical knowledge — verify": "bg-amber-100 text-amber-800",
};

export default function References() {
  return (
    <div className="space-y-4">
      <div className="card">
        <h2 className="font-semibold text-brand-700">Harrison’s ‘Further Reading’ — appraisal</h2>
        <p className="text-xs text-slate-500">Each item is marked by how much of it was actually retrieved when building this app.</p>
      </div>
      {FURTHER_READING.map((r) => (
        <div key={r.cite} className="card space-y-1.5 text-sm">
          <p className="font-medium">{r.cite}</p>
          <div className="flex flex-wrap gap-1.5"><span className="chip bg-slate-100 text-slate-600">{r.type}</span><span className="chip bg-brand-100 text-brand-700">{r.verified}</span></div>
          <p><b>Takeaway:</b> {r.takeaway}</p>
          <p><b>Used in app:</b> {r.used}</p>
          <p className="text-slate-600"><b>Quality:</b> {r.quality}</p>
        </div>
      ))}
      <div className="card"><h2 className="font-semibold text-brand-700">Guideline & evidence updates</h2></div>
      {UPDATES.map((u) => (
        <div key={u.cite} className="card space-y-1.5 text-sm">
          <p className="font-medium">{u.cite}</p>
          <span className={`chip ${STATUS[u.status]}`}>{u.status}</span>
          <p>{u.point}</p>
        </div>
      ))}
    </div>
  );
}
