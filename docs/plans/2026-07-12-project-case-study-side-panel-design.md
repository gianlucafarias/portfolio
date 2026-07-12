# Project case study side panel

## Goal

Show project case studies beside the page from which they were opened on desktop. The page remains visible as context, the project URL remains shareable, and the existing full-page mobile experience is preserved.

## Routing architecture

- Use Next.js App Router parallel and intercepted routes for project details.
- Opening `/projects/[slug]` from `/` renders the home on the left and the project detail on the right.
- Opening a project from `/projects` preserves the complete project list on the left.
- Mirror the behavior for `/en`, `/en/projects`, and `/en/projects/[slug]`.
- A direct desktop visit to a project URL uses the home as the default left-hand context.
- On viewports below `1024px`, keep the current full-page case study behavior.
- Preserve the existing project data source, localized content, metadata, and canonical project URLs.

## Desktop layout

- Expand the current root container only while a project detail is present.
- Keep the left column at approximately its current `max-w-xl` width.
- Give the right column a similar or slightly larger readable width.
- Separate the columns with whitespace only.
- Do not add a divider, overlay, card, large shadow, or decorative container.
- Keep the current background, typography, colors, and spacing language.
- Render the case study as one vertical content column. Do not preserve its current internal two-column layout.

## Interaction

- Opening the first project pushes its URL into browser history.
- Selecting another visible project replaces the current project URL and updates the open panel.
- Browser Back therefore closes the detail instead of stepping through every viewed project.
- The left page keeps its current scroll position but cannot scroll while the detail is open.
- Project links visible on the left remain interactive.
- Clicking another project changes the open detail.
- Clicking any non-project area on the left closes the detail.
- A fixed close button, `Escape`, and browser Back also close it.
- Closing restores the previous page and exact scroll position.
- Previous and next controls at the end of the detail navigate through all projects, including projects not featured on the home.

## Visual behavior

- Slightly reduce emphasis on the left page while keeping its visible project list at full emphasis.
- Use a restrained transition of approximately `300ms`.
- The layout expands, the left column shifts slightly left, and the right detail enters with a short horizontal movement and fade.
- Minimize or remove motion when `prefers-reduced-motion` is enabled.

## Case study content

Keep every existing populated field and render only sections that contain content. Use this reading order:

1. Close control.
2. Title, role, year, status, and type.
3. Main image.
4. Overview.
5. Impact and proof.
6. Product and source-code links.
7. Challenge.
8. Solution.
9. Process.
10. Personal role.
11. Technical architecture.
12. Migration strategy, current usage, learnings, and any remaining populated sections.
13. Previous and next project navigation.

Do not add accordions or new decorative cards.

## Accessibility

- Move focus to the project title when the detail opens.
- Return focus to the project link that opened it when the detail closes.
- Give the close control an accessible localized label.
- Support closing with `Escape`.
- Prevent unrelated controls in the left page from receiving keyboard focus while the detail is open, while keeping project links operable.
- Preserve logical heading order and keyboard navigation.
- Respect reduced-motion preferences.

## Verification

Verify both Spanish and English for:

- Opening from the home.
- Opening from the complete project list.
- Switching between visible projects.
- Previous and next navigation through all projects.
- Closing with the close control, `Escape`, outside click, and browser Back.
- Forward navigation after closing.
- Exact scroll restoration.
- Direct project URL entry and page reload.
- Metadata and canonical URL preservation.
- Unchanged mobile and tablet case study behavior below `1024px`.
- Keyboard focus management and reduced motion.

Run TypeScript type checking and a production build after implementation.
