export type CauseId =
  | "pac" | "pvc" | "af" | "aflut" | "avnrt" | "avrt" | "vt" | "brady" | "sinus"
  | "anxiety" | "thyro" | "syst" | "pheo" | "drug" | "hyperdyn" | "struct" | "secondary" | "chestwall";

export interface Cause {
  id: CauseId;
  name: string;
  group: "Cardiac – arrhythmic" | "Cardiac – structural / other" | "Psychiatric" | "Systemic / endocrine" | "Drugs & toxins" | "Miscellaneous";
  source: "Harrison" | "Harrison + update" | "Update";
  summary: string;
  clues: string[];
  workup: string;
  mgmt: string[];
}

export const CAUSES: Cause[] = [
  { id: "pac", name: "Premature atrial contractions (PACs)", group: "Cardiac – arrhythmic", source: "Harrison",
    summary: "Intermittent 'skipped/missing' beats; the post-extrasystolic beat is felt because the pause increases LV end-diastolic volume and the next beat contracts more forcefully (post-extrasystolic potentiation).",
    clues: ["Isolated skipped beats / thump", "Noticed at rest when other stimuli are minimal", "Triggered by caffeine, stress, stimulants", "Brief episodes"],
    workup: "12-lead ECG; Holter/patch if frequent; TSH, electrolytes. High PAC burden may herald AF — consider extended monitoring in older/high-risk patients.",
    mgmt: ["Reassurance and trigger avoidance (caffeine, alcohol, tobacco, stimulants)", "Beta-blocker if sufficiently troublesome (Harrison)", "Look for and treat underlying cause (thyroid, structural disease, sleep apnoea)"] },
  { id: "pvc", name: "Premature ventricular contractions (PVCs)", group: "Cardiac – arrhythmic", source: "Harrison",
    summary: "Same post-extrasystolic mechanism as PACs. Most are benign in a structurally normal heart; frequency and context determine risk.",
    clues: ["Isolated skipped beats / thump or 'flip-flop'", "At rest, in bed", "Frequent/bigeminy on ECG", "Worse with stimulants"],
    workup: "12-lead ECG, 24–48 h Holter to quantify burden, echocardiogram if burden is high, symptoms are exertional, or heart disease is suspected; exercise test if exertional; CMR if cardiomyopathy suspected.",
    mgmt: ["Reassure if structurally normal heart and low burden", "Beta-blocker or non-dihydropyridine CCB if troublesome (Harrison: beta-blocker)", "High burden (commonly >10–15%) or falling LVEF: evaluate for PVC-induced cardiomyopathy; antiarrhythmic drug or catheter ablation per EP", "Structural heart disease / CAD: manage per ventricular arrhythmia guidelines (2017 AHA/ACC/HRS; 2022 ESC)"] },
  { id: "af", name: "Atrial fibrillation", group: "Cardiac – arrhythmic", source: "Harrison + update",
    summary: "Irregular, sustained palpitations are classically AF. Harrison notes most arrhythmias are not associated with palpitations; in those that are, asking the patient to 'tap out' the rhythm helps.",
    clues: ["Irregularly irregular", "Age >60, hypertension, HF, valve disease, sleep apnoea, obesity", "Alcohol binge, thyrotoxicosis, endurance athletes", "ECG/monitor capture"],
    workup: "12-lead ECG or ambulatory monitor to capture; echo; TSH, electrolytes, renal function; assess for OSA.",
    mgmt: ["Stroke-risk assessment and anticoagulation per 2023 ACC/AHA/ACCP/HRS (CHA₂DS₂-VASc) or 2024 ESC (CHA₂DS₂-VA, AF-CARE pathway)", "Rate vs rhythm control; early rhythm control and ablation options per current guideline", "Risk-factor modification: alcohol, weight, BP, OSA, exercise", "Treat acute instability with synchronized cardioversion"] },
  { id: "aflut", name: "Atrial flutter", group: "Cardiac – arrhythmic", source: "Update",
    summary: "Regular, rapid palpitations (often ventricular rate ~150 with 2:1 conduction) in patients with structural/atrial disease or HF.",
    clues: ["Regular and rapid, often fixed rate", "Structural/atrial disease, HF, post-cardiac surgery", "Sawtooth flutter waves on ECG"],
    workup: "12-lead ECG; echo; thyroid; assess anticoagulation need as for AF.",
    mgmt: ["Anticoagulation decisions follow AF guidance", "Typical flutter: catheter ablation (cavotricuspid isthmus) is highly effective and often preferred", "Rate control with AV nodal agents; cardioversion if unstable"] },
  { id: "avnrt", name: "AV nodal re-entrant tachycardia (AVNRT)", group: "Cardiac – arrhythmic", source: "Harrison + update",
    summary: "Regular supraventricular tachycardia. In the JAMA systematic review, a regular rapid pounding sensation in the neck had LR 177 for AVNRT.",
    clues: ["Sudden onset and sudden offset", "Regular rapid pounding in the neck (LR 177) / visible neck pulsations", "Terminates with vagal manoeuvre", "Triggered by bending forward or squatting", "Younger, often female"],
    workup: "12-lead ECG during episode (narrow regular, retrograde P near QRS); event/smartphone ECG; baseline ECG to exclude pre-excitation.",
    mgmt: ["Vagal manoeuvres first — modified Valsalva (strain 15 s semi-recumbent, then supine with passive leg raise) improves conversion", "Adenosine if vagal fails (6 mg rapid IV, then 12 mg); beware in pre-excited AF", "Long-term: AV nodal blockers, or catheter ablation (first-line option; high success) per 2015 ACC/AHA/HRS, 2019 ESC and 2023 HRS consensus", "Unstable: synchronized cardioversion"] },
  { id: "avrt", name: "Accessory-pathway tachycardia / pre-excitation (WPW)", group: "Cardiac – arrhythmic", source: "Update",
    summary: "Regular narrow-complex tachycardia using an accessory pathway; pre-excited AF can be life-threatening.",
    clues: ["Delta wave on resting ECG", "Sudden onset/offset", "Young patient, palpitations with exertion", "Syncope with rapid palpitations"],
    workup: "12-lead ECG; EP study for risk stratification and ablation; echo to exclude Ebstein/structural disease.",
    mgmt: ["Avoid AV-nodal blockers (adenosine caution, verapamil, digoxin) in pre-excited AF", "Catheter ablation recommended for symptomatic pre-excitation / high-risk pathways", "Unstable: cardioversion; stable pre-excited AF: procainamide or ibutilide per guideline"] },
  { id: "vt", name: "Ventricular tachycardia", group: "Cardiac – arrhythmic", source: "Harrison + update",
    summary: "Regular sustained palpitations can be caused by ventricular tachycardia. Patients with pre-existing CAD or risk factors for CAD are at greatest risk for ventricular arrhythmias; accompanying syncope or lightheadedness suggests haemodynamic compromise.",
    clues: ["Known CAD/prior MI, cardiomyopathy, LV dysfunction", "Syncope/presyncope with palpitations", "Family history of sudden cardiac death/cardiomyopathy/channelopathy", "Wide-complex tachycardia, long QT, Brugada, epsilon wave", "Exertional onset"],
    workup: "ECG; urgent cardiology; telemetry; echo ± CMR; ischaemia evaluation; genetic testing when inherited disease suspected; EP study / ICM as indicated.",
    mgmt: ["Wide-complex tachycardia = VT until proven otherwise", "Unstable: synchronized cardioversion/defibrillation per ACLS", "Stable: IV antiarrhythmic (e.g. procainamide, amiodarone) with expert input", "Secondary prevention ICD / ablation / drugs per 2017 AHA/ACC/HRS and 2022 ESC guidelines"] },
  { id: "brady", name: "Bradyarrhythmia / sick sinus / AV block", group: "Cardiac – arrhythmic", source: "Update",
    summary: "Slow rhythms and pauses can cause palpitations (pauses followed by forceful beats), especially with presyncope or syncope.",
    clues: ["Slow pulse or documented pauses", "Presyncope or syncope", "Beta-blocker/CCB/digoxin use", "Conduction disease on ECG"],
    workup: "ECG; ambulatory monitoring; review of AV-nodal/rate-slowing drugs; electrolytes; thyroid.",
    mgmt: ["Remove reversible causes (drugs, electrolytes, hypothyroidism)", "Symptom-rhythm correlated bradycardia: pacing per 2018 ACC/AHA/HRS bradycardia guideline"] },
  { id: "sinus", name: "Sinus tachycardia / inappropriate sinus tachycardia / POTS", group: "Cardiac – arrhythmic", source: "Update",
    summary: "Gradual-onset, gradual-offset awareness of a fast but regular rhythm driven by physiological or autonomic triggers.",
    clues: ["Gradual onset and fade", "Standing, exertion, emotion, fever, dehydration", "Post-viral/long-COVID autonomic symptoms", "Resting rate persistently high"],
    workup: "ECG; look for secondary drivers (anaemia, thyroid, fever, drugs, hypovolaemia, pain); orthostatic vitals/active stand test.",
    mgmt: ["Treat the driver", "POTS: fluids/salt, compression, graded exercise", "Persistent inappropriate sinus tachycardia: beta-blocker; ivabradine in refractory cases (specialist)"] },
  { id: "anxiety", name: "Anxiety / panic / somatization", group: "Psychiatric", source: "Harrison",
    summary: "Psychiatric causes (panic attacks or disorder, anxiety states, somatization) accounted for 31% in the series Harrison cites. These patients more commonly report a longer duration (>15 min) and other accompanying symptoms.",
    clues: ["Duration >15 min", "Fear, tingling, trembling, hyperventilation, chest tightness", "Known anxiety/panic", "Stress-triggered", "ECG/pulse normal during typical symptoms"],
    workup: "Exclude arrhythmia (ECG, monitor if recurrent); screen with GAD-2/PHQ-2 (see Management tab); thyroid and stimulant review.",
    mgmt: ["Reassure that palpitations will not adversely affect prognosis once serious causes excluded", "Cognitive behavioural therapy; pharmacotherapy when indicated (Harrison)", "Reduce caffeine, alcohol, nicotine; yoga/structured exercise has some evidence in arrhythmia patients"] },
  { id: "thyro", name: "Thyrotoxicosis", group: "Systemic / endocrine", source: "Harrison",
    summary: "Listed among miscellaneous causes; thyroxine excess increases contractility and can precipitate AF.",
    clues: ["Heat intolerance, weight loss, tremor, sweating", "Goitre, eye signs", "New AF"],
    workup: "TSH, free T4/T3.", mgmt: ["Treat thyroid disease; beta-blocker for symptom control", "Anticoagulation per AF rules if AF"] },
  { id: "syst", name: "Anaemia / fever / volume depletion", group: "Systemic / endocrine", source: "Update",
    summary: "Hyperdynamic circulation and compensatory tachycardia produce awareness of the heartbeat.",
    clues: ["Pallor, fatigue, bleeding, heavy menses", "Fever, infection, dehydration", "Gradual onset"],
    workup: "CBC, ferritin, CRP, electrolytes, renal function.", mgmt: ["Treat underlying cause"] },
  { id: "pheo", name: "Pheochromocytoma / systemic mastocytosis", group: "Systemic / endocrine", source: "Harrison",
    summary: "Catecholaminergic stimulation (exercise, stress, pheochromocytoma) leads to hyperdynamic states; both pheochromocytoma and systemic mastocytosis are named as miscellaneous causes.",
    clues: ["Paroxysms of headache + sweating + pallor", "Labile or severe hypertension", "Flushing, urticaria, diarrhoea (mastocytosis)"],
    workup: "Plasma free or 24-h urine fractionated metanephrines; serum tryptase for mastocytosis.", mgmt: ["Refer to endocrinology; alpha-blockade before beta-blockade in pheochromocytoma"] },
  { id: "drug", name: "Drugs, alcohol and stimulants", group: "Drugs & toxins", source: "Harrison",
    summary: "Tobacco, caffeine, aminophylline, atropine, thyroxine, cocaine and amphetamines enhance myocardial contraction and can cause palpitations; alcohol is also listed.",
    clues: ["Temporal link to caffeine/energy drinks, alcohol, nicotine", "Recreational stimulants", "New medicines (bronchodilators, decongestants, thyroxine, QT-prolonging drugs)"],
    workup: "Medication/substance history; ECG for QTc; electrolytes; toxicology if indicated.",
    mgmt: ["Palpitations from alcohol, tobacco or illicit drugs: abstention (Harrison)", "Pharmacological agents: consider alternative therapy when appropriate or possible (Harrison)"] },
  { id: "hyperdyn", name: "Hyperdynamic states (aortic regurgitation, athletes, pregnancy)", group: "Cardiac – structural / other", source: "Harrison",
    summary: "Hyperdynamic cardiovascular states from catecholaminergic stimulation can cause palpitations. Palpitations are common among athletes, especially older endurance athletes. The enlarged ventricle of aortic regurgitation with hyperdynamic precordium frequently leads to awareness of the beat.",
    clues: ["Forceful pounding at regular rate", "Wide pulse pressure, diastolic murmur (AR)", "Endurance athlete", "Pregnancy"],
    workup: "Echocardiography for valve disease; ECG; consider Holter in athletes.", mgmt: ["Treat valve disease per valve guidelines", "Athletes: exclude arrhythmia and cardiomyopathy; reassurance if benign"] },
  { id: "struct", name: "Structural / valvular disease (MVP, HCM, AS, MS, myxoma, mediastinal mass)", group: "Cardiac – structural / other", source: "Harrison",
    summary: "Positional palpitations generally reflect a structural process within the heart (e.g. atrial myxoma) or adjacent to it (e.g. mediastinal mass). Mitral valve prolapse, aortic stenosis, hypertrophic cardiomyopathy and mitral stenosis can be accompanied by dyspnoea from increased left atrial and pulmonary venous pressure.",
    clues: ["Positional palpitations", "Murmur or syncope/exertional dyspnoea", "Family history of cardiomyopathy", "Abnormal ECG (LVH, Q waves)"],
    workup: "Echocardiography; chest imaging; CMR/CT as indicated.", mgmt: ["Treat the structural lesion; refer cardiology/cardiac surgery as appropriate"] },
  { id: "secondary", name: "Myocarditis / pulmonary embolism / ischaemia", group: "Cardiac – structural / other", source: "Harrison",
    summary: "Myocarditis and pulmonary embolism are listed cardiovascular causes; sustained tachyarrhythmias in CAD can be accompanied by angina.",
    clues: ["Chest pain, dyspnoea", "Recent viral illness", "Pleuritic pain, DVT/PE risk factors", "ECG ischaemic changes"],
    workup: "Troponin, ECG, echo; D-dimer/CTPA per pre-test probability; CMR for myocarditis.", mgmt: ["Treat the underlying condition; ED assessment if unstable or ischaemic"] },
  { id: "chestwall", name: "Chest-wall muscle contractions / non-cardiac", group: "Miscellaneous", source: "Harrison",
    summary: "Spontaneous skeletal muscle contractions of the chest wall are listed among the miscellaneous causes.",
    clues: ["Brief flutter localized to chest wall", "No pulse irregularity during the sensation"],
    workup: "Exam, ECG to exclude arrhythmia.", mgmt: ["Reassurance"] },
];

