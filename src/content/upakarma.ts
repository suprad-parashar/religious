/**
 * Yajur Veda Upakarma — edit this file to add steps, explanations, and audio.
 *
 * Each step has:
 *   - title: short heading for the step
 *   - instruction: what to do (the procedure text)
 *   - explanation: optional overview shown only in the side panel
 *   - tellMeMore: deeper context shown in the side panel (meaning, symbolism, etc.)
 *   - audio: path to a mantra recording (leave src as "" until you have a clip)
 *            use startTime / endTime (seconds) to play a segment from the full recording
 */

import type { UpakarmaStep } from "@/types/upakarma";

export const upakarmaContent = {
  title: "Yajur Veda Upakarma",
  subtitle: "Procedure and Mantra Guide",

  introduction:
    "This page walks through the Yajur Veda Upakarma procedure step by step. " +
    "Follow the instructions for each part, and listen to the corresponding mantra audio. " +
    "[Replace this with your own introduction.]",

  /** Full recording of the entire Upakarma procedure */
  fullRecording: {
    src: "/audio/Upakarma.mp3",
    label: "Full Upakarma Recording",
  },

  steps: [
    {
      title: "Step 1 — [Title]",
      instruction:
        "[Describe what to do in this step. E.g. Sit facing east, perform achamana, ...]",
      explanation: "[Optional overview — shown only in the side panel.]",
      tellMeMore: {
        meaning: "[What this step means in the broader ritual context.]",
        symbolism: "[Symbolic significance — what it represents.]",
        why: "[Why this step is performed.]",
        background: "[Historical or scriptural background.]",
        other: "[Any other notes, references, or variations.]",
      },
      audio: {
        src: "",
        label: "Mantra for Step 1",
        startTime: 0,
        endTime: 0,
      },
    },
    {
      title: "Step 2 — [Title]",
      instruction: "[Describe what to do in this step.]",
      explanation: "[Optional overview — shown only in the side panel.]",
      tellMeMore: {
        meaning: "[Meaning of this step.]",
        symbolism: "[Symbolic significance.]",
        why: "[Why this step is performed.]",
        background: "[Background context.]",
        other: "[Other notes.]",
      },
      audio: {
        src: "",
        label: "Mantra for Step 2",
        startTime: 0,
        endTime: 0,
      },
    },
    {
      title: "Step 3 — [Title]",
      instruction: "[Describe what to do in this step.]",
      explanation: "[Optional overview — shown only in the side panel.]",
      tellMeMore: {
        meaning: "[Meaning of this step.]",
        symbolism: "[Symbolic significance.]",
        why: "[Why this step is performed.]",
        background: "[Background context.]",
        other: "[Other notes.]",
      },
      audio: {
        src: "",
        label: "Mantra for Step 3",
        startTime: 0,
        endTime: 0,
      },
    },
  ] satisfies UpakarmaStep[],
};
