# Documentation Style

## Purpose

Define what "well documented" means without encouraging unnecessary comments.

## Standard

Code should be understandable through good structure and naming first. Documentation should explain intent, constraints, or non-obvious behavior.

## Expectations

1. Use descriptive names for variables, functions, components, and types.
2. Keep functions and modules focused so their purpose is obvious.
3. Add docstrings or header comments when a unit has important behavior, constraints, or side effects.
4. Add inline comments only for logic that is not immediately clear from the code itself.
5. Remove stale comments when code changes.

## Avoid

- comments that merely narrate syntax
- comments added to every line without need
- vague wording such as "handle stuff here"
- documentation that falls out of sync with behavior

## Preferred Comment Types

- intent comments
- edge-case notes
- side-effect warnings
- temporary workaround explanations

## Litmus Test

If a competent engineer can understand the code from names and structure alone, extra commentary is probably unnecessary.
