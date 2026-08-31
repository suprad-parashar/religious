# Overview

## Purpose

A static web guide for performing **Yajur Veda Upakarma** — a step-by-step ritual procedure with mantra audio and optional deeper explanations.

The site is designed to be used **during the puja**: the main view stays focused on what to do, not on theological commentary.

## Audience

- Someone actively performing the ritual who needs clear, distraction-free instructions
- Someone preparing beforehand who wants to read deeper context on demand

## Core experience

1. User sees the full procedure as a scrollable list of steps
2. Each step shows **what to do** and **mantra audio** — nothing else by default
3. If a step has `information`, the user can click **"Tell me more about this"** to open a **page-level side panel** with that markdown
4. The left side (full procedure) remains visible and scrollable while the panel is open

## Scope

This repository may grow to include other religious guides or rituals. When adding new pages:

- Follow the same UX principles (procedure first, context on demand)
- Reuse the established theme and layout patterns
- Prefer a single editable content file per ritual/guide

## What this is not

- Not a CMS or database-backed app — content lives in TypeScript files
- Not an authenticated or multi-user platform
- Not a place for heavy frameworks, UI libraries, or unnecessary abstractions
