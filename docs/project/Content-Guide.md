# Content Guide

## Single source of truth

**Structure and values are edited in:**

```
src/content/upakarma.ts
```

Long-form intro, setup, and recitation bodies live in `src/content/texts/` and are referenced from that file. Do not scatter step text across components.

## Page-level fields

```typescript
export const upakarmaContent = {
  title: "...",           // Page heading
  subtitle: "...",        // Italic subtitle below title
  introduction: { type: "md", src: "intro.md" },
  setup: {
    title: "...",         // Setup card heading (below intro)
    body: { type: "md", src: "setup.md" },
  },
  fullRecording: {
    src: "/audio/Upakarma.mp3",
    label: "Full Upakarma Recording",
  },
  steps: [ ... ],
};
```

## Intro and setup

Both use the same text types as subtexts (typed-in string, markdown file, or templated markdown).

| Field | File | Notes |
|-------|------|-------|
| `introduction` | `src/content/texts/intro.md` | Intro card body |
| `setup.title` | `upakarma.ts` | Card heading, e.g. `"Before you begin"` |
| `setup.body` | `src/content/texts/setup.md` | Card body — headings, lists, and notes |

```typescript
introduction: { type: "md", src: "intro.md" },
setup: {
  title: "Before you begin",
  body: { type: "md", src: "setup.md" },
},
```

In `setup.md`, use `## What you need` style headings; they render as the same labels as before. `{{placeholders}}` work if you set `type: "template"` and pass `values`.

## Your details

After setup, the page asks for country, location, ritual date, and japa count. Location and japa count are stored in the browser; **ritual date defaults to today on each visit** and is not saved.

- **Date for sankalpa** — defaults to today; drives panchanga placeholders (`{{samvatsara}}`, `{{tithi}}`, etc.)
- **Use my location** — browser geolocation + reverse geocode fills country, state, and city on first visit
- Country: dropdown (add entries in `COUNTRY_OPTIONS` and a `location-{code}.md` file)
- **State and city** for United States and India (text city), used as `{{state}}` and `{{city}}` in markdown (`location-us.md`, `location-in.md`). Typed city + state are forward-geocoded (BigDataCloud) to lat/lon; **panchanga placeholders stay blank until coordinates exist** (GPS or successful geocode — no state-centroid fallback).
- Japa count: 27, 54, 108, or Yatha Sambhava. Put `useJapaCount: true` on an audio clip to follow this setting. Use `{{japaCountLabel}}` in instructions.

## Step fields

Each entry in `steps`:

| Field | Shown where | Notes |
|-------|-------------|-------|
| `title` | Step card header + panel title | e.g. `"Step 1 — Achamana"` |
| `instruction` | Step card body | **Primary text during puja** — what to do |
| `information` | Side panel | Optional. Markdown (or typed-in / template) for "Tell me more". Omit to hide the button. |
| `subtexts` | Step card body | Recitation parts — each can have an optional title, text, and/or audio |

```typescript
information: { type: "md", src: "achamana-info.md" },
```

Omit `information` to hide the "Tell me more" button for that step. Headings and lists in the markdown file are rendered in the side panel.

## Subtexts

A step can have several parts. Add one object per mantra or recitation block:

```typescript
subtexts: [
  {
    title: "Opening mantra",
    text: "Om ...",
    audio: {
      src: "/audio/Upakarma.mp3",
      label: "Mantra for this part",
      startTime: 45,
      endTime: 120,
    },
  },
  {
    text: "[Text only — no audio yet.]",
  },
  {
    audio: {
      src: "/audio/step-4b.mp3",
      label: "Audio only",
    },
  },
]
```

- `title` is optional. When present, it is shown as the part label (same style as “What to do”).
- `text` can be typed in, loaded from a markdown file, or loaded from a templated markdown file. If there is no title, a **Text** label is shown.
- `audio` is optional. Omit it for text-only parts.
- Leave `src` empty and set `startTime` / `endTime` to clip a segment from the full recording. The player is clipped to that range.
- `repeat` is optional. Set `repeat: 3` to play that clip as one combined timeline three times as long. The counter shows which repeat you are in and jumps to that timestamp. Omit or `1` to play once.
- Place separate clip files in `public/audio/`.

### Text type 1 — typed in

```typescript
text: "Om ...\nSecond line."
```

Line breaks are preserved.

### Text type 2 — markdown file

Put the file in `src/content/texts/` (or pass a path from the project root):

```typescript
text: { type: "md", src: "sankalpa.md" }
```

### Text type 3 — templated markdown

Same as type 2, with `{{placeholders}}` in the file replaced by `values` from this content file.

```md
I, {{name}} of the {{gotra}} gotra, ...
```

```typescript
text: {
  type: "template",
  src: "sankalpa.md",
  values: {
    name: "Suprad",
    gotra: "[Gotra]",
  },
}
```

Unknown placeholders are left as `{{name}}` so missing keys are easy to spot.

User-config and calendar placeholders are filled at runtime in `applyUserConfig`. Calendar fields use the **Shaka, amanta** panchanga from `@ishubhamx/panchangam-js` (sunrise at the user’s country / US state). See `src/lib/panchanga.ts`.

| Placeholder | Meaning |
|-------------|---------|
| `{{samvatsara}}` | Shaka 60-year name (e.g. Parabhava) |
| `{{shakaYear}}` | Shaka year number (e.g. 1948) |
| `{{vasara}}` | Weekday in sankalpa form (e.g. Ravivasara) |
| `{{masa}}` | Amanta lunar month |
| `{{paksha}}` | Shukla or Krishna |
| `{{tithi}}` | Tithi name at sunrise |
| `{{nakshatra}}` | Nakshatra at sunrise |
| `{{ritu}}` | Season |
| `{{ayana}}` | Uttarayana or Dakshinayana |

## Adding a new step

1. Copy an existing step object in the `steps` array
2. Add `information` only if that step has deeper context (a markdown file in `src/content/texts/`)
3. Run `npm run build` to verify types

## Adding a new ritual/page (future)

If the project grows beyond Upakarma:

1. Create a new content file (e.g. `src/content/other-ritual.ts`)
2. Create matching types in `src/types/`
3. Reuse `StepCard`, `TellMeMorePanel`, and `AudioPlayer`
4. Add a new route under `src/app/`
5. Document the new content file here

## Content tone

- Instructions: clear, imperative, concise — someone is actively performing the ritual
- Explanations: respectful, informative, unhurried — for when the user chooses to read more
- Do not editorialize or add commentary the user did not provide
