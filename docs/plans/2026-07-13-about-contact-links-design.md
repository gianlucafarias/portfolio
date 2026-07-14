# About contact links design

## Goal

Replace the prominent button group below the About copy with a quieter editorial sentence. Keep CV access only in the final Contact section and restore the compact size of its links.

## Approved composition

The About section uses a single localized sentence:

- Spanish: `Encontrame en GitHub ↗, LinkedIn ↗ o enviame un correo a hello@gianluca.dev`
- English: `Find me on GitHub ↗, LinkedIn ↗ or email me at hello@gianluca.dev`

GitHub and LinkedIn are underlined external links with an arrow. The email address is an underlined `mailto:` link without an external-link arrow. The sentence has no pill, border, shadow, or control surface.

## Final contact actions

The Contact section keeps GitHub, LinkedIn, and Download CV. These actions return to their former compact pill dimensions (`px-2.5 py-1`) without a forced 44 px height.

## Verification

- The About section contains no CV or project action.
- All three inline links have correct destinations and visible focus styles.
- The Contact section contains one GitHub action, one LinkedIn action, and one CV action.
- Spanish and English copy remain equivalent.
