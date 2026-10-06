# Master Build Plan - Tilux Portfolio (Editorial Minimalist)

## Objective
Rebuild the portfolio site from the new editorial minimalist spec. Replace the previous
dark-only cyberpunk build. Dual theme, Plus Jakarta Sans, 7 section sequence, zero dead UI.

## Deliverables
- index.html   single page, all 7 sections, semantic landmarks
- styles.css   token driven, light + dark theme, responsive 640/768/1024/1280
- script.js    theme toggle, scroll reveal, accordion, work filter, form validation, counters
- assets/portrait.jpg (reused from previous build)
- .Tilux/design.md, .Tilux/plan.md, .Tilux/project.json

## Execution Sequence
1. Recon existing project, back up previous build to .Tilux/legacy/
2. Research references, capture to .Tilux/images/
3. Analyse reference with vision model, write .Tilux/design.md
4. Write plan.md + project.json
5. Build index.html: navbar, hero, work grid, service list, experience list, CTA, footer
6. Build styles.css: tokens, base, components, sections, responsive, motion, a11y
7. Build script.js: all behaviours
8. Local verification pass (links, classes, console, overflow, a11y)
9. Serve on 8082, confirm HTTP 200
10. Git init + commit + push to github.com/Tilux01

## Content Model
| Section | Elements | Behaviour |
|---|---|---|
| Navbar | logo, 6 nav links, theme toggle, Hire me CTA | sticky, blur, smooth scroll, active link tracking |
| Hero | status pill, H1, role, body, 2 CTA, portrait card, stats | reveal on load, counters animate |
| Work | filter pills, 4 project cards | filter swaps cards, hover lift |
| Services | 5 accordion rows | one open at a time, aria-expanded |
| Experience | 4 timeline rows | reveal on scroll |
| CTA | heading, copy, 2 buttons | primary opens mailto, secondary scrolls to work |
| Footer | brand, 3 link columns, socials, meta | real anchors, back to top |

## Unwired-Element Policy
No element ships without behaviour. Every button, link, pill and card resolves to a real
action: scroll, filter, accordion, theme change, mailto, or external social URL.

## Constraints
- No comments anywhere in shipped code.
- No lorem ipsum, no placeholder images, no fake hrefs.
- No em dashes in copy.


## Revision 3 - spec-faithful layout pass

Owner review flagged that v2 followed the colour and type tokens but not the spec layout.
Confirmed and corrected:

- Hero rebuilt as the single centred card from the spec component blueprint.
  max-width 1024px, centred, surface-1 background, 1px border, 16px radius, card shadow.
  Removed the split two-column grid, the portrait card, the tag row and the marquee strip.
- Section vertical rhythm reduced from 96px to the spec range. Now 48px mobile / 64px desktop
  (space-12 / space-16 on the 8pt scale).
- Hero actions now exactly match section 5B: primary 12px 28px pill on #111111,
  secondary transparent with 1px border.
- Added the spec text input component with full state matrix: default, hover, focus ring,
  error, disabled, valid. Wired into a real contact form with genuine validation.
- Added the missing button states: disabled (opacity .4) and loading (spinner).
- Added card skeleton shimmer on cover image load.
- Contrast remediation: six pairs failed WCAG on the raw spec tokens. Kept every spec token
  pristine and introduced derived text-safe variants used only where a token renders as text.