export type Flag = "emergent" | "urgent";
export interface Feature {
  id: string; label: string; group: string; w: Partial<Record<CauseId, number>>;
  flag?: Flag; lr?: "up" | "down"; hint?: string;
}
export interface FGroup { id: string; title: string; single: boolean; note?: string }

export const FGROUPS: FGroup[] = [
  { id: "redflag", title: "1. Red flags (haemodynamic compromise)", single: false, note: "Harrison: the principal goal is to determine whether the symptom is caused by a life-threatening arrhythmia." },
  { id: "onset", title: "2. Onset / offset", single: true },
  { id: "rhythm", title: "3. Rhythm the patient feels (ask them to tap it out)", single: true },
  { id: "dur", title: "4. Duration of episodes", single: true, note: "Episodes <5 min are less likely cardiac (LR 0.38); psychiatric causes more often >15 min." },
  { id: "special", title: "5. Distinguishing features", single: false },
  { id: "trigger", title: "6. Triggers and context", single: false },
  { id: "assoc", title: "7. Associated symptoms", single: false },
  { id: "hx", title: "8. Cardiac history and risk", single: false },
  { id: "exam", title: "9. Examination", single: false },
  { id: "ecg", title: "10. ECG / rhythm strip findings", single: false },
];

export const FEATURES: Feature[] = [
  // red flags
  { id: "unstable", group: "redflag", label: "Hypotension, shock or altered consciousness now", flag: "emergent", w: { vt: 2 } },
  { id: "syncope", group: "redflag", label: "Syncope with the palpitations", flag: "emergent", w: { vt: 3, brady: 2, struct: 2, avrt: 1 } },
  { id: "chestpain", group: "redflag", label: "Ischaemic-type chest pain with palpitations", flag: "emergent", w: { secondary: 3, vt: 1, af: 1 } },
  { id: "hfsigns", group: "redflag", label: "Signs of heart failure / pulmonary oedema", flag: "emergent", w: { af: 1, vt: 1, struct: 1, aflut: 1 } },
  { id: "presyncope", group: "redflag", label: "Presyncope / lightheadedness", flag: "urgent", w: { vt: 1, brady: 2, avnrt: 1, struct: 1, af: 1 } },
  { id: "dyspnea", group: "redflag", label: "Dyspnoea with palpitations", flag: "urgent", w: { struct: 2, af: 1, secondary: 2, vt: 1 } },
  // onset
  { id: "on_sudden", group: "onset", label: "Sudden onset and sudden termination", w: { avnrt: 4, avrt: 3, aflut: 1, af: 1, vt: 1 } },
  { id: "on_gradual", group: "onset", label: "Gradual onset and gradual fade", w: { sinus: 3, anxiety: 2, thyro: 1, syst: 1 } },
  // rhythm
  { id: "rh_regular", group: "rhythm", label: "Regular and rapid", w: { avnrt: 3, avrt: 2, aflut: 2, vt: 2, sinus: 1, anxiety: 1 } },
  { id: "rh_irregular", group: "rhythm", label: "Irregular / chaotic", w: { af: 4, pac: 1, pvc: 1 } },
  { id: "rh_skips", group: "rhythm", label: "Isolated skipped / missing beats or a thump", w: { pvc: 4, pac: 4 } },
  { id: "rh_pound", group: "rhythm", label: "Forceful pounding at a normal-ish rate", w: { hyperdyn: 3, anxiety: 1, drug: 1, syst: 1, sinus: 1 } },
  { id: "rh_slow", group: "rhythm", label: "Slow beats or pauses", flag: "urgent", w: { brady: 5 } },
  // duration
  { id: "du_short", group: "dur", label: "< 5 minutes", lr: "down", w: { pvc: 2, pac: 2, chestwall: 1 } },
  { id: "du_mid", group: "dur", label: "5 – 15 minutes", w: { avnrt: 1, af: 1, aflut: 1 } },
  { id: "du_long", group: "dur", label: "> 15 minutes / prolonged", w: { anxiety: 2, af: 1, avnrt: 1, aflut: 1, vt: 1 } },
  // special
  { id: "neck", group: "special", label: "Regular rapid pounding in the neck / visible neck pulsations", lr: "up", hint: "LR 177 for AVNRT (Thavendiranathan 2009)", w: { avnrt: 6, avrt: 2 } },
  { id: "vagal", group: "special", label: "Stops with a vagal manoeuvre (Valsalva, cough, cold water)", w: { avnrt: 3, avrt: 2 } },
  { id: "positional", group: "special", label: "Occurs with change of body position (leaning, turning, lying)", hint: "Harrison: positional palpitations suggest an intracardiac or adjacent structural process, e.g. atrial myxoma, mediastinal mass", w: { struct: 4 } },
  { id: "bending", group: "special", label: "Triggered by bending forward or squatting", w: { avnrt: 2 } },
  { id: "chestwall", group: "special", label: "Brief 'flutter' localized to chest wall; pulse normal", w: { chestwall: 4 } },
  // triggers
  { id: "tr_rest", group: "trigger", label: "Noticed at rest / quiet / lying in bed", w: { pvc: 2, pac: 2, anxiety: 1 } },
  { id: "tr_sleep", group: "trigger", label: "Wakes the patient from sleep / affected by sleep", lr: "up", hint: "LR 2.3", w: { af: 1, avnrt: 1, vt: 1 } },
  { id: "tr_work", group: "trigger", label: "Occurs while at work", lr: "up", hint: "LR 2.2", w: { avnrt: 1, af: 1 } },
  { id: "tr_exert", group: "trigger", label: "Triggered by exertion / exercise", flag: "urgent", w: { vt: 2, struct: 2, sinus: 1, hyperdyn: 1, avrt: 1 } },
  { id: "tr_stress", group: "trigger", label: "Triggered by stress or emotion", w: { anxiety: 3, sinus: 1, pheo: 1 } },
  { id: "tr_stand", group: "trigger", label: "Worse on standing / after standing up", w: { sinus: 3, syst: 1 } },
  { id: "tr_stim", group: "trigger", label: "Caffeine, energy drinks, nicotine, cold/decongestant remedies", w: { drug: 3, pvc: 1, pac: 1 } },
  { id: "tr_alc", group: "trigger", label: "Alcohol (binge or regular)", w: { af: 2, drug: 2 } },
  { id: "tr_rec", group: "trigger", label: "Cocaine / amphetamines / other recreational stimulants", w: { drug: 4, vt: 1, af: 1 } },
  { id: "tr_rx", group: "trigger", label: "Relevant medicines (theophylline/aminophylline, β-agonists, atropine, thyroxine, QT-prolonging)", w: { drug: 3 } },
  { id: "tr_preg", group: "trigger", label: "Pregnancy / postpartum", w: { sinus: 2, pac: 1, pvc: 1, syst: 1, hyperdyn: 1 } },
  { id: "tr_athlete", group: "trigger", label: "Endurance athlete", w: { af: 2, hyperdyn: 1, pac: 1, pvc: 1, sinus: 1 } },
  // associated
  { id: "as_panic", group: "assoc", label: "Fear, tingling, trembling, hyperventilation, chest tightness", w: { anxiety: 5 } },
  { id: "as_anxhx", group: "assoc", label: "Known anxiety / panic disorder / somatization", lr: "down", w: { anxiety: 3 } },
  { id: "as_thyro", group: "assoc", label: "Heat intolerance, weight loss, tremor, sweating", w: { thyro: 5, sinus: 1 } },
  { id: "as_anemia", group: "assoc", label: "Pallor, fatigue, bleeding, heavy menses", w: { syst: 4, sinus: 2 } },
  { id: "as_fever", group: "assoc", label: "Fever, infection or dehydration", w: { syst: 3, sinus: 2 } },
  { id: "as_pheo", group: "assoc", label: "Episodes of headache + sweating + pallor; or flushing/urticaria/diarrhoea", w: { pheo: 5 } },
  { id: "as_pleuritic", group: "assoc", label: "Pleuritic pain, leg swelling or recent immobility/surgery", w: { secondary: 4 } },
  { id: "as_viral", group: "assoc", label: "Recent viral illness", w: { secondary: 3 } },
  // history
  { id: "hx_cad", group: "hx", label: "Known CAD / prior MI or multiple CAD risk factors", flag: "urgent", lr: "up", w: { vt: 3, pvc: 2, af: 1 } },
  { id: "hx_cmp", group: "hx", label: "Cardiomyopathy / heart failure / reduced LVEF", flag: "urgent", lr: "up", w: { vt: 3, af: 2, pvc: 2 } },
  { id: "hx_valve", group: "hx", label: "Valvular disease (MVP, AR, AS, MS)", lr: "up", w: { struct: 3, af: 2, hyperdyn: 2 } },
  { id: "hx_cong", group: "hx", label: "Congenital heart disease / prior cardiac surgery", flag: "urgent", lr: "up", w: { aflut: 2, vt: 1, af: 1, avrt: 1 } },
  { id: "hx_af", group: "hx", label: "Hypertension, age >60, diabetes, sleep apnoea or obesity", w: { af: 2 } },
  { id: "hx_fh", group: "hx", label: "Family history of sudden death <50 y, cardiomyopathy or channelopathy", flag: "urgent", w: { vt: 3, struct: 2 } },
  // exam
  { id: "ex_murmur", group: "exam", label: "Systolic ejection murmur (↑ with Valsalva) or aortic stenosis murmur", flag: "urgent", w: { struct: 4, vt: 1 } },
  { id: "ex_ar", group: "exam", label: "Wide pulse pressure / diastolic murmur (aortic regurgitation)", w: { hyperdyn: 4 } },
  { id: "ex_goitre", group: "exam", label: "Goitre, tremor or hyperreflexia", w: { thyro: 4 } },
  { id: "ex_irreg", group: "exam", label: "Irregularly irregular pulse on examination", w: { af: 4 } },
  // ecg
  { id: "ecg_wide", group: "ecg", label: "Wide-complex tachycardia", flag: "emergent", w: { vt: 7 } },
  { id: "ecg_isch", group: "ecg", label: "Ischaemic changes / ST elevation", flag: "emergent", w: { secondary: 4 } },
  { id: "ecg_af", group: "ecg", label: "Atrial fibrillation captured", w: { af: 8 } },
  { id: "ecg_flutter", group: "ecg", label: "Atrial flutter captured", w: { aflut: 8 } },
  { id: "ecg_svt", group: "ecg", label: "Narrow regular tachycardia, no clear P waves", w: { avnrt: 5, avrt: 2 } },
  { id: "ecg_preex", group: "ecg", label: "Pre-excitation (delta wave)", flag: "urgent", w: { avrt: 7 } },
  { id: "ecg_qt", group: "ecg", label: "Long QT, Brugada pattern, epsilon wave or other channelopathy marker", flag: "urgent", w: { vt: 3 } },
  { id: "ecg_av", group: "ecg", label: "High-grade AV block, long pauses or sinus bradycardia", flag: "urgent", w: { brady: 6 } },
  { id: "ecg_pvc", group: "ecg", label: "Frequent PVCs/PACs or bigeminy", w: { pvc: 5, pac: 3 } },
  { id: "ecg_lvh", group: "ecg", label: "LVH, LBBB, pathological Q waves or strain", flag: "urgent", w: { struct: 3, vt: 2 } },
  { id: "ecg_sinus", group: "ecg", label: "Normal sinus rhythm recorded during typical symptoms", lr: "down", hint: "Repeatedly normal rate/rhythm during symptoms → likely non-arrhythmic", w: { anxiety: 2, sinus: 2, chestwall: 2 } },
];

