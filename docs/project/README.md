# Project Guide — Yajur Veda Upakarma

This folder contains **project-specific** instructions for agents working on this repository. Read these before making changes.

For generic agent behavior (minimal diffs, testing, clarification), see `../` and `../../AGENTS.md`.

## Documents

| File | Purpose |
|------|---------|
| [Overview.md](./Overview.md) | What this project is and who it is for |
| [Architecture.md](./Architecture.md) | Tech stack, file layout, component boundaries |
| [UI-and-Theme.md](./UI-and-Theme.md) | Visual design, colors, typography, layout patterns |
| [Content-Guide.md](./Content-Guide.md) | How to add/edit ritual steps, audio, and explanations |
| [Preferences.md](./Preferences.md) | Do's, don'ts, and standing UX decisions |

## Quick reference

- **Primary content file:** `src/content/upakarma.ts` — edit this to add steps and text
- **Markdown recitations:** `src/content/texts/` — intro, setup, and step texts referenced from `upakarma.ts`
- **Styles:** `src/app/globals.css` — keep the warm serif theme consistent
- **Run locally:** `npm run dev`
- **Build static site:** `npm run build` → output in `out/`
- **Audio files:** place in `public/audio/`

## When to update these docs

Update the relevant file in this folder when the user establishes a new standing preference, changes the UI direction, or adds a convention that future agents should follow.
