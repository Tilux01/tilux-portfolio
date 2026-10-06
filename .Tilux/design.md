# Design Specification - Tilux Portfolio v3
Editorial Minimalist / Dark-on-Light Showreel

Source of truth. Every value in the CSS traces back to a line below.

## 1. Philosophy and Aesthetic
- Mood: editorial minimalist, modern portfolio showreel, high-contrast typography.
- Whitespace: high ratio. Asymmetric hero balances a large character portrait against sparse left-aligned typography.
- Elevation: flat ultra-clean canvas plus floating glass micro-cards for contextual stat callouts.
- Theme: light studio only. Dark-on-light means dark elements on a light canvas. There is no dark theme in this brief.

## 2. Color Tokens
| Token | Value | Usage |
|---|---|---|
| --color-primary | #111111 | Buttons, brand badge |
| --color-primary-hover | #222222 | Button hover |
| --color-primary-active | #000000 | Button active |
| --color-accent | #000000 | Accent text, link hover |
| --color-success | #10B981 | Valid field border |
| --color-warning | #F59E0B | Reserved, no warning UI in build |
| --color-danger | #EF4444 | Error field border |
| --color-bg-app | #F4F4F4 | Page canvas, hero canvas |
| --color-surface-1 | #FFFFFF | Cards, nav pill |
| --color-surface-2 | rgba(255,255,255,0.85) | Floating HUD glass |
| --color-surface-3 | #FFFFFF | Floating pills, chips, tags |
| --color-border-base | #E2E8F0 | Default borders and dividers |
| --color-border-muted | #CBD5E1 | Scrolled nav border |
| --color-border-hover | #94A3B8 | Input hover border |
| --color-border-active | #0F172A | Focus borders, HUD status dot, active pager dot |
| --backdrop-blur | blur(16px) | HUD card glass |
| --color-text-primary | #0F172A | Headings, body-strong |
| --color-text-muted | #64748B | Muted text on white surfaces |
| --color-text-muted-on-app | #5D6879 | Derived. Muted text on the #F4F4F4 canvas (see note) |
| --color-text-disabled | #CBD5E1 | Reserved, disabled text |
| --color-text-inverse | #FFFFFF | Text on primary button |
| --color-text-accent | #000000 | Link hover |

### Contrast note
The brief's audit table claims muted #64748B on #F4F4F4 = 5.1:1. Measured it is 4.33:1, which fails WCAG AA (4.5:1). #64748B on #FFFFFF measures 4.76:1 and passes. The base token is kept exactly as specified, and a derived --color-text-muted-on-app (#5D6879, 5.13:1 on #F4F4F4, 5.64:1 on #FFFFFF) is used only where muted text sits directly on the app canvas. Result: 0 contrast failures across 122 live text nodes.

## 3. Typography
Family: 'Plus Jakarta Sans', weights 400 500 600 700 800.

| Level | Size | Weight | Line height | Tracking | Transform |
|---|---|---|---|---|---|
| Display 1 | 72px (60px under 640px) | 800 | 1.05 | -0.03em | none |
| Heading 1 | 40px | 700 | 1.15 | -0.02em | none |
| Heading 2 | 24px | 600 | 1.3 | 0 | none |
| Heading 3 | 18px | 600 | 1.4 | 0 | none |
| Body Large | 16px | 400 | 1.5 | 0 | none |
| Body Regular | 14px | 400 | 1.5 | 0 | none |
| Caption | 12px | 600 | 1.4 | 0.08em | uppercase |

## 4. Spatial Grid
8pt scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64.
Container: 1280px max including 64px desktop gutters, giving a 1152px content rail (max-w-6xl).
Breakpoints: 640 / 768 / 980 / 1024.
Section sequence: floating navigation pill, asymmetric hero canvas, selected work, services, experience, contact, footer.

## 5. Hero Canvas (asymmetric)
- Hero canvas: 1152px max width, 24px radius, 1px #E2E8F0 border, shadow 0 8px 30px rgba(0,0,0,0.08), 48px padding.
- Grid: 12 columns at 1024px and up. Left copy spans 5, right visual spans 7.
- Left column: caption eyebrow, Display 1 name, then a border-top metadata block (uppercase 14px/600 label plus 14px muted paragraph).
- Right column: character centrepiece, 448x450 max, 16px radius, 1px rgba(255,255,255,0.5) border, card shadow, object-fit cover.
- Floating HUD cards: absolute, right 24px, top 32px and bottom 48px. Padding 8px 16px, 12px radius, rgba(255,255,255,0.85) glass with blur(16px), 1px #E2E8F0 border, 8px status dot #0F172A, floatHUD 5s loop with a 1.5s stagger on the second card.
- Scroll pagination: fixed right edge, vertically centred, 5 dots, 12px gap. Inactive 10px circle rgba(15,23,42,0.2), active 26px tall pill #0F172A, label tooltip on hover and focus.

## 6. Components and States
Pill badge: padding 6px 14px, 12px, 600, tracking 0.05em, radius 9999px, background #FFFFFF, border 1px #E2E8F0.