export interface Ref {
  cite: string; type: string; verified: string; takeaway: string; used: string; quality: string;
}

export const FURTHER_READING: Ref[] = [
  { cite: "Weber BE, Kapoor WN. Evaluation and outcomes of patients with palpitations. Am J Med 1996;100:138-48.",
    type: "Prospective cohort, n=190", verified: "Abstract retrieved",
    takeaway: "Cause found in 84%: cardiac 43%, psychiatric 31%, miscellaneous 10%, unknown 16%. 75% had recurrent palpitations within a year, with excellent short-term prognosis; simple initial evaluation often suffices.",
    used: "Source of the 43/31/10/16% breakdown (Harrison), the psychiatric screening prompt, and the 'reassure once serious causes excluded' pathway.",
    quality: "Strengths: consecutive patients, predefined criteria, 96% follow-up. Limits: single university centre, 1990s, pre-dates smartphone ECG and modern loop recorders." },
  { cite: "Crossland S, Berkin L. Problem based review: the patient with palpitations. Acute Med 2012;11:169.",
    type: "Narrative problem-based review", verified: "Citation only — full text not retrieved",
    takeaway: "Acute-medicine framing: separate dangerous arrhythmia from benign causes using history, examination and ECG.",
    used: "Reinforces the red-flag-first triage structure.",
    quality: "Narrative review, low evidence level; treat as expert opinion." },
  { cite: "Jamshed N, Dubin J, Eldadah Z. Emergency management of palpitations in the elderly: epidemiology, diagnostic approaches, and therapeutic options. Clin Geriatr Med 2013;29:205.",
    type: "Narrative review (older adults)", verified: "Citation only — full text not retrieved",
    takeaway: "Older adults have higher pre-test probability of AF and structural disease and may present atypically, so the threshold for ECG and monitoring should be lower.",
    used: "Age ≥65 raises the app's urgency floor; AF weighting for age/hypertension.",
    quality: "Narrative review; also listed in the 2024 AAFP palpitations reference list." },
  { cite: "Marston HR et al (cited as 'Martson' in Harrison). Mobile self-monitoring ECG devices to diagnose arrhythmias that coincide with palpitations: a scoping review. Healthcare (Basel) 2019;7:96.",
    type: "Scoping review (9 studies from 981 records)", verified: "Abstract retrieved",
    takeaway: "Mobile ECG devices can support primary-care diagnosis at low cost, but the authors state further work is needed on impact and measurement across populations.",
    used: "Smartphone/handheld ECG is offered as a symptom-triggered monitoring option.",
    quality: "Scoping review, so it maps evidence rather than grades it; small and heterogeneous studies. Author name is misspelled in Harrison's list." },
  { cite: "Sakh R et al. Insertable cardiac monitors: current indications and devices. Expert Rev Med Devices 2019;16:45-55.",
    type: "Narrative device review", verified: "Abstract retrieved",
    takeaway: "Recurrent unexplained syncope is the established ICM indication; the 2018 ESC syncope guideline expanded it to inherited cardiomyopathy/channelopathy, suspected epilepsy and unexplained falls. Newer devices are smaller with remote monitoring.",
    used: "Monitor selector recommends an implantable monitor for infrequent episodes (<monthly) or palpitations with syncope.",
    quality: "Narrative review with industry-device content; use the ESC guideline itself for recommendations." },
];

