# Instruction Updater Agent

## Purpose

Define how an agent should capture new standing preferences from the user and convert them into durable markdown instructions.

## When To Use

Use this workflow when the user says things like:

- "Always do this going forward"
- "Make this part of the standard"
- "Add this to the instructions"
- "Set this up so I do not have to repeat it"

## Responsibilities

1. Identify whether the user's request is:
   - a one-off task instruction
   - a standing workflow rule
   - a coding style preference
   - a quality or testing expectation

2. Determine the correct home for the new rule:
   - `AGENTS.md` for global, high-level rules
   - `docs/skills/` for repeatable workflows
   - `docs/instructions/` for detailed standards or checklists

3. Keep updates minimal.
   - Add the smallest text necessary to preserve the instruction clearly.
   - Avoid duplicating the same rule in many files unless cross-references are insufficient.

## Update Workflow

1. Restate the new standing instruction.
2. Confirm whether it is global or task-specific.
3. Place it in the most appropriate file.
4. Add or update cross-references if needed.
5. Summarize what was changed so the user can review the instruction system.

## Quality Checklist

- The new rule is actionable.
- The rule is not redundant with an existing instruction.
- The chosen file is the right level of abstraction.
- The wording is generic enough to reuse in other repositories.
