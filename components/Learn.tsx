"use client";
import { useState } from "react";
import { KEY_FACTS, QUIZ } from "@/lib/knowledge";

export default function Learn() {
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = QUIZ[i];
  const next = () => { if (i + 1 >= QUIZ.length) setDone(true); else { setI(i + 1); setPick(null); } };
  const restart = () => { setI(0); setPick(null); setScore(0); setDone(false); };
  return (
    <div className="space-y-4">
      <div className="card">
        <h2 className="font-semibold text-brand-700">Key points — Harrison Ch.43</h2>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm">{KEY_FACTS.map((k) => <li key={k}>{k}</li>)}</ul>
      </div>
      <div className="card">
        <h2 className="font-semibold text-brand-700">Quiz</h2>
        {done ? (
          <div className="mt-2 text-center">
            <p className="text-2xl font-bold">{score}/{QUIZ.length}</p>
            <button onClick={restart} className="mt-3 rounded-xl bg-brand-600 px-4 py-2 text-sm text-white">Try again</button>
          </div>
        ) : (
          <>
            <p className="mt-1 text-xs text-slate-500">Question {i + 1} of {QUIZ.length}</p>
            <p className="mt-2 text-sm font-medium">{q.q}</p>
            <div className="mt-2 space-y-1.5">
              {q.options.map((o, k) => {
                const state = pick === null ? "" : k === q.answer ? "border-emerald-500 bg-emerald-50" : k === pick ? "border-red-400 bg-red-50" : "";
                return (
                  <button key={o} disabled={pick !== null} onClick={() => { setPick(k); if (k === q.answer) setScore(score + 1); }}
                    className={`w-full rounded-xl border px-3 py-2 text-left text-sm ${state || "border-slate-200"}`}>{o}</button>
                );
              })}
            </div>
            {pick !== null && (
              <div className="mt-3 text-sm">
                <p className="text-slate-600">{q.why}</p>
                <button onClick={next} className="mt-2 rounded-xl bg-brand-600 px-4 py-2 text-sm text-white">{i + 1 >= QUIZ.length ? "Finish" : "Next"}</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
