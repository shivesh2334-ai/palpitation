"use client";
import { useState } from "react";
import { CAUSES } from "@/lib/knowledge";

const GAD = ["Feeling nervous, anxious or on edge", "Not being able to stop or control worrying"];
const PHQ = ["Little interest or pleasure in doing things", "Feeling down, depressed or hopeless"];
const OPTS = ["Not at all", "Several days", "More than half the days", "Nearly every day"];

function Screen({ title, items }: { title: string; items: string[] }) {
  const [a, setA] = useState<(number | null)[]>([null, null]);
  const done = a.every((x) => x !== null);
  const score = a.reduce<number>((s, x) => s + (x ?? 0), 0);
  return (
    <div className="mt-3">
      <div className="text-sm font-medium">{title} <span className="text-xs text-slate-500">(last 2 weeks)</span></div>
      {items.map((it, i) => (
        <div key={it} className="mt-2">
          <div className="text-xs text-slate-600">{it}</div>
          <div className="mt-1 grid grid-cols-4 gap-1">
            {OPTS.map((o, k) => (
              <button key={o} onClick={() => setA(a.map((x, j) => (j === i ? k : x)))} className={`rounded-md border px-1 py-1.5 text-[10px] leading-tight ${a[i] === k ? "border-brand-600 bg-brand-600 text-white" : "border-slate-300"}`}>{o}</button>
            ))}
          </div>
        </div>
      ))}
      {done && <p className={`mt-2 text-sm font-medium ${score >= 3 ? "text-amber-700" : "text-emerald-700"}`}>Score {score}/6 — {score >= 3 ? "positive screen; assess further" : "negative screen"}</p>}
    </div>
  );
}

export default function Management() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="space-y-4">
      <div className="card">
        <h2 className="font-semibold text-brand-700">Principles (Harrison + updates)</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          <li>Most patients do not have serious arrhythmia or structural heart disease. Once serious causes are excluded, reassure that palpitations will not adversely affect prognosis.</li>
          <li>Occasional benign atrial/ventricular premature contractions that are troublesome: beta-blocker therapy.</li>
          <li>Alcohol, tobacco or illicit drug triggers: abstention. Pharmacologic triggers: alternative therapy when possible.</li>
          <li>Psychiatric causes: cognitive therapy or pharmacotherapy.</li>
          <li>Acknowledge that palpitations can be bothersome and frightening, even when benign. Recurrence is common (75% within a year in Weber & Kapoor).</li>
        </ul>
      </div>
      <div className="card">
        <h2 className="font-semibold text-brand-700">Acute tachycardia quick pathway</h2>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
          <li><b>Unstable</b> (hypotension, ischaemia, HF, altered consciousness): synchronized cardioversion per ACLS.</li>
          <li><b>Wide-complex</b>: treat as VT until proven otherwise; avoid AV-nodal blockers if pre-excited AF is possible.</li>
          <li><b>Narrow, regular, stable</b>: modified Valsalva → adenosine 6 mg rapid IV, then 12 mg → IV β-blocker or non-DHP CCB.</li>
          <li><b>Narrow, irregular</b>: AF — rate control, anticoagulation decision, rhythm control per guideline.</li>
        </ol>
        <p className="mt-2 text-xs text-slate-500">Doses follow standard ACLS teaching; confirm against local protocols.</p>
      </div>
      <div className="card">
        <h2 className="font-semibold text-brand-700">Psychosomatic screen</h2>
        <p className="text-xs text-slate-500">AAFP 2024: consider screening for psychosomatic disorders when palpitations have no arrhythmic cause and no heart disease. A total of ≥3 is a positive screen.</p>
        <Screen title="GAD-2" items={GAD} />
        <Screen title="PHQ-2" items={PHQ} />
      </div>
      <h3 className="px-1 text-xs font-semibold uppercase tracking-wide text-slate-500">By cause</h3>
      {CAUSES.map((c) => (
        <div key={c.id} className="card">
          <button onClick={() => setOpen(open === c.id ? null : c.id)} className="flex w-full items-center justify-between text-left text-sm font-medium">
            <span>{c.name}</span><span className="text-slate-400">{open === c.id ? "−" : "+"}</span>
          </button>
          {open === c.id && <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">{c.mgmt.map((m) => <li key={m}>{m}</li>)}</ul>}
        </div>
      ))}
    </div>
  );
}
