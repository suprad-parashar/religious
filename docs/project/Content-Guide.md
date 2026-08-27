# Content Guide

## Single source of truth

**All ritual content is edited in one file:**

```
src/content/upakarma.ts
```

Do not scatter step text across components or JSON files. The user populates content here; components only render it.

## Page-level fields

```typescript
export const upakarmaContent = {
  title: "...",           // Page heading
  subtitle: "...",        // Italic subtitle below title
  introduction: "...",    // Intro paragraph at top
  fullRecording: {
    src: "/audio/Upakarma.mp3",
    label: "Full Upakarma Recording",
  },
  steps: [ ... ],
};
```

## Step fields

Each entry in `steps`:

| Field | Shown where | Notes |
|-------|-------------|-------|
| `title` | Step card header + panel title | e.g. `"Step 1 — Achamana"` |
| `instruction` | Step card body | **Primary text during puja** — what to do |
| `explanation` | Side panel only | Optional overview; not shown on the card |
| `tellMeMore.meaning` | Side panel | Deeper context |
| `tellMeMore.symbolism` | Side panel | Symbolic significance |
| `tellMeMore.why` | Side panel | Why this step is performed |
| `tellMeMore.background` | Side panel | Historical/scriptural background |
| `tellMeMore.other` | Side panel | References, variations, notes |
| `audio` | Step card body | Mantra recording |

## Audio options

### Option A — separate clip per step

```typescript
audio: {
  src: "/audio/step-1.mp3",
  label: "Mantra for Step 1",
}
```

Place files in `public/audio/`.

### Option B — segment from full recording

Leave `src` empty and set timestamps in seconds:

```typescript
audio: {
  src: "",
  label: "Mantra for Step 1",
  startTime: 45,
  endTime: 120,
}
```

### Option C — no audio yet

```typescript
audio: {
  src: "",
  label: "Mantra for Step 1",
  startTime: 0,
  endTime: 0,
}
```

Shows a placeholder until audio is configured.

## Adding a new step

1. Copy an existing step object in the `steps` array
2. Update all fields (including every `tellMeMore` sub-field)
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
