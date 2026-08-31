/**
 * Yagnopaveetam change — separate procedure from Sankshipta Upakarma.
 * Edit this file for steps, explanations, and audio specific to changing the sacred thread.
 */

import type { UpakarmaContent, UpakarmaStep } from "@/types/upakarma";

export const yagnopaveetamContent = {
  title: "Yagnopaveetam Change",
  subtitle: "Procedure and Mantra Guide",

  introduction: { type: "md", src: "intro-yagnopaveetam.md" },

  setup: {
    title: "Before you begin",
    body: { type: "md", src: "setup-yagnopaveetam.md" },
  },

  fullRecording: {
    src: "/audio/Yagnopaveetam.mp3",
    label: "Full Yagnopaveetam Change Recording",
  },

  steps: [
    {
      title: "Achamana (Purification)",
      instruction: "Do Achamana three times.",
      subtexts: [
        {
          text: { type: "md", src: "achamana.md" },
          title: "Achamana Mantra",
        },
      ],
    },
    {
      title: "Pranayama (Breathing Control)",
      instruction: "Do Pranayama 3 times while reciting the mantra",
      subtexts: [
        {
          text: { type: "md", src: "pranayama.md" },
          title: "Pranayama Mantra",
        },
      ],
    },
    {
      title: "Sankalpa (Intention)",
      instruction:
        "Clasp your right palm onto your left palm in a perpendicular position. Bring your hands onto your right thigh with the bottom of your left hand touching your right thigh. Read each part aloud in order.",
      subtexts: [
        {
          audio: {
            src: "/audio/Upakarma.mp3",
            label: "Prarthane and Timeline",
            startTime: 156,
            endTime: 219.5,
          },
        },
        {
          title: "Location",
          text: { type: "md", src: "location-{{country}}.md" },
        },
        {
          audio: {
            src: "/audio/Upakarma.mp3",
            label: "Current Samvatsara",
            startTime: 231.5,
            endTime: 239.5,
          }
        },
        {
          text: { type: "md", src: "random_day.md" },
          title: "Current Date and Time, and Intent",
        },
      ],
    },
    {
      title: "Yagnopaveeta Dharana (Wearing the Yagnopaveeta)",
      instruction: "Find the Brahmagranthi (knot) on the Yagnopaveeta and place it on the center of your right palm. Make sure your right palm is facing upwards. Place the opposite end of the Yagnopaveeta on your left palm and make sure the left palm is facing downwards. Recite the following mantra.",
      subtexts: [
        {
          audio: {
            src: "/audio/Upakarma.mp3",
            label: "Yagnopaveeta Dharana Mantra",
            startTime: 508,
            endTime: 545,
          }
        }
      ],
    },
    {
      title: "Achamana (Purification)",
      instruction: "Do Achamana once",
      subtexts: [
        {          
          text: { type: "md", src: "achamana.md" },
          title: "Achamana Mantra",
        },
      ],
    },
    {
      when: { married: true },
      title: "Yagnopaveeta Dharana for married person (Wearing the Yagnopaveeta)",
      instruction: "Follow the instructions based on the text and audio.",
      subtexts: [
        {
          text: "Clasp your right palm onto your left palm in a perpendicular position. Bring your hands onto your right thigh with the bottom of your left hand touching your right thigh.",
          title: "Instruction",
        },
        {
          audio: {
            src: "/audio/Upakarma.mp3",
            label: "Yagnopaveeta Dharana Sankalpa",
            startTime: 588,
            endTime: 604,
          }
        },
        {
          text: "Recite the mantra at the pauses.",
          title: "Instruction",
        },
        {
          audio: {
            src: "/audio/Upakarma.mp3",
            label: "Yagnopaveeta Dharana Mantra",
            startTime: 508,
            endTime: 545,
          }
        }
      ],
    },
    {
      when: { wearsYagnopaveetam: true },
      title: "Yagnopaveeta Dharana for people who wear the Yagnopaveeta in lieu of upper garment",
      instruction: "Find the Brahmagranthi (knot) on the Yagnopaveeta and place it on the center of your right palm. Make sure your right palm is facing upwards. Place the opposite end of the Yagnopaveeta on your left palm and make sure the left palm is facing downwards. Recite the following mantra.",
      subtexts: [
        {
          text: "Clasp your right palm onto your left palm in a perpendicular position. Bring your hands onto your right thigh with the bottom of your left hand touching your right thigh.",
          title: "Instruction",
        },
        {
          audio: {
            src: "/audio/Upakarma.mp3",
            label: "Yagnopaveeta Dharana Sankalpa",
            startTime: 680.5,
            endTime: 694,
          }
        },
        {
          text: "Recite the mantra at the pauses.",
          title: "Instruction",
        },
        {
          audio: {
            src: "/audio/Upakarma.mp3",
            label: "Yagnopaveeta Dharana Mantra",
            startTime: 508,
            endTime: 545,
          }
        }
      ],
    },
    {
      title: "Yagnopaveeta Visarjana (Removing the Yagnopaveeta)",
      instruction: "Recite the following mantra at the pauses. Remove the Yagnopaveeta over your feet.",
      subtexts: [
        {
          audio: {
            src: "/audio/Upakarma.mp3",
            label: "Yagnopaveeta Visarjana Mantra",
            startTime: 1075,
            endTime: 1100,
          }
        }
      ]
    },
    {
      title: "Achamana (Purification)",
      instruction: "Do Achamana once",
      subtexts: [
        {
          text: { type: "md", src: "achamana.md" },
          title: "Achamana Mantra",
        },
      ],
    },
    {
      title: "Ending Prayer",
      instruction: "Pray with folded hands.",
      subtexts: [
        {
          audio: {
            src: "/audio/Upakarma.mp3",
            label: "Samarpane Mantra",
            startTime: 1122,
            endTime: 1144,
          }
        }
      ],
    }
  ] satisfies UpakarmaStep[],
} satisfies UpakarmaContent;
