# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from `/Users/mikatrauth/Desktop/Website Bot Space/botspace/`:

```bash
npm run dev        # Start dev server with HMR
npm run build      # Type-check + build to dist/
npm run lint       # Run ESLint
npm run preview    # Preview production build locally
```

No test framework is configured.

## Architecture

This is a single-page marketing website for **Bot Space** — a German B2B AI chatbot agency. It is a React 19 + TypeScript SPA built with Vite and Tailwind CSS 4.

**Page structure** (`App.tsx`) renders sections top-to-bottom: Navbar → Hero → Problem → Solutions → Benefits → DemoChat → Pricing → About → Contact → Footer → ChatWidget.

**`ChatWidget.tsx`** is the most complex component (~32KB). It handles:
- Persistent message history via `localStorage`
- Streaming responses from the n8n webhook
- Dynamic button rendering driven by backend responses
- Markdown link formatting
- A 12-step qualification flow with fallback buttons

**Backend integration** (n8n webhooks):
- Chat: `https://mctecommerce.app.n8n.cloud/webhook/bot-space-chatbot`
- Contact form: `https://mctecommerce.app.n8n.cloud/webhook/bot-space-kontakt`

All UI copy is in **German**. Primary brand color is `#1A73E8`.
