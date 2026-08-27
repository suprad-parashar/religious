# Safe Minimal Implementation

## Purpose

Provide a repeatable workflow for building features and fixes with the least amount of code necessary while preserving quality.

## Inputs

- user request
- existing codebase conventions
- available test and validation commands

## Outputs

- the requested behavior
- concise, readable code changes
- validation evidence

## Workflow

1. Clarify the requested behavior.
   - Restate the task in plain language.
   - Ask follow-up questions if success criteria are unclear.

2. Inspect the local implementation surface.
   - Find the smallest set of files that need to change.
   - Prefer extending existing logic over creating new systems.

3. Choose the minimal design.
   - Avoid speculative abstractions.
   - Avoid solving future problems that were not requested.
   - Avoid unnecessary helpers, wrappers, and configuration.

4. Implement clearly.
   - Use consistent naming.
   - Keep functions and components focused.
   - Document only non-obvious logic and edge cases.

5. Validate appropriately.
   - Run relevant tests.
   - Add focused tests if the change introduces meaningful regression risk.
   - For UI work, verify alignment, spacing, states, responsiveness, and interaction behavior.

6. Review and report.
   - Confirm the implementation is still the smallest reasonable solution.
   - Summarize what changed and how it was verified.

## Guardrails

- Do not assume missing requirements.
- Do not expand scope for elegance alone.
- Do not add code just to make the diff look substantial.
- Do not skip validation because the change appears small.

## Quality Checklist

- The implementation matches the requested behavior.
- The code is no larger than necessary.
- Readability is preserved or improved.
- Relevant tests or checks were run.
- UI quality was checked when applicable.
