"use client";
import { useMemo, useState } from "react";
import { FEATURES, FGROUPS } from "@/lib/knowledge";
import { assess, chooseMonitor, Freq } from "@/lib/engine";

const LEVEL_STYLE = [
  "border-emerald-300 bg-emerald-50 text-emerald-900",
  "border-sky-300 bg-sky-50 text-sky-900",
  "border-amber-300 bg-amber-50 text-amber-900",
  "border-red-300 bg-red-50 text-red-900",
];

export default function Assessment() {
  const [sel, setSel] = useState<Set<string>>(new Set());
  const [v, setV] = useState({ age: "", hr: "", sbp: "" });
  const [freq, setFreq] = useState<Freq>("weekly");
  const [open, setOpen] = useState<Record<string, boolean>>({ redflag: true, onset: true, rhythm: true });
  const res = useMemo(() => assess(sel, v), [sel, v]);
  const mon = chooseMonitor(freq, sel.has("syncope"));

  const toggle = (id: string, group: string, single: boolean) => {
    const n = new Set(sel);
    if (n.has(id)) n.delete(id);
    else {
      if (single) FEATURES.filter((f) => f.group === group).forEach((f) => n.delete(f.id));
      n.add(id);
    }
    setSel(n);
  };

  return (
    <div className="space-y-4">
      <div className="card">
        <h2 className="font-semibold text-brand-700">Patient</h2>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {([["age", "Age (y)"], ["hr", "HR (/min)"], ["sbp", "SBP (mmHg)"]] as const).map(([k, l]) => (
            <label key={k} className="text-xs text-slate-500">
              {l}
              <input inputMode="numeric" value={v[k]} onChange={(e) => setV({ ...v, [k]: e.target.value.replace(/\D/g, "") })}
                className="mt-1 w-full rounded-lg border border-slate-300 px-2 py-2 text-base text-slate-800 focus:border-brand-500 focus:outline-none" />
            </label>
          ))}
        </div>
      </div>

      {FGROUPS.map((g) => (
        <div key={g.id} className="card">
          <button onClick={() => setOpen({ ...open, [g.id]: !open[g.id] })} className="flex w-full items-center justify-between text-left">
            <span className="font-semibold text-slate-800">{g.title}</span>
            <span className="text-slate-400">{open[g.id] ? "−" : "+"}</span>
          </button>
          {g.note && open[g.id] && <p className="mt-1 text-xs text-slate-500">{g.note}</p>}
          {open[g.id] && (
            <div className="mt-2 space-y-1.5">
              {FEATURES.filter((f) => f.group === g.id).map((f) => {
                const on = sel.has(f.id);
                return (
                  <button key={f.id} onClick={() => toggle(f.id, g.id, g.single)}
                    className={`flex w-full items-start gap-2 rounded-xl border px-3 py-2 text-left text-sm transition ${on ? "border-brand-500 bg-brand-50" : "border-slate-200 bg-white"}`}>
                    <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center ${g.single ? "rounded-full" : "rounded"} border ${on ? "border-brand-600 bg-brand-600 text-white" : "border-slate-300"} text-[10px]`}>{on ? "✓" : ""}</span>
                    <span>
                      {f.label}
                      {f.flag && <span className={`chip ml-2 ${f.flag === "emergent" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-800"}`}>{f.flag === "emergent" ? "red flag" : "concern"}</span>}
                      {f.hint && <span className="block text-xs text-slate-500">{f.hint}</span>}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}

      <button onClick={() => { setSel(new Set()); setV({ age: "", hr: "", sbp: "" }); }} className="w-full rounded-xl border border-slate-300 py-2 text-sm text-slate-600">Reset</button>

      <div className="sticky bottom-2 z-10 space-y-3">
        {!res.anyInput ? (
          <div className="card text-sm text-slate-500">Select findings above — the assessment updates live.</div>
        ) : (
          <div className={`rounded-2xl border p-4 shadow-lg ${LEVEL_STYLE[res.level]}`}>
            <div className="text-sm font-bold">{res.title}</div>
            <p className="mt-1 text-xs leading-relaxed">{res.advice}</p>
          </div>
        )}
      </div>

      {res.anyInput && (
        <>
          {res.reasons.length > 0 && (
            <div className="card">
              <h3 className="font-semibold">Why this triage level</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">{res.reasons.map((r) => <li key={r}>{r}</li>)}</ul>
            </div>
          )}
          <div className="card">
            <h3 className="font-semibold">Leading considerations</h3>
            <p className="text-xs text-slate-500">Relative support from the findings entered — not a probability.</p>
            {res.ranked.length === 0 && <p className="mt-2 text-sm text-slate-500">Not enough findings yet.</p>}
            <div className="mt-2 space-y-3">
              {res.ranked.map((r) => (
                <div key={r.cause.id}>
                  <div className="flex items-baseline justify-between gap-2 text-sm">
                    <span className="font-medium">{r.cause.name}</span>
                    <span className="chip bg-slate-100 text-slate-600">{r.cause.group}</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-brand-500" style={{ width: `${Math.max(8, r.rel * 100)}%` }} /></div>
                  <p className="mt-1 text-xs text-slate-500">{Array.from(new Set(r.supports)).slice(0, 4).join(" · ")}</p>
                </div>
              ))}
            </div>
          </div>
          {(res.up.length > 0 || res.down.length > 0) && (
            <div className="card text-sm">
              {res.up.length > 0 && <><h3 className="font-semibold text-red-700">Raises arrhythmia likelihood</h3><ul className="mb-2 list-disc pl-5">{res.up.map((x) => <li key={x}>{x}</li>)}</ul></>}
              {res.down.length > 0 && <><h3 className="font-semibold text-emerald-700">Lowers arrhythmia likelihood</h3><ul className="list-disc pl-5">{res.down.map((x) => <li key={x}>{x}</li>)}</ul></>}
            </div>
          )}
          <div className="card">
            <h3 className="font-semibold">Suggested investigations</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">{res.tests.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
        </>
      )}

      <div className="card">
        <h3 className="font-semibold">Monitor selector</h3>
        <p className="text-xs text-slate-500">How often do episodes occur?</p>
        <div className="mt-2 grid grid-cols-4 gap-1.5 text-xs">
          {([["daily", "Daily"], ["weekly", "Weekly"], ["monthly", "Monthly"], ["rare", "Rarer"]] as [Freq, string][]).map(([k, l]) => (
            <button key={k} onClick={() => setFreq(k)} className={`rounded-lg border py-2 ${freq === k ? "border-brand-600 bg-brand-600 text-white" : "border-slate-300"}`}>{l}</button>
          ))}
        </div>
        <p className="mt-3 text-sm font-medium text-brand-700">{mon.choice}</p>
        <p className="text-xs text-slate-600">{mon.why}</p>
        <p className="mt-2 text-xs text-slate-500">Ask the patient to keep a diary or press the event marker during symptoms — Harrison stresses this is essential for interpretation.</p>
      </div>
    </div>
  );
}
