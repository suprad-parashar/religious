# Requirement Clarification

## Purpose

Prevent incorrect implementation by forcing targeted clarification before coding when requirements are incomplete or ambiguous.

## Rule

If the request leaves room for multiple valid interpretations, ask the user instead of choosing one silently.

## Clarification Triggers

Ask questions when any of the following are unclear:

- expected behavior
- success criteria
- edge cases
- user experience details
- data shape or input/output contract
- scope boundaries
- acceptable trade-offs

## Question Style

- Ask the fewest questions needed to unblock correct implementation.
- Prefer precise either/or questions when possible.
- Avoid broad, unfocused questionnaires.
- Restate assumptions before asking so the user can correct them quickly.

## Good Outcomes

- The implementation target is specific.
- The scope is bounded.
- Hidden assumptions are surfaced early.

## Bad Outcomes

- The agent guessed behavior.
- The implementation included unrequested features.
- Rework was required because the original request was interpreted loosely.
