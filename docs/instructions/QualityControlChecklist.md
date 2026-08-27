# Quality Control Checklist

## Purpose

Provide a default verification checklist for all changes, with extra attention to small defects that are easy to miss.

## Baseline Checks

- Confirm the implementation matches the requested behavior.
- Confirm the scope did not expand beyond the request.
- Confirm names, formatting, and structure match local conventions.
- Confirm comments and documentation are accurate and concise.

## Testing Checks

- Run the most relevant automated tests available.
- Add or update focused tests when they materially reduce regression risk.
- If no automated tests exist, perform the most direct manual verification possible and report it.

## UI Checks

For visual or interaction changes, verify:

- alignment
- spacing
- text centering
- hover, focus, active, disabled, loading, and error states where applicable
- responsiveness at reasonable sizes
- basic keyboard and pointer interaction where applicable

## Safety Checks

- Verify error paths and empty states when relevant.
- Check that no unrelated behavior was accidentally changed.
- Re-read the final diff for unnecessary code.

## Reporting Checks

The final update should say:

- what changed
- what was tested
- what still needs confirmation, if anything
