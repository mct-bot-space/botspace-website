# CLAUDE.md — Bot-Space Website

## Was ist dieses Projekt?
Marketing-Website für Bot-Space (Marke von MCT Commerce, Inhaber: Mika Trauth, Dudenhofen/Speyer).
Bot-Space ist eine deutsche KI-Chatbot-Agentur für KMU (B2B).
Diese Website ist die **Marketing-/Verkaufsseite** — kein Backend, kein Dashboard.

## Tech Stack
- React 19 + TypeScript (strict mode)
- Vite 7
- Tailwind CSS 4
- react-router-dom (Routing)
- Backend: n8n Cloud Webhooks (kein lokaler Server)

## Projektstruktur
- src/components/ — alle UI-Komponenten
- src/pages/ — Impressum.tsx, Datenschutz.tsx, AGB.tsx
- src/App.tsx — Routing + Layout
- botspace/public/ — Assets (Logos etc.)
- .env — Webhook URLs (NIEMALS committen)

## Business-Kontext
Pakete: STARTER (990€ + 149€/Mo), PRO (1.990€ + 299€/Mo), ENTERPRISE (3.990€ + 599€/Mo)
Pilot-Kunde: Padel Club Heintz — live ab Juni 2026
Ziel: 5–10 Kunden bis August 2026

## Coding-Regeln (IMMER einhalten)
- TypeScript strict mode — keine any-Types
- Alle Texte auf Deutsch
- Webhook URLs immer in .env (VITE_CHAT_WEBHOOK_URL, VITE_CONTACT_WEBHOOK_URL)
- Keine Secrets im Code oder Git
- shadcn/ui für neue UI-Komponenten
- Mobile-first Design

## Bekannte Bugs
- Footer Legal-Links (/impressum, /datenschutz, /agb) navigieren nicht korrekt — scrollen nur nach oben. React Router Problem, noch nicht gefixt.

## Geplante Erweiterungen (NICHT in diesem Repo)
- HelpDesk Dashboard → separates Next.js Projekt (app.bot-space.de)
- Langfristig: Migration dieser Website auf Next.js

## Workflow
- Änderungen immer committen + auf GitHub pushen
- Branch: main → deployed via Vercel automatisch
- Vor jedem Push: npm run build muss ohne Fehler durchlaufen