Primary Button: #111 fill, #FFF text. Hover scale 1.02 plus opacity 0.9. Active scale 0.98, #000. Disabled opacity 0.4, cursor not-allowed. Loading shows a 14px spinner and drops the arrow.
Secondary Button: #FFF fill, 1px #E2E8F0 border. Hover border #111. Active #F4F4F4. Disabled opacity 0.4.
Text Input: 1px #E2E8F0 border, 10px radius, #FFF fill. Hover border #94A3B8. Focus border #111 plus 2px ring. Error border #EF4444 plus message. Valid border #10B981. Disabled #F8FAFC at 0.5 opacity.
Card: #FFF, 1px #E2E8F0, 16px radius. Hover translateY(-2px) plus 0 8px 30px rgba(0,0,0,0.08). Loading uses a shimmer skeleton on the cover.
Focus-visible: outline 2px solid #0F172A, offset 2px.

## 7. Motion
- revealUp: opacity 0 to 1, translateY(20px) to 0, 0.5s cubic-bezier(0.16,1,0.3,1), 0.12s stagger per index. Implemented as a CSS animation that is cleared on animationend so it cannot out-specify component hover and disabled states.
- floatHUD: 0/100 translateY(0), 50% translateY(-6px), 5s ease-in-out infinite.
- fadeIn: opacity 0 to 1, translateY(10px) to 0, 0.3s ease-out, used for the mobile nav panel.
- All component state changes transition in 0.25s.
- prefers-reduced-motion disables reveal, floatHUD, shimmer and the mobile nav animation.

## 8. Accessibility
- 122 live text nodes audited for contrast. 0 failures.
- Keyboard focus ring verified across the tab order.
- Skip link, aria-expanded on the menu toggle, aria-invalid plus role=alert on field errors, aria-live form status.


## 9. v4 - Full-Screen Canvas Layout
Revision requested after v3: the hero must fill the entire viewport instead of sitting as a floating card inside a rail, and the page must use the whole screen.

### 9.1 Responsive gutter token
- --gutter: clamp(24px, 4.5vw, 88px). Replaces the three fixed container paddings (24 / 32 / 64). Single source of edge spacing.
- --container-full: 1920px. Content rail cap, so text lines stay readable on ultrawide displays.
- 390px viewport -> 24px gutter. 1440px -> 64.8px. 1920px -> 86.4px. 2560px+ -> capped at 88px.

### 9.2 Hero canvas
- .hero is a flex track with min-height 100svh (100vh fallback).
- .hero-canvas is width 100%, max-width none, min-height 100svh, margin 0, border-radius 0, no side or top border, no shadow. The only separation is a 1px #E2E8F0 bottom border.
- Padding: 132px 152px top (breakpoint dependent), --gutter left and right, 64px bottom. The top value clears the fixed nav pill.
- Content is vertically centred with flex justify-content center, so the copy block and the portrait sit on the viewport mid-line at every height.
- A single ::before layer paints radial-gradient(58% 62% at 72% 46%, rgba(255,255,255,0.94), transparent 72%) behind the portrait column. Flat canvas is preserved, the wash only lifts the subject.
- .hero-grid carries position relative and z-index 1 so it always paints above that wash.

### 9.3 Scaling subject
- Portrait: width 100%. Height is viewport driven - clamp(330px,44vh,460px) base, clamp(380px,52vh,580px) at 640px, clamp(440px,60vh,760px) at 1024px. At 1024px and up max-width is released so the frame fills all 7 columns of the asymmetric grid.
- Measured at 1920x1080: portrait 999 x 648 at x 834. Grid columns: copy span 5, visual span 7, gap 48px.

### 9.4 Widened sections
- .container max-width is now --container-full with the clamp gutter. All sections use the same rail as the hero.
- Work grid stays at 2 columns for four projects (no orphan row). Cover height becomes viewport relative above 1280px: clamp(300px,34vh,440px), so a full-width card does not become an enormous 16:10 slab.
- Contact card expands to the full rail. The form inside is capped at 900px so fields stay usable.
- Nav pill width is calc(100% - (--gutter * 2)) capped at --container-full, so it tracks the same rail as content.
- Pager dots move to a 24px right offset to stay clear of the clamp gutter.

### 9.5 Verified after the change
| Check | 1920 | 1440 | 768 | 390 |
|---|---|---|---|---|
| hero canvas equals viewport | 1920x1080 | 1440x900 | 768x1024 | 390x852 |
| canvas border-radius | 0 | 0 | 0 | 0 |
| canvas border top / sides | 0 | 0 | 0 | 0 |
| horizontal overflow | none | none | none | none |
| console errors | 0 | 0 | 0 | 0 |
| contrast failures (all content forced visible) | 0 | 0 | 0 | 0 |
| reveal elements left hidden after full scroll | 0 | 0 | 0 | 0 |
| broken images | 0/5 | 0/5 | 0/5 | 0/5 |
| classes with no CSS rule | 0 | 0 | 0 | 0 |

Pixel verification on the 1920x1080 hero capture: corners and the full top row sample exactly #F4F4F4, confirming no card frame remains. The portrait occupies x 834 to 1834, matching the 7 column span, with the 86.4px gutter on the right.
