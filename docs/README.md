# Docs Overview

This directory contains reusable markdown instructions that define how agents should work in this repository and in similar projects.

## Structure

- `project/`
  - **Project-specific** instructions for this repository (Upakarma guide, UI theme, content model).
- `agents/`
  - Role-level guidance for common agent behaviors.
- `skills/`
  - Repeatable workflows that can be applied to future tasks.
- `instructions/`
  - Focused standards, checklists, and decision rules.

## Recommended Usage

1. Start with `../AGENTS.md` for the global rules.
2. Read `project/README.md` for this repository's architecture, UI theme, and content conventions.
3. Use `agents/DefaultAgent.md` for normal implementation behavior.
4. Use `skills/SafeMinimalImplementation.md` when building or fixing features.
5. Use `skills/InstructionCapture.md` when the user introduces a new standing preference.
6. Use the documents in `instructions/` as the detailed reference layer.

## Design Goals

- Portable across repositories
- Small and readable
- Strict about requirement clarity
- Strict about minimal code
- Strict about testing and quality control
