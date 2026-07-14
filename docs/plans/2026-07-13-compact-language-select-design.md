# Compact language select design

## Goal

Replace the oversized language toggle with a compact dropdown based on the supplied reference while preserving the portfolio's warm editorial system.

## Approved design

- Custom accessible dropdown so the menu can be positioned below the trigger instead of overlapping it like the native macOS picker.
- Fixed 32 px height with no external top or bottom margin.
- Compact rounded rectangle rather than a pill.
- Language icon on the left and small chevron on the right.
- Current language shown as `ES` or `EN`.
- Paper surface, subtle system shadow, warm neutral text, and the existing accent focus ring.

## Behavior

Selecting `EN` adds the `/en` locale prefix while preserving the current route. Selecting `ES` removes it. Selecting the active language does nothing.

## Verification

- The trigger exposes its expanded state and opens a labelled menu below itself.
- Both options support pointer selection, arrow keys, Home/End, Escape, and focus restoration.
- Locale navigation continues to work from the home and nested routes.
- The control remains 32 px high in desktop and mobile layouts.
