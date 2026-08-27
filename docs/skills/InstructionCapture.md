# Instruction Capture

## Purpose

Capture new user preferences and convert them into durable project instructions so the same guidance does not need to be repeated in future chats.

## Trigger

Use this skill whenever the user introduces a new recurring expectation about:

- implementation style
- testing behavior
- documentation standards
- communication style
- review or quality control rules

## Workflow

1. Identify the actual standing rule.
   - Separate the durable preference from any one-off task context.

2. Normalize the wording.
   - Rewrite the instruction so it is clear, generic, and reusable across projects.

3. Select the target file.
   - Use `AGENTS.md` for a concise global rule.
   - Use `docs/instructions/` for detailed standards.
   - Use `docs/skills/` for repeatable multi-step workflows.

4. Make the smallest possible update.
   - Prefer updating one authoritative file.
   - Add references elsewhere only when needed for discoverability.

5. Confirm the result.
   - Summarize the stored rule and where it now lives.

## Example

User request:
"Always check UI alignment after adding a button."

Stored rule:
"For UI changes, verify alignment, spacing, states, and basic interaction quality."

Likely destination:
`docs/instructions/QualityControlChecklist.md`

## Quality Checklist

- The standing preference was extracted correctly.
- The wording is future-proof.
- The rule was stored in the right place.
- The instruction system remains concise and non-redundant.
