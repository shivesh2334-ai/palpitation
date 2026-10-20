"use client";
import { useState } from "react";
import Assessment from "@/components/Assessment";
import Causes from "@/components/Causes";
import Management from "@/components/Management";
import Learn from "@/components/Learn";
import References from "@/components/References";

const TABS = [
  { id: "assess", label: "Assess", C: Assessment },
  { id: "causes", label: "Causes", C: Causes },
  { id: "manage", label: "Manage", C: Management },
  { id: "learn", label: "Learn", C: Learn },
  { id: "refs", label: "Evidence", C: References },
];

export default function Home() {
  const [tab, setTab] = useState("assess");
  const Active = TABS.find((t) => t.id === tab)!.C;
  return (
    <main className="mx-auto max-w-2xl pb-10">
      <header className="bg-gradient-to-br from-brand-700 to-brand-900 px-4 pb-4 pt-6 text-white">
        <p className="text-xs uppercase tracking-widest text-brand-100">Clinical decision support</p>
        <h1 className="text-xl font-bold">Palpitations Assessment</h1>
        <p className="text-xs text-brand-100">Based on Harrison’s Ch.43 (Loscalzo), updated with guideline evidence</p>
      </header>
      <nav className="sticky top-0 z-20 flex border-b border-slate-200 bg-white">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`flex-1 py-3 text-sm font-medium ${tab === t.id ? "border-b-2 border-brand-600 text-brand-700" : "text-slate-500"}`}>{t.label}</button>
        ))}
      </nav>
      <div className="p-3"><Active /></div>
      <footer className="px-4 text-center text-[11px] leading-relaxed text-slate-400">
        Educational decision support for clinicians. It does not replace clinical judgement, local protocols or specialist advice.
      </footer>
    </main>
  );
}
