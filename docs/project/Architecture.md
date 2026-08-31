# Architecture

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) |
| UI | React 19 |
| Language | TypeScript |
| Styling | Plain CSS in `globals.css` (no Tailwind, no CSS-in-JS) |
| Output | Static export (`output: "export"` in `next.config.ts`) |
| Package manager | npm (`package-lock.json`) |

## Directory layout

```
src/
├── app/
│   ├── layout.tsx       # Root layout, metadata
│   ├── page.tsx         # Thin server entry — passes content to client
│   └── globals.css      # All styles
├── components/
│   ├── UpakarmaGuide.tsx    # Main client shell; owns panel and user-config state
│   ├── UserConfigCard.tsx   # Country, US location, and japa count
│   ├── StepCard.tsx         # Single step (instructions + audio + button)
│   ├── TellMeMorePanel.tsx  # Page-level right-side detail panel
│   └── AudioPlayer.tsx      # Audio with optional segment playback
├── lib/
│   ├── applyTemplate.ts     # {{placeholder}} replacement
│   ├── userConfig.ts        # Country / location / date / japa (localStorage)
│   ├── locationData.ts      # US / India state and city coordinates
│   ├── geolocation.ts       # Browser location + reverse geocode
│   ├── panchanga.ts         # Shaka / amanta panchanga (@ishubhamx/panchangam-js)
│   └── applyUserConfig.ts   # Applies those choices to resolved content
├── content/
│   ├── upakarma.ts      # ★ Ritual content (steps, audio, template values)
│   ├── resolveUpakarmaContent.ts  # Loads markdown and fills {{placeholders}}
│   └── texts/           # Markdown / templated recitation files
└── types/
    └── upakarma.ts      # TypeScript types for content shape

public/
└── audio/               # Audio files served statically
```

## Component boundaries

### Server vs client

- `page.tsx` and `layout.tsx` are **server components**
- All interactivity lives in **client components** (`"use client"`)
- `UpakarmaGuide.tsx` is the single client boundary for the page — do not import client components directly from `page.tsx` (causes webpack runtime errors)

### State ownership

- **Panel open/close and active step index** → `UpakarmaGuide.tsx`
- Step cards are presentational; they receive `onTellMeMore` and `isActive` as props
- Do not put panel state inside `StepCard`

## Content model

Content is defined in `src/content/upakarma.ts` and typed in `src/types/upakarma.ts`. Page-level fields include the introduction, a setup card (what to gather and how to prepare), the full recording, and the ritual steps.

When adding fields to the content shape:

1. Update `src/types/upakarma.ts`
2. Update `src/content/upakarma.ts` (placeholders for all steps)
3. Update the relevant component(s) to render the new field
4. Update `docs/project/Content-Guide.md`

## Audio

- Full recording: `public/audio/Upakarma.mp3`
- Per-part clips: add files under `public/audio/` and reference via `subtexts[].audio.src`
- Segment playback from full recording: set `startTime` / `endTime` (seconds) on a subtext audio entry

## Build and deploy

```bash
npm install     # setup
npm run dev     # local dev (Conductor uses $CONDUCTOR_PORT)
npm run build   # static export to out/
```

## Conductor

Local settings in `.conductor/settings.local.toml`:

- Setup: `npm install`
- Run: `npm run dev -- --port $CONDUCTOR_PORT`
- Preview URL: `http://localhost:$CONDUCTOR_PORT`

Do not create `conductor.json` — use the TOML settings format.
