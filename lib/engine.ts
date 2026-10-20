import { CAUSES, FEATURES, Cause, CauseId } from "./knowledge";

export interface Vitals { age: string; hr: string; sbp: string }
export type Level = 0 | 1 | 2 | 3;

export interface Result {
  level: Level;
  title: string;
  advice: string;
  reasons: string[];
  ranked: { cause: Cause; score: number; rel: number; supports: string[] }[];
  up: string[];
  down: string[];
  tests: string[];
  anyInput: boolean;
}

const LEVELS: Record<Level, { title: string; advice: string }> = {
  3: { title: "Emergency — same-day ED assessment", advice: "Haemodynamic compromise, syncope, ischaemic features, heart-failure signs or dangerous ECG. Monitor, obtain 12-lead ECG, IV access, and involve cardiology immediately; unstable tachyarrhythmia needs synchronized cardioversion per ACLS." },
  2: { title: "Urgent cardiology evaluation (days)", advice: "Features raise concern for ventricular arrhythmia, structural/inherited disease or conduction disease. Arrange early ECG review, echocardiography and ambulatory monitoring; avoid delay." },
  1: { title: "Routine work-up with ambulatory monitoring", advice: "Arrhythmic features without red flags. Baseline ECG and labs, then rhythm monitoring matched to episode frequency; add echo if any structural clue." },
  0: { title: "Low-risk pattern — reassure, treat triggers", advice: "No red flags and features favour benign ectopy, physiological, drug or psychiatric causes. Baseline ECG and labs, trigger modification, safety-net advice. Screen for anxiety/depression if symptoms persist." },
};