export interface Update { cite: string; point: string; status: "Read" | "Seen in search results" | "From clinical knowledge — verify" }
export const UPDATES: Update[] = [
  { cite: "Gauer, Thomas, McNutt. Palpitations: evaluation, management, and wearable smart devices. Am Fam Physician 2024;110:259-269.", status: "Read",
    point: "12-lead ECG for all; echo if history/exam/ECG suggest structural disease; 2-week ambulatory ECG has the highest yield-to-cost for unexplained palpitations; ED for instability, syncope, ischaemic pain, HF signs or syndromic ECG; smartphone/wearable ECG is good for AF but has false positives and misses short asymptomatic events; structured yoga may reduce episodes (systematic review)." },
  { cite: "Thavendiranathan et al. Does this patient with palpitations have a cardiac arrhythmia? JAMA 2009;302:2135-43.", status: "Read",
    point: "Known cardiac disease (LR 2.0), palpitations affecting sleep (LR 2.3) or at work (LR 2.2) raise arrhythmia likelihood; regular rapid neck pounding LR 177 for AVNRT; prolonged monitoring with symptom–rhythm correlation is needed for most recurrent cases." },
  { cite: "Narducci et al. Is an underlying cardiac condition causing your patient's palpitations? J Fam Pract 2021;70:60-68.", status: "Seen in search results",
    point: "Palpitations <5 min less likely cardiac (LR 0.38); bending/squatting triggers favour AVNRT; syncope with palpitations should prompt a structural work-up (aortic stenosis, HCM)." },
  { cite: "ISHNE-HRS 2017 expert consensus on ambulatory ECG and external cardiac monitoring/telemetry (Steinberg et al).", status: "Seen in search results",
    point: "Basis for matching monitor type to symptom frequency (continuous Holter for daily symptoms; patch/event/loop for less frequent)." },
  { cite: "2018 ESC guidelines for the diagnosis and management of syncope (Brignole et al).", status: "Seen in search results",
    point: "Implantable cardiac monitors for recurrent unexplained syncope and expanded indications (via Sakh 2019 abstract)." },
  { cite: "2019 ESC SVT guidelines; 2015 ACC/AHA/HRS SVT guideline; 2023 HRS expert consensus on supraventricular arrhythmias.", status: "Seen in search results",
    point: "Cited as current SVT references. Management points in the app (vagal manoeuvres, adenosine, ablation as first-line option) come from my knowledge of these documents — verify against the text." },
  { cite: "2023 ACC/AHA/ACCP/HRS AF guideline; 2024 ESC AF guideline.", status: "From clinical knowledge — verify",
    point: "AF stroke-risk strategy (CHA₂DS₂-VASc vs CHA₂DS₂-VA with the AF-CARE pathway), early rhythm control and risk-factor modification." },
  { cite: "2017 AHA/ACC/HRS and 2022 ESC ventricular arrhythmia / SCD guidelines; 2018 ACC/AHA/HRS bradycardia guideline.", status: "Seen in search results",
    point: "Listed as current references; PVC-burden threshold and VT management summarized from clinical knowledge — verify." },
];

