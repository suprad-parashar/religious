/**
 * Yajur Veda Upakarma — edit this file to add setup, steps, explanations, and audio.
 *
 * Each step has:
 *   - title: short heading (step numbers are added automatically at display time)
 *   - when: optional — omit the entire step unless context matches (e.g. { married: true })
 *   - instruction: what to do (the procedure text)
 *   - information: optional markdown for the side panel; omit to hide "Tell me more"
 *   - subtexts: mantra/recitation parts — each can have an optional title, text, audio, or any mix
 *            text can be a string, { type: "md", src }, or { type: "template", src, values }
 *            markdown files live in src/content/texts/ (intro.md, setup.md, and step texts)
 *            templates use {{placeholder}}
 *            use startTime / endTime (seconds) to play a segment from the full recording
 *            optional audio.repeat plays that clip that many times
 */

import type { UpakarmaContent, UpakarmaStep } from "@/types/upakarma";

export const upakarmaContent = {
  title: "Yajur Veda Upakarma",
  subtitle: "Procedure and Mantra Guide",

  introduction: { type: "md", src: "intro.md" },

  setup: {
    title: "Before you begin",
    body: { type: "md", src: "setup.md" },
  },

  /** Full recording of the entire Upakarma procedure */
  fullRecording: {
    src: "/audio/Upakarma.mp3",
    label: "Full Upakarma Recording",
  },

  steps: [
    {
      title: "Prarambha (Start)",
      instruction:
        "Pray with folded hands",
      subtexts: [
        {
          audio: {
            src: "/audio/Upakarma.mp3",
            label: "Prarthane",
            startTime: 67,
            endTime: 114,
          },
        },
      ],
    },
    {
      title: "Achamana (Purification)",
      instruction: "Do Achamana three times",
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
      title: "Japa Sankalpa (Intention)",
      instruction: "Clasp your right palm onto your left palm in a perpendicular position. Bring your hands onto your right thigh with the bottom of your left hand touching your right thigh. If there is audio, play the audio, if there is text, read the text out aloud. Do it sequentially.",
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
          text: "{{samvatsara}} nama samvatsarasya",
          title: "Current Samvatsara",
        },
        {
          audio: {
            src: "/audio/Upakarma.mp3",
            label: "Time and Date",
            startTime: 240.75,
            endTime: 249.25,
          }
        },
        {
          text: "{{vasara}} yuktayam",
          title: "Current Day",
        },
        {
          audio: {
            src: "/audio/Upakarma.mp3",
            label: "Hours, Minutes, and Seconds",
            startTime: 250,
            endTime: 285,
          }
        },
        {
          when: { japaCount: [27, 54, "yatha"] },
          subtexts: [
            {
              audio: {
                src: "/audio/Upakarma.mp3",
                label: "Commitment to Japa (part 1)",
                startTime: 295,
                endTime: 306.5,
              },
            },
            {
              title: "Japa Count Mantra",
              text: "{{japaSankhyakaMantra}}",
            },
            {
              audio: {
                src: "/audio/Upakarma.mp3",
                label: "Commitment to Japa (part 2)",
                startTime: 307,
                endTime: 313,
              },
            },
          ],
        },
        {
          audio: {
            src: "/audio/Upakarma.mp3",
            label: "Commitment to Japa",
            startTime: 295,
            endTime: 313,
          },
          when: { japaCount: 108 },
        },
      ],
    },
    {
      title: "Japa (Chanting)",
      instruction: "Chant \"Om Kamokarshin Manyurakarshin Namo Namaha\" {{japaCountLabel}}.",
      subtexts: [
        {
          audio: {
            src: "/audio/Upakarma.mp3",
            label: "Kamokarshin Manyurakarshin Japa Mantra",
            startTime: 333,
            endTime: 337,
            useJapaCount: true,
          }
        }
      ],
    },
    {
      title: "Pranayama (Breathing Control)",
      instruction: "Do Pranayama 1 time",
      subtexts: [
        {
          text: { type: "md", src: "pranayama.md" },
        },
      ],
    },
    {
      title: "Upakarma Sankalpa (Intention)",
      instruction: "Clasp your right palm onto your left palm in a perpendicular position. Bring your hands onto your right thigh with the bottom of your left hand touching your right thigh. If there is audio, play the audio, if there is text, read the text out aloud. Do it sequentially.",
      subtexts: [
        {
          audio: {
            src: "/audio/Upakarma.mp3",
            label: "Upakarmanga Sankalpa",
            startTime: 386,
            endTime: 407,
          }
        },
        {
          "audio": {
            src: "/audio/Upakarma.mp3",
            label: "Yagnopaveeta Dharana Sankalpa",
            startTime: 415,
            endTime: 422,
          }
        }
      ],
    },
    {
      title: "Yagnopaveeta Nyasa (Offering)",
      instruction: "Follow the instructions based on the text and audio.",
      subtexts: [
        {
          text: "Touch your right hand to your Parietal Bone of your head (vertex) and say the following mantra.",
          title: "Instruction",
        },
        {
          audio: {
            src: "/audio/Upakarma.mp3",
            label: "Yagnopaveeta Nyasa Mantra",
            startTime: 450,
            endTime: 456,
          }
        },
        {
          text: "Touch your right hand to your nose and say the following mantra.",
          title: "Instruction",
        },
        {
          audio: {
            src: "/audio/Upakarma.mp3",
            label: "Yagnopaveeta Nyasa Mantra",
            startTime: 455.5,
            endTime: 457.5,
          }
        },
        {
          text: "Touch your right hand to your chin and say the following mantra.",
          title: "Instruction",
        },
        {
          audio: {
            src: "/audio/Upakarma.mp3",
            label: "Yagnopaveeta Nyasa Mantra",
            startTime: 459,
            endTime: 465,
          }
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
      title: "Navakandarshi Tarpana (Offering)",
      instruction: "Follow the instructions based on the text and audio.",
      subtexts: [
        {
          text: { type: "md", src: "pranayama.md" },
          title: "Do Pranayama once",
        },
        {
          audio: {
            src: "/audio/Upakarma.mp3",
            label: "Navakandarshi Tarpana Sankalpa",
            startTime: 726,
            endTime: 739,
          }
        },
        {
          text: "Wear all your Yagnopaveetas like a necklace.Gather the Brahmagranthi (knot) from all the old and new Yagnopaveetas and place it on the center of your right palm. Gather the rice and sesame mixture and put some of it into your palm. Close your palm into a fist. At the end of each Rishi mantra (at the word 'Tarpayami'), pour water onto your fist over the fingers and let the water flow out from your knuckles. The word 'Tarpayami' is repeated 3 times, so pour water 3 times. During the pauses, repeat the mantra.",
          title: "Instruction",
        },
        {
          audio: {
            src: "/audio/Upakarma.mp3",
            label: "Navakandarshi Tarpana Mantra 1",
            startTime: 823,
            endTime: 836,
          }
        },
        {
          audio: {
            src: "/audio/Upakarma.mp3",
            label: "Navakandarshi Tarpana Mantra 2-7",
            startTime: 854,
            endTime: 929,
          }
        },
        {
          text: "For the 8th Rishi mantra, lift your right hand up and pour water onto your fist over the fingers and let the water flow out from your elbow. The word 'Tarpayami' is repeated 3 times, so pour water 3 times. During the pauses, repeat the mantra.",
          title: "Instruction",
        },
        {
          audio: {
            src: "/audio/Upakarma.mp3",
            label: "Navakandarshi Tarpana Mantra 8",
            startTime: 950,
            endTime: 960,
          }
        },
        {
          text: "For the last Rishi mantra, follow the instructions similar to the first seven Rishi mantras. Pour water onto your fist over the fingers and let the water flow out from your knuckles. The word 'Tarpayami' is repeated 3 times, so pour water 3 times. During the pauses, repeat the mantra.",
          title: "Instruction",
        },
        {
          audio: {
            src: "/audio/Upakarma.mp3",
            label: "Navakandarshi Tarpana Mantra 9",
            startTime: 970,
            endTime: 980,
          }
        },
        {
          text: "Wear all your Yagnopaveetas normally. Wash your hands to remove the rice and sesame mixture.",
          title: "Instruction",
        },
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
    },
  ] satisfies UpakarmaStep[],
} satisfies UpakarmaContent;
