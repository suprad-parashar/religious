# UI and Theme

## Design intent

Warm, calm, and readable — like a well-printed ritual booklet. The UI should feel respectful and unobtrusive, not flashy or app-like.

**Keep this aesthetic** when adding new pages or components.

## Typography

| Use | Value |
|-----|-------|
| Font family | `Georgia, "Times New Roman", serif` |
| Body line height | `1.7` |
| Section labels | Uppercase, small caps feel, `0.75rem`, letter-spacing `0.08em` |

Do not switch to sans-serif or modern UI fonts unless the user explicitly requests it.

## Color palette

| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#faf7f2` | Page background (warm cream) |
| Text primary | `#2c2416` | Body text (dark brown) |
| Text muted | `#7a6a55` | Subtitles, labels |
| Text faint | `#9a8468` | Section labels, footer |
| Accent / header | `#5c3d1e` | Step headers, headings, active buttons |
| Border light | `#e8dfd0` | Card borders |
| Border medium | `#e0d5c4` | Dividers, audio blocks |
| Border accent | `#c9b89a` | Active/hover states |
| Panel background | `#f5efe6` | Tell-me-more side panel |
| Card background | `#ffffff` | Step cards, intro, recording |

## Layout patterns

### Default (panel closed)

- Centered column, `max-width: 720px`
- Steps stacked vertically with generous spacing (`2rem` gap)

### Panel open (page-level split)

- Left: procedure (`flex: 1 1 55%`), full height, scrollable
- Right: detail panel (`flex: 0 0 45%`, `max-width: 480px`), sticky, `height: 100vh`, scrollable
- Active step gets a subtle border highlight (`step--active`)

### Mobile (≤ 800px)

- Panel overlays from the right (`position: fixed`, ~88vw wide)
- Instructions remain visible and scrollable behind/ beside the panel
- Do not replace this with a full-screen modal that hides the procedure

## Components

### Setup card

- White card below the intro, same border and radius as the intro
- Uppercase brown heading
- Labeled lists: "What you need", "How to prepare", optional "Notes"

### Step card

- Dark brown header bar with step title
- White body with "What to do" + subtexts (text and/or audio)
- "Tell me more" only when the step has `information`
- No inline explanations or commentary in the body

### Buttons

- Ghost style: cream background, brown border and text
- Active state: inverted (brown background, cream text)
- Rounded corners (`6px`), modest padding

### Audio blocks

- Nested cream box inside the card
- Full recording: native `<audio controls>`
- Step clips (`startTime` / `endTime`): Play/Pause, seek bar, and clock for that segment only
- Repeating clips: one combined seek bar and clock; the counter tracks the current repeat and jumps to that timestamp

### Detail panel

- Slightly darker cream background than page
- Left border separator
- Markdown body from the step's `information` file

## CSS conventions

- All styles live in `src/app/globals.css`
- Use semantic class names (`.step`, `.detail-panel`, `.tell-me-more-btn`)
- No CSS modules, no Tailwind, no styled-components unless the user explicitly asks
- Prefer extending existing classes over introducing parallel styling systems

## Accessibility

- Use `aria-pressed` on toggle buttons
- Use `aria-label` on close buttons
- Support **Escape** to close the detail panel
- Ensure focus-visible outlines on interactive elements
