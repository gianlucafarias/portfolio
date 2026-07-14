# Warm editorial color system

## Goal

Give the portfolio more visual character through one global warm editorial palette while preserving its restrained layout, typography, whitespace, project hierarchy, and interaction model.

## Approved direction

- Replace pure-white page backgrounds with a very light warm ivory.
- Replace the cool dark neutral with a warm charcoal.
- Use a slightly lighter paper surface for controls, forms, hover labels, and the project panel.
- Deepen the current orange into a restrained vermilion system with separate text, UI, and decorative roles.
- Add a subtle, accessible text-selection treatment.
- Keep images, project content, spacing, typography, and motion behavior unchanged.

## Explicit exclusion

Do not assign colors to individual projects. Project rows, hover previews, and case studies must all use the same global palette. No rotating palette, per-project tint, or color derived from project media is allowed.

## Palette architecture

The existing Tailwind zinc scale becomes a warm neutral ramp with stable OKLCH hues. Existing `zinc-*` utilities therefore inherit the editorial temperature without requiring a parallel styling system.

Semantic dynamic tokens expose:

- `canvas`: global page background.
- `paper`: elevated controls and content surfaces.
- `accent-text`: readable active and hover text.
- `accent-ui`: focus rings, icons, bullets, and component states.
- `accent-decoration`: underlines and non-essential visual accents.

The tokens switch values through the existing `data-theme` attribute. Pure black and white remain available for image outlines, preserving the established image-edge rule.

## Surface behavior

- The page and side panel use `canvas`.
- Inputs, floating labels, close controls, and outlined controls use `paper`.
- Shadows remain neutral and transparent.
- No gradients, decorative blobs, large color blocks, or new cards are introduced.

## Accessibility

- Accent text must pass WCAG AA for normal text and APCA Lc 60 where practical.
- Focus and icon colors must maintain at least 3:1 against adjacent surfaces.
- Small readable text in dark mode uses the lighter end of the warm-neutral scale.
- Red and green semantic feedback colors remain unchanged because their current combinations already pass.

## Verification

- Check light and dark themes on desktop and mobile.
- Verify active navigation, project hover, focus rings, form controls, selection, panel surfaces, and footer controls.
- Run lint, typecheck, Playwright, and the production build.