export function assess(sel: Set<string>, v: Vitals): Result {
  const age = parseInt(v.age, 10);
  const hr = parseInt(v.hr, 10);
  const sbp = parseInt(v.sbp, 10);
  const reasons: string[] = [];
  let level: Level = 0;
  const bump = (l: Level, why: string) => { if (l > level) level = l; reasons.push(why); };

  const feats = FEATURES.filter((f) => sel.has(f.id));
  feats.forEach((f) => {
    if (f.flag === "emergent") bump(3, f.label);
    else if (f.flag === "urgent") bump(2, f.label);
  });
  if (!isNaN(sbp) && sbp < 90) bump(3, `Systolic BP ${sbp} mmHg (<90)`);
  if (!isNaN(hr) && hr >= 150) bump(3, `Heart rate ${hr}/min at presentation (≥150)`);
  if (!isNaN(hr) && hr > 0 && hr < 40) bump(3, `Heart rate ${hr}/min (<40)`);
  if (!isNaN(age) && age >= 65 && level < 2 && feats.some((f) => f.w.af || f.w.vt)) {
    // older adults: lower the threshold for monitoring when arrhythmic features present
    level = Math.max(level, 1) as Level;
  }

  const scores = new Map<CauseId, { s: number; sup: string[] }>();
  feats.forEach((f) => {
    (Object.entries(f.w) as [CauseId, number][]).forEach(([id, w]) => {
      const cur = scores.get(id) || { s: 0, sup: [] };
      cur.s += w; cur.sup.push(f.label);
      scores.set(id, cur);
    });
  });
  if (!isNaN(age)) {
    if (age >= 60) bump0(scores, "af", 1, "Age ≥60");
    if (age < 40) { bump0(scores, "avnrt", 1, "Age <40"); bump0(scores, "anxiety", 1, "Age <40"); }
  }
  if (!isNaN(hr) && hr >= 100 && hr < 150) bump0(scores, "sinus", 1, `HR ${hr}`);

  const ranked = CAUSES.map((c) => ({ cause: c, score: scores.get(c.id)?.s || 0, supports: scores.get(c.id)?.sup || [] }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
  const max = ranked[0]?.score || 1;
  const rankedRel = ranked.map((r) => ({ ...r, rel: r.score / max }));

  if (level === 0 && rankedRel[0] && ["af", "aflut", "avnrt", "avrt", "vt", "brady"].includes(rankedRel[0].cause.id) && rankedRel[0].score >= 5 && !sel.has("ecg_sinus")) {
    level = 1; reasons.push(`Top consideration is arrhythmic: ${rankedRel[0].cause.name}`);
  }

  const up = feats.filter((f) => f.lr === "up").map((f) => (f.hint ? `${f.label} (${f.hint})` : f.label));
  const down = feats.filter((f) => f.lr === "down").map((f) => (f.hint ? `${f.label} (${f.hint})` : f.label));

  const tests = buildTests(sel, rankedRel.map((r) => r.cause.id), level);
  return { level, ...LEVELS[level], reasons: Array.from(new Set(reasons)), ranked: rankedRel, up, down, tests, anyInput: sel.size > 0 || !isNaN(age) || !isNaN(hr) || !isNaN(sbp) };
}

function bump0(m: Map<CauseId, { s: number; sup: string[] }>, id: CauseId, w: number, why: string) {
  const cur = m.get(id) || { s: 0, sup: [] };
  cur.s += w; cur.sup.push(why); m.set(id, cur);
}

function buildTests(sel: Set<string>, top: CauseId[], level: Level): string[] {
  const t: string[] = ["12-lead ECG (all patients) — look for pre-excitation, QTc, Brugada, AV block, LVH/Q waves, PACs/PVCs",
    "Basic labs: CBC, electrolytes (K, Mg, Ca), glucose, renal function, TSH"];
  const has = (...ids: string[]) => ids.some((i) => sel.has(i));
  const topHas = (...ids: CauseId[]) => ids.some((i) => top.slice(0, 3).includes(i));
  if (has("chestpain", "ecg_isch")) t.push("Serial troponin and ischaemia evaluation");
  if (has("as_pleuritic") || top.includes("secondary")) t.push("PE assessment: Wells/D-dimer ± CT pulmonary angiography; troponin/CMR if myocarditis suspected");
  if (has("syncope", "presyncope", "dyspnea", "hfsigns", "hx_cad", "hx_cmp", "hx_valve", "hx_cong", "hx_fh", "ex_murmur", "ecg_lvh", "ecg_qt", "positional") || top.includes("struct"))
    t.push("Transthoracic echocardiography (structural heart disease, LV function, valves, myxoma)");
  if (has("tr_exert", "hx_cad")) t.push("Exercise ECG / stress imaging when exertion provokes symptoms or ischaemia is possible");
  if (has("hx_fh", "ecg_qt") || (has("syncope") && has("hx_cmp"))) t.push("Cardiac MRI and/or inherited-arrhythmia genetic work-up per cardiology");
  if (topHas("avrt", "avnrt", "vt") || has("ecg_preex")) t.push("Electrophysiology study/ablation referral if SVT, pre-excitation or ventricular arrhythmia is documented or strongly suspected");
  if (top.includes("pheo")) t.push("Plasma free or 24-h urine fractionated metanephrines");
  if (top.includes("drug")) t.push("Detailed substance/medication review; toxicology screen if indicated");
  if (top.includes("af") || has("hx_af")) t.push("Consider sleep-apnoea screening; AF risk-factor review");
  if (top.includes("anxiety") || level === 0) t.push("GAD-2 / PHQ-2 screen (Management tab)");
  return t;
}

export type Freq = "daily" | "weekly" | "monthly" | "rare";
export function chooseMonitor(freq: Freq, severe: boolean): { choice: string; why: string } {
  if (severe || freq === "rare")
    return { choice: "Implantable cardiac monitor (insertable loop recorder)", why: "Infrequent episodes or palpitations with syncope: ESC 2018 syncope guidance; Harrison notes implantable loop recorders are safe and possibly more cost-effective for infrequent, unexplained palpitations." };
  if (freq === "daily") return { choice: "24–48 h continuous Holter", why: "Symptoms occur almost daily, so a short continuous recording has a reasonable chance of capturing an episode (ISHNE-HRS 2017)." };
  if (freq === "weekly") return { choice: "Extended patch monitor or external loop/event recorder (1–2 weeks)", why: "2-week ambulatory ECG has the best yield-to-cost for unexplained palpitations (AAFP 2024). Event recorders yield more diagnoses than 48-h Holter in palpitations (controlled trial, Ann Intern Med 1996)." };
  return { choice: "Patient-activated event recorder, smartphone/handheld ECG, or 30-day mobile cardiac outpatient telemetry", why: "Symptoms roughly monthly: needs weeks of coverage with a patient-triggered marker/diary so symptoms can be correlated with rhythm (Harrison)." };
}
