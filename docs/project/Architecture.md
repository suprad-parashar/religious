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
│   ├── UpakarmaGuide.tsx    # Main client shell; owns panel state
│   ├── StepCard.tsx         # Single step (instructions + audio + button)
│   ├── TellMeMorePanel.tsx  # Page-level right-side detail panel
│   └── AudioPlayer.tsx      # Audio with optional segment playback
├── content/
│   └── upakarma.ts      # ★ Single file to edit for all ritual content
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

Content is defined in `src/content/upakarma.ts` and typed in `src/types/upakarma.ts`.

When adding fields to the content shape:

1. Update `src/types/upakarma.ts`
2. Update `src/content/upakarma.ts` (placeholders for all steps)
3. Update the relevant component(s) to render the new field
4. Update `docs/project/Content-Guide.md`

## Audio

- Full recording: `public/audio/Upakarma.mp3`
- Per-step clips: add files under `public/audio/` and reference via `audio.src`
- Segment playback from full recording: set `startTime` / `endTime` (seconds) on a step

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
