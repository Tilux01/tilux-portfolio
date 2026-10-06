# Design Specification - Tilux Portfolio (Editorial Minimalist / Dual Theme)

Source of truth. Everything in the CSS must trace back to a value below.

---

## 1. Design Philosophy & Aesthetic
- **Mood / Archetype:** Editorial minimalist, modern, calm confidence. High-end studio brochure energy.
- **Visual density:** High whitespace ratio. Generous container padding (48-64px vertical gaps), tight typographic grouping, deliberate asymmetric negative space.
- **Surface elevation model:** Flat cards on a minimalist backdrop. Depth comes from 1px borders plus one soft ambient shadow, never from heavy gradients.
- **Theme:** Dual theme, light default. Light canvas #FAFAFA / dark canvas #121212. System preference respected, manual toggle persisted to localStorage.

---

## 2. Color Tokens

### Light theme
| Token | Value | Usage |
|---|---|---|
| --color-bg-app | #FAFAFA | Page backdrop |
| --color-surface-1 | #FFFFFF | Cards |
| --color-surface-2 | #F3F4F6 | Modals, dropdowns, pill badges |
| --color-surface-3 | #E5E7EB | Floating pills |
| --color-border-base | #E5E7EB | Default borders, dividers |
| --color-text-primary | #111111 | Headings, primary text |
| --color-text-muted | #6B7280 | Secondary body |
| --color-text-disabled | #9CA3AF | Disabled / meta |

### Dark theme
| Token | Value |
|---|---|
| --color-bg-app | #121212 |
| --color-surface-1 | #1E1E1E |
| --color-surface-2 | #2A2A2A |
| --color-surface-3 | #333333 |
| --color-border-base | #2D2D2D |
| --color-text-primary | #FFFFFF |
| --color-text-muted | #9CA3AF |

### Brand + status (theme independent)
| Token | Value |
|---|---|
| --color-primary | #111111 |
| --color-primary-hover | #333333 |
| --color-primary-active | #000000 |
| --color-accent | #2563EB |
| --color-success | #10B981 |
| --color-warning | #F59E0B |
| --color-danger | #EF4444 |

In dark theme the primary button inverts: background #FFFFFF, text #111111.

---

## 3. Typography

Font: **Plus Jakarta Sans** (400, 500, 600, 700) via Google Fonts. Code: `ui-monospace, SFMono-Regular, Menlo, monospace`.

| Level | Size | Weight | Line height | Tracking | Transform |
|---|---|---|---|---|---|
| Display 1 | 3.5rem / 56px | 700 | 1.1 | -0.02em | none |
| Heading 1 | 2.25rem / 36px | 700 | 1.2 | -0.01em | none |
| Heading 2 | 1.5rem / 24px | 600 | 1.3 | 0 | none |
| Heading 3 | 1.25rem / 20px | 600 | 1.4 | 0 | none |
| Body Large | 1.125rem / 18px | 400 | 1.5 | 0 | none |
| Body Regular | 1rem / 16px | 400 | 1.5 | 0 | none |
| Caption / Subtitle | 0.875rem / 14px | 500 | 1.4 | 0.05em | uppercase |

Display 1 scales down to 2.5rem on mobile (< 640px).

---

## 4. Spatial Grid

8pt scale:
- space-1 4px - micro gaps, badge inner
- space-2 8px - button padding, icon spacing
- space-3 12px - input padding, card gaps
- space-4 16px - card padding, grid gap
- space-6 24px - section inner
- space-8 32px - container margins, header gaps
- space-12 48px - hero vertical padding
- space-16 64px - page section separation

Container: max-width 1280px, centred, fluid padding. Page padding: 24px mobile, 40px tablet, 64px desktop.
Breakpoints: sm 640, md 768, lg 1024, xl 1280, 2xl 1440.

Radii: pill 9999px, card 16px, input 10px, badge 9999px.

Shadows:
- --shadow-card: 0 8px 32px rgba(0,0,0,0.04)
- --shadow-glow: 0 0 20px rgba(17,17,17,0.1)
- elevation on card hover: translateY(-2px) + shadow-card

---

## 5. Section Sequence
1. Navbar - sticky, blur backdrop, logo left, links centre/right, theme toggle + CTA right.
2. Hero Banner - eyebrow status pill, Display 1 name, role line, body copy, dual CTA, portrait card on the right (asymmetric 7/5 split).
3. Selected Work Grid - 2 column cards, each: cover (CSS rendered), title, meta row of tags, arrow affordance.
4. Service List - expanding accordion rows, number + title + description reveal on open.
5. Experience List - timeline rows, role, org, period, summary.
6. CTA Section - full width surface, centred heading, primary + secondary button.
7. Footer - brand block, link columns, meta row.

---

## 6. Components

### Pill badge
padding 6px 14px, font-size 12px, weight 500, tracking 0.05em, radius 9999px, background var(--color-surface-2), border 1px solid var(--color-border-base). Status variant holds a 8px success dot.

### Buttons
| State | Primary | Secondary |
|---|---|---|
| Default | bg #111, text #FFF | transparent, border 1px var(--color-border-base) |
| Hover | bg #333, scale 1.02 | border #111 |
| Focus-visible | ring 2px #111, offset 2 | ring 2px #111, offset 2 |
| Active | scale 0.98 | bg var(--color-surface-2) |
| Disabled | opacity 0.4, no pointer | opacity 0.4 |

Radius 9999px. Padding 12px 28px. Weight 600.

### Inputs
border 1px var(--color-border-base), radius 10px, bg var(--color-surface-1), padding 12px 16px. Hover border #111. Focus ring 2px. Error border #EF4444 with inline message.

### Cards
bg var(--color-surface-1), border 1px var(--color-border-base), radius 16px, transition all 0.25s. Hover: translateY(-2px) + shadow-card.

### Accordion
Row with 1px top border, number, title (Heading 3), plus/minus glyph. Open state: max-height transition, description slides down. Grid uses 0fr->1fr trick.

---

## 7. Motion
- Entrance: fade + translateY(16px) -> 0, duration 0.4s, ease cubic-bezier(0.16,1,0.3,1), stagger children 0.1s.
- Buttons: all 0.25s ease-in-out, scale on hover/active.
- Accordion: grid-template-rows 0fr -> 1fr, 0.35s cubic-bezier(0.16,1,0.3,1).
- Theme swap: color/background 0.3s ease.
- Respect prefers-reduced-motion: disable transforms, keep opacity.

---

## 8. Accessibility
- Contrast: body #111 on #FFF 16.1:1 AAA; muted #6B7280 on #FFF 4.8:1 AA; button text #FFF on #111 16.1:1 AAA; badge #1F2937 on #F3F4F6 11.2:1 AAA.
- :focus-visible outline 2px solid currentColor, offset 2px.
- Semantic landmarks, aria-expanded on accordions, aria-label on icon buttons, skip link.
- Theme toggle has aria-pressed.

---

## 9. Symbol Safety
- No raw em-dash glyphs in markup; use &mdash; or CSS ::before.
- Sparkle/star: &#10022; or inline SVG.
- Status dot: <span class="dot"></span> styled, never a raw glyph.
