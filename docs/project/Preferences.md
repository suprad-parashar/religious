# Preferences — Do's and Don'ts

Standing decisions from the project owner. Follow these unless explicitly told otherwise.

## UX

### Do

- Keep the **main view focused on procedure** — instructions and audio only
- Put all explanations and commentary in the **page-level side panel** via optional step `information` (markdown)
- Hide **"Tell me more"** when a step has no `information`
- Keep the **full procedure visible and scrollable** on the left when the panel is open
- Let users follow along with the ritual while optionally reading context on the right
- Use **Escape** or the close button to dismiss the panel
- Highlight the active step when its panel is open

### Don't

- **Do not show explanations inline** on step cards — the user is performing puja and does not want distractions
- **Do not open the detail panel inside a single card** — it must be a page-level split
- Do not use modals or full-screen overlays that hide the procedure
- Do not auto-open the panel or show commentary by default
- Do not add pop-ups, toasts, or animations that draw attention during the ritual flow

## Code

### Do

- Keep `src/content/upakarma.ts` as the single editable content file for steps, audio, and template values
- Put intro, setup, and long recitation markdown in `src/content/texts/` and reference it from `upakarma.ts`
- Use a single client boundary (`UpakarmaGuide.tsx`) for page interactivity
- Use plain CSS in `globals.css` matching the established theme
- Run `npm run build` after structural changes
- Make the smallest change that solves the request

### Don't

- Do not add Tailwind, CSS-in-JS, or UI component libraries without being asked
- Do not import client components directly from server `page.tsx`
- Do not split content across multiple JSON/MD files unless the user requests it
- Do not over-abstract — no premature shared "ritual framework" unless needed
- Do not add tests, CI, or tooling the user did not ask for
- Do not commit `.context/` or local-only Conductor overrides unless asked

## Visual design

### Do

- Preserve the warm cream/brown serif aesthetic
- Keep generous whitespace and readable font sizes
- Match existing button, card, and panel styles when adding UI

### Don't

- Do not switch to a modern/saas look (dark mode, gradients, sans-serif) unless asked
- Do not add decorative elements that clutter the ritual-focused layout
- Do not change the color palette without updating `UI-and-Theme.md`

## Content

### Do

- Use placeholders like `[Describe what to do...]` when scaffolding new steps
- Let the user provide the actual Sanskrit ritual text and theological content
- Support per-step audio clips or timestamps from the full recording
- Use **Shaka, amanta** panchanga for calendar placeholders (`{{samvatsara}}`, `{{vasara}}`, and the rest), not Vikram / purnimanta

### Don't

- Do not invent ritual procedures or mantras — use placeholders
- Do not guess theological meaning or symbolism

## When the user adds a new preference

1. Implement the change
2. Update the relevant file in `docs/project/`
3. If it is a global agent rule, also update `AGENTS.md` or `docs/instructions/` as appropriate
