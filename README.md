# Palpitations Assessment (Harrison Ch.43)

Next.js 14 + TypeScript + Tailwind. No backend or env vars needed.

## Run
    npm install
    npm run dev

## Deploy
Push to GitHub, import in Vercel (region bom1 is set in vercel.json). No configuration required.

## Edit content
Everything clinical lives in `lib/knowledge.ts` (causes, features and weights, references, quiz) and the triage rules in `lib/engine.ts`.
