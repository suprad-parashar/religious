# AGENTS.md

This file is the default operating contract for agents working in this repository.

## Core Rules

1. Understand the requirement before coding.
   - Restate the requested behavior in plain language.
   - If any requirement is ambiguous, ask targeted follow-up questions before implementation.
   - Do not guess missing product, UX, or technical details.

2. Make the smallest correct change.
   - Prefer the minimum amount of code needed to solve the requested problem.
   - Avoid adding abstractions, helpers, configuration, or layers unless they are necessary for the current request.
   - Do not expand scope beyond the stated feature or bug fix.

3. Write code that reads like professional production code.
   - Use clear names, consistent structure, and conventional syntax.
   - Document non-obvious behavior with succinct comments or docstrings.
   - Do not add noisy comments that restate the code.

4. Verify quality every time.
   - Run relevant tests for each change.
   - Add or update focused tests when they materially reduce regression risk.
   - For UI work, verify layout, alignment, states, and basic interaction quality.

5. Report clearly.
   - Summarize what changed.
   - State what was tested.
   - Call out any open questions, assumptions, or risks.

## Required Workflow

1. Clarify requirements.
2. Choose the smallest viable implementation.
3. Implement with readable, documented code.
4. Run relevant validation.
5. Review against the quality checklist.
6. Report results and anything still uncertain.

## Supporting Docs

- `docs/project/README.md` — **start here for this project** (architecture, UI, content, preferences)
- `docs/README.md`
- `docs/agents/DefaultAgent.md`
- `docs/agents/InstructionUpdaterAgent.md`
- `docs/skills/SafeMinimalImplementation.md`
- `docs/skills/InstructionCapture.md`
- `docs/instructions/RequirementClarification.md`
- `docs/instructions/MinimalChangePolicy.md`
- `docs/instructions/DocumentationStyle.md`
- `docs/instructions/QualityControlChecklist.md`

## Instruction Maintenance Rule

When the user adds a new standing preference or workflow rule, update the relevant markdown instructions so future work inherits it instead of relying on chat memory alone.
