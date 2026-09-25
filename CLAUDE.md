@AGENTS.md
# Nexora — Corporate Website (Frontend)

## Project
Official website for Nexora Software Solutions. Showcases services, projects,
and upcoming products, and receives client requests. Content is managed from an
admin dashboard. Full requirements: docs/requirements.pdf

## Stack
- Next.js 16 (App Router), React 19, TypeScript (strict)
- Tailwind CSS v4 (theme tokens in app/globals.css via @theme, no tailwind.config)
- next-intl v4 for i18n. Locales: ar (default, RTL), en (LTR)
- Backend is a separate, ready REST API (Node/Express). Base URL in NEXT_PUBLIC_API_URL
- No src/ directory. Middleware file is proxy.ts (Next 16)

## Structure
- app/[locale]/(site)/     public pages
- app/[locale]/dashboard/  admin (protected)
- components/ui/           generic reusable UI (Button, Input, Card...)
- components/layout/       Navbar, Footer, LangSwitcher
- features/<name>/         feature code: components/, api.ts, types.ts, schema.ts
- lib/                     api client, utils
- i18n/, messages/ar.json, messages/en.json

## Rules
- Never hardcode user-facing text. All strings go in messages/ar.json and en.json
- RTL-safe Tailwind only: ms-/me-/ps-/pe-/start-/end-/text-start. Never ml-/mr-/pl-/pr-/left-/right-/text-left
- Directional icons (arrows, chevrons) must flip in RTL (rtl:rotate-180)
- Use theme tokens (brand-*, ink-*), never raw hex values in components
- Server Components by default; add "use client" only when needed
- Use the Link from @/i18n/navigation, not next/link
- Mobile-first and responsive on phone, tablet, and desktop
- Accessible: semantic HTML, alt text, visible focus states, good contrast
- Keep components small and typed; no `any`

## Design
Modern, minimal, uncluttered. Dark neutral backgrounds with orange as the accent.
Use the logo in public/ as-is (never change colors or proportions).
Fonts: IBM Plex Sans Arabic (Arabic), Inter (Latin).