export interface QA { q: string; options: string[]; answer: number; why: string }
export const QUIZ: QA[] = [
  { q: "In the large series cited in Harrison, which category was the most frequent cause of palpitations?", options: ["Psychiatric (31%)", "Cardiac (43%)", "Miscellaneous (10%)", "Unknown (16%)"], answer: 1, why: "Cardiac 43%, psychiatric 31%, miscellaneous 10%, unknown 16%." },
  { q: "Why is a premature beat usually felt as a 'thump' on the following beat?", options: ["Reduced coronary flow", "Post-extrasystolic pause increases LV end-diastolic dimension and contraction force", "AV dissociation", "Papillary muscle rupture"], answer: 1, why: "Post-extrasystolic potentiation after the compensatory pause." },
  { q: "Which feature favours a psychiatric cause?", options: ["Duration under 1 minute", "Duration >15 min with other accompanying symptoms", "Syncope", "Pre-excitation on ECG"], answer: 1, why: "Harrison: psychiatric patients report longer duration (>15 min) and other symptoms." },
  { q: "What do positional palpitations generally suggest?", options: ["Thyrotoxicosis", "A structural process within or adjacent to the heart (e.g. atrial myxoma, mediastinal mass)", "Panic disorder", "Alcohol"], answer: 1, why: "As stated in the chapter's opening." },
  { q: "Which finding has an LR of ~177 for AVNRT?", options: ["Irregular pulse", "Regular rapid pounding in the neck", "Palpitations at work", "History of anxiety"], answer: 1, why: "Thavendiranathan JAMA 2009." },
  { q: "What is the principal goal when assessing palpitations?", options: ["Prescribe a beta-blocker", "Determine whether a life-threatening arrhythmia is causing them", "Order an echo for everyone", "Exclude anxiety"], answer: 1, why: "Harrison 'Approach to the patient'." },
  { q: "For infrequent, recurrent, unexplained palpitations, which monitoring is described as safe and possibly more cost-effective than Holter?", options: ["48-h Holter repeated monthly", "Implantable loop recorder or mobile cardiac outpatient telemetry", "Exercise ECG", "Resting ECG yearly"], answer: 1, why: "Harrison: Holter has limited utility; ILR and MCOT are safe and possibly more cost-effective." },
  { q: "Which is first-line for troublesome benign PACs/PVCs per Harrison?", options: ["Amiodarone", "Beta-blocker", "Digoxin", "Ablation"], answer: 1, why: "Occasional benign premature contractions may be managed with beta-blocker therapy." },
  { q: "Which patient needs emergency assessment rather than outpatient work-up?", options: ["Palpitations after coffee, normal ECG", "Palpitations with syncope and known cardiomyopathy", "Brief skipped beats at rest", "Anxiety-related palpitations"], answer: 1, why: "Syncope/haemodynamic compromise with structural disease is a red flag." },
];

