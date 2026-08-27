# Minimal Change Policy

## Purpose

Keep implementations intentionally small, direct, and proportional to the requested outcome.

## Core Standard

The best change is the smallest change that fully and correctly solves the requested problem.

## Rules

1. Prefer editing existing code over introducing new files or layers.
2. Add abstractions only when the current task truly requires them.
3. Do not generalize for hypothetical future use.
4. Do not create large diffs to express simple behavior.
5. Avoid duplicate logic unless a small duplication is cheaper and clearer than premature abstraction.

## Decision Filter

Before adding code, ask:

- Is this required for the current feature or fix?
- Is there a simpler way to express the same behavior?
- Am I solving today's problem or tomorrow's imagined problem?
- Does this improve readability, or only increase structure?

## Signs The Change Is Too Large

- new utility layers for one use case
- multiple new abstractions without current need
- configuration added for behavior that could stay local
- broad refactors attached to a narrow request

## Acceptable Exceptions

Larger changes are acceptable when they are required for:

- correctness
- safety
- testability
- matching an established local pattern
