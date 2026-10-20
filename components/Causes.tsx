"use client";
import { useState } from "react";
import { CAUSES } from "@/lib/knowledge";

const GROUPS = Array.from(new Set(CAUSES.map((c) => c.group)));

export default function Causes() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const list = CAUSES.filter((c) => (c.name + c.summary + c.clues.join(" ")).toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="space-y-4">
      <div className="card">
        <h2 className="font-semibold text-brand-700">Causes & pathophysiology</h2>
        <p className="text-xs text-slate-500">Harrison: cardiac 43% · psychiatric 31% · miscellaneous 10% · unknown 16%</p>
        <div className="mt-3 flex h-3 overflow-hidden rounded-full text-[0px]">
          <div style={{ width: "43%" }} className="bg-red-400">cardiac</div><div style={{ width: "31%" }} className="bg-violet-400">psych</div>
          <div style={{ width: "10%" }} className="bg-amber-400">misc</div><div style={{ width: "16%" }} className="bg-slate-300">unknown</div>
        </div>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search causes, clues…" className="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none" />
      </div>
      {GROUPS.map((g) => {
        const items = list.filter((c) => c.group === g);
        if (!items.length) return null;
        return (
          <div key={g}>
            <h3 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{g}</h3>
            <div className="space-y-2">
              {items.map((c) => (
                <div key={c.id} className="card">
                  <button className="flex w-full items-start justify-between gap-2 text-left" onClick={() => setOpen(open === c.id ? null : c.id)}>
                    <span className="text-sm font-medium">{c.name}</span>
                    <span className={`chip shrink-0 ${c.source === "Harrison" ? "bg-brand-100 text-brand-700" : "bg-sky-100 text-sky-800"}`}>{c.source}</span>
                  </button>
                  {open === c.id && (
                    <div className="mt-2 space-y-2 text-sm">
                      <p>{c.summary}</p>
                      <div><div className="text-xs font-semibold text-slate-500">CLUES</div><ul className="list-disc pl-5">{c.clues.map((x) => <li key={x}>{x}</li>)}</ul></div>
                      <div><div className="text-xs font-semibold text-slate-500">WORK-UP</div><p>{c.workup}</p></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