export const KEY_FACTS = [
  "Palpitations: 'thumping', 'pounding' or 'fluttering' sensation in the chest — intermittent or sustained, regular or irregular.",
  "Often noticed when quietly resting; patients worry most about 'skipped' or 'missing' beats.",
  "Series cited: cardiac 43%, psychiatric 31%, miscellaneous 10%, unknown 16%.",
  "Cardiac causes: PACs/PVCs, SVT and VT, MVP, aortic insufficiency, atrial myxoma, myocarditis, pulmonary embolism.",
  "Regular sustained palpitations → regular SVT or VT; irregular sustained → AF. Most arrhythmias are NOT associated with palpitations.",
  "Ask the patient to tap out the rhythm or take the pulse during an episode.",
  "Enhancers: tobacco, caffeine, aminophylline, atropine, thyroxine, cocaine, amphetamines, catecholamine states (exercise, stress, pheochromocytoma).",
  "Examination: vitals, JVP and pulse, chest and precordium auscultation. Resting ECG documents arrhythmia; exercise ECG if exertional.",
  "Infrequent episodes: Holter, telephonic transmission, loop recorders (external/implantable), mobile cardiac outpatient telemetry; use a diary or event marker.",
  "Most patients do not have serious arrhythmia or structural disease; once excluded, reassure that prognosis is not adversely affected.",
];